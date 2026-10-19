import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { EXTERNAL_LINKS } from '@/config/site';
import { AppLink } from '@/shared/components/AppLink';
import { Checkbox } from '@/shared/components/Checkbox';

import type { IdentificationFormValues } from '../schemas/customer.schema';

const LINK_CLASSES = 'font-semibold text-primary underline-offset-2 hover:underline';

/** Consents the CRM already has as accepted: they are shown checked and cannot be withdrawn. */
export interface AcceptedConsents {
  acceptedPrivacy: boolean;
  acceptedTerms: boolean;
}

interface ConsentCheckboxesProps {
  locked?: AcceptedConsents | undefined;
  register: UseFormRegister<IdentificationFormValues>;
  errors: FieldErrors<IdentificationFormValues>;
}

/** Legal consents required before the customer data is sent. The documents open in a new tab. */
export function ConsentCheckboxes({ locked, register, errors }: ConsentCheckboxesProps) {
  return (
    <div className="mt-2">
      <Checkbox
        label={
          <>
            Acepto la{' '}
            <AppLink href={EXTERNAL_LINKS.privacyPolicy} newTab className={LINK_CLASSES}>
              Política de privacidad
            </AppLink>{' '}
            y el tratamiento de mis datos personales.
          </>
        }
        disabled={locked?.acceptedPrivacy}
        error={errors.acceptedPrivacy?.message}
        {...register('acceptedPrivacy')}
      />
      <Checkbox
        label={
          <>
            Acepto los{' '}
            <AppLink href={EXTERNAL_LINKS.termsAndConditions} newTab className={LINK_CLASSES}>
              Términos y condiciones de uso
            </AppLink>{' '}
            del sitio.
          </>
        }
        disabled={locked?.acceptedTerms}
        error={errors.acceptedTerms?.message}
        {...register('acceptedTerms')}
      />
    </div>
  );
}
