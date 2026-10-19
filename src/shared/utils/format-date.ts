import { LOCALE } from '@/config/site';

// Date-only values (`yyyy-MM-dd`) carry no timezone. They are parsed and formatted in UTC so the
// user's timezone can never shift the day (e.g. Ecuador is UTC-5).
const longFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const shortFormatter = new Intl.DateTimeFormat(LOCALE, {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
});

function parseIsoDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00Z`);
}

/** Formats an ISO date (`2026-07-14`) as `14 de julio de 2026`. */
export function formatLongDate(isoDate: string): string {
  return longFormatter.format(parseIsoDate(isoDate));
}

/** Formats an ISO date (`2026-07-14`) as `14/07/2026`. */
export function formatShortDate(isoDate: string): string {
  return shortFormatter.format(parseIsoDate(isoDate));
}
