import {
  Controller,
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';

import { Select } from '@/shared/components/Select';
import { TextField } from '@/shared/components/TextField';
import { useLocationCascade } from '@/shared/hooks/use-location-cascade';
import { getCityByProvince } from '@/shared/lookups/cities';
import { COUNTRIES } from '@/shared/lookups/countries';
import { getProvinceByCountry } from '@/shared/lookups/provinces';

import type { Customer, IdentificationFormValues } from '../schemas/customer.schema';

interface LocationFieldsProps {
  /** `existing`: location comes from the CRM and cannot be edited. `new`: the user picks it. */
  variant: 'existing' | 'new';
  /** CRM record for the `existing` variant, used only to resolve id -> label for display. */
  existingCustomer: Customer | null;
  control: Control<IdentificationFormValues>;
  register: UseFormRegister<IdentificationFormValues>;
  errors: FieldErrors<IdentificationFormValues>;
  setValue: UseFormSetValue<IdentificationFormValues>;
}

/** País/Provincia/Ciudad fields of step 1. */
export function LocationFields({
  variant,
  existingCustomer,
  control,
  register,
  errors,
  setValue,
}: LocationFieldsProps) {
  const [selectedCountryId, selectedProvinceId] = useWatch({
    control,
    name: ['countryId', 'provinceId'],
  });
  const cascade = useLocationCascade({
    countryId: selectedCountryId,
    provinceId: selectedProvinceId,
    onReset: (field) => setValue(field, ''),
  });

  if (variant === 'existing') {
    const { countryId = '', provinceId = '', cityId = '' } = existingCustomer ?? {};
    return (
      <div className="grid gap-x-4 sm:grid-cols-3">
        <TextField
          label="País"
          readOnly
          value={COUNTRIES.find((country) => country.id === countryId)?.value ?? '—'}
        />
        <TextField
          label="Provincia"
          readOnly
          value={
            getProvinceByCountry(countryId).find((province) => province.id === provinceId)?.value ??
            '—'
          }
        />
        <TextField
          label="Ciudad"
          readOnly
          value={getCityByProvince(provinceId).find((city) => city.id === cityId)?.value ?? '—'}
        />
        <input type="hidden" {...register('countryId')} />
        <input type="hidden" {...register('provinceId')} />
        <input type="hidden" {...register('cityId')} />
      </div>
    );
  }

  return (
    <div className="grid gap-x-4 sm:grid-cols-3">
      <Controller
        control={control}
        name="countryId"
        render={({ field }) => (
          <Select
            label="País"
            placeholder="Selecciona…"
            searchPlaceholder="Buscar país…"
            options={cascade.countries.map((country) => ({
              value: country.id,
              label: country.value,
            }))}
            error={errors.countryId?.message}
            name={field.name}
            value={field.value}
            ref={field.ref}
            onBlur={field.onBlur}
            onChange={(value) => {
              field.onChange(value);
              cascade.selectCountry();
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="provinceId"
        render={({ field }) => (
          <Select
            label="Provincia"
            placeholder={cascade.isProvinceEnabled ? 'Selecciona…' : 'Elige un país primero'}
            searchPlaceholder="Buscar provincia…"
            disabled={!cascade.isProvinceEnabled}
            options={cascade.provinces.map((province) => ({
              value: province.id,
              label: province.value,
            }))}
            error={errors.provinceId?.message}
            name={field.name}
            value={field.value}
            ref={field.ref}
            onBlur={field.onBlur}
            onChange={(value) => {
              field.onChange(value);
              cascade.selectProvince();
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="cityId"
        render={({ field }) => (
          <Select
            label="Ciudad"
            placeholder={cascade.isCityEnabled ? 'Selecciona…' : 'Elige una provincia primero'}
            searchPlaceholder="Buscar ciudad…"
            disabled={!cascade.isCityEnabled}
            options={cascade.cities.map((city) => ({ value: city.id, label: city.value }))}
            error={errors.cityId?.message}
            name={field.name}
            value={field.value}
            ref={field.ref}
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}
