import { http } from 'msw';
import { describe, expect, it } from 'vitest';

import { API_URL, failure, INVOICE_FIXTURE, success } from '@/test/msw/handlers';
import { server } from '@/test/msw/server';

import { extractInvoice } from './invoice-extraction-api';

describe('extractInvoice (POST /v1/warranties/invoice-extraction)', () => {
  const invoice = new File(['%PDF-'], 'factura.pdf', { type: 'application/pdf' });

  it('sends the file as multipart in the "invoice" field and maps the data read', async () => {
    let sent: FormDataEntryValue | null = null;
    server.use(
      http.post(`${API_URL}/warranties/invoice-extraction`, async ({ request }) => {
        sent = (await request.formData()).get('invoice');
        return success(INVOICE_FIXTURE);
      }),
    );

    const result = await extractInvoice(invoice);

    // jsdom's File does not survive the trip to MSW intact: only check that a file part arrived.
    expect(sent).not.toBeNull();
    expect(typeof sent).not.toBe('string');
    expect(result).toEqual({
      purchaseDate: '2026-07-14',
      receiptNumber: '001-002-000032451',
      issuer: 'Marcimex S.A.',
    });
  });

  it('keeps the values the backend could not read as null', async () => {
    server.use(
      http.post(`${API_URL}/warranties/invoice-extraction`, () =>
        success({ ...INVOICE_FIXTURE, invoiceNumber: null, sellerName: null }),
      ),
    );

    await expect(extractInvoice(invoice)).resolves.toMatchObject({
      receiptNumber: null,
      issuer: null,
    });
  });

  it('treats a purchase date that is not yyyy-MM-dd as unread', async () => {
    server.use(
      http.post(`${API_URL}/warranties/invoice-extraction`, () =>
        success({ ...INVOICE_FIXTURE, issueDate: '14/07/2026' }),
      ),
    );

    await expect(extractInvoice(invoice)).resolves.toMatchObject({ purchaseDate: null });
  });

  it('reports the progress up to 100', async () => {
    const progress: number[] = [];

    await extractInvoice(invoice, { onProgress: (value) => progress.push(value) });

    expect(progress[0]).toBe(0);
    expect(progress.at(-1)).toBe(100);
  });

  it.each([
    [422, 'INVOICE_UNREADABLE'],
    [422, 'INVALID_INVOICE_FILE'],
    [413, 'PAYLOAD_TOO_LARGE'],
    [500, 'OPENAI_UNAVAILABLE'],
  ])('rejects with %i %s', async (status, code) => {
    server.use(http.post(`${API_URL}/warranties/invoice-extraction`, () => failure(status, code)));

    await expect(extractInvoice(invoice)).rejects.toMatchObject({ code, status });
  });

  it('rejects with INVALID_RESPONSE when the body does not match the contract', async () => {
    server.use(
      http.post(`${API_URL}/warranties/invoice-extraction`, () =>
        success({ invoiceNumber: '001' }),
      ),
    );

    await expect(extractInvoice(invoice)).rejects.toMatchObject({ code: 'INVALID_RESPONSE' });
  });
});
