import type { ComponentProps } from 'react';

/** WhatsApp brand glyph (not available in the generic icon set). */
export function WhatsAppIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20} {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8m-3.4 4c-.2 0-.5.1-.7.4s-.9.9-.9 2.2.9 2.5 1 2.7c.1.2 1.8 2.9 4.5 4 .6.2 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.3-1.5-.7c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1s-1-.4-1.9-1.2c-.7-.6-1.2-1.4-1.3-1.6s0-.4.1-.5l.4-.5.3-.4v-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4z" />
    </svg>
  );
}
