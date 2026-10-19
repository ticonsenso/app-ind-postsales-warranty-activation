import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

import { AppLink } from '@/shared/components/AppLink';
import { IconBadge } from '@/shared/components/IconBadge';

type ServiceCardAction =
  | { href: string; newTab?: boolean; onSelect?: never }
  | { onSelect: () => void; href?: never; newTab?: never };

type ServiceCardProps = ServiceCardAction & {
  icon: LucideIcon;
  title: string;
  description: string;
};

const CARD_CLASSES =
  'flex w-full items-start gap-4 rounded-card border border-white/10 bg-night-800 p-[18px] text-left transition-colors hover:border-accent/55 hover:bg-night-700';

/** Dark action card. A link when it has an `href`, a button when it has an `onSelect` handler. */
export function ServiceCard({ icon: Icon, title, description, ...action }: ServiceCardProps) {
  const content = (
    <>
      <IconBadge>
        <Icon className="size-[21px]" />
      </IconBadge>
      <span className="block">
        <span className="mb-0.5 block font-display text-[17px] font-semibold text-white">
          {title}
        </span>
        <span className="block text-sm leading-[1.4] font-light text-mist-400">{description}</span>
      </span>
    </>
  );

  if (action.onSelect) {
    return (
      <button
        type="button"
        onClick={action.onSelect}
        className={clsx(CARD_CLASSES, 'cursor-pointer')}
      >
        {content}
      </button>
    );
  }

  return (
    <AppLink href={action.href} newTab={action.newTab ?? false} className={CARD_CLASSES}>
      {content}
    </AppLink>
  );
}
