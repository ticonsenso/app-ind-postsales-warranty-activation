import { z } from 'zod';

import { INVOICE_ACCEPTED_MIME_TYPES, INVOICE_MAX_SIZE_BYTES } from '../constants';

/** Calendar date without time or timezone: `yyyy-MM-dd`. */
export const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

/** File picked by the user. Untrusted: only its metadata is checked here, it is never parsed. */
export const invoiceFileSchema = z
  .instanceof(File)
  .refine((file) => INVOICE_ACCEPTED_MIME_TYPES.some((type) => type === file.type), {
    message: 'El archivo debe ser una imagen JPG, PNG, WebP o un PDF.',
  })
  .refine((file) => file.size > 0, { message: 'El archivo está vacío.' })
  .refine((file) => file.size <= INVOICE_MAX_SIZE_BYTES, {
    message: 'El archivo supera el máximo de 10 MB.',
  });

/**
 * Data read from the invoice, as the warranty needs it (Creatio `INDFecha`, `INDNumComprobante`,
 * `INDEmisor`). `null` when the backend could not read it. Never typed by the user.
 */
export interface InvoiceData {
  purchaseDate: string | null;
  receiptNumber: string | null;
  issuer: string | null;
}

export type CompleteInvoiceData = { [Key in keyof InvoiceData]: NonNullable<InvoiceData[Key]> };

/** Invoice of the flow: the data read plus the file, which the warranty registration attaches. */
export interface ExtractedInvoice extends InvoiceData {
  file: File;
}

/** True when every value the warranty registration requires was read from the invoice. */
export function isInvoiceComplete<T extends InvoiceData>(
  invoice: T,
): invoice is T & CompleteInvoiceData {
  return invoice.purchaseDate !== null && invoice.receiptNumber !== null && invoice.issuer !== null;
}
