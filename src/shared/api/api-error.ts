/** Reasons a request fails before or without a usable backend response. */
export type ClientErrorCode = 'NETWORK_ERROR' | 'TIMEOUT' | 'INVALID_RESPONSE' | 'UNKNOWN_ERROR';

/**
 * Normalized request failure. The UI never sees the raw HTTP/axios error.
 *
 * `code` is the stable code sent by the backend in `error` (e.g. `CLIENT_NOT_FOUND`) or one of
 * `ClientErrorCode` when there was no backend response. Compare it to decide what to show:
 * `message` is backend text meant for logs here, not for the screen.
 *
 * @author Cristian Brito
 * @since 2026-09-21
 */
export class ApiError extends Error {
  constructor(
    readonly code: string,
    readonly status: number | null,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** True when `error` is an `ApiError`, optionally with one of the given codes. */
export function isApiError(error: unknown, ...codes: string[]): error is ApiError {
  return error instanceof ApiError && (codes.length === 0 || codes.includes(error.code));
}
