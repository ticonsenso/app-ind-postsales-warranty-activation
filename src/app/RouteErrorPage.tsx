import { isRouteErrorResponse, useRouteError } from 'react-router';

import { ROUTES } from '@/config/routes';
import { AppLink } from '@/shared/components/AppLink';
import { buttonClasses } from '@/shared/components/button-styles';

/**
 * Error boundary of the router: unknown paths (404) and any error thrown while rendering or
 * loading a route. It never shows technical detail to the user.
 * TODO: report `error` to the monitoring tool once one is chosen (without personal data).
 */
export function RouteErrorPage() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="grid min-h-screen place-items-center bg-page px-5 text-center">
      <div className="max-w-[440px]">
        <h1 className="mb-3 text-[27px]">
          {isNotFound ? 'No encontramos esta página' : 'Algo salió mal'}
        </h1>
        <p className="mb-6 font-light text-ink-muted">
          {isNotFound
            ? 'La dirección que abriste no existe o ya no está disponible.'
            : 'No pudimos mostrar esta página. Intenta de nuevo en unos minutos.'}
        </p>
        <AppLink href={ROUTES.home} className={buttonClasses()}>
          Volver al inicio
        </AppLink>
      </div>
    </main>
  );
}
