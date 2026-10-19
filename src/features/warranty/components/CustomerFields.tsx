import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Alert } from '@/shared/components/Alert';
import { TextField } from '@/shared/components/TextField';

import type { IdentificationFormValues } from '../schemas/customer.schema';

interface CustomerFieldsProps {
  /**
   * `existing`: customer found in the CRM; their data is shown read-only, even what is empty.
   * `new`: everything is filled in by the user.
   */
  variant: 'existing' | 'new';
  register: UseFormRegister<IdentificationFormValues>;
  errors: FieldErrors<IdentificationFormValues>;
}

/** Name and contact fields of step 1. */
export function CustomerFields({ variant, register, errors }: CustomerFieldsProps) {
  const readOnly = variant === 'existing';

  return (
    <div className="mt-6">
      {variant === 'existing' ? (
        <Alert tone="success">Cliente encontrado.</Alert>
      ) : (
        <Alert tone="info">
          No encontramos este documento. Completa tus datos para crear tu registro.
        </Alert>
      )}

      <div className="grid gap-x-4 sm:grid-cols-2">
        <TextField
          label="Nombre"
          placeholder="Tu nombre"
          autoComplete="given-name"
          readOnly={readOnly}
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <TextField
          label="Apellido"
          placeholder="Tu apellido"
          autoComplete="family-name"
          readOnly={readOnly}
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>
      <div className="grid gap-x-4 sm:grid-cols-2">
        <TextField
          label="Correo electrónico"
          type="email"
          placeholder="nombre@correo.com"
          autoComplete="email"
          readOnly={readOnly}
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          label="Teléfono"
          type="tel"
          placeholder="+593"
          autoComplete="tel"
          readOnly={readOnly}
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>
    </div>
  );
}
