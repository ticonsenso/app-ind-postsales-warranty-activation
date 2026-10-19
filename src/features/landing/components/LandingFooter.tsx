import type { ReactNode } from 'react';

import logoOnDark from '@/assets/images/logo-indurama-light.png';
import { ROUTES } from '@/config/routes';
import { EXTERNAL_LINKS } from '@/config/site';
import { AppLink } from '@/shared/components/AppLink';
import { Container } from '@/shared/components/Container';

const LINK_CLASSES =
  'text-sm font-light text-mist-400 transition-colors hover:text-accent hover:underline';

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-sm font-semibold text-white">{title}</h3>
      <ul className="space-y-[7px]">{children}</ul>
    </div>
  );
}

interface LandingFooterProps {
  onRequestTechnicalService: () => void;
}

/** Dark footer of the landing: services and legal documents. */
export function LandingFooter({ onRequestTechnicalService }: LandingFooterProps) {
  return (
    <footer className="mt-14 border-t border-white/10 bg-night-950 pt-9 pb-7">
      <Container>
        <img src={logoOnDark} alt="Indurama" className="mb-5 h-[52px] w-auto" />
        <div className="grid gap-[26px] tablet:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <h3 className="mb-2.5 text-sm font-semibold text-white">Posventa Indurama</h3>
            <p className="max-w-[34ch] text-sm font-light text-mist-400">
              Estamos listos para acompañarte con atención ágil, confiable y oportuna. Activa tu
              garantía hoy y disfruta de tu producto Indurama con mayor tranquilidad.
            </p>
          </div>

          <FooterColumn title="Servicios">
            <li>
              <AppLink href={ROUTES.warranty.identification} className={LINK_CLASSES}>
                Registrar garantía
              </AppLink>
            </li>
            <li>
              <button
                type="button"
                onClick={onRequestTechnicalService}
                className={`${LINK_CLASSES} cursor-pointer`}
              >
                Servicio técnico
              </button>
            </li>
            <li>
              <AppLink href={EXTERNAL_LINKS.spareParts} className={LINK_CLASSES}>
                Repuestos y accesorios
              </AppLink>
            </li>
            <li>
              <AppLink href={EXTERNAL_LINKS.faq} className={LINK_CLASSES}>
                Preguntas frecuentes
              </AppLink>
            </li>
          </FooterColumn>

          <FooterColumn title="Legales">
            <li>
              <AppLink href={EXTERNAL_LINKS.privacyPolicy} newTab className={LINK_CLASSES}>
                Política de privacidad
              </AppLink>
            </li>
            <li>
              <AppLink href={EXTERNAL_LINKS.termsAndConditions} newTab className={LINK_CLASSES}>
                Términos y condiciones de uso
              </AppLink>
            </li>
            <li>
              <AppLink href={EXTERNAL_LINKS.cookiesPolicy} className={LINK_CLASSES}>
                Política de uso de cookies
              </AppLink>
            </li>
            <li>
              <AppLink href={EXTERNAL_LINKS.dataProtection} className={LINK_CLASSES}>
                Protección de datos personales
              </AppLink>
            </li>
          </FooterColumn>
        </div>

        <p className="mt-[26px] border-t border-white/10 pt-[18px] text-[13px] font-light text-mist-500">
          © {new Date().getFullYear()} Indurama Ecuador S.A. — Grupo Consenso. Todos los derechos
          reservados.
        </p>
      </Container>
    </footer>
  );
}
