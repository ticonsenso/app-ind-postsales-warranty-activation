/** Builds the error that signals an operation was cancelled through an `AbortSignal`. */
export function createAbortError(): DOMException {
  return new DOMException('The operation was aborted.', 'AbortError');
}

/** True when `error` was produced by cancelling a request/timer through an `AbortSignal`. */
export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}
