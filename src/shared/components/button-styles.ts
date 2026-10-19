import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'md' | 'sm';

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

/** Class list of the pill button. Shared by `Button` and by elements that only look like one. */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}: ButtonStyleOptions = {}): string {
  return clsx(
    // Every variant has the same border width, so a primary and a secondary button match in height.
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-[1.5px] font-semibold transition-colors disabled:cursor-not-allowed',
    size === 'md' && 'px-6 py-[9px] text-base',
    size === 'sm' && 'px-4 py-[9px] text-sm',
    variant === 'primary' &&
      'border-transparent bg-primary text-white hover:bg-primary-dark disabled:bg-disabled',
    variant === 'secondary' &&
      'border-line bg-white text-primary hover:border-accent hover:bg-muted disabled:opacity-60',
    fullWidth && 'w-full',
  );
}
