import { isApiError } from '@/shared/api/api-error';
import { parseApiData } from '@/shared/api/api-response';
import { httpClient } from '@/shared/api/http-client';

import type { Customer, CustomerLookupResult } from '../../schemas/customer.schema';

import { clientDtoSchema, type ClientDto } from './clients-dto.schema';

const CLIENT_NOT_FOUND = 'CLIENT_NOT_FOUND';

function toCustomer(dto: ClientDto): Customer {
  return {
    id: dto.Id,
    documentNumber: dto.INDNumeroIdentificacion,
    firstName: dto.Name,
    lastName: dto.INDApellido ?? '',
    email: dto.INDCorreo ?? '',
    phone: dto.Phone ?? '',
    countryId: dto.CountryId ?? '',
    provinceId: dto.RegionId ?? '',
    cityId: dto.CityId ?? '',
    acceptedPrivacy: dto.INDPP,
    acceptedTerms: dto.INDTyC,
  };
}

/**
 * Looks up a customer by ID card, RUC or passport (`GET /v1/clients/:identification`).
 *
 * @param documentNumber - Identification to search
 * @param signal - Cancels the request
 * @returns The customer, or `{ found: false }` when the CRM has none (`CLIENT_NOT_FOUND`)
 * @throws {ApiError} For any other failure
 * @author Cristian Brito
 * @since 2026-09-21
 */
export async function getCustomer(
  documentNumber: string,
  signal?: AbortSignal,
): Promise<CustomerLookupResult> {
  try {
    const response = await httpClient.get<unknown>(
      `/clients/${encodeURIComponent(documentNumber)}`,
      {
        signal,
      },
    );
    return { found: true, customer: toCustomer(parseApiData(clientDtoSchema, response.data)) };
  } catch (error) {
    if (isApiError(error, CLIENT_NOT_FOUND)) return { found: false };
    throw error;
  }
}
