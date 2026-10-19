import clsx from 'clsx';
import { Check, CircleAlert, Info, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type AlertTone = 'info' | 'success' | 'error';

const TONES: Record<AlertTone, { icon: LucideIcon; classes: string }> = {
  info: { icon: Info, classes: 'border-info-border bg-info-bg text-info-text' },
  success: { icon: Check, classes: 'border-success-border bg-success-bg text-success-text' },
  error: { icon: CircleAlert, classes: 'border-danger-border bg-danger-bg text-danger-text' },
};

interface AlertProps {
  tone?: AlertTone;
  className?: string;
  children: ReactNode;
}

/** Inline message box. Errors are announced assertively; the other tones politely. */
export function Alert({ tone = 'info', className, children }: AlertProps) {
  const { icon: Icon, classes } = TONES[tone];

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={clsx(
        'mb-5 flex items-start gap-3 rounded-card border px-4 py-3.5 text-sm leading-[1.45]',
        classes,
        className,
      )}
    >
      <Icon className="mt-0.5 size-[18px] shrink-0" />
      <div>{children}</div>
    </div>
  );
}
