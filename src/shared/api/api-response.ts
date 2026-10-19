import { z } from 'zod';

import { ApiError } from './api-error';

/**
 * Builds the schema of the backend's `ResponseStructure<T>` envelope for a successful response.
 * Every response body of the API is wrapped as `{ data, message, error, statusCode }`.
 *
 * @param data - Schema of the `data` payload
 * @returns Schema of the whole envelope
 * @author Cristian Brito
 * @since 2026-09-21
 */
export function apiResponseSchema<T extends z.ZodTypeAny>(data: T) {
  return z.object({
    data,
    message: z.string(),
    error: z.null(),
    statusCode: z.number(),
  });
}

/**
 * Validates a response body against the envelope and returns its `data`.
 * A body that does not match the contract is a failure, never silently accepted.
 *
 * @param dataSchema - Schema of the `data` payload
 * @param body - Raw response body
 * @returns The validated `data`
 * @throws {ApiError} With code `INVALID_RESPONSE` when the body does not match
 * @author Cristian Brito
 * @since 2026-09-21
 */
export function parseApiData<T extends z.ZodTypeAny>(dataSchema: T, body: unknown): z.output<T> {
  const result = apiResponseSchema(dataSchema).safeParse(body);
  if (!result.success) {
    throw new ApiError('INVALID_RESPONSE', null, 'Response does not match the expected contract.');
  }
  return result.data.data;
}

/** Envelope of a failed response: `data` is null and `error` carries the stable code. */
export const apiErrorBodySchema = z.object({
  message: z.string(),
  error: z.string(),
  statusCode: z.number(),
});
