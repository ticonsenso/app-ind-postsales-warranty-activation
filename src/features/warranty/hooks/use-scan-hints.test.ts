import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { FrameRead } from '@/shared/hooks/use-barcode-scan';

import { useScanHints } from './use-scan-hints';

const readNow = (status: FrameRead['status']): FrameRead => ({ status, at: Date.now() });

function renderHints(enabled = true) {
  return renderHook(({ lastRead }) => useScanHints({ enabled, lastRead }), {
    initialProps: { lastRead: null as FrameRead | null },
  });
}

function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

describe('useScanHints', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts by asking to aim at the serial', () => {
    const { result } = renderHints();

    expect(result.current).toEqual({ hint: 'aim', canTypeInstead: false });
  });

  it('points out the model code while only that code keeps being read', () => {
    const { result, rerender } = renderHints();

    for (let frameNumber = 0; frameNumber < 8; frameNumber++) {
      rerender({ lastRead: readNow('no-serial') });
      advance(250);
    }

    expect(result.current.hint).toBe('model-code');
  });

  it('does not flicker over a single frame that caught the model code', () => {
    const { result, rerender } = renderHints();

    rerender({ lastRead: readNow('no-serial') });
    advance(3000);

    expect(result.current.hint).toBe('aim');
  });

  it('asks to move closer after a few seconds without reading any code', () => {
    const { result } = renderHints();

    advance(4500);
    expect(result.current.hint).toBe('aim');
    advance(2000);

    expect(result.current.hint).toBe('move-closer');
  });

  it('keeps asking to aim while codes are being read', () => {
    const { result, rerender } = renderHints();

    for (let second = 0; second < 8; second++) {
      rerender({ lastRead: readNow('found') });
      advance(1000);
    }

    expect(result.current.hint).toBe('aim');
  });

  it('offers typing the serial after a long scan', () => {
    const { result } = renderHints();

    advance(14_500);
    expect(result.current.canTypeInstead).toBe(false);
    advance(1000);

    expect(result.current.canTypeInstead).toBe(true);
  });

  it('shows nothing and runs no timer when turned off', () => {
    const { result } = renderHints(false);

    expect(vi.getTimerCount()).toBe(0);
    advance(20_000);

    expect(result.current).toEqual({ hint: null, canTypeInstead: false });
  });
});
