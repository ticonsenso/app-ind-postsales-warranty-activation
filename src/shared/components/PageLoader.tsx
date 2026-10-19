import { LoaderCircle } from 'lucide-react';

/** Full-page loading state, used while a lazy route chunk is downloading. */
export function PageLoader() {
  return (
    <div role="status" className="grid min-h-screen place-items-center bg-page">
      <LoaderCircle className="size-9 animate-spin text-primary" />
      <span className="sr-only">Cargando…</span>
    </div>
  );
}
