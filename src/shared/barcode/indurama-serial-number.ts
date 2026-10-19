import type { Binarizer, ReadInputBarcodeFormat } from 'zxing-wasm/reader';

import { readBarcodesFromFrame, type ScannedBarcode } from './read-barcodes';

/*
 * Codes on the label of an Indurama product:
 * - Serial number, Code 128, in one of three formats:
 *   - national: `E0` + 8-digit product + 4-digit sequence + MMYY (`E01080086700730725`);
 *   - imported type 1: `I0` + 8-digit SAP code + 4-digit sequence + MMYY (`I01000862100780725`);
 *   - imported type 2: 13 digits (`6500325520295`).
 * - Traceability, Code 128: 8 digits followed by the whole serial (`30000857E01080086700730725`).
 * - Supplier code, EAN-13: identifies the model, not the unit. It can look like an imported type 2
 *   serial, so the symbology is what tells them apart, never the digits.
 */
const PREFIXED_SERIAL = /^[EI]0\d{16}$/;
const TRACEABILITY = /^\d{8}([EI]0\d{16})$/;
const NUMERIC_SERIAL = /^\d{13}$/;

/** Formats printed on the label. The EAN ones are read only to tell the user what was caught. */
const LABEL_FORMATS: ReadInputBarcodeFormat[] = ['Code128', 'EAN13', 'UPCA'];

type LabelCodeKind = 'prefixed-serial' | 'traceability' | 'numeric-serial' | 'supplier' | 'unknown';

interface LabelCode {
  kind: LabelCodeKind;
  /** Serial the code holds, if any. */
  serialNumber: string | null;
}

/** From the most to the least reliable: the 13-digit pattern is the loosest. */
const SERIAL_PRIORITY: LabelCodeKind[] = ['prefixed-serial', 'traceability', 'numeric-serial'];

function classifyLabelCode({ text, symbology }: ScannedBarcode): LabelCode {
  if (symbology === 'EANUPC') return { kind: 'supplier', serialNumber: null };
  if (symbology !== 'Code128') return { kind: 'unknown', serialNumber: null };
  if (PREFIXED_SERIAL.test(text)) return { kind: 'prefixed-serial', serialNumber: text };
  const fromTraceability = TRACEABILITY.exec(text)?.[1];
  if (fromTraceability) return { kind: 'traceability', serialNumber: fromTraceability };
  if (NUMERIC_SERIAL.test(text)) return { kind: 'numeric-serial', serialNumber: text };
  return { kind: 'unknown', serialNumber: null };
}

/** Serial number among the barcodes read from a label, or `null` when none holds one. */
export function pickSerialNumber(barcodes: readonly ScannedBarcode[]): string | null {
  const codes = barcodes.map(classifyLabelCode);
  for (const kind of SERIAL_PRIORITY) {
    const match = codes.find((code) => code.kind === kind);
    if (match) return match.serialNumber;
  }
  return null;
}

export type SerialNumberReadResult =
  | { status: 'found'; serialNumber: string }
  /** Barcodes were read, but none holds a serial (typically only the supplier EAN-13). */
  | { status: 'no-serial' }
  | { status: 'no-barcode' };

/** Reads the serial number from one camera frame of the label of an Indurama product. */
export async function readSerialNumberFromFrame(
  frame: ImageData,
  binarizer: Binarizer,
): Promise<SerialNumberReadResult> {
  const barcodes = await readBarcodesFromFrame(frame, { formats: LABEL_FORMATS, binarizer });
  const serialNumber = pickSerialNumber(barcodes);
  if (serialNumber) return { status: 'found', serialNumber };
  return { status: barcodes.length > 0 ? 'no-serial' : 'no-barcode' };
}
