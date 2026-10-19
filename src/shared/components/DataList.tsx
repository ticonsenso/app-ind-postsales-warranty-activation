import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface DataListItem {
  label: string;
  value: ReactNode;
  tone?: 'default' | 'success' | 'danger';
}

interface DataListProps {
  items: readonly DataListItem[];
  className?: string;
}

/** Read-only "label → value" table, rendered as a description list. */
export function DataList({ items, className }: DataListProps) {
  return (
    <dl className={clsx('overflow-hidden rounded-card border border-line bg-white', className)}>
      {items.map(({ label, value, tone = 'default' }) => (
        <div
          key={label}
          className="flex justify-between gap-4 border-b border-line px-4 py-[13px] text-[14.5px] last:border-b-0"
        >
          <dt className="font-light text-ink-muted">{label}</dt>
          <dd
            className={clsx(
              'text-right font-semibold',
              tone === 'success' && 'text-success',
              tone === 'danger' && 'text-danger',
            )}
          >
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
