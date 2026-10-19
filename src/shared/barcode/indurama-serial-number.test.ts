import { describe, expect, it, vi } from 'vitest';

import { pickSerialNumber, readSerialNumberFromFrame } from './indurama-serial-number';
import { readBarcodesFromFrame, type ScannedBarcode } from './read-barcodes';

vi.mock('./read-barcodes', () => ({ readBarcodesFromFrame: vi.fn() }));

const code128 = (text: string): ScannedBarcode => ({
  text,
  format: 'Code128',
  symbology: 'Code128',
});
const ean13 = (text: string): ScannedBarcode => ({ text, format: 'EAN13', symbology: 'EANUPC' });

// Codes decoded from the labels the client documented.
const NATIONAL_LABEL = [
  ean13('7861041149324'),
  code128('30000857E01080086700730725'),
  code128('E01080086700730725'),
];
const IMPORTED_1_LABEL = [ean13('6921041103762'), code128('I01000862100780725')];
const IMPORTED_2_LABEL = [ean13('6921041102345'), code128('6500325520295')];

describe('pickSerialNumber', () => {
  it.each([
    ['national', NATIONAL_LABEL, 'E01080086700730725'],
    ['imported type 1', IMPORTED_1_LABEL, 'I01000862100780725'],
    ['imported type 2', IMPORTED_2_LABEL, '6500325520295'],
  ])('finds the serial of a %s label', (_label, barcodes, serialNumber) => {
    expect(pickSerialNumber(barcodes)).toBe(serialNumber);
  });

  it('never takes the supplier EAN-13 for a serial', () => {
    expect(pickSerialNumber([ean13('6921041102345')])).toBeNull();
  });

  it('tells a 13-digit serial from a supplier code by its symbology, not by its digits', () => {
    // Valid EAN-13 check digit, but printed in Code 128: it is a serial.
    expect(pickSerialNumber([code128('7861041149324')])).toBe('7861041149324');
  });

  it('takes the serial out of the traceability code when that is all that was read', () => {
    expect(pickSerialNumber([code128('30000857E01080086700730725')])).toBe('E01080086700730725');
  });

  it('prefers a prefixed serial to a 13-digit code', () => {
    expect(pickSerialNumber([code128('6500325520295'), code128('I01000862100780725')])).toBe(
      'I01000862100780725',
    );
  });

  it('ignores codes outside the documented formats', () => {
    expect(
      pickSerialNumber([code128('ABC-123'), code128('E0123'), code128('X01080086700730725')]),
    ).toBeNull();
  });
});

describe('readSerialNumberFromFrame', () => {
  const frame = { width: 4, height: 4, data: new Uint8ClampedArray(64) } as ImageData;

  it('returns the serial read with the given binarizer, looking only for label formats', async () => {
    vi.mocked(readBarcodesFromFrame).mockResolvedValue(NATIONAL_LABEL);

    await expect(readSerialNumberFromFrame(frame, 'FixedThreshold')).resolves.toEqual({
      status: 'found',
      serialNumber: 'E01080086700730725',
    });
    expect(readBarcodesFromFrame).toHaveBeenCalledWith(frame, {
      formats: ['Code128', 'EAN13', 'UPCA'],
      binarizer: 'FixedThreshold',
    });
  });

  it('tells apart reading only other codes from reading nothing', async () => {
    vi.mocked(readBarcodesFromFrame).mockResolvedValueOnce([ean13('7861041149324')]);
    await expect(readSerialNumberFromFrame(frame, 'LocalAverage')).resolves.toEqual({
      status: 'no-serial',
    });

    vi.mocked(readBarcodesFromFrame).mockResolvedValueOnce([]);
    await expect(readSerialNumberFromFrame(frame, 'LocalAverage')).resolves.toEqual({
      status: 'no-barcode',
    });
  });
});
