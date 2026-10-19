import { useEffect, useRef } from 'react';

/**
 * Hands out an `AbortSignal` per request and cancels the previous one, so a slow stale response
 * can never overwrite a newer one. Any in-flight request is also cancelled on unmount.
 */
export function useRequestSignal() {
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  const cancel = () => {
    controllerRef.current?.abort();
  };

  const nextSignal = (): AbortSignal => {
    cancel();
    const controller = new AbortController();
    controllerRef.current = controller;
    return controller.signal;
  };

  return { nextSignal, cancel };
}
