import { z } from 'zod';

/**
 * Client as the backend defines it (`ClientResponseDto`). The names are the Creatio account
 * columns and must not be changed here: they are the contract.
 *
 * Lookup columns (País, Provincia, Ciudad) travel as the Creatio GUID with the `Id` suffix, as
 * OData v4 exposes them. `INDNumeroIdentificacion` is validated loosely on purpose: the CRM may hold
 * passports and legacy values that the input form would not accept.
 */
export const clientDtoSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  INDApellido: z.string().nullable(),
  Phone: z.string().nullable(),
  INDCorreo: z.string().nullable(),
  INDNumeroIdentificacion: z.string(),
  CountryId: z.string().nullable(),
  RegionId: z.string().nullable(),
  CityId: z.string().nullable(),
  INDPP: z.boolean(),
  INDTyC: z.boolean(),
});
export type ClientDto = z.infer<typeof clientDtoSchema>;
