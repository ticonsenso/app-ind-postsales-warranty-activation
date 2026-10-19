import { parseApiData } from '@/shared/api/api-response';
import { httpClient, IDEMPOTENCY_KEY_HEADER } from '@/shared/api/http-client';

import { INVOICE_FIELD_NAME } from '../../constants';
import type { Activation, ActivationRequest } from '../../schemas/activation.schema';
import { isNewCustomer, type Customer } from '../../schemas/customer.schema';

import {
  warrantyDtoSchema,
  type NewClientBody,
  type RegisterWarrantyBody,
} from './warranties-dto.schema';

/** The backend may create the account and the record, and uploads the invoice, in the same request. */
const REGISTER_WARRANTY_TIMEOUT_MS = 60_000;

function toNewClientBody(customer: Customer): NewClientBody {
  return {
    Name: customer.firstName,
    INDApellido: customer.lastName,
    Phone: customer.phone,
    INDCorreo: customer.email,
    INDNumeroIdentificacion: customer.documentNumber,
    CountryId: customer.countryId,
    RegionId: customer.provinceId,
    CityId: customer.cityId,
  };
}

function toRegisterWarrantyBody({
  customer,
  product,
  invoice,
}: ActivationRequest): RegisterWarrantyBody {
  return {
    ...(isNewCustomer(customer)
      ? { newClient: toNewClientBody(customer) }
      : { clientId: customer.id }),
    INDPP: customer.acceptedPrivacy,
    INDTyC: customer.acceptedTerms,
    productId: product.id,
    serialNumber: product.serialNumber,
    invoiceNumber: invoice.receiptNumber,
    purchaseDate: invoice.purchaseDate,
    storeName: invoice.issuer,
  };
}

/** Multipart has no nesting: `newClient` goes as `newClient[Name]`, ... and booleans as text. */
function toFormData(fields: RegisterWarrantyBody, file: File): FormData {
  const body = new FormData();
  for (const [name, value] of Object.entries(fields)) {
    if (typeof value === 'object') {
      for (const [nested, nestedValue] of Object.entries<string>(value)) {
        body.append(`${name}[${nested}]`, nestedValue);
      }
    } else {
      body.append(name, String(value));
    }
  }
  body.append(INVOICE_FIELD_NAME, file);
  return body;
}

/**
 * Registers the warranty in the CRM with its invoice attached (`POST /v1/warranties`, multipart).
 * A new customer is registered in the same request; an existing one is referenced by `Id`.
 * Idempotent: retrying with the same key returns the warranty already created instead of a duplicate.
 *
 * @param request - Customer, product and invoice collected across the steps
 * @param idempotencyKey - UUID v4 that identifies this attempt (it becomes the warranty's `Id`, and
 *   the account's `Id` of a new customer)
 * @param signal - Cancels the request
 * @returns The registered warranty
 * @throws {ApiError} `PURCHASE_DATE_IN_FUTURE` when the purchase date is after today,
 *   `CLIENT_ALREADY_EXISTS` when a new customer's identification was registered in the meantime,
 *   or any other failure
 * @author Esteban
 * @since 2026-10-01
 */
export async function createWarranty(
  request: ActivationRequest,
  idempotencyKey: string,
  signal?: AbortSignal,
): Promise<Activation> {
  const response = await httpClient.post<unknown>(
    '/warranties',
    toFormData(toRegisterWarrantyBody(request), request.invoice.file),
    {
      signal,
      timeout: REGISTER_WARRANTY_TIMEOUT_MS,
      headers: { [IDEMPOTENCY_KEY_HEADER]: idempotencyKey },
    },
  );
  return parseApiData(warrantyDtoSchema, response.data);
}
