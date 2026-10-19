import { useMemo, useReducer, type ReactNode } from 'react';

import { WarrantyFlowContext } from './warranty-flow-context';
import { INITIAL_WARRANTY_FLOW_STATE, warrantyFlowReducer } from './warranty-flow-reducer';

/**
 * Holds the data of one warranty registration. Mount it on the flow's layout route: leaving the
 * flow unmounts the provider, which discards the personal data automatically.
 */
export function WarrantyFlowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(warrantyFlowReducer, INITIAL_WARRANTY_FLOW_STATE);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <WarrantyFlowContext value={value}>{children}</WarrantyFlowContext>;
}
