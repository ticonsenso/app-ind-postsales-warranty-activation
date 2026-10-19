import clsx from 'clsx';
import type { ReactNode } from 'react';

interface ActionRowProps {
  /** Aligns the buttons on wide screens; they are always full width on phones. */
  align?: 'end' | 'center';
  className?: string;
  children: ReactNode;
}

/**
 * Row with the buttons that close a panel. Phones stack them full width, easy to tap; from
 * tablet up they keep their natural width (with a common minimum) instead of stretching.
 */
export function ActionRow({ align = 'end', className, children }: ActionRowProps) {
  return (
    <div
      className={clsx(
        'mt-[26px] flex flex-col gap-3 tablet:flex-row tablet:*:min-w-40',
        align === 'end' ? 'tablet:justify-end' : 'tablet:justify-center',
        className,
      )}
    >
      {children}
    </div>
  );
}
