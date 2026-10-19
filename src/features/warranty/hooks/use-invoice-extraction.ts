import { useState } from 'react';

import { isApiError } from '@/shared/api/api-error';
import { useRequestSignal } from '@/shared/hooks/use-request-signal';
import { isAbortError } from '@/shared/utils/abort';

import { GENERIC_ERROR_MESSAGE } from '../constants';
import { invoiceFileSchema, type InvoiceData } from '../schemas/invoice.schema';
import { extractInvoice } from '../api/invoice-extraction/invoice-extraction-api';

/** Backend codes the user can act on; anything else shows the generic message. */
const ERROR_MESSAGES: Readonly<Record<string, string | undefined>> = {
  INVOICE_UNREADABLE:
    'No pudimos leer la factura. Sube una foto más nítida, con el comprobante completo y bien iluminado.',
  INVALID_INVOICE_FILE: 'El archivo no es una imagen JPG, PNG, WebP o un PDF válido.',
  PAYLOAD_TOO_LARGE: 'El archivo supera el máximo de 10 MB.',
  OPENAI_RATE_LIMITED: 'El servicio de lectura está ocupado. Intenta nuevamente en un minuto.',
  TOO_MANY_REQUESTS: 'Hiciste demasiados intentos. Espera unos minutos y vuelve a intentarlo.',
};

function toErrorMessage(error: unknown): string {
  return (isApiError(error) && ERROR_MESSAGES[error.code]) || GENERIC_ERROR_MESSAGE;
}

export type InvoiceExtractionState =
  | { status: 'idle' }
  | { status: 'reading'; fileName: string; progress: number }
  | { status: 'error'; message: string };

/**
 * Validates the picked file and sends it to be read.
 * `extract` resolves with the invoice data, or `null` when the file was rejected or the read failed.
 */
export function useInvoiceExtraction() {
  const [state, setState] = useState<InvoiceExtractionState>({ status: 'idle' });
  const { nextSignal } = useRequestSignal();

  const extract = async (file: File): Promise<InvoiceData | null> => {
    const validation = invoiceFileSchema.safeParse(file);
    if (!validation.success) {
      setState({
        status: 'error',
        message: validation.error.issues[0]?.message ?? GENERIC_ERROR_MESSAGE,
      });
      return null;
    }

    const signal = nextSignal();
    setState({ status: 'reading', fileName: file.name, progress: 0 });

    try {
      const invoice = await extractInvoice(file, {
        signal,
        onProgress: (progress) => {
          setState({ status: 'reading', fileName: file.name, progress });
        },
      });
      setState({ status: 'idle' });
      return invoice;
    } catch (error) {
      if (!isAbortError(error)) setState({ status: 'error', message: toErrorMessage(error) });
      return null;
    }
  };

  const reset = () => {
    setState({ status: 'idle' });
  };

  return { state, extract, reset };
}
