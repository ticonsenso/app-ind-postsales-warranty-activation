import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '@/config/routes';
import { Alert } from '@/shared/components/Alert';
import { Button } from '@/shared/components/Button';
import { CameraView } from '@/shared/components/CameraView';
import { FileDropzone } from '@/shared/components/FileDropzone';
import { Panel, PanelHeader } from '@/shared/components/Panel';

import { INVOICE_ACCEPT_ATTRIBUTE } from '../constants';
import { useInvoiceExtraction } from '../hooks/use-invoice-extraction';
import { useWarrantyFlow } from '../hooks/use-warranty-flow';

import { InvoiceReadingCard } from './InvoiceReadingCard';
import { InvoiceSummary } from './InvoiceSummary';

/** Step 3: upload the purchase invoice; its data is read from it, never typed. */
export function InvoiceStep() {
  const navigate = useNavigate();
  const { state, dispatch } = useWarrantyFlow();
  const extraction = useInvoiceExtraction();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!photoPreviewUrl) return;
    return () => {
      URL.revokeObjectURL(photoPreviewUrl);
    };
  }, [photoPreviewUrl]);

  const handleFileSelected = async (file: File) => {
    const invoice = await extraction.extract(file);
    if (invoice) dispatch({ type: 'invoice-extracted', invoice: { ...invoice, file } });
  };

  const handlePhotoTaken = (photo: File) => {
    setIsCameraOpen(false);
    setPhotoPreviewUrl(URL.createObjectURL(photo));
    void handleFileSelected(photo);
  };

  const handleReplace = () => {
    dispatch({ type: 'invoice-cleared' });
    extraction.reset();
  };

  return (
    <Panel>
      <PanelHeader
        title="Sube la factura de compra"
        description="Leemos los datos directamente del comprobante, así no hace falta que los escribas."
      />

      {state.invoice ? (
        <InvoiceSummary
          invoice={state.invoice}
          onReplace={handleReplace}
          onContinue={() => void navigate(ROUTES.warranty.confirmation)}
        />
      ) : extraction.state.status === 'reading' ? (
        <InvoiceReadingCard
          fileName={extraction.state.fileName}
          progress={extraction.state.progress}
          previewUrl={photoPreviewUrl}
        />
      ) : (
        <div>
          {extraction.state.status === 'error' && (
            <Alert tone="error">{extraction.state.message}</Alert>
          )}
          <FileDropzone
            accept={INVOICE_ACCEPT_ATTRIBUTE}
            title="Toma una foto o elige un archivo"
            description="JPG, PNG, WebP o PDF, hasta 10 MB. Que se vean la fecha, el número y el emisor del comprobante."
            actionLabel="Subir factura"
            onFileSelected={(file) => void handleFileSelected(file)}
          />
          <div className="mt-3">
            <Button variant="secondary" fullWidth onClick={() => setIsCameraOpen(true)}>
              Tomar foto
            </Button>
          </div>
          {isCameraOpen && (
            <CameraView
              label="Tomar foto de la factura"
              fileName="factura"
              cameraErrorMessage="No pudimos acceder a la cámara. Revisa que el navegador tenga permiso o sube un archivo."
              onPhoto={handlePhotoTaken}
              onCancel={() => setIsCameraOpen(false)}
            />
          )}
          <div className="mt-[26px]">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => void navigate(ROUTES.warranty.product)}
            >
              Atrás
            </Button>
          </div>
        </div>
      )}
    </Panel>
  );
}
