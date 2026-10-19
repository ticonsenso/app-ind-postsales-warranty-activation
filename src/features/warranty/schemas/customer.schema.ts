import { z } from 'zod';

import {
  EMAIL_MAX_LENGTH,
  IDENTIFICATION_MAX_LENGTH,
  IDENTIFICATION_MIN_LENGTH,
  IDENTIFICATION_PATTERN,
  NAME_MAX_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
  PHONE_PATTERN,
} from '../constants';

/** Customer as the front handles it. The backend's Creatio column names are mapped at the service. */
export interface Customer {
  /**
   * Account `Id` in the CRM. Empty for a new customer: the backend creates the account together
   * with the warranty, in the last step.
   */
  id: string;
  /** ID card, RUC or passport. */
  documentNumber: string;
  firstName: string;
  /** Empty when the CRM has no last name for the customer. */
  lastName: string;
  /** Empty when the CRM has no email for the customer. */
  email: string;
  /** Empty when the CRM has no phone for the customer. */
  phone: string;
  /** Id into the local location catalog (see @/shared/lookups). Empty when unknown. */
  countryId: string;
  /** Id into the local location catalog. Empty when unknown. */
  provinceId: string;
  /** Id into the local location catalog. Empty when unknown. */
  cityId: string;
  /** Mirrors INDPP on the backend. */
  acceptedPrivacy: boolean;
  /** Mirrors INDTyC on the backend. */
  acceptedTerms: boolean;
}

export type CustomerLookupResult = { found: true; customer: Customer } | { found: false };

/** True when the customer is not in the CRM yet and must be registered with the warranty. */
export function isNewCustomer(customer: Customer): boolean {
  return customer.id === '';
}

export const documentNumberSchema = z
  .string()
  .trim()
  .min(1, 'Ingresa tu cédula o RUC.')
  .min(IDENTIFICATION_MIN_LENGTH, 'La identificación debe tener al menos 5 caracteres.')
  .max(IDENTIFICATION_MAX_LENGTH, 'La identificación puede tener hasta 20 caracteres.')
  .regex(IDENTIFICATION_PATTERN, 'La identificación solo puede tener letras, números y guiones.');

const requiredName = (message: string) =>
  z.string().trim().min(1, message).max(NAME_MAX_LENGTH, 'Puede tener hasta 100 caracteres.');

/** Rules for the data a new customer types in. An existing customer cannot edit any of it. */
const NEW_CUSTOMER_RULES = {
  firstName: requiredName('El nombre es obligatorio.'),
  lastName: requiredName('El apellido es obligatorio.'),
  email: z
    .string()
    .email('El correo electrónico no es válido.')
    .max(EMAIL_MAX_LENGTH, 'El correo electrónico es demasiado largo.'),
  phone: z
    .string()
    .min(PHONE_MIN_LENGTH, 'El teléfono debe tener al menos 7 caracteres.')
    .max(PHONE_MAX_LENGTH, 'El teléfono puede tener hasta 20 caracteres.')
    .regex(PHONE_PATTERN, 'El teléfono no es válido.'),
  countryId: z.string().min(1, 'Selecciona un país.'),
  provinceId: z.string().min(1, 'Selecciona una provincia.'),
  cityId: z.string().min(1, 'Selecciona una ciudad.'),
} as const;

const NEW_CUSTOMER_FIELDS = Object.keys(NEW_CUSTOMER_RULES) as (keyof typeof NEW_CUSTOMER_RULES)[];

/**
 * Step 1 form. Validation here is for UX only: the backend validates everything again.
 *
 * `isExistingCustomer` is internal to the form (never sent to the backend). An existing customer
 * sees their CRM data read-only, even the parts the CRM does not have, so only a new customer's
 * data is validated; both must accept the consents.
 */
export const identificationFormSchema = z
  .object({
    documentNumber: documentNumberSchema,
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    email: z.string().trim(),
    phone: z.string().trim(),
    countryId: z.string(),
    provinceId: z.string(),
    cityId: z.string(),
    isExistingCustomer: z.boolean(),
    acceptedPrivacy: z.boolean().refine((value) => value, {
      message: 'Debes aceptar la política de privacidad para continuar.',
    }),
    acceptedTerms: z.boolean().refine((value) => value, {
      message: 'Debes aceptar los términos y condiciones para continuar.',
    }),
  })
  .superRefine((values, ctx) => {
    if (values.isExistingCustomer) return;
    for (const field of NEW_CUSTOMER_FIELDS) {
      const result = NEW_CUSTOMER_RULES[field].safeParse(values[field]);
      if (!result.success) {
        ctx.addIssue({ code: 'custom', path: [field], message: result.error.issues[0]?.message });
      }
    }
  });
export type IdentificationFormValues = z.infer<typeof identificationFormSchema>;
