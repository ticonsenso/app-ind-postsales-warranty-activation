import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './Skeleton';

function renderSkeleton(props: Parameters<typeof Skeleton>[0] = {}) {
  const { container } = render(<Skeleton {...props} />);
  return container.firstElementChild as HTMLElement;
}

describe('Skeleton', () => {
  it('is hidden from assistive technology and pulses by default', () => {
    const skeleton = renderSkeleton();

    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(skeleton).toHaveClass('animate-shimmer', 'bg-night-700');
  });

  it('can be static', () => {
    expect(renderSkeleton({ animated: false })).not.toHaveClass('animate-shimmer');
  });

  it('uses the light tone and the given size classes', () => {
    const skeleton = renderSkeleton({ tone: 'light', className: 'h-4 w-32' });

    expect(skeleton).toHaveClass('bg-line', 'h-4', 'w-32');
    expect(skeleton).not.toHaveClass('bg-night-700');
  });
});
