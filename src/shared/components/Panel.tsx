import clsx from 'clsx';
import type { ReactNode } from 'react';

import { useFocusOnMount } from '../hooks/use-focus-on-mount';

interface PanelProps {
  className?: string;
  children: ReactNode;
}

/** White rounded card that holds one step of a flow. */
export function Panel({ className, children }: PanelProps) {
  return (
    <div
      className={clsx(
        'mt-5 mb-8 rounded-panel border border-line bg-white px-[22px] py-[26px] tablet:p-[34px]',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface PanelHeaderProps {
  title: string;
  description?: string;
}

/** Title + subtitle of a panel. The title takes focus on mount so screen readers announce the new view. */
export function PanelHeader({ title, description }: PanelHeaderProps) {
  const titleRef = useFocusOnMount<HTMLHeadingElement>();

  return (
    <header className="mb-6">
      <h2 ref={titleRef} tabIndex={-1} className="mb-2 text-2xl outline-hidden">
        {title}
      </h2>
      {description && (
        <p className="max-w-[52ch] text-[15px] font-light text-ink-muted">{description}</p>
      )}
    </header>
  );
}
