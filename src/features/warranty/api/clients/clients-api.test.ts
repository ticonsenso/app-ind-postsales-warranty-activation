import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { ApiError } from '@/shared/api/api-error';
import { API_URL, CLIENT_FIXTURE, EXISTING_DOCUMENT, failure, success } from '@/test/msw/handlers';
import { server } from '@/test/msw/server';

import { getCustomer } from './clients-api';

async function rejectionOf(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
  } catch (error) {
    return error;
  }
  throw new Error('Expected the promise to reject.');
}

describe('getCustomer (GET /v1/clients/:identification)', () => {
  it('maps the Creatio columns to the customer model', async () => {
    const result = await getCustomer(EXISTING_DOCUMENT);

    expect(result).toEqual({
      found: true,
      customer: {
        id: CLIENT_FIXTURE.Id,
        documentNumber: EXISTING_DOCUMENT,
        firstName: 'María Fernanda',
        lastName: 'Sánchez Ordóñez',
        email: 'mf.sanchez@correo.com',
        phone: '+593 99 123 4567',
        countryId: '',
        provinceId: '',
        cityId: '',
        acceptedPrivacy: false,
        acceptedTerms: false,
      },
    });
  });

  it('maps CountryId/RegionId/CityId and the consents', async () => {
    server.use(
      http.get(`${API_URL}/clients/:identification`, () =>
        success({
          ...CLIENT_FIXTURE,
          CountryId: 'country-ec',
          RegionId: 'province-ec-azuay',
          CityId: 'city-ec-azuay-cuenca',
          INDPP: true,
          INDTyC: true,
        }),
      ),
    );

    const result = await getCustomer(EXISTING_DOCUMENT);

    expect(result).toMatchObject({
      found: true,
      customer: {
        countryId: 'country-ec',
        provinceId: 'province-ec-azuay',
        cityId: 'city-ec-azuay-cuenca',
        acceptedPrivacy: true,
        acceptedTerms: true,
      },
    });
  });

  it('turns nullable columns into empty strings', async () => {
    server.use(
      http.get(`${API_URL}/clients/:identification`, () =>
        success({
          ...CLIENT_FIXTURE,
          INDApellido: null,
          Phone: null,
          INDCorreo: null,
          CountryId: null,
          RegionId: null,
          CityId: null,
        }),
      ),
    );

    const result = await getCustomer(EXISTING_DOCUMENT);

    expect(result).toMatchObject({
      found: true,
      customer: { lastName: '', email: '', phone: '' },
    });
  });

  it('accepts a passport-like identification stored in the CRM', async () => {
    server.use(
      http.get(`${API_URL}/clients/:identification`, () =>
        success({ ...CLIENT_FIXTURE, INDNumeroIdentificacion: 'AB-123456' }),
      ),
    );

    await expect(getCustomer('AB-123456')).resolves.toMatchObject({ found: true });
  });

  it('resolves { found: false } on CLIENT_NOT_FOUND', async () => {
    await expect(getCustomer('9999999999')).resolves.toEqual({ found: false });
  });

  it('sends the identification URL-encoded', async () => {
    let requestedPath = '';
    server.use(
      http.get(`${API_URL}/clients/:identification`, ({ request }) => {
        requestedPath = new URL(request.url).pathname;
        return failure(404, 'CLIENT_NOT_FOUND');
      }),
    );

    await getCustomer('A/B');

    expect(requestedPath).toBe('/v1/clients/A%2FB');
  });

  it('rejects with the backend error code on other failures', async () => {
    server.use(
      http.get(`${API_URL}/clients/:identification`, () => failure(500, 'CREATIO_UNAVAILABLE')),
    );

    const error = await rejectionOf(getCustomer(EXISTING_DOCUMENT));

    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ code: 'CREATIO_UNAVAILABLE', status: 500 });
  });

  it('does not treat a 404 with another code as "not found"', async () => {
    server.use(http.get(`${API_URL}/clients/:identification`, () => failure(404, 'NOT_FOUND')));

    await expect(getCustomer(EXISTING_DOCUMENT)).rejects.toMatchObject({ code: 'NOT_FOUND' });
  });

  it('rejects with INVALID_RESPONSE when the body does not match the contract', async () => {
    server.use(http.get(`${API_URL}/clients/:identification`, () => success({ Id: 'only-an-id' })));

    await expect(getCustomer(EXISTING_DOCUMENT)).rejects.toMatchObject({
      code: 'INVALID_RESPONSE',
    });
  });

  it('rejects with NETWORK_ERROR when the server cannot be reached', async () => {
    server.use(http.get(`${API_URL}/clients/:identification`, () => HttpResponse.error()));

    await expect(getCustomer(EXISTING_DOCUMENT)).rejects.toMatchObject({ code: 'NETWORK_ERROR' });
  });

  it('rejects with an AbortError when the request is cancelled', async () => {
    const controller = new AbortController();
    const pending = getCustomer(EXISTING_DOCUMENT, controller.signal);
    controller.abort();

    await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
  });
});
