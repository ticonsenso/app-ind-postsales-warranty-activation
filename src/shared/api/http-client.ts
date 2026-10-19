import axios, { isAxiosError, isCancel } from 'axios';

import { env } from '@/config/env';
import { createAbortError } from '../utils/abort';

import { ApiError } from './api-error';
import { apiErrorBodySchema } from './api-response';

/** Version segment of the backend URI (`/v1/...`). */
const API_VERSION = 'v1';

/** Header the backend reads to make a create request safe to retry (UUID v4). */
export const IDEMPOTENCY_KEY_HEADER = 'Idempotency-Key';

/**
 * The only HTTP client of the app: fixed base URL, timeout and error normalization.
 * There is no authentication interceptor because the endpoints are public by design.
 *
 * @author Cristian Brito
 * @since 2026-09-21
 */
export const httpClient = axios.create({
  baseURL: `${env.apiBaseUrl}/${API_VERSION}`,
  timeout: env.apiTimeoutMs,
});

httpClient.interceptors.response.use(undefined, (error: unknown) => {
  // Cancelled on purpose (component unmounted, newer request): not a failure to report.
  if (isCancel(error)) throw createAbortError();
  if (!isAxiosError(error)) throw new ApiError('UNKNOWN_ERROR', null, 'Unexpected request error.');

  if (error.response) {
    const body = apiErrorBodySchema.safeParse(error.response.data);
    if (body.success) {
      throw new ApiError(body.data.error, error.response.status, body.data.message);
    }
    throw new ApiError('UNKNOWN_ERROR', error.response.status, 'Unrecognized error response.');
  }

  const isTimeout = error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT';
  throw new ApiError(isTimeout ? 'TIMEOUT' : 'NETWORK_ERROR', null, 'No response from the server.');
});
