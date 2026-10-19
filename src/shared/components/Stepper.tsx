import clsx from 'clsx';

export interface StepperStep {
  id: string;
  label: string;
}

interface StepperProps {
  steps: readonly StepperStep[];
  /** Zero-based index of the step the user is on. */
  currentIndex: number;
}

/** Progress indicator of a multi-step flow: a progress bar on phones, numbered steps from tablet up. */
export function Stepper({ steps, currentIndex }: StepperProps) {
  const total = steps.length;
  const position = currentIndex + 1;
  const currentLabel = steps[currentIndex]?.label;

  return (
    <nav aria-label="Progreso del registro" className="pt-[22px] pb-1">
      <div className="tablet:hidden">
        <div className="mb-2 flex justify-between text-sm text-ink-muted">
          <b className="font-display text-primary">{`Paso ${position} de ${total}`}</b>
          <span>{currentLabel}</span>
        </div>
        <div
          role="progressbar"
          aria-label="Progreso del registro"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={position}
          aria-valuetext={`Paso ${position} de ${total}: ${currentLabel ?? ''}`}
          className="h-[5px] overflow-hidden rounded-full bg-line"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
            style={{ width: `${(position / total) * 100}%` }}
          />
        </div>
      </div>

      <ol className="hidden items-center gap-1.5 tablet:flex">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isDone = index < currentIndex;
          const isLast = index === total - 1;

          return (
            <li
              key={step.id}
              aria-current={isActive ? 'step' : undefined}
              className={clsx(
                'flex min-w-0 items-center gap-[9px]',
                isLast ? 'flex-none' : 'flex-1',
              )}
            >
              <span
                className={clsx(
                  'grid size-7 shrink-0 place-items-center rounded-full border-[1.5px] text-sm font-bold',
                  isActive && 'border-primary bg-primary text-white',
                  isDone && 'border-success bg-success text-white',
                  !isActive && !isDone && 'border-line bg-white text-ink-muted',
                )}
              >
                {index + 1}
              </span>
              <span
                className={clsx(
                  'truncate text-sm',
                  isActive ? 'font-semibold text-primary' : 'text-ink-muted',
                )}
              >
                {step.label}
                {isDone && <span className="sr-only"> (completado)</span>}
              </span>
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={clsx(
                    'h-0.5 min-w-3 flex-1 rounded-sm',
                    isDone ? 'bg-success' : 'bg-line',
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
