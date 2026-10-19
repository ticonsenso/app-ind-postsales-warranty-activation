import type { Activation } from '../schemas/activation.schema';
import type { Customer } from '../schemas/customer.schema';
import type { ExtractedInvoice } from '../schemas/invoice.schema';
import type { Product } from '../schemas/product.schema';

/** The customer of step 1 and whether Indurama already knew them (drives which form is shown). */
export interface IdentifiedCustomer {
  customer: Customer;
  isExisting: boolean;
}

/**
 * Data collected across the steps. It lives in memory only: it holds personal data, so it is
 * never persisted to `localStorage`/`sessionStorage`.
 */
export interface WarrantyFlowState {
  customer: IdentifiedCustomer | null;
  product: Product | null;
  invoice: ExtractedInvoice | null;
  activation: Activation | null;
}

export const INITIAL_WARRANTY_FLOW_STATE: WarrantyFlowState = {
  customer: null,
  product: null,
  invoice: null,
  activation: null,
};

export type WarrantyFlowAction =
  | { type: 'customer-identified'; identified: IdentifiedCustomer }
  | { type: 'product-validated'; product: Product }
  | { type: 'product-cleared' }
  | { type: 'invoice-extracted'; invoice: ExtractedInvoice }
  | { type: 'invoice-cleared' }
  | { type: 'warranty-activated'; activation: Activation };

export function warrantyFlowReducer(
  state: WarrantyFlowState,
  action: WarrantyFlowAction,
): WarrantyFlowState {
  switch (action.type) {
    case 'customer-identified':
      return { ...state, customer: action.identified };
    case 'product-validated':
      return { ...state, product: action.product };
    case 'product-cleared':
      return { ...state, product: null };
    case 'invoice-extracted':
      return { ...state, invoice: action.invoice };
    case 'invoice-cleared':
      return { ...state, invoice: null };
    case 'warranty-activated':
      return { ...state, activation: action.activation };
  }
}
