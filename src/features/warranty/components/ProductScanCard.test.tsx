import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { readSerialNumberFromFrame } from '@/shared/barcode/indurama-serial-number';
import { mockCamera } from '@/test/camera';

import { ProductScanCard } from './ProductScanCard';

vi.mock('@/shared/barcode/indurama-serial-number', () => ({ readSerialNumberFromFrame: vi.fn() }));

const SERIAL = 'E01080086700730725';

function renderCard(showHints?: boolean) {
  const onSerialDetected = vi.fn();
  const onTypeInstead = vi.fn();
  render(
    <ProductScanCard
      showHints={showHints}
      onSerialDetected={onSerialDetected}
      onTypeInstead={onTypeInstead}
    />,
  );
  fireEvent.click(screen.getByRole('button', { name: 'Abrir la cámara' }));
  return { onSerialDetected, onTypeInstead };
}

describe('ProductScanCard', () => {
  beforeEach(() => {
    mockCamera();
    vi.mocked(readSerialNumberFromFrame).mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    Reflect.deleteProperty(navigator, 'mediaDevices');
  });

  it('guides the user by default', () => {
    vi.mocked(readSerialNumberFromFrame).mockResolvedValue({ status: 'no-barcode' });
    renderCard();

    const camera = screen.getByRole('dialog', { name: 'Escanear la etiqueta' });
    expect(within(camera).getByRole('status')).toHaveTextContent(/Apunta al código de barras/);
  });

  it('scans without any hint when hints are turned off', async () => {
    vi.mocked(readSerialNumberFromFrame).mockResolvedValue({
      status: 'found',
      serialNumber: SERIAL,
    });
    const { onSerialDetected } = renderCard(false);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    await waitFor(() => {
      expect(onSerialDetected).toHaveBeenCalledWith(SERIAL);
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('offers typing the serial after a long scan and closes the camera when chosen', async () => {
    vi.useFakeTimers();
    vi.mocked(readSerialNumberFromFrame).mockResolvedValue({ status: 'no-barcode' });
    const { onTypeInstead } = renderCard();

    expect(screen.queryByRole('button', { name: 'Escribirlo a mano' })).not.toBeInTheDocument();
    await act(() => vi.advanceTimersByTimeAsync(15_500));
    fireEvent.click(screen.getByRole('button', { name: 'Escribirlo a mano' }));

    expect(onTypeInstead).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
