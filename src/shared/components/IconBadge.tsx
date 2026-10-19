import clsx from 'clsx';
import type { ReactNode } from 'react';

type IconBadgeTone = 'accent' | 'whatsapp' | 'brand' | 'outlined' | 'success';
type IconBadgeSize = 'md' | 'lg' | 'xl' | '2xl';

const TONE_CLASSES: Record<IconBadgeTone, string> = {
  accent: 'bg-accent/15 text-accent',
  whatsapp: 'bg-whatsapp/15 text-whatsapp',
  brand: 'bg-accent/10 text-primary',
  outlined: 'border border-accent/25 bg-white text-primary',
  success: 'bg-success-bg text-success',
};

const SIZE_CLASSES: Record<IconBadgeSize, string> = {
  md: 'size-11 rounded-xl',
  lg: 'size-13 rounded-[14px]',
  xl: 'size-14 rounded-2xl',
  '2xl': 'size-19 rounded-full',
};

interface IconBadgeProps {
  tone?: IconBadgeTone;
  size?: IconBadgeSize;
  className?: string;
  /** Decorative icon. Never the only carrier of meaning. */
  children: ReactNode;
}

/** Icon inside a tinted rounded square (or circle). */
export function IconBadge({ tone = 'accent', size = 'md', className, children }: IconBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'grid shrink-0 place-items-center',
        TONE_CLASSES[tone],
        SIZE_CLASSES[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
