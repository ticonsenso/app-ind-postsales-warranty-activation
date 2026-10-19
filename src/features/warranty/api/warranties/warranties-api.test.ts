import { http } from 'msw';
import { describe, expect, it } from 'vitest';

import { API_URL, EXISTING_PRODUCT_CODE, failure, success } from '@/test/msw/handlers';
import { server } from '@/test/msw/server';

import { createWarranty } from './warranties-api';

describe('createWarranty (POST /v1/warranties)', () => {
  const KEY = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const REQUEST = {
    customer: {
      id: '5b0e4f0a-3f41-4c55-9a52-0a3f7d1d2b11',
      documentNumber: '1712345678',
      firstName: 'Carlos',
      lastName: 'Mendoza',
      email: 'carlos.mendoza@example.com',
      phone: '+593 99 876 5432',
      countryId: 'country-ec',
      provinceId: 'province-ec-azuay',
      cityId: 'city-ec-azuay-cuenca',
      acceptedPrivacy: true,
      acceptedTerms: true,
    },
    product: {
      id: '0c1d2e3f-0000-4000-8000-000000000001',
      code: EXISTING_PRODUCT_CODE,
      name: 'Heladera',
      serialNumber: 'SN123456789',
    },
    invoice: {
      purchaseDate: '2026-07-14',
      receiptNumber: '001-002-000032451',
      issuer: 'Marcimex S.A.',
      file: new File(['%PDF-'], 'factura.pdf', { type: 'application/pdf' }),
    },
  };

  const PRODUCT_AND_INVOICE_FIELDS = {
    productId: '0c1d2e3f-0000-4000-8000-000000000001',
    serialNumber: 'SN123456789',
    invoiceNumber: '001-002-000032451',
    purchaseDate: '2026-07-14',
    storeName: 'Marcimex S.A.',
  };

  /** Captures the multipart body and headers of the next `POST /warranties`. */
  function recordPost() {
    const recorded: { fields: Record<string, FormDataEntryValue>; key: string | null } = {
      fields: {},
      key: null,
    };
    server.use(
      http.post(`${API_URL}/warranties`, async ({ request }) => {
        recorded.fields = Object.fromEntries(await request.formData());
        recorded.key = request.headers.get('idempotency-key');
        return success({ warrantyId: recorded.key }, 201);
      }),
    );
    return recorded;
  }

  it('references an existing customer by Id, with the consents, the invoice file and the key', async () => {
    const recorded = recordPost();

    const activation = await createWarranty(REQUEST, KEY);

    expect(recorded.key).toBe(KEY);
    const { invoice, ...textFields } = recorded.fields;
    expect(textFields).toEqual({
      clientId: '5b0e4f0a-3f41-4c55-9a52-0a3f7d1d2b11',
      INDPP: 'true',
      INDTyC: 'true',
      ...PRODUCT_AND_INVOICE_FIELDS,
    });
    expect(typeof invoice).not.toBe('string');
    expect(activation).toEqual({ warrantyId: KEY });
  });

  it('sends a new customer with bracket notation and no clientId', async () => {
    const recorded = recordPost();

    await createWarranty({ ...REQUEST, customer: { ...REQUEST.customer, id: '' } }, KEY);

    const textFields = Object.fromEntries(
      Object.entries(recorded.fields).filter(([name]) => name !== 'invoice'),
    );
    expect(textFields).toEqual({
      'newClient[Name]': 'Carlos',
      'newClient[INDApellido]': 'Mendoza',
      'newClient[Phone]': '+593 99 876 5432',
      'newClient[INDCorreo]': 'carlos.mendoza@example.com',
      'newClient[INDNumeroIdentificacion]': '1712345678',
      'newClient[CountryId]': 'country-ec',
      'newClient[RegionId]': 'province-ec-azuay',
      'newClient[CityId]': 'city-ec-azuay-cuenca',
      INDPP: 'true',
      INDTyC: 'true',
      ...PRODUCT_AND_INVOICE_FIELDS,
    });
  });

  it('resolves the same warranty on a retry answered with 200', async () => {
    server.use(http.post(`${API_URL}/warranties`, () => success({ warrantyId: KEY }, 200)));

    await expect(createWarranty(REQUEST, KEY)).resolves.toEqual({ warrantyId: KEY });
  });

  it.each([
    [422, 'PURCHASE_DATE_IN_FUTURE'],
    [422, 'CLIENT_ALREADY_EXISTS'],
    [404, 'CLIENT_NOT_FOUND'],
    [500, 'CREATIO_UNAVAILABLE'],
  ])('rejects with %i %s', async (status, code) => {
    server.use(http.post(`${API_URL}/warranties`, () => failure(status, code)));

    await expect(createWarranty(REQUEST, KEY)).rejects.toMatchObject({ code, status });
  });
});
