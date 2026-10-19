import { z } from 'zod';

/** Registered warranty as the backend returns it (`WarrantyResponseDto`). */
export const warrantyDtoSchema = z.object({
  warrantyId: z.string(),
});

/**
 * Data of a new customer (`NewClientDto`), registered together with the warranty. The names are
 * the Creatio account columns; the consents travel apart and the origin is set by the backend.
 */
export type NewClientBody = {
  Name: string;
  INDApellido: string;
  Phone: string;
  INDCorreo: string;
  INDNumeroIdentificacion: string;
  CountryId: string;
  RegionId: string;
  CityId: string;
};

/**
 * Text fields of `POST /v1/warranties` (`RegisterWarrantyRequestDto`); the file travels apart.
 * The customer is either `clientId` (already in the CRM) or `newClient`, never both.
 */
export type RegisterWarrantyBody = ({ clientId: string } | { newClient: NewClientBody }) & {
  INDPP: boolean;
  INDTyC: boolean;
  productId: string;
  serialNumber: string;
  invoiceNumber: string;
  /** `yyyy-MM-dd`. */
  purchaseDate: string;
  storeName: string;
};
