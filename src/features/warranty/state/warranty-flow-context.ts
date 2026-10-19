import { createContext, type Dispatch } from 'react';

import type { WarrantyFlowAction, WarrantyFlowState } from './warranty-flow-reducer';

export interface WarrantyFlowContextValue {
  state: WarrantyFlowState;
  dispatch: Dispatch<WarrantyFlowAction>;
}

export const WarrantyFlowContext = createContext<WarrantyFlowContextValue | null>(null);
