import { describe, expect, it } from 'vitest';

import { getCityByProvince } from './cities';
import { COUNTRIES } from './countries';
import { getProvinceByCountry } from './provinces';

const ECUADOR_ID = '066dca30-20ae-422a-b387-ee6e6a2d5cf0';
const AZUAY_ID = 'e730c7da-f566-4198-b7b2-cbf5bf84dc17';

describe('COUNTRIES', () => {
  it('includes Ecuador with its ISO code', () => {
    expect(COUNTRIES).toContainEqual({ id: ECUADOR_ID, value: 'Ecuador', code: 'EC' });
  });
});

describe('getProvinceByCountry', () => {
  it('returns only the provinces of the given country', () => {
    const provinces = getProvinceByCountry(ECUADOR_ID);
    expect(provinces.map((province) => province.value)).toContain('Azuay');
    expect(provinces.every((province) => province.countryId === ECUADOR_ID)).toBe(true);
  });

  it('returns an empty array for an unknown country', () => {
    expect(getProvinceByCountry('country-does-not-exist')).toEqual([]);
  });
});

describe('getCityByProvince', () => {
  it('returns only the cities of the given province, sorted by name', () => {
    const cities = getCityByProvince(AZUAY_ID);
    const names = cities.map((city) => city.value);
    expect(names).toContain('CUENCA');
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, 'es')));
    expect(cities.every((city) => city.provinceId === AZUAY_ID)).toBe(true);
  });

  it('returns an empty array for an unknown province', () => {
    expect(getCityByProvince('province-does-not-exist')).toEqual([]);
  });
});
