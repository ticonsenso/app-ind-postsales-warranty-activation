import { z } from 'zod';

import {
  SAP_CODE_MAX_LENGTH,
  SAP_CODE_PATTERN,
  SERIAL_NUMBER_MAX_LENGTH,
  SERIAL_NUMBER_PATTERN,
} from '../constants';

/** Product as the front handles it. The backend only returns what the CRM has: no image or specs. */
export interface Product {
  /** Identifier of the product in the CRM. */
  id: string;
  code: string;
  name: string;
  /** Serial of the unit being registered, as typed or scanned. */
  serialNumber: string;
  /**
   * How the product was found: by its serial, or by its SAP code when SAP did not know the serial.
   * In the latter case `serialNumber` is the unrecognized serial, so the UI shows `code` instead.
   */
  identifiedBy: 'serial' | 'sap-code';
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

/** Fallback form when SAP does not know the serial: the product is looked up by its SAP code. */
export const sapCodeFormSchema = z.object({
  sapCode: z
    .string()
    .trim()
    .min(1, 'Ingresa el código SAP.')
    .max(SAP_CODE_MAX_LENGTH, `El código SAP puede tener hasta ${SAP_CODE_MAX_LENGTH} caracteres.`)
    .regex(SAP_CODE_PATTERN, 'El código SAP solo puede tener letras y números.'),
});
export type SapCodeFormValues = z.infer<typeof sapCodeFormSchema>;
