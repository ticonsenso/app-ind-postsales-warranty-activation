/** Locale used for every date/number formatted for the user (Ecuador, Spanish). */
export const LOCALE = 'es-EC';

export const CONTACT = {
  callCenter: { label: '024001600', href: 'tel:024001600' },
  whatsapp: { label: '0999303030', href: 'https://wa.me/593999303030' },
} as const;

/**
 * Links that live outside this app.
 *
 * TODO: entries pointing to '#' are not defined yet (cookies policy, data protection, FAQ and
 * catalog), and the legal links must open the current PDFs. Pending values and where each link
 * shows up: docs/referencias-externas.md (keep it in sync with this file).
 */
export const EXTERNAL_LINKS = {
  website: 'https://www.indurama.com/',
  spareParts: 'https://www.indurama.com/repuestos',
  privacyPolicy: 'https://www.indurama.com/politicas-de-uso-datos',
  termsAndConditions: 'https://www.indurama.com/terminos-y-condiciones',
  cookiesPolicy: '#',
  dataProtection: '#',
  faq: '#',
  catalog: '#',
} as const;
