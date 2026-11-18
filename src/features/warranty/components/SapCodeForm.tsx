import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Alert } from '@/shared/components/Alert';
import { TextField } from '@/shared/components/TextField';

import { GENERIC_ERROR_MESSAGE } from '../constants';
import type { SapCodeLookupState } from '../hooks/use-sap-code-lookup';
import { sapCodeFormSchema, type SapCodeFormValues } from '../schemas/product.schema';

interface SapCodeFormProps {
  /** Form id, so a submit button outside the form (the step's action row) can send it. */
  id: string;
  /** Serial SAP did not recognize, shown so the user knows why the code is asked. */
  serialNumber: string;
  /** State of the lookup, to show its outcome. */
  lookupState: SapCodeLookupState;
  /** Called with the validated SAP code; the parent runs the lookup. */
  onSubmit: (sapCode: string) => void;
}

/**
 * Fallback shown when the serial is not found: collects the SAP code of the product.
 * It has no buttons of its own; the step's "Validar producto" submits it through `id`.
 */
export function SapCodeForm({ id, serialNumber, lookupState, onSubmit }: SapCodeFormProps) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<SapCodeFormValues>({
    resolver: zodResolver(sapCodeFormSchema),
    mode: 'onTouched',
    defaultValues: { sapCode: '' },
  });

  // The user just chose to search by SAP code: the field is ready to type.
  useEffect(() => {
    setFocus('sapCode');
  }, [setFocus]);

  const isNotFound = lookupState.status === 'not-found';

  return (
    <form
      id={id}
      noValidate
      aria-label="Buscar por código SAP"
      onSubmit={(event) => {
        void handleSubmit(({ sapCode }) => onSubmit(sapCode))(event);
      }}
    >
      <TextField
        label="Código SAP"
        hint={`No identificamos el número de serie ${serialNumber}. Ingresa el código SAP del producto.`}
        placeholder="Ej.: 90002756"
        autoComplete="off"
        error={errors.sapCode?.message}
        aria-invalid={isNotFound || errors.sapCode ? true : undefined}
        {...register('sapCode')}
      />

      {isNotFound && <Alert tone="error">No encontramos un producto con ese código SAP.</Alert>}
      {lookupState.status === 'error' && <Alert tone="error">{GENERIC_ERROR_MESSAGE}</Alert>}
    </form>
  );
}
