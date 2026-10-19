import { useId, type ComponentProps, type ReactNode } from 'react';

type CheckboxProps = Omit<ComponentProps<'input'>, 'id' | 'type' | 'children'> & {
  /** Label content. May include links (they do not toggle the checkbox). */
  label: ReactNode;
  error?: string | undefined;
};

/** Checkbox whose whole label is clickable. Works with `react-hook-form`'s `register`. */
export function Checkbox({ label, error, ...inputProps }: CheckboxProps) {
  const errorId = useId();

  return (
    <div className="mb-3">
      <label className="flex cursor-pointer items-start gap-[11px]">
        <input
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-primary"
          {...inputProps}
        />
        <span className="text-sm leading-[1.45] text-ink-muted">{label}</span>
      </label>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
