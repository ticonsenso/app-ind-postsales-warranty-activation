import { fireEvent, render, screen } from '@testing-library/react';
import { http } from 'msw';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { API_URL, EXISTING_PRODUCT_CODE, failure } from '@/test/msw/handlers';
import { server } from '@/test/msw/server';

import { WarrantyFlowProvider } from '../state/WarrantyFlowProvider';

import { ProductStep } from './ProductStep';

const UNKNOWN_SERIAL = 'E70250597013871225';

function renderStep() {
  render(
    <MemoryRouter>
      <WarrantyFlowProvider>
        <ProductStep />
      </WarrantyFlowProvider>
    </MemoryRouter>,
  );
}

const validate = () => fireEvent.click(screen.getByRole('button', { name: 'Validar producto' }));

/** Types a serial SAP does not know and waits for the "not found" notice. */
async function searchUnknownSerial() {
  fireEvent.change(screen.getByLabelText('Número de serie'), {
    target: { value: UNKNOWN_SERIAL },
  });
  validate();
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'No encontramos un producto con ese número de serie.',
  );
}

async function switchToSapCode() {
  await searchUnknownSerial();
  fireEvent.click(screen.getByRole('button', { name: 'Buscar por código SAP' }));
}

describe('ProductStep, SAP code fallback', () => {
  it('offers the SAP code search only after the serial is not found', async () => {
    renderStep();
    expect(screen.queryByRole('button', { name: 'Buscar por código SAP' })).not.toBeInTheDocument();

    await searchUnknownSerial();

    expect(screen.getByRole('button', { name: 'Buscar por código SAP' })).toBeInTheDocument();
  });

  it('swaps the serial input for the SAP code input', async () => {
    renderStep();
    await switchToSapCode();

    expect(screen.queryByLabelText('Número de serie')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Abrir la cámara' })).not.toBeInTheDocument();
    expect(screen.getByLabelText('Código SAP')).toBeInTheDocument();
  });

  it('identifies the product by its SAP code with "Validar producto"', async () => {
    renderStep();
    await switchToSapCode();

    fireEvent.change(screen.getByLabelText('Código SAP'), {
      target: { value: EXISTING_PRODUCT_CODE },
    });
    validate();

    expect(await screen.findByText('Producto identificado.')).toBeInTheDocument();
    // The serial was not recognized, so the card shows the SAP code that identified the product.
    expect(screen.getByText(`SAP ${EXISTING_PRODUCT_CODE}`)).toBeInTheDocument();
    expect(screen.queryByText(`Serie ${UNKNOWN_SERIAL}`)).not.toBeInTheDocument();
  });

  it('says no product has that SAP code when the backend does not find it', async () => {
    renderStep();
    await switchToSapCode();

    fireEvent.change(screen.getByLabelText('Código SAP'), { target: { value: '00000000' } });
    validate();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No encontramos un producto con ese código SAP.',
    );
  });

  it('shows the generic error when the SAP code lookup fails', async () => {
    server.use(
      http.get(`${API_URL}/products/code/:code`, () => failure(500, 'CREATIO_UNAVAILABLE')),
    );
    renderStep();
    await switchToSapCode();

    fireEvent.change(screen.getByLabelText('Código SAP'), {
      target: { value: EXISTING_PRODUCT_CODE },
    });
    validate();

    expect(await screen.findByRole('alert')).not.toHaveTextContent('código SAP');
  });

  it('asks for the SAP code before calling the backend', async () => {
    renderStep();
    await switchToSapCode();

    validate();

    expect(await screen.findByText('Ingresa el código SAP.')).toBeInTheDocument();
  });

  it('goes back to the serial input, keeping the typed serial, with "Atrás"', async () => {
    renderStep();
    await switchToSapCode();

    fireEvent.click(screen.getByRole('button', { name: 'Atrás' }));

    expect(screen.getByLabelText('Número de serie')).toHaveValue(UNKNOWN_SERIAL);
    expect(screen.queryByLabelText('Código SAP')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buscar por código SAP' })).toBeInTheDocument();
  });
});
