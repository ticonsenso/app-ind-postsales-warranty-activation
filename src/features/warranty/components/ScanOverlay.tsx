import { Button } from '@/shared/components/Button';

import type { ScanHint } from '../hooks/use-scan-hints';

const SCAN_HINT_MESSAGES: Record<ScanHint, string> = {
  aim: 'Apunta al código de barras rotulado «Número de serie».',
  'model-code': 'Ese es el código del modelo. Apunta al código «Número de serie».',
  'move-closer':
    'Acerca el teléfono hasta que el código ocupe el ancho del recuadro y evita los reflejos.',
};

interface ScanOverlayProps {
  /** `null` when hints are off. */
  hint: ScanHint | null;
  /** Offers typing the serial instead (after a long scan). */
  onTypeInstead?: () => void;
}

/** Laid over the camera while the label is scanned: framing guide, hint and way out. */
export function ScanOverlay({ hint, onTypeInstead }: ScanOverlayProps) {
  return (
    <>
      {/* The shadow dims everything outside the guide, so the eye goes to the frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[42%] left-1/2 h-[22%] w-[84%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-card border-2 border-white/90 shadow-[0_0_0_100vmax_color-mix(in_srgb,var(--color-night-950)_45%,transparent)]"
      />

      {(hint || onTypeInstead) && (
        <div className="absolute inset-x-4 top-4 flex flex-col items-center gap-3">
          {hint && (
            <p
              role="status"
              aria-live="polite"
              className="max-w-xl rounded-card bg-night-950/80 px-4 py-3 text-center text-sm text-white"
            >
              {SCAN_HINT_MESSAGES[hint]}
            </p>
          )}
          {onTypeInstead && (
            <Button variant="secondary" size="sm" onClick={onTypeInstead}>
              Escribirlo a mano
            </Button>
          )}
        </div>
      )}
    </>
  );
}
