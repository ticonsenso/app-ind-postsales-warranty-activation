import type * as ZXing from 'zxing-wasm/reader';
import wasmUrl from 'zxing-wasm/reader/zxing_reader.wasm?url';

let readerPromise: Promise<typeof ZXing> | null = null;

/**
 * Loads the barcode reader on first use (about 1 MB of WebAssembly). The binary is served from this
 * site, not from the CDN the library defaults to. A failed load is retried on the next call.
 */
export function loadBarcodeReader(): Promise<typeof ZXing> {
  readerPromise ??= importReader().catch((error: unknown) => {
    readerPromise = null;
    throw error;
  });
  return readerPromise;
}

/** Starts loading the reader ahead of time, so the first scan does not wait for the download. */
export function preloadBarcodeReader(): void {
  loadBarcodeReader().catch(() => {
    // Ignored: the scan loads it again and reports the failure.
  });
}

async function importReader(): Promise<typeof ZXing> {
  const zxing = await import('zxing-wasm/reader');
  await zxing.prepareZXingModule({
    overrides: {
      locateFile: (path: string, prefix: string) =>
        path.endsWith('.wasm') ? wasmUrl : prefix + path,
    },
    fireImmediately: true,
  });
  return zxing;
}
