import { ProgressBar } from '@/shared/components/ProgressBar';

interface InvoiceReadingCardProps {
  fileName: string;
  progress: number;
  /** Thumbnail of the photo just taken; without it a placeholder stands in for the document. */
  previewUrl?: string | null;
}

/** Shown while the uploaded invoice is being read. */
export function InvoiceReadingCard({ fileName, progress, previewUrl }: InvoiceReadingCardProps) {
  return (
    <div className="mb-5 flex items-center gap-4 rounded-card border border-line bg-white p-3.5">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt=""
          className="h-24 w-[74px] shrink-0 rounded-field border border-line object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="relative h-24 w-[74px] shrink-0 overflow-hidden rounded-field border border-line bg-[repeating-linear-gradient(180deg,var(--color-white)_0_7px,var(--color-muted)_7px_9px)] after:absolute after:inset-x-2.5 after:top-2 after:h-[9px] after:rounded-xs after:bg-line"
        />
      )}
      <div className="min-w-0 flex-1" role="status">
        <h3 className="truncate text-[15.5px]">{fileName}</h3>
        <p className="text-sm font-light text-ink-muted">Leyendo el comprobante…</p>
        <ProgressBar value={progress} label="Progreso de lectura de la factura" />
      </div>
    </div>
  );
}
