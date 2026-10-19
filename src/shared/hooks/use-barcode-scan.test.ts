import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  readSerialNumberFromFrame,
  type SerialNumberReadResult,
} from '@/shared/barcode/indurama-serial-number';

import { useBarcodeScan } from './use-barcode-scan';

vi.mock('@/shared/barcode/indurama-serial-number', () => ({ readSerialNumberFromFrame: vi.fn() }));

const frame = { width: 4, height: 4, data: new Uint8ClampedArray(64) } as ImageData;
const found = (serialNumber: string): SerialNumberReadResult => ({ status: 'found', serialNumber });

function renderScan() {
  const onDetected = vi.fn();
  const onError = vi.fn();
  const hook = renderHook(() => useBarcodeScan({ onDetected, onError }));
  const readFrame = () => act(() => hook.result.current.handleFrame(frame));
  return { ...hook, onDetected, onError, readFrame };
}

describe('useBarcodeScan', () => {
  beforeEach(() => {
    vi.mocked(readSerialNumberFromFrame).mockReset();
  });

  it('accepts a serial once two frames in a row read it, and only once', async () => {
    vi.mocked(readSerialNumberFromFrame).mockResolvedValue(found('E01080086700730725'));
    const { onDetected, readFrame } = renderScan();

    await readFrame();
    expect(onDetected).not.toHaveBeenCalled();
    await readFrame();
    await readFrame();

    expect(onDetected).toHaveBeenCalledTimes(1);
    expect(onDetected).toHaveBeenCalledWith('E01080086700730725');
    expect(readSerialNumberFromFrame).toHaveBeenCalledTimes(2);
  });

  it('starts the confirmation over when a frame reads another serial', async () => {
    vi.mocked(readSerialNumberFromFrame)
      .mockResolvedValueOnce(found('I01000862100780725'))
      .mockResolvedValueOnce(found('E01080086700730725'))
      .mockResolvedValueOnce(found('I01000862100780725'))
      .mockResolvedValueOnce(found('I01000862100780725'));
    const { onDetected, readFrame } = renderScan();

    for (let frameNumber = 0; frameNumber < 3; frameNumber++) await readFrame();
    expect(onDetected).not.toHaveBeenCalled();
    await readFrame();

    expect(onDetected).toHaveBeenCalledWith('I01000862100780725');
  });

  it('keeps the confirmation through frames that read no serial', async () => {
    // With alternating binarizers, often only one of them catches the code.
    vi.mocked(readSerialNumberFromFrame)
      .mockResolvedValueOnce(found('I01000862100780725'))
      .mockResolvedValueOnce({ status: 'no-barcode' })
      .mockResolvedValueOnce({ status: 'no-serial' })
      .mockResolvedValueOnce(found('I01000862100780725'));
    const { onDetected, readFrame } = renderScan();

    for (let frameNumber = 0; frameNumber < 4; frameNumber++) await readFrame();

    expect(onDetected).toHaveBeenCalledWith('I01000862100780725');
  });

  it('alternates the binarizer from one frame to the next', async () => {
    vi.mocked(readSerialNumberFromFrame).mockResolvedValue({ status: 'no-barcode' });
    const { readFrame } = renderScan();

    for (let frameNumber = 0; frameNumber < 3; frameNumber++) await readFrame();

    expect(
      vi.mocked(readSerialNumberFromFrame).mock.calls.map(([, binarizer]) => binarizer),
    ).toEqual(['LocalAverage', 'FixedThreshold', 'LocalAverage']);
  });

  it('exposes what the last frame caught', async () => {
    vi.mocked(readSerialNumberFromFrame).mockResolvedValue({ status: 'no-serial' });
    const { result, readFrame } = renderScan();

    expect(result.current.lastRead).toBeNull();
    await readFrame();

    expect(result.current.lastRead?.status).toBe('no-serial');
    expect(result.current.lastRead?.at).toBeTypeOf('number');
  });

  it('ignores a read that finishes after the scan unmounted', async () => {
    let finishRead: (result: SerialNumberReadResult) => void = () => undefined;
    vi.mocked(readSerialNumberFromFrame)
      .mockResolvedValueOnce(found('E01080086700730725'))
      .mockReturnValueOnce(
        new Promise((resolve) => {
          finishRead = resolve;
        }),
      );
    const { result, unmount, onDetected, readFrame } = renderScan();

    await readFrame();
    const pendingRead = result.current.handleFrame(frame);
    unmount();
    finishRead(found('E01080086700730725'));
    await pendingRead;

    expect(onDetected).not.toHaveBeenCalled();
  });

  it('reports a failing reader once and stops reading', async () => {
    vi.mocked(readSerialNumberFromFrame).mockRejectedValue(new Error('wasm failed'));
    const { onError, readFrame } = renderScan();

    await readFrame();
    await readFrame();

    expect(onError).toHaveBeenCalledTimes(1);
    expect(readSerialNumberFromFrame).toHaveBeenCalledTimes(1);
  });
});
