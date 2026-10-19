import { describe, expect, it } from 'vitest';

import { canAccessStep, findStepByPath, getFirstIncompleteStep } from './steps';
import { INITIAL_WARRANTY_FLOW_STATE, type WarrantyFlowState } from './warranty-flow-reducer';

const product = { id: 'product-1', code: '90002756', name: 'Heladera', serialNumber: 'SN123' };
const invoice = {
  purchaseDate: '2026-07-14',
  receiptNumber: '001-002-000032451',
  issuer: 'Marcimex S.A.',
  file: new File(['invoice'], 'factura.pdf', { type: 'application/pdf' }),
};
const identified = {
  customer: {
    id: 'client-1',
    documentNumber: '0102345678',
    firstName: 'María Fernanda',
    lastName: 'Sánchez Ordóñez',
    email: 'mf.sanchez@correo.com',
    phone: '+593 99 123 4567',
    countryId: 'country-ec',
    provinceId: 'province-ec-azuay',
    cityId: 'city-ec-azuay-cuenca',
    acceptedPrivacy: true,
    acceptedTerms: true,
  },
  isExisting: true,
};

function stateWith(overrides: Partial<WarrantyFlowState>): WarrantyFlowState {
  return { ...INITIAL_WARRANTY_FLOW_STATE, ...overrides };
}

describe('getFirstIncompleteStep', () => {
  it('starts at identification', () => {
    expect(getFirstIncompleteStep(INITIAL_WARRANTY_FLOW_STATE).id).toBe('identification');
  });

  it('moves forward as each step is completed', () => {
    expect(getFirstIncompleteStep(stateWith({ customer: identified })).id).toBe('product');
    expect(getFirstIncompleteStep(stateWith({ customer: identified, product })).id).toBe('invoice');
    expect(getFirstIncompleteStep(stateWith({ customer: identified, product, invoice })).id).toBe(
      'confirmation',
    );
  });

  it.each(['purchaseDate', 'receiptNumber', 'issuer'] as const)(
    'keeps the invoice step incomplete when %s could not be read',
    (field) => {
      const state = stateWith({
        customer: identified,
        product,
        invoice: { ...invoice, [field]: null },
      });
      expect(getFirstIncompleteStep(state).id).toBe('invoice');
    },
  );
});

describe('canAccessStep', () => {
  it('blocks steps whose previous steps are incomplete', () => {
    expect(canAccessStep(INITIAL_WARRANTY_FLOW_STATE, 'identification')).toBe(true);
    expect(canAccessStep(INITIAL_WARRANTY_FLOW_STATE, 'product')).toBe(false);
    expect(canAccessStep(INITIAL_WARRANTY_FLOW_STATE, 'confirmation')).toBe(false);
  });

  it('lets the user go back to any completed step', () => {
    const state = stateWith({ customer: identified, product });
    expect(canAccessStep(state, 'identification')).toBe(true);
    expect(canAccessStep(state, 'product')).toBe(true);
    expect(canAccessStep(state, 'invoice')).toBe(true);
    expect(canAccessStep(state, 'confirmation')).toBe(false);
  });

  it('only allows the confirmation once the warranty is activated', () => {
    const state = stateWith({
      customer: identified,
      product,
      invoice,
      activation: { warrantyId: 'warranty-1' },
    });
    expect(canAccessStep(state, 'confirmation')).toBe(true);
    expect(canAccessStep(state, 'identification')).toBe(false);
  });
});

describe('findStepByPath', () => {
  it('finds a step by its path, ignoring a trailing slash', () => {
    expect(findStepByPath('/garantia/producto')?.id).toBe('product');
    expect(findStepByPath('/garantia/producto/')?.id).toBe('product');
  });

  it('returns undefined for paths outside the flow', () => {
    expect(findStepByPath('/garantia')).toBeUndefined();
    expect(findStepByPath('/')).toBeUndefined();
  });
});
