import { z } from 'zod';

/** Product as the backend defines it (`ProductResponseDto`): the Creatio column names are the contract. */
export const productDtoSchema = z.object({
  Id: z.string(),
  Name: z.string(),
  Code: z.string(),
});
export type ProductDto = z.infer<typeof productDtoSchema>;
