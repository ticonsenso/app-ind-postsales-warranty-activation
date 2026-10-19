import type { ComponentProps } from 'react';
import { Link } from 'react-router';

type AppLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  /** Internal path (starts with `/`) or any external URL (`https:`, `tel:`, ...). */
  href: string;
  /** Opens in a new tab with the safe `rel` attributes. Only meaningful for external URLs. */
  newTab?: boolean;
};

/** Router `Link` for internal paths, plain anchor for everything else. */
export function AppLink({ href, newTab = false, children, ...rest }: AppLinkProps) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : undefined)}
      {...rest}
    >
      {children}
    </a>
  );
}
