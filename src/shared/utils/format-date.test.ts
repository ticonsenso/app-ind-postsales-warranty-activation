import { describe, expect, it } from 'vitest';

import { formatLongDate, formatShortDate } from './format-date';

describe('format-date', () => {
  it('formats an ISO date in long form, in Spanish', () => {
    expect(formatLongDate('2026-07-14')).toBe('14 de julio de 2026');
  });

  it('formats an ISO date in short form', () => {
    expect(formatShortDate('2026-07-14')).toBe('14/07/2026');
  });

  it('never shifts the day because of the timezone (first day of the year)', () => {
    expect(formatShortDate('2027-01-01')).toBe('01/01/2027');
    expect(formatLongDate('2027-01-01')).toBe('1 de enero de 2027');
  });
});
