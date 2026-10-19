import { Navigate, Outlet, useLocation } from 'react-router';

import { ROUTES } from '@/config/routes';
import { Container } from '@/shared/components/Container';
import { SiteHeader } from '@/shared/components/SiteHeader';

import { useWarrantyFlow } from '../hooks/use-warranty-flow';
import { canAccessStep, findStepByPath, getFirstIncompleteStep } from '../state/steps';
import { WarrantyFlowProvider } from '../state/WarrantyFlowProvider';

import { WarrantyFooter } from './WarrantyFooter';
import { WarrantyStepper } from './WarrantyStepper';

/**
 * Sends the user back to the first incomplete step when they open a step out of order
 * (e.g. by typing the URL). This is UX only: the backend validates the whole registration again.
 */
function WarrantyShell() {
  const { pathname } = useLocation();
  const { state } = useWarrantyFlow();

  const step = findStepByPath(pathname);
  if (step && !canAccessStep(state, step.id)) {
    return <Navigate to={getFirstIncompleteStep(state).path} replace />;
  }

  return (
    <main>
      <WarrantyStepper />
      <Outlet />
    </main>
  );
}

/** Layout of the warranty registration: header, stepper, current step and footer. */
export function WarrantyLayout() {
  return (
    <WarrantyFlowProvider>
      <div className="min-h-screen bg-page">
        <SiteHeader tone="light" linkLabel="Volver a posventa" linkHref={ROUTES.home} />
        <Container size="narrow">
          <WarrantyShell />
          <WarrantyFooter />
        </Container>
      </div>
    </WarrantyFlowProvider>
  );
}
