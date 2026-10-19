import { useEffect, useRef, useState } from 'react';

import { ApiError } from '@/shared/api/api-error';
import { useRequestSignal } from '@/shared/hooks/use-request-signal';
import { isAbortError } from '@/shared/utils/abort';

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

interface RequestState<TData> {
  status: RequestStatus;
  data: TData | null;
  error: ApiError | null;
}

interface UseRequestOptions {
  /** Runs the request on mount without arguments. Defaults to `true`; use `false` to call `execute` on demand. */
  immediate?: boolean;
}

function toApiError(error: unknown): ApiError {
  return error instanceof ApiError
    ? error
    : new ApiError('UNKNOWN_ERROR', null, 'Unexpected request error.');
}

/**
 * Generic hook for any backend request: tracks `status`, `data` and `error`, cancels the previous
 * request when a new one starts, and cancels the pending one on unmount. A cancelled request is
 * never reported as an error.
 *
 * Domain rules (e.g. "null means not found") do not belong here: the request function resolves
 * them and the hook only exposes the outcome.
 *
 * @param request - Function of `api/` that receives the `AbortSignal` first, then the call arguments
 * @param options - `immediate` runs the request on mount (default); otherwise call `execute`
 * @returns The state plus `execute` (resolves with the data, or `null` if it failed or was
 *   cancelled) and `reset` (cancels and goes back to `idle`)
 */
export function useRequest<TData, TArgs extends unknown[] = []>(
  request: (signal: AbortSignal, ...args: TArgs) => Promise<TData>,
  { immediate = true }: UseRequestOptions = {},
) {
  const [state, setState] = useState<RequestState<TData>>({
    status: immediate ? 'loading' : 'idle',
    data: null,
    error: null,
  });
  const { nextSignal, cancel } = useRequestSignal();
  const requestRef = useRef(request);
  const launchRef = useRef<(args: TArgs) => Promise<TData | null>>(() => Promise.resolve(null));

  const launch = async (args: TArgs): Promise<TData | null> => {
    const signal = nextSignal();
    try {
      const data = await requestRef.current(signal, ...args);
      if (signal.aborted) return null;
      setState({ status: 'success', data, error: null });
      return data;
    } catch (error) {
      if (!isAbortError(error) && !signal.aborted) {
        setState((previous) => ({
          status: 'error',
          data: previous.data,
          error: toApiError(error),
        }));
      }
      return null;
    }
  };

  useEffect(() => {
    requestRef.current = request;
    launchRef.current = launch;
  });

  useEffect(() => {
    if (immediate) void launchRef.current([] as unknown as TArgs);
  }, [immediate]);

  const execute = (...args: TArgs): Promise<TData | null> => {
    setState((previous) => ({ status: 'loading', data: previous.data, error: null }));
    return launch(args);
  };

  const reset = () => {
    cancel();
    setState({ status: 'idle', data: null, error: null });
  };

  return { ...state, execute, reset };
}
