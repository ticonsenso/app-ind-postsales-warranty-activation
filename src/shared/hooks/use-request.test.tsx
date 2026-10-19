import { act, renderHook, waitFor } from '@testing-library/react';
import { StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ApiError } from '@/shared/api/api-error';
import { createAbortError } from '@/shared/utils/abort';

import { useRequest } from './use-request';

/** A request that settles only when the test says so, and rejects if its signal is aborted. */
function controllableRequest<T>() {
  let resolvePending: (value: T) => void = () => undefined;
  let lastSignal: AbortSignal | undefined;
  const request = (signal: AbortSignal) => {
    lastSignal = signal;
    return new Promise<T>((resolve, reject) => {
      resolvePending = resolve;
      signal.addEventListener('abort', () => {
        reject(createAbortError());
      });
    });
  };
  return {
    request,
    resolve: (value: T) => {
      resolvePending(value);
    },
    wasAborted: () => lastSignal?.aborted === true,
  };
}

describe('useRequest', () => {
  it('runs on mount and exposes the data on success', async () => {
    const request = vi.fn(() => Promise.resolve(['a']));

    const { result } = renderHook(() => useRequest(request));

    expect(result.current.status).toBe('loading');
    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });
    expect(result.current.data).toEqual(['a']);
    expect(result.current.error).toBeNull();
  });

  it('exposes an ApiError when the request fails', async () => {
    const request = vi.fn(() => Promise.reject(new ApiError('TIMEOUT', null, 'slow')));

    const { result } = renderHook(() => useRequest(request));

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });
    expect(result.current.error).toMatchObject({ code: 'TIMEOUT' });
  });

  it('wraps an unexpected failure as UNKNOWN_ERROR', async () => {
    const request = vi.fn(() => Promise.reject(new Error('boom')));

    const { result } = renderHook(() => useRequest(request));

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });
    expect(result.current.error).toMatchObject({ code: 'UNKNOWN_ERROR' });
  });

  it('does not run on mount with immediate: false and passes the arguments to execute', async () => {
    const request = vi.fn((_signal: AbortSignal, id: string) => Promise.resolve(`item-${id}`));

    const { result } = renderHook(() => useRequest(request, { immediate: false }));
    expect(result.current.status).toBe('idle');
    expect(request).not.toHaveBeenCalled();

    let outcome: string | null = null;
    await act(async () => {
      outcome = await result.current.execute('7');
    });

    expect(outcome).toBe('item-7');
    expect(result.current.data).toBe('item-7');
    expect(request).toHaveBeenCalledWith(expect.any(AbortSignal), '7');
  });

  it('resolves null from execute when the request fails', async () => {
    const request = vi.fn(() => Promise.reject(new ApiError('NETWORK_ERROR', null, 'down')));
    const { result } = renderHook(() => useRequest(request, { immediate: false }));

    let outcome: unknown = 'unset';
    await act(async () => {
      outcome = await result.current.execute();
    });

    expect(outcome).toBeNull();
    expect(result.current.status).toBe('error');
  });

  it('cancels the previous request when a new one starts and keeps only the latest result', async () => {
    const first = controllableRequest<string>();
    const second = controllableRequest<string>();
    const requests = [first.request, second.request];
    let call = 0;
    const { result } = renderHook(() =>
      useRequest(
        (signal: AbortSignal) =>
          requests[call++]?.(signal) ?? Promise.reject(new Error('unexpected call')),
        { immediate: false },
      ),
    );

    act(() => {
      void result.current.execute();
    });
    act(() => {
      void result.current.execute();
    });
    expect(first.wasAborted()).toBe(true);

    await act(async () => {
      second.resolve('latest');
      await Promise.resolve();
    });

    expect(result.current.data).toBe('latest');
    expect(result.current.status).toBe('success');
  });

  it('cancels the pending request on unmount', () => {
    const pending = controllableRequest<string>();

    const { unmount } = renderHook(() => useRequest(pending.request));
    unmount();

    expect(pending.wasAborted()).toBe(true);
  });

  it('survives StrictMode mounting twice and ends with the data', async () => {
    const request = vi.fn(() => Promise.resolve('ok'));

    const { result } = renderHook(() => useRequest(request), { wrapper: StrictMode });

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });
    expect(result.current.data).toBe('ok');
  });

  it('reset cancels and goes back to idle', async () => {
    const request = vi.fn(() => Promise.resolve('ok'));
    const { result } = renderHook(() => useRequest(request));
    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current).toMatchObject({ status: 'idle', data: null, error: null });
  });
});
