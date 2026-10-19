import { useEffect, useRef } from 'react';

/**
 * Moves keyboard/screen-reader focus to the returned element when it mounts.
 * Attach it to a heading with `tabIndex={-1}` so a new view is announced after navigation.
 */
export function useFocusOnMount<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
}
