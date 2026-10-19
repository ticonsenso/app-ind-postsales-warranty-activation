import { EXTERNAL_LINKS } from '@/config/site';
import { AppLink } from '@/shared/components/AppLink';

const LINK_CLASSES = 'text-sm text-ink-muted transition-colors hover:text-primary hover:underline';

/** Light footer of the warranty flow. */
export function WarrantyFooter() {
  return (
    <footer className="mt-2.5 border-t border-line pt-[26px] pb-[34px]">
      <ul className="mb-3.5 flex flex-wrap gap-x-5 gap-y-2">
        <li>
          <AppLink href={EXTERNAL_LINKS.privacyPolicy} newTab className={LINK_CLASSES}>
            Política de privacidad
          </AppLink>
        </li>
        <li>
          <AppLink href={EXTERNAL_LINKS.termsAndConditions} newTab className={LINK_CLASSES}>
            Términos y condiciones
          </AppLink>
        </li>
        <li>
          <AppLink href={EXTERNAL_LINKS.cookiesPolicy} className={LINK_CLASSES}>
            Política de cookies
          </AppLink>
        </li>
        <li>
          <AppLink href={EXTERNAL_LINKS.website} newTab className={LINK_CLASSES}>
            indurama.com
          </AppLink>
        </li>
      </ul>
      <p className="text-[13px] font-light text-ink-muted">
        © {new Date().getFullYear()} Indurama Ecuador S.A. — Grupo Consenso.
      </p>
    </footer>
  );
}
