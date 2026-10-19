import clsx from 'clsx';
import type { ComponentProps } from 'react';

type ContainerProps = ComponentProps<'div'> & {
  /** `narrow` is the single-column width used by form flows. */
  size?: 'default' | 'narrow';
};

/** Centers its content and applies the page gutters. */
export function Container({ size = 'default', className, ...rest }: ContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto w-full px-5',
        size === 'narrow' ? 'max-w-[600px]' : 'max-w-[1120px]',
        className,
      )}
      {...rest}
    />
  );
}
