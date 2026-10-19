/*
 * Validation limits mirrored from the backend DTOs (GarantiasIndurama/src/common/constants).
 * The backend is the source of truth: the front repeats them only to give early feedback.
 */
export const IDENTIFICATION_MIN_LENGTH = 5;
export const IDENTIFICATION_MAX_LENGTH = 20;
export const IDENTIFICATION_PATTERN = /^[A-Za-z0-9-]+$/;

export const NAME_MAX_LENGTH = 100;
export const EMAIL_MAX_LENGTH = 254;

export const PHONE_MIN_LENGTH = 7;
export const PHONE_MAX_LENGTH = 20;
export const PHONE_PATTERN = /^\+?[0-9 ()-]+$/;

/** Same rules as the backend's serial lookup (`GET /v1/products/serial/:serialNumber`). */
export const SERIAL_NUMBER_MAX_LENGTH = 18;
export const SERIAL_NUMBER_PATTERN = /^[A-Za-z0-9]+$/;

/** Same limits as the backend's invoice upload (`MAX_INVOICE_FILE_BYTES`, `INVOICE_MIME_TYPES`). */
export const INVOICE_MAX_SIZE_BYTES = 10 * 1024 * 1024;
export const INVOICE_ACCEPTED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
] as const;
/** Multipart field the backend reads the invoice file from (`INVOICE_FIELD_NAME`). */
export const INVOICE_FIELD_NAME = 'invoice';
/** Value for the `accept` attribute of the invoice file input. */
export const INVOICE_ACCEPT_ATTRIBUTE = INVOICE_ACCEPTED_MIME_TYPES.join(',');

/** Shown for any failure the user cannot act on. Technical detail never reaches the UI. */
export const GENERIC_ERROR_MESSAGE =
  'No pudimos completar la operación. Intenta nuevamente en unos minutos.';
