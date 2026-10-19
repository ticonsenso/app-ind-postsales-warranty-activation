import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { usePageTakeover } from './use-page-takeover';

describe('usePageTakeover', () => {
  let page: HTMLElement;

  afterEach(() => {
    page.remove();
  });

  function renderTakeover() {
    page = document.createElement('main');
    page.style.visibility = 'visible';
    document.body.append(page);
    return renderHook(() => usePageTakeover('rgb(0, 11, 31)'));
  }

  it('hides and disables the rest of the page, and paints the document', () => {
    const { result } = renderTakeover();

    expect(result.current.parentElement).toBe(document.body);
    expect(page.style.visibility).toBe('hidden');
    expect(page).toHaveAttribute('inert');
    expect(document.documentElement.style.overflow).toBe('hidden');
    expect(document.body.style.backgroundColor).toBe('rgb(0, 11, 31)');
  });

  it('leaves the page as it was once unmounted', () => {
    const { result, unmount } = renderTakeover();
    const host = result.current;

    unmount();

    expect(host.isConnected).toBe(false);
    expect(page.style.visibility).toBe('visible');
    expect(page).not.toHaveAttribute('inert');
    expect(document.documentElement.style.overflow).toBe('');
    expect(document.body.style.backgroundColor).toBe('');
  });
});
