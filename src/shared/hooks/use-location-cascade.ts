import { getCityByProvince } from '@/shared/lookups/cities';
import { COUNTRIES } from '@/shared/lookups/countries';
import { getProvinceByCountry } from '@/shared/lookups/provinces';

/** Dependent field that must be cleared when its parent selection changes. */
export type LocationDependentField = 'provinceId' | 'cityId';

interface UseLocationCascadeOptions {
  /** Selected country; the provinces offered depend on it. */
  countryId: string;
  /** Selected province; the cities offered depend on it. */
  provinceId: string;
  /** Called for each dependent field invalidated by a new selection, so the form can clear it. */
  onReset: (field: LocationDependentField) => void;
}

/**
 * País -> Provincia -> Ciudad cascade: picking a country resets and enables the province select,
 * picking a province resets and enables the city select.
 *
 * The selection lives in the form, not here: the options are derived from it, so a form restored
 * with a location already picked shows it right away.
 */
export function useLocationCascade({ countryId, provinceId, onReset }: UseLocationCascadeOptions) {
  const selectCountry = () => {
    onReset('provinceId');
    onReset('cityId');
  };

  const selectProvince = () => {
    onReset('cityId');
  };

  return {
    countries: COUNTRIES,
    provinces: countryId ? getProvinceByCountry(countryId) : [],
    cities: provinceId ? getCityByProvince(provinceId) : [],
    isProvinceEnabled: countryId !== '',
    isCityEnabled: provinceId !== '',
    selectCountry,
    selectProvince,
  };
}
