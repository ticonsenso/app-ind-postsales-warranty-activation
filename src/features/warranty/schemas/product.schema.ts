import { z } from 'zod';

import { SERIAL_NUMBER_MAX_LENGTH, SERIAL_NUMBER_PATTERN } from '../constants';

/** Product as the front handles it. The backend only returns what the CRM has: no image or specs. */
export interface Product {
  /** Identifier of the product in the CRM. */
  id: string;
  code: string;
  name: string;
  /** Serial of the unit being registered, as typed or scanned. */
  serialNumber: string;
}

export const serialNumberSchema = z
  .string()
  .trim()
  .min(1, 'Ingresa el número de serie.')
  .max(SERIAL_NUMBER_MAX_LENGTH, 'El número de serie puede tener hasta 18 caracteres.')
  .regex(SERIAL_NUMBER_PATTERN, 'El número de serie solo puede tener letras y números.');

/** Step 2 form: the product is identified by the serial number of the unit. */
export const serialNumberFormSchema = z.object({ serialNumber: serialNumberSchema });
export type SerialNumberFormValues = z.infer<typeof serialNumberFormSchema>;
