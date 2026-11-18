import { isApiError } from '@/shared/api/api-error';
import { parseApiData } from '@/shared/api/api-response';
import { httpClient } from '@/shared/api/http-client';

import type { Product } from '../../schemas/product.schema';

import { productDtoSchema } from './products-dto.schema';

/** Codes with which the backend reports that the serial or its product does not exist. */
const NOT_FOUND_CODES = ['SERIAL_NOT_FOUND', 'PRODUCT_NOT_FOUND'];

/**
 * Looks up the product of a serial number (`GET /v1/products/serial/:serialNumber`).
 * The backend asks Creatio, which resolves the serial against SAP.
 *
 * @param serialNumber - Serial number of the unit
 * @param signal - Cancels the request
 * @returns The product, or `null` when SAP does not know the serial (`SERIAL_NOT_FOUND`) or its
 *   material is not a product in the CRM (`PRODUCT_NOT_FOUND`)
 * @throws {ApiError} For any other failure
 * @author Cristian Brito
 * @since 2026-09-21
 */
export async function getProductBySerialNumber(
  serialNumber: string,
  signal?: AbortSignal,
): Promise<Product | null> {
  try {
    const response = await httpClient.get<unknown>(
      `/products/serial/${encodeURIComponent(serialNumber)}`,
      { signal },
    );
    const dto = parseApiData(productDtoSchema, response.data);
    return { id: dto.Id, code: dto.Code, name: dto.Name, serialNumber, identifiedBy: 'serial' };
  } catch (error) {
    if (isApiError(error, ...NOT_FOUND_CODES)) return null;
    throw error;
  }
}

/** Code with which the backend reports that no CRM product has the given SAP code. */
const PRODUCT_NOT_FOUND_CODE = 'PRODUCT_NOT_FOUND';

/**
 * Looks up a product by its SAP code (`GET /v1/products/code/:code`), straight in the Creatio
 * `Product` table. Fallback for serials SAP does not know (e.g. imported products).
 *
 * @param sapCode - SAP code of the product (Creatio `Code` column)
 * @param serialNumber - Serial of the unit being registered; kept in the returned product
 * @param signal - Cancels the request
 * @returns The product, or `null` when no CRM product has that code (`PRODUCT_NOT_FOUND`)
 * @throws {ApiError} For any other failure
 * @author Cristian Brito
 * @since 2026-11-18
 */
export async function getProductBySapCode(
  sapCode: string,
  serialNumber: string,
  signal?: AbortSignal,
): Promise<Product | null> {
  try {
    const response = await httpClient.get<unknown>(
      `/products/code/${encodeURIComponent(sapCode)}`,
      { signal },
    );
    const dto = parseApiData(productDtoSchema, response.data);
    return { id: dto.Id, code: dto.Code, name: dto.Name, serialNumber, identifiedBy: 'sap-code' };
  } catch (error) {
    if (isApiError(error, PRODUCT_NOT_FOUND_CODE)) return null;
    throw error;
  }
}
