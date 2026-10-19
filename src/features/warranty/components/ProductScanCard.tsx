import { ScanBarcode } from 'lucide-react';
import { useState } from 'react';

import { Alert } from '@/shared/components/Alert';
import { Button } from '@/shared/components/Button';
import { IconBadge } from '@/shared/components/IconBadge';

import { GENERIC_ERROR_MESSAGE } from '../constants';

import { LabelScanner } from './LabelScanner';

interface ProductScanCardProps {
  /** Called when the camera opens, before any frame is read. */
  onScanStart?: () => void;
  /** Called with the serial confirmed by the scan, once the camera has closed. */
  onSerialDetected: (serialNumber: string) => void;
  /** The user chose to type the serial after a long scan; the camera has closed. */
  onTypeInstead: () => void;
  /** Guides the user with messages while scanning. */
  showHints?: boolean;
  disabled?: boolean;
}

/**
 * Card that scans the barcode of the label with the in-page camera, on phones and desktops alike.
 * The page never hands over to the phone's camera app, which some phones answer by unloading the
 * browser tab and, with it, the data of the earlier steps.
 */
export function ProductScanCard({
  onScanStart,
  onSerialDetected,
  onTypeInstead,
  showHints = true,
  disabled = false,
}: ProductScanCardProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  const openScanner = () => {
    setHasFailed(false);
    setIsScanning(true);
    onScanStart?.();
  };

  const handleDetected = (serialNumber: string) => {
    setIsScanning(false);
    onSerialDetected(serialNumber);
  };

  const handleError = () => {
    setIsScanning(false);
    setHasFailed(true);
  };

  const handleTypeInstead = () => {
    setIsScanning(false);
    onTypeInstead();
  };

  return (
    <>
      <div className="mb-[18px] rounded-card border-[1.5px] border-dashed border-line bg-page/40 px-5 py-7 text-center">
        <IconBadge tone="brand" size="lg" className="mx-auto mb-3">
          <ScanBarcode className="size-6" />
        </IconBadge>
        <h3 className="mb-[5px] text-[17px]">Escanea el código de barras</h3>
        <p className="mb-4 text-sm font-light text-ink-muted">
          Apunta la cámara a la etiqueta del producto. No guardamos la imagen.
        </p>
        <Button onClick={openScanner} disabled={disabled}>
          Abrir la cámara
        </Button>
      </div>

      {hasFailed && <Alert tone="error">{GENERIC_ERROR_MESSAGE}</Alert>}

      {isScanning && (
        <LabelScanner
          showHints={showHints}
          onDetected={handleDetected}
          onError={handleError}
          onCancel={() => setIsScanning(false)}
          onTypeInstead={handleTypeInstead}
        />
      )}
    </>
  );
}
