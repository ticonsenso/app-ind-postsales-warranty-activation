import { z } from 'zod';

/** Promotion as the backend defines it (`PromotionResponseDto`): the Creatio column names are the contract. */
export const promotionDtoSchema = z.object({
  Id: z.string(),
  INDName: z.string(),
  INDImageUrl: z.string(),
  INDTextoAlternativo: z.string(),
  INDLinkDestino: z.string().nullable(),
  INDOrden: z.number(),
  INDActivo: z.boolean(),
  INDNuevaPestania: z.boolean(),
  INDVigenciaDesde: z.string().nullable(),
  INDVigenciaHasta: z.string().nullable(),
});
export type PromotionDto = z.infer<typeof promotionDtoSchema>;

/** `data` of `GET /v1/promotions`: the active, in-force promotions, already sorted. */
export const promotionsDtoSchema = z.array(promotionDtoSchema);
