import { z } from 'zod';

const invoiceProductDtoSchema = z.object({
  description: z.string(),
  code: z.string().nullable(),
  quantity: z.number().nullable(),
});

/** Invoice data as the backend reads it (`InvoiceDataResponseDto`); unreadable fields come as `null`. */
export const invoiceDtoSchema = z.object({
  invoiceNumber: z.string().nullable(),
  issueDate: z.string().nullable(),
  sellerName: z.string().nullable(),
  buyerName: z.string().nullable(),
  buyerIdentification: z.string().nullable(),
  products: z.array(invoiceProductDtoSchema),
  scoreImage: z.number(),
  scoreResult: z.number(),
});
export type InvoiceDto = z.infer<typeof invoiceDtoSchema>;
