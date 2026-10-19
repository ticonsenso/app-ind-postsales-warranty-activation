import { ArrowRight } from 'lucide-react';

import heroPhoto from '@/assets/images/hero-warranty.jpg';
import logoWatermark from '@/assets/images/logo-indurama-light.png';
import { ROUTES } from '@/config/routes';
import { AppLink } from '@/shared/components/AppLink';

/** Main call to action of the landing: starts the warranty registration. */
export function RegisterWarrantyCard() {
  return (
    <AppLink
      href={ROUTES.warranty.identification}
      className="group relative isolate mb-3.5 block min-h-75 overflow-hidden rounded-panel px-6 py-[26px] text-white shadow-glow tablet:min-h-0"
    >
      {/* Ambient photo behind the card, veiled so the brand blue and the text stay readable. */}
      <img
        src={heroPhoto}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[66%_center] tablet:object-[78%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(152deg,rgba(0,26,74,.96)_0%,rgba(0,32,92,.93)_38%,rgba(0,42,118,.74)_66%,rgba(0,56,148,.34)_100%)] tablet:bg-[linear-gradient(96deg,rgba(0,26,74,.97)_0%,rgba(0,32,92,.93)_36%,rgba(0,44,122,.58)_62%,rgba(0,58,150,.22)_100%)]" />
      <img
        src={logoWatermark}
        alt=""
        className="pointer-events-none absolute -top-[46px] -right-[38px] w-[190px] opacity-[0.16]"
      />
      <h2 className="mb-1.5 text-2xl [text-shadow:0_1px_14px_rgba(0,17,46,.55)]">
        Registra tu garantía
      </h2>
      <p className="max-w-[28ch] text-[15px] font-light text-white/88 [text-shadow:0_1px_12px_rgba(0,17,46,.5)] tablet:max-w-[34ch]">
        Solo necesitas el número de serie de tu electrodoméstico y una foto de la factura de compra.
        El proceso es 100 % seguro y te tomará menos de dos minutos.
      </p>
      <span className="mt-[18px] inline-flex items-center gap-2 rounded-full bg-white px-5 py-[11px] text-[15px] font-semibold text-primary transition-colors group-hover:bg-info-bg">
        Empezar el registro
        <ArrowRight className="size-[17px]" />
      </span>
    </AppLink>
  );
}
