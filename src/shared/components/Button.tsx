import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import type { ComponentProps } from 'react';

import { buttonClasses, type ButtonStyleOptions } from './button-styles';

type ButtonProps = ComponentProps<'button'> &
  ButtonStyleOptions & {
    /** Shows a spinner and blocks interaction while an async action is running. */
    loading?: boolean;
  };

/** Pill button. Defaults to `type="button"` so it never submits a form by accident. */
export function Button({
  variant,
  size,
  fullWidth,
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(buttonClasses({ variant, size, fullWidth }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <LoaderCircle className="size-4 animate-spin" />}
      {children}
    </button>
  );
}
