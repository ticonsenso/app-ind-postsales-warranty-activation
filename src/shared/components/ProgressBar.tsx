interface ProgressBarProps {
  /** Completion from 0 to 100. */
  value: number;
  label: string;
}

/** Determinate progress bar. */
export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className="mt-2.5 h-[5px] overflow-hidden rounded-full bg-line"
    >
      <div
        className="h-full rounded-full bg-accent transition-[width] duration-500 ease-linear"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
