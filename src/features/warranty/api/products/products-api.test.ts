import { http } from 'msw';
import { describe, expect, it } from 'vitest';

import { API_URL, EXISTING_PRODUCT_CODE, failure } from '@/test/msw/handlers';
import { server } from '@/test/msw/server';

import { getProductBySerialNumber } from './products-api';

describe('getProductBySerialNumber (GET /v1/products/serial/:serialNumber)', () => {
  it('maps the Creatio columns to the product model and keeps the serial', async () => {
    await expect(getProductBySerialNumber(EXISTING_PRODUCT_CODE)).resolves.toEqual({
      id: '0c1d2e3f-0000-4000-8000-000000000001',
      code: EXISTING_PRODUCT_CODE,
      name: 'Heladera',
      serialNumber: EXISTING_PRODUCT_CODE,
    });
  });

  it('resolves null when SAP does not know the serial (SERIAL_NOT_FOUND)', async () => {
    await expect(getProductBySerialNumber('00000000')).resolves.toBeNull();
  });

  it('resolves null when the serial material is not a CRM product (PRODUCT_NOT_FOUND)', async () => {
    server.use(
      http.get(`${API_URL}/products/serial/:serialNumber`, () => failure(404, 'PRODUCT_NOT_FOUND')),
    );

    await expect(getProductBySerialNumber(EXISTING_PRODUCT_CODE)).resolves.toBeNull();
  });

  it('rejects with the backend error code on other failures', async () => {
    server.use(
      http.get(`${API_URL}/products/serial/:serialNumber`, () => failure(429, 'TOO_MANY_REQUESTS')),
    );

    await expect(getProductBySerialNumber(EXISTING_PRODUCT_CODE)).rejects.toMatchObject({
      code: 'TOO_MANY_REQUESTS',
      status: 429,
    });
  });
});
