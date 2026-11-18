import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Customer } from '../schemas/customer.schema';
import type { Product } from '../schemas/product.schema';

import { WarrantySummary } from './WarrantySummary';

const CUSTOMER: Customer = {
  id: '',
  documentNumber: '0102345678',
  firstName: 'María',
  lastName: 'Sánchez',
  email: 'maria@correo.com',
  phone: '',
  countryId: '',
  provinceId: '',
  cityId: '',
  acceptedPrivacy: true,
  acceptedTerms: true,
};

const PRODUCT: Product = {
  id: '0c1d2e3f-0000-4000-8000-000000000001',
  code: '90002756',
  name: 'Heladera',
  serialNumber: 'E70250597013871225',
  identifiedBy: 'serial',
};

function renderSummary(product: Product) {
  render(
    <WarrantySummary
      customer={CUSTOMER}
      product={product}
      invoice={{ purchaseDate: '2026-07-14', receiptNumber: '001-002-1', issuer: 'Marcimex' }}
      isActivating={false}
      onBack={() => undefined}
      onActivate={() => undefined}
    />,
  );
}

describe('WarrantySummary', () => {
  it('shows only the serial when the product was identified by it', () => {
    renderSummary(PRODUCT);

    expect(screen.getByText('E70250597013871225')).toBeInTheDocument();
    expect(screen.queryByText('Código SAP')).not.toBeInTheDocument();
  });

  it('also shows the SAP code when the product was found by it', () => {
    renderSummary({ ...PRODUCT, identifiedBy: 'sap-code' });

    expect(screen.getByText('Código SAP')).toBeInTheDocument();
    expect(screen.getByText('90002756')).toBeInTheDocument();
    expect(screen.getByText('E70250597013871225')).toBeInTheDocument();
  });
});
