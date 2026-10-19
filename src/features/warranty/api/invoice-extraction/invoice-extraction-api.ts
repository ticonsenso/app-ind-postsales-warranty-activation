import { parseApiData } from '@/shared/api/api-response';
import { httpClient } from '@/shared/api/http-client';

import { INVOICE_FIELD_NAME } from '../../constants';
import { isoDateSchema, type InvoiceData } from '../../schemas/invoice.schema';

import { invoiceDtoSchema, type InvoiceDto } from './invoice-extraction-dto.schema';

/** Reading the invoice with Azure OpenAI takes far longer than a regular request. */
const INVOICE_EXTRACTION_TIMEOUT_MS = 60_000;
/** Share of the progress bar covered by the upload; the rest waits for the reading to finish. */
const UPLOAD_PROGRESS_SHARE = 90;

interface ExtractInvoiceOptions {
  signal?: AbortSignal;
  /** Called with a 0-100 value while the file is uploaded and read. */
  onProgress?: (percent: number) => void;
}

function toInvoiceData(dto: InvoiceDto): InvoiceData {
  return {
    purchaseDate: isoDateSchema.safeParse(dto.issueDate).success ? dto.issueDate : null,
    receiptNumber: dto.invoiceNumber,
    issuer: dto.sellerName,
  };
}

/**
 * Uploads an invoice and returns the data the backend reads from it
 * (`POST /v1/warranties/invoice-extraction`, multipart).
 *
 * @param file - Invoice already checked by `invoiceFileSchema`
 * @param options - Cancellation signal and progress callback
 * @returns The data read; values the backend could not read come as `null`
 * @throws {ApiError} `INVOICE_UNREADABLE` when the invoice cannot be read, `INVALID_INVOICE_FILE`
 *   when its content is not an accepted type, `PAYLOAD_TOO_LARGE` over the size limit, or any other
 *   failure
 * @author Esteban
 * @since 2026-10-01
 */
export async function extractInvoice(
  file: File,
  { signal, onProgress }: ExtractInvoiceOptions = {},
): Promise<InvoiceData> {
  const body = new FormData();
  body.append(INVOICE_FIELD_NAME, file);

  onProgress?.(0);
  const response = await httpClient.post<unknown>('/warranties/invoice-extraction', body, {
    signal,
    timeout: INVOICE_EXTRACTION_TIMEOUT_MS,
    onUploadProgress: ({ progress }) => {
      if (progress !== undefined) onProgress?.(Math.round(progress * UPLOAD_PROGRESS_SHARE));
    },
  });
  onProgress?.(100);

  return toInvoiceData(parseApiData(invoiceDtoSchema, response.data));
}
