import { useEffect, useRef, useState } from 'react';

import type { FrameRead } from '@/shared/hooks/use-barcode-scan';

export type ScanHint = 'aim' | 'model-code' | 'move-closer';

const TICK_MS = 500;
/** A hint replaces the one shown only after staying the same this long, so it never flickers. */
const STABLE_MS = 1000;
/** A label code other than the serial counts as "being read" this long after its last read. */
const MODEL_CODE_WINDOW_MS = 1000;
const MOVE_CLOSER_AFTER_MS = 5000;
const TYPE_INSTEAD_AFTER_MS = 15000;

interface UseScanHintsOptions {
  /** Off: no hint is shown and no timer runs. */
  enabled: boolean;
  lastRead: FrameRead | null;
}

/**
 * Tells the user what to do while the label is scanned, from what the last frames caught.
 * One scan lasts as long as the component using the hook. `canTypeInstead` turns `true` once the
 * scan has gone on long enough to suggest typing the serial.
 */
export function useScanHints({ enabled, lastRead }: UseScanHintsOptions) {
  const [hint, setHint] = useState<ScanHint>('aim');
  const [canTypeInstead, setCanTypeInstead] = useState(false);
  const lastCodeAtRef = useRef<number | null>(null);
  const lastModelCodeAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (!lastRead) return;
    if (lastRead.status !== 'no-barcode') lastCodeAtRef.current = lastRead.at;
    if (lastRead.status === 'no-serial') lastModelCodeAtRef.current = lastRead.at;
  }, [lastRead]);

  useEffect(() => {
    if (!enabled) return;
    const startedAt = Date.now();
    let candidate: ScanHint = 'aim';
    let candidateSince = startedAt;

    const interval = setInterval(() => {
      const now = Date.now();
      const next = pickHint({
        now,
        startedAt,
        lastCodeAt: lastCodeAtRef.current,
        lastModelCodeAt: lastModelCodeAtRef.current,
      });
      if (next !== candidate) {
        candidate = next;
        candidateSince = now;
      }
      if (now - candidateSince >= STABLE_MS) setHint(candidate);
      if (now - startedAt >= TYPE_INSTEAD_AFTER_MS) setCanTypeInstead(true);
    }, TICK_MS);

    return () => {
      clearInterval(interval);
    };
  }, [enabled]);

  return {
    hint: enabled ? hint : null,
    canTypeInstead: enabled && canTypeInstead,
  };
}

function pickHint({
  now,
  startedAt,
  lastCodeAt,
  lastModelCodeAt,
}: {
  now: number;
  startedAt: number;
  lastCodeAt: number | null;
  lastModelCodeAt: number | null;
}): ScanHint {
  if (lastModelCodeAt !== null && now - lastModelCodeAt < MODEL_CODE_WINDOW_MS) return 'model-code';
  if (now - (lastCodeAt ?? startedAt) >= MOVE_CLOSER_AFTER_MS) return 'move-closer';
  return 'aim';
}
