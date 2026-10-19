import { useNavigate } from 'react-router';

import { ROUTES } from '@/config/routes';
import { Panel } from '@/shared/components/Panel';

import { useWarrantyActivation } from '../hooks/use-warranty-activation';
import { isInvoiceComplete } from '../schemas/invoice.schema';
import { useWarrantyFlow } from '../hooks/use-warranty-flow';

import { ActivationSuccess } from './ActivationSuccess';
import { WarrantySummary } from './WarrantySummary';

/** Step 4: review everything and register the warranty (and a new customer) in the CRM. */
export function ConfirmationStep() {
  const navigate = useNavigate();
  const { state, dispatch } = useWarrantyFlow();
  const activationRequest = useWarrantyActivation();

  const { customer, product, activation } = state;
  const error = activationRequest.state.status === 'error' ? activationRequest.state : null;
  // The layout only lets the user in with the previous steps complete; this narrows the types.
  const invoice = state.invoice && isInvoiceComplete(state.invoice) ? state.invoice : null;

  const handleActivate = async () => {
    if (!customer || !product || !invoice) return;

    const result = await activationRequest.activate({
      customer: customer.customer,
      product,
      invoice,
    });
    if (result) dispatch({ type: 'warranty-activated', activation: result });
  };

  return (
    <Panel>
      {activation ? (
        <ActivationSuccess onBackHome={() => void navigate(ROUTES.home)} />
      ) : (
        customer &&
        product &&
        invoice && (
          <WarrantySummary
            customer={customer.customer}
            product={product}
            invoice={invoice}
            isActivating={activationRequest.state.status === 'activating'}
            errorMessage={error?.message}
            errorAction={
              error?.customerAlreadyExists
                ? {
                    label: 'Volver al paso 1',
                    onClick: () => void navigate(ROUTES.warranty.identification),
                  }
                : undefined
            }
            onBack={() => void navigate(ROUTES.warranty.invoice)}
            onActivate={() => void handleActivate()}
          />
        )
      )}
    </Panel>
  );
}
