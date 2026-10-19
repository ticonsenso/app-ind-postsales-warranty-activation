import type { Binarizer, ReadInputBarcodeFormat } from 'zxing-wasm/reader';

import { loadBarcodeReader } from './zxing';

/** A barcode decoded from an image. */
export interface ScannedBarcode {
  text: string;
  /** Exact format, e.g. `Code128`, `EAN13`, `UPCA`. */
  format: string;
  /** Family of the format, e.g. `Code128` or `EANUPC` (EAN-13, EAN-8, UPC-A…). */
  symbology: string;
}

export interface ReadBarcodesOptions {
  /** Formats to look for; every supported one when omitted. Fewer formats read faster. */
  formats?: ReadInputBarcodeFormat[];
  /** How the reader tells bars from background; zxing's default is `LocalAverage`. */
  binarizer?: Binarizer;
}

const MAX_SYMBOLS_PER_FRAME = 12;

/** Decodes the valid barcodes of one camera frame, in a single pass of the reader. */
export async function readBarcodesFromFrame(
  frame: ImageData,
  { formats = [], binarizer = 'LocalAverage' }: ReadBarcodesOptions = {},
): Promise<ScannedBarcode[]> {
  const zxing = await loadBarcodeReader();
  const results = await zxing.readBarcodes(frame, {
    formats,
    binarizer,
    maxNumberOfSymbols: MAX_SYMBOLS_PER_FRAME,
  });

  return results
    .filter((result) => result.isValid && result.text)
    .map(({ text, format, symbology }) => ({ text, format, symbology }));
}
