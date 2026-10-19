import clsx from 'clsx';

import logoOnDark from '@/assets/images/logo-indurama-light.png';
import logoOnLight from '@/assets/images/logo-indurama.png';

import { AppLink } from './AppLink';
import { Container } from './Container';

interface SiteHeaderProps {
  /** `dark` for the landing, `light` for the warranty flow. */
  tone: 'dark' | 'light';
  linkLabel: string;
  linkHref: string;
  linkNewTab?: boolean;
}

/** Sticky top bar with the brand logo and one secondary link. */
export function SiteHeader({ tone, linkLabel, linkHref, linkNewTab }: SiteHeaderProps) {
  const isDark = tone === 'dark';

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 border-b backdrop-blur-md',
        isDark ? 'border-white/10 bg-night-900/90' : 'border-line bg-white/90',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <img
          src={isDark ? logoOnDark : logoOnLight}
          alt="Indurama"
          className={clsx('w-auto', isDark ? 'h-[38px]' : 'h-9')}
        />
        <AppLink
          href={linkHref}
          newTab={linkNewTab ?? false}
          className={clsx(
            'rounded-full border px-3.5 py-[7px] text-sm whitespace-nowrap transition-colors',
            isDark
              ? 'border-white/20 text-mist-300 hover:border-accent hover:text-white'
              : 'border-line text-ink-muted hover:border-accent hover:text-primary',
          )}
        >
          {linkLabel}
        </AppLink>
      </Container>
    </header>
  );
}
