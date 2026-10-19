import { X } from 'lucide-react';
import { useEffect, useId, useRef, type ReactNode } from 'react';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * Modal dialog: a bottom sheet on phones and a centered card from tablet up.
 * Built on the native `<dialog>`, which provides the focus trap, Escape to close, the inert
 * background and focus restoration.
 */
export function Sheet({ open, onClose, title, description, children }: SheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    // Clicking the backdrop is a pointer shortcut only: Escape and the close button cover the keyboard.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="mx-auto mt-auto mb-0 w-full max-w-[440px] rounded-t-panel border border-white/10 bg-night-800 p-0 text-mist-100 backdrop:bg-night-950/75 backdrop:backdrop-blur-xs tablet:my-auto tablet:rounded-panel"
    >
      <div className="px-5 pt-[22px] pb-[26px]">
        <div className="mb-1 flex items-start justify-between gap-4">
          <h3 id={titleId} className="text-[19px] text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full bg-white/10 text-mist-300 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>
        {description && <p className="mb-[18px] text-sm font-light text-mist-400">{description}</p>}
        {children}
      </div>
    </dialog>
  );
}
