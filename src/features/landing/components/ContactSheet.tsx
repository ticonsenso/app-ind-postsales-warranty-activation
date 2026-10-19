import { Phone } from 'lucide-react';
import type { ReactNode } from 'react';

import { CONTACT } from '@/config/site';
import { AppLink } from '@/shared/components/AppLink';
import { IconBadge } from '@/shared/components/IconBadge';
import { WhatsAppIcon } from '@/shared/components/icons/WhatsAppIcon';
import { Sheet } from '@/shared/components/Sheet';

interface ContactOptionProps {
  href: string;
  newTab?: boolean;
  icon: ReactNode;
  tone: 'accent' | 'whatsapp';
  title: string;
  subtitle: string;
}

function ContactOption({ href, newTab, icon, tone, title, subtitle }: ContactOptionProps) {
  return (
    <AppLink
      href={href}
      newTab={newTab ?? false}
      className="mb-2.5 flex items-center gap-3.5 rounded-card border border-white/10 bg-night-700 p-[15px] text-white transition-colors hover:border-accent hover:bg-night-600"
    >
      <IconBadge tone={tone}>{icon}</IconBadge>
      <span>
        <b className="block text-base leading-[1.3] font-semibold">{title}</b>
        <span className="text-sm font-light text-mist-400">{subtitle}</span>
      </span>
    </AppLink>
  );
}

interface ContactSheetProps {
  open: boolean;
  onClose: () => void;
}

/** Sheet that lets the user choose how to reach the authorized service center. */
export function ContactSheet({ open, onClose }: ContactSheetProps) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="¿Cómo prefieres contactarnos?"
      description="Coordina la visita de un Centro de Servicio Autorizado."
    >
      <ContactOption
        href={CONTACT.callCenter.href}
        icon={<Phone className="size-5" />}
        tone="accent"
        title={`Llamar al ${CONTACT.callCenter.label}`}
        subtitle="Call center, de lunes a sábado"
      />
      <ContactOption
        href={CONTACT.whatsapp.href}
        newTab
        icon={<WhatsAppIcon />}
        tone="whatsapp"
        title="Escribir por WhatsApp"
        subtitle={CONTACT.whatsapp.label}
      />
    </Sheet>
  );
}
