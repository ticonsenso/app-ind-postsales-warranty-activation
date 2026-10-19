import { http, HttpResponse } from 'msw';

import { env } from '@/config/env';

/** Base URL of the backend API, as the app sees it. */
export const API_URL = `${env.apiBaseUrl}/v1`;

/** Identification of the customer that exists in the fake CRM. */
export const EXISTING_DOCUMENT = '0102345678';
/** Code of the product that exists in the fake CRM. */
export const EXISTING_PRODUCT_CODE = '90002756';

export const CLIENT_FIXTURE = {
  Id: '5b0e4f0a-3f41-4c55-9a52-0a3f7d1d2b11',
  Name: 'María Fernanda',
  INDApellido: 'Sánchez Ordóñez',
  Phone: '+593 99 123 4567',
  INDCorreo: 'mf.sanchez@correo.com',
  INDNumeroIdentificacion: EXISTING_DOCUMENT,
  CountryId: null,
  RegionId: null,
  CityId: null,
  INDPP: false,
  INDTyC: false,
};

/** Invoice data as the backend reads it from a legible invoice. */
export const INVOICE_FIXTURE = {
  invoiceNumber: '001-002-000032451',
  issueDate: '2026-07-14',
  sellerName: 'Marcimex S.A.',
  buyerName: 'María Fernanda Sánchez Ordóñez',
  buyerIdentification: EXISTING_DOCUMENT,
  products: [{ description: 'Heladera', code: EXISTING_PRODUCT_CODE, quantity: 1 }],
  scoreImage: 0.9,
  scoreResult: 1,
};

/** Promotion as the backend returns it (Creatio column names). */
export const PROMOTION_FIXTURE = {
  Id: '5aeaf58d-bc0b-4ef6-9b09-c9d8695248e4',
  INDName: 'Lavadora 3KG',
  INDImageUrl: 'https://cdn.example.com/lavadora.png',
  INDTextoAlternativo: 'Lavadora de 3 kilos',
  INDLinkDestino: 'https://indurama.com/lavadora',
  INDOrden: 1,
  INDActivo: true,
  INDNuevaPestania: true,
  INDVigenciaDesde: null,
  INDVigenciaHasta: null,
};

/** Wraps a payload like the backend's `ResponseStructure` does on success. */
export function success<T>(data: T, statusCode = 200) {
  return HttpResponse.json(
    { data, message: 'Operación exitosa', error: null, statusCode },
    { status: statusCode },
  );
}

/** Builds a failed response like the backend's `AllExceptionsFilter` does. */
export function failure(
  statusCode: number,
  error: string,
  message = 'No se pudo procesar la solicitud.',
) {
  return HttpResponse.json({ data: null, message, error, statusCode }, { status: statusCode });
}

/** Default behaviour of the fake backend. Tests override single routes with `server.use(...)`. */
export const handlers = [
  http.get(`${API_URL}/promotions`, () => success([PROMOTION_FIXTURE])),

  http.get(`${API_URL}/clients/:identification`, ({ params }) =>
    params.identification === EXISTING_DOCUMENT
      ? success(CLIENT_FIXTURE)
      : failure(404, 'CLIENT_NOT_FOUND', 'El recurso solicitado no existe.'),
  ),

  http.get(`${API_URL}/products/serial/:serialNumber`, ({ params }) =>
    params.serialNumber === EXISTING_PRODUCT_CODE
      ? success({
          Id: '0c1d2e3f-0000-4000-8000-000000000001',
          Name: 'Heladera',
          Code: EXISTING_PRODUCT_CODE,
        })
      : failure(404, 'SERIAL_NOT_FOUND', 'El recurso solicitado no existe.'),
  ),

  http.post(`${API_URL}/warranties/invoice-extraction`, () => success(INVOICE_FIXTURE)),

  http.post(`${API_URL}/warranties`, ({ request }) =>
    success({ warrantyId: request.headers.get('idempotency-key') }, 201),
  ),
];
