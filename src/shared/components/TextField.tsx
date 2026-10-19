import clsx from 'clsx';
import { CircleAlert } from 'lucide-react';
import { useId, type ComponentProps } from 'react';

type TextFieldProps = Omit<ComponentProps<'input'>, 'id' | 'children'> & {
  label: string;
  hint?: string;
  error?: string | undefined;
};

/**
 * Labelled text input with an optional hint and error message.
 * The hint and the error are linked to the input with `aria-describedby`.
 * Works with `react-hook-form`'s `register` (the `ref` is a regular prop in React 19).
 */
export function TextField({ label, hint, error, className, ...inputProps }: TextFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = clsx(hint && hintId, error && errorId) || undefined;

  return (
    <div className={clsx('mb-[18px]', className)}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="w-full rounded-field border-[1.5px] border-line bg-white px-[15px] py-[13px] font-sans text-base text-ink read-only:bg-muted read-only:text-ink-muted focus:border-accent focus:ring-3 focus:ring-accent/20 focus:outline-hidden disabled:bg-muted disabled:text-ink-muted aria-invalid:border-danger"
        {...inputProps}
      />
      {hint && (
        <p id={hintId} className="mt-1.5 text-[13px] font-light text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-[7px] flex items-start gap-2 text-sm text-danger">
          <CircleAlert className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
