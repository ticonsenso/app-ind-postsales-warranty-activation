import { useEffect, useRef, useState } from 'react';
import type { Binarizer } from 'zxing-wasm/reader';

import {
  readSerialNumberFromFrame,
  type SerialNumberReadResult,
} from '@/shared/barcode/indurama-serial-number';
import { preloadBarcodeReader } from '@/shared/barcode/zxing';
import { useRequestSignal } from '@/shared/hooks/use-request-signal';

/**
 * Reads of the same serial needed to accept it, with no other serial read in between. A single
 * frame can be misread into another serial whose check digit is still valid; two frames agreeing
 * rules that out. Frames that read no serial do not count against it: with the binarizers
 * alternating, often only one of them catches the code.
 */
export const CONFIRMING_READS = 2;

/**
 * Alternated between frames: the default local threshold, and a fixed one that still separates
 * the bars of glossy labels or labels printed on cardboard.
 */
const BINARIZERS: readonly Binarizer[] = ['LocalAverage', 'FixedThreshold'];

/** Outcome of the last frame read, with the time (`Date.now()`) it was read. */
export interface FrameRead {
  status: SerialNumberReadResult['status'];
  at: number;
}

interface UseBarcodeScanOptions {
  /** Called once, with the serial confirmed by `CONFIRMING_READS` frames. */
  onDetected: (serialNumber: string) => void;
  /** Called once when the reader fails (e.g. its WebAssembly does not load). */
  onError: () => void;
}

/**
 * Reads the serial number from the frames of a live camera. One scan lasts as long as the
 * component using the hook: once it detects, fails or unmounts, later frames and reads that
 * finish late are ignored.
 */
export function useBarcodeScan({ onDetected, onError }: UseBarcodeScanOptions) {
  const [lastRead, setLastRead] = useState<FrameRead | null>(null);
  const { nextSignal, cancel } = useRequestSignal();
  const signalRef = useRef<AbortSignal | null>(null);
  const frameCountRef = useRef(0);
  const candidateRef = useRef<{ serialNumber: string; reads: number } | null>(null);
  const callbacksRef = useRef({ onDetected, onError });

  useEffect(() => {
    callbacksRef.current = { onDetected, onError };
  });

  useEffect(() => {
    preloadBarcodeReader();
  }, []);

  const handleFrame = async (frame: ImageData): Promise<void> => {
    signalRef.current ??= nextSignal();
    const signal = signalRef.current;
    if (signal.aborted) return;

    const binarizer = BINARIZERS[frameCountRef.current % BINARIZERS.length] ?? 'LocalAverage';
    frameCountRef.current += 1;

    try {
      const result = await readSerialNumberFromFrame(frame, binarizer);
      if (signal.aborted) return;
      setLastRead({ status: result.status, at: Date.now() });

      if (result.status !== 'found') return;
      const candidate = candidateRef.current;
      const reads = candidate?.serialNumber === result.serialNumber ? candidate.reads + 1 : 1;
      candidateRef.current = { serialNumber: result.serialNumber, reads };
      if (reads >= CONFIRMING_READS) {
        cancel();
        callbacksRef.current.onDetected(result.serialNumber);
      }
    } catch {
      if (signal.aborted) return;
      cancel();
      callbacksRef.current.onError();
    }
  };

  return { handleFrame, lastRead };
}
