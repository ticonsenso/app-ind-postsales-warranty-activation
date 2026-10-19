import { zodResolver } from '@hookform/resolvers/zod';
import type { FormEvent } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ROUTES } from '@/config/routes';
import { ActionRow } from '@/shared/components/ActionRow';
import { Alert } from '@/shared/components/Alert';
import { Button } from '@/shared/components/Button';
import { Panel, PanelHeader } from '@/shared/components/Panel';
import { TextField } from '@/shared/components/TextField';

import { GENERIC_ERROR_MESSAGE } from '../constants';
import { useCustomerLookup } from '../hooks/use-customer-lookup';
import { useWarrantyFlow } from '../hooks/use-warranty-flow';
import {
  identificationFormSchema,
  type Customer,
  type IdentificationFormValues,
} from '../schemas/customer.schema';
import type { IdentifiedCustomer } from '../state/warranty-flow-reducer';

import { ConsentCheckboxes } from './ConsentCheckboxes';
import { CustomerFields } from './CustomerFields';
import { LocationFields } from './LocationFields';

function toFormDefaults(identified: IdentifiedCustomer | null): IdentificationFormValues {
  return {
    documentNumber: identified?.customer.documentNumber ?? '',
    firstName: identified?.customer.firstName ?? '',
    lastName: identified?.customer.lastName ?? '',
    email: identified?.customer.email ?? '',
    phone: identified?.customer.phone ?? '',
    countryId: identified?.customer.countryId ?? '',
    provinceId: identified?.customer.provinceId ?? '',
    cityId: identified?.customer.cityId ?? '',
    isExistingCustomer: identified?.isExisting ?? false,
    acceptedPrivacy: identified !== null,
    acceptedTerms: identified !== null,
  };
}

/**
 * Step 1: identify the customer by document number and collect consents.
 *
 * Nothing is written to the CRM here: a new customer is registered together with the warranty in
 * the last step, and an existing one cannot change their data (only accept pending consents).
 */
export function IdentificationStep() {
  const navigate = useNavigate();
  const { state, dispatch } = useWarrantyFlow();
  const { state: lookupState, lookup, reset: resetLookup } = useCustomerLookup(state.customer);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm<IdentificationFormValues>({
    resolver: zodResolver(identificationFormSchema),
    mode: 'onTouched',
    defaultValues: toFormDefaults(state.customer),
  });
  const [acceptedPrivacy, acceptedTerms] = useWatch({
    control,
    name: ['acceptedPrivacy', 'acceptedTerms'],
  });

  const hasResult = lookupState.status === 'found' || lookupState.status === 'not-found';
  const existingCustomer = lookupState.status === 'found' ? lookupState.customer : null;

  const handleSearch = async () => {
    if (!(await trigger('documentNumber'))) return;

    const result = await lookup(getValues('documentNumber'));
    if (!result) return;

    // A known customer arrives prefilled; a new one starts from scratch.
    const known = result.found ? result.customer : null;
    setValue('firstName', known?.firstName ?? '');
    setValue('lastName', known?.lastName ?? '');
    setValue('email', known?.email ?? '');
    setValue('phone', known?.phone ?? '');
    setValue('countryId', known?.countryId ?? '');
    setValue('provinceId', known?.provinceId ?? '');
    setValue('cityId', known?.cityId ?? '');
    setValue('acceptedPrivacy', known?.acceptedPrivacy ?? false);
    setValue('acceptedTerms', known?.acceptedTerms ?? false);
    setValue('isExistingCustomer', result.found);
  };

  const handleValid = (values: IdentificationFormValues) => {
    // An existing customer keeps their CRM data as is; only the consents come from the form.
    const customer: Customer = existingCustomer
      ? {
          ...existingCustomer,
          acceptedPrivacy: values.acceptedPrivacy,
          acceptedTerms: values.acceptedTerms,
        }
      : {
          id: '',
          documentNumber: values.documentNumber,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          countryId: values.countryId,
          provinceId: values.provinceId,
          cityId: values.cityId,
          acceptedPrivacy: values.acceptedPrivacy,
          acceptedTerms: values.acceptedTerms,
        };

    dispatch({
      type: 'customer-identified',
      identified: { customer, isExisting: existingCustomer !== null },
    });
    void navigate(ROUTES.warranty.product);
  };

  // Pressing Enter in the document field searches; once there is a result it submits the form.
  const handleSubmitEvent = (event: FormEvent<HTMLFormElement>) => {
    if (!hasResult) {
      event.preventDefault();
      void handleSearch();
      return;
    }
    void handleSubmit(handleValid)(event);
  };

  return (
    <Panel>
      <PanelHeader
        title="Empecemos por ti"
        description="Ingresa tu documento de identidad. Si eres cliente de Indurama, completaremos tus datos automáticamente."
      />

      <form noValidate onSubmit={handleSubmitEvent}>
        <TextField
          label="Cédula o RUC"
          hint="Lo usamos solo para asociar la garantía a tu nombre."
          autoComplete="off"
          error={errors.documentNumber?.message}
          {...register('documentNumber', {
            // The previous result belongs to the previous document.
            onChange: () => {
              if (lookupState.status !== 'idle') resetLookup();
            },
          })}
        />

        <Button
          variant="secondary"
          size="sm"
          onClick={() => void handleSearch()}
          loading={lookupState.status === 'loading'}
        >
          {hasResult ? 'Buscar de nuevo' : 'Buscar mis datos'}
        </Button>

        {lookupState.status === 'error' && (
          <Alert tone="error" className="mt-6">
            {GENERIC_ERROR_MESSAGE}
          </Alert>
        )}

        {hasResult && (
          <>
            <CustomerFields
              variant={existingCustomer ? 'existing' : 'new'}
              register={register}
              errors={errors}
            />
            <LocationFields
              variant={existingCustomer ? 'existing' : 'new'}
              existingCustomer={existingCustomer}
              control={control}
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <ConsentCheckboxes
              locked={existingCustomer ?? undefined}
              register={register}
              errors={errors}
            />

            <ActionRow>
              <Button type="submit" disabled={!acceptedPrivacy || !acceptedTerms}>
                Continuar
              </Button>
            </ActionRow>
          </>
        )}
      </form>
    </Panel>
  );
}
