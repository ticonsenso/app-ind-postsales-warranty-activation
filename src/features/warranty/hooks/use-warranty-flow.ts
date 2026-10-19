import { use } from 'react';

import { WarrantyFlowContext } from '../state/warranty-flow-context';

/** Access to the registration data and the actions that change it. Only valid inside the flow. */
export function useWarrantyFlow() {
  const context = use(WarrantyFlowContext);
  if (!context) {
    throw new Error('useWarrantyFlow must be used inside <WarrantyFlowProvider>.');
  }
  return context;
}
