import { CameraView } from '@/shared/components/CameraView';
import { useBarcodeScan } from '@/shared/hooks/use-barcode-scan';

import { useScanHints } from '../hooks/use-scan-hints';

import { ScanOverlay } from './ScanOverlay';

interface LabelScannerProps {
  showHints: boolean;
  onDetected: (serialNumber: string) => void;
  onError: () => void;
  onCancel: () => void;
  onTypeInstead: () => void;
}

/**
 * Full-screen live scan of the product label. Mount it only while scanning: the scan, its hints
 * and the camera all end when it unmounts.
 */
export function LabelScanner({
  showHints,
  onDetected,
  onError,
  onCancel,
  onTypeInstead,
}: LabelScannerProps) {
  const scanner = useBarcodeScan({ onDetected, onError });
  const { hint, canTypeInstead } = useScanHints({
    enabled: showHints,
    lastRead: scanner.lastRead,
  });

  return (
    <CameraView
      label="Escanear la etiqueta"
      cameraErrorMessage="No pudimos acceder a la cámara. Revisa que el navegador tenga permiso o escribe el número de serie a mano."
      onFrame={scanner.handleFrame}
      onCancel={onCancel}
    >
      <ScanOverlay hint={hint} onTypeInstead={canTypeInstead ? onTypeInstead : undefined} />
    </CameraView>
  );
}
