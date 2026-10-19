// Plain checks on purpose: this module is imported at startup, so it must not pull a validation
// library into the initial bundle (the landing does not need one).

const DEFAULT_API_TIMEOUT_MS = 15000;

function readApiBaseUrl(value: unknown): string {
  if (value === undefined || value === '') return '';
  if (typeof value !== 'string') {
    throw new Error('Invalid environment configuration. VITE_API_BASE_URL must be a string.');
  }
  try {
    new URL(value);
  } catch {
    throw new Error('Invalid environment configuration. VITE_API_BASE_URL is not a valid URL.');
  }
  return value.replace(/\/+$/, '');
}

function readApiTimeoutMs(value: unknown): number {
  if (value === undefined || value === '') return DEFAULT_API_TIMEOUT_MS;
  const timeout = Number(value);
  if (!Number.isInteger(timeout) || timeout <= 0) {
    throw new Error(
      'Invalid environment configuration. VITE_API_TIMEOUT_MS must be a positive integer.',
    );
  }
  return timeout;
}

/**
 * Public runtime configuration, validated once at startup (a missing or malformed variable fails
 * fast instead of surfacing later as a confusing request error). Error messages name the variable
 * but never print its value.
 *
 * @author Cristian Brito
 * @since 2026-09-21
 */
export const env = {
  /** Backend origin without a trailing slash; empty means the page's own origin (the dev server proxies `/v1`). */
  apiBaseUrl: readApiBaseUrl(import.meta.env.VITE_API_BASE_URL),
  apiTimeoutMs: readApiTimeoutMs(import.meta.env.VITE_API_TIMEOUT_MS),
} as const;
