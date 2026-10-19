import { describe, expect, it } from 'vitest';

import { INVOICE_MAX_SIZE_BYTES } from '../constants';

import { documentNumberSchema, identificationFormSchema } from './customer.schema';
import { invoiceFileSchema } from './invoice.schema';
import { serialNumberSchema } from './product.schema';

describe('documentNumberSchema (mirrors the backend rules)', () => {
  it.each(['0102345678', '0102345678001', 'AB-12345', '12345', '12345678901234567890'])(
    'accepts %s',
    (value) => {
      expect(documentNumberSchema.safeParse(value).success).toBe(true);
    },
  );

  it.each(['', '1234', '123456789012345678901', '0102 34567', 'AB_12345', 'AB.12345'])(
    'rejects "%s"',
    (value) => {
      expect(documentNumberSchema.safeParse(value).success).toBe(false);
    },
  );
});

describe('serialNumberSchema (mirrors the backend rules)', () => {
  it.each(['90002756', '6500304730294', 'I01000875100690125', ' 90002756 '])(
    'accepts %s',
    (value) => {
      expect(serialNumberSchema.safeParse(value).success).toBe(true);
    },
  );

  it.each(['', '   ', 'IND 4471', 'A'.repeat(19), 'AB/12', 'RI-580'])('rejects "%s"', (value) => {
    expect(serialNumberSchema.safeParse(value).success).toBe(false);
  });
});

describe('identificationFormSchema (País/Provincia/Ciudad)', () => {
  const base = {
    documentNumber: '0102345678',
    firstName: 'María',
    lastName: 'Sánchez',
    email: 'maria@correo.com',
    phone: '+593 99 123 4567',
    acceptedPrivacy: true,
    acceptedTerms: true,
  };

  it('requires countryId/provinceId/cityId for a new customer', () => {
    const result = identificationFormSchema.safeParse({
      ...base,
      isExistingCustomer: false,
      countryId: '',
      provinceId: '',
      cityId: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join('.'));
      expect(paths).toEqual(expect.arrayContaining(['countryId', 'provinceId', 'cityId']));
    }
  });

  it('accepts a new customer once all three are set', () => {
    const result = identificationFormSchema.safeParse({
      ...base,
      isExistingCustomer: false,
      countryId: 'country-ec',
      provinceId: 'province-ec-azuay',
      cityId: 'city-ec-azuay-cuenca',
    });

    expect(result.success).toBe(true);
  });

  it('does not require them for an existing customer', () => {
    const result = identificationFormSchema.safeParse({
      ...base,
      isExistingCustomer: true,
      countryId: '',
      provinceId: '',
      cityId: '',
    });

    expect(result.success).toBe(true);
  });

  it('does not validate any data of an existing customer: it is read-only', () => {
    const result = identificationFormSchema.safeParse({
      ...base,
      lastName: '',
      email: '',
      phone: '',
      isExistingCustomer: true,
      countryId: '',
      provinceId: '',
      cityId: '',
    });

    expect(result.success).toBe(true);
  });

  it('still requires the consents from an existing customer', () => {
    const result = identificationFormSchema.safeParse({
      ...base,
      isExistingCustomer: true,
      countryId: '',
      provinceId: '',
      cityId: '',
      acceptedTerms: false,
    });

    expect(result.success).toBe(false);
  });
});

describe('invoiceFileSchema', () => {
  const file = (name: string, type: string, size = 10) =>
    new File([new Uint8Array(size)], name, { type });

  it.each([
    ['invoice.jpg', 'image/jpeg'],
    ['invoice.png', 'image/png'],
    ['invoice.webp', 'image/webp'],
    ['invoice.pdf', 'application/pdf'],
  ])('accepts %s', (name, type) => {
    expect(invoiceFileSchema.safeParse(file(name, type)).success).toBe(true);
  });

  it('rejects unsupported types', () => {
    expect(invoiceFileSchema.safeParse(file('notes.txt', 'text/plain')).success).toBe(false);
  });

  it('rejects empty files', () => {
    expect(invoiceFileSchema.safeParse(file('invoice.pdf', 'application/pdf', 0)).success).toBe(
      false,
    );
  });

  it('rejects files over 10 MB but accepts exactly 10 MB', () => {
    const atLimit = file('a.pdf', 'application/pdf', INVOICE_MAX_SIZE_BYTES);
    const overLimit = file('b.pdf', 'application/pdf', INVOICE_MAX_SIZE_BYTES + 1);
    expect(invoiceFileSchema.safeParse(atLimit).success).toBe(true);
    expect(invoiceFileSchema.safeParse(overLimit).success).toBe(false);
  });
});
