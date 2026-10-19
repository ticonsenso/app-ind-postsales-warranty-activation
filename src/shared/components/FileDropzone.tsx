import clsx from 'clsx';
import { Upload } from 'lucide-react';
import { useState, type ChangeEvent, type DragEvent } from 'react';

import { buttonClasses } from './button-styles';
import { IconBadge } from './IconBadge';

interface FileDropzoneProps {
  /** Value for the native `accept` attribute (e.g. `image/jpeg,application/pdf`). */
  accept: string;
  title: string;
  description: string;
  actionLabel: string;
  disabled?: boolean;
  /** Called with the picked or dropped file. Validating it is the caller's job. */
  onFileSelected: (file: File) => void;
}

/**
 * Click-or-drop file picker. The whole area is a `<label>` around a visually hidden file input,
 * so it is reachable and operable with the keyboard like any native file field.
 */
export function FileDropzone({
  accept,
  title,
  description,
  actionLabel,
  disabled = false,
  onFileSelected,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.item(0);
    if (file) onFileSelected(file);
    // Lets the user pick the same file again after removing it.
    event.currentTarget.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files.item(0);
    if (file && !disabled) onFileSelected(file);
  };

  return (
    <label
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => {
        setIsDragging(false);
      }}
      onDrop={handleDrop}
      className={clsx(
        'block cursor-pointer rounded-card border-[1.5px] border-dashed border-accent px-5 py-[34px] text-center transition-colors focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-accent',
        isDragging ? 'bg-accent/10' : 'bg-accent/5 hover:bg-accent/10',
        disabled && 'pointer-events-none opacity-60',
      )}
    >
      <input
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
      />
      <IconBadge tone="outlined" size="xl" className="mx-auto mb-3.5">
        <Upload className="size-[26px]" />
      </IconBadge>
      <span className="mb-1 block font-display text-[17px] font-bold text-ink">{title}</span>
      <span className="block text-sm font-light text-ink-muted">{description}</span>
      <span className={clsx(buttonClasses(), 'mt-4')}>{actionLabel}</span>
    </label>
  );
}
