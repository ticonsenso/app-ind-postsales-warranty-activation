import type { ReactNode } from 'react';

/** Horizontal rule with a centered label, e.g. "or type it by hand". */
export function TextDivider({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 flex items-center gap-3.5 text-sm text-ink-muted before:h-px before:flex-1 before:bg-line after:h-px after:flex-1 after:bg-line">
      {children}
    </div>
  );
}
