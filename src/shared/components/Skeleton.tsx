import clsx from 'clsx';

type SkeletonTone = 'dark' | 'light';

const TONE_CLASSES: Record<SkeletonTone, string> = {
  dark: 'bg-night-700',
  light: 'bg-line',
};

/** Color of the highlight band; it must stand out against the base color of each tone. */
const SHINE_CLASSES: Record<SkeletonTone, string> = {
  dark: 'via-white/15',
  light: 'via-white/80',
};

const SHIMMER_CLASS =
  'animate-shimmer bg-linear-to-r bg-size-[200%_100%] from-transparent from-30% via-50% to-transparent to-70%';

interface SkeletonProps {
  /** `dark` for dark backgrounds, `light` for light ones. */
  tone?: SkeletonTone;
  /** Shimmers while content is on its way; turn it off for a placeholder that will not be replaced. */
  animated?: boolean;
  /** Size and shape (e.g. `h-4 w-32`, `aspect-square w-full`, `absolute inset-0`). */
  className?: string;
}

/** Placeholder block for content that is loading. Hidden from assistive technology. */
export function Skeleton({ tone = 'dark', animated = true, className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'block',
        TONE_CLASSES[tone],
        animated && [SHIMMER_CLASS, SHINE_CLASSES[tone]],
        className,
      )}
    />
  );
}
