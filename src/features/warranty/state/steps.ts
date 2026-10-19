import { ROUTES } from '@/config/routes';

import { isInvoiceComplete } from '../schemas/invoice.schema';

import type { WarrantyFlowState } from './warranty-flow-reducer';

export const WARRANTY_STEPS = [
  { id: 'identification', label: 'Identificación', path: ROUTES.warranty.identification },
  { id: 'product', label: 'Producto', path: ROUTES.warranty.product },
  { id: 'invoice', label: 'Factura', path: ROUTES.warranty.invoice },
  { id: 'confirmation', label: 'Confirmación', path: ROUTES.warranty.confirmation },
] as const;

export type WarrantyStep = (typeof WARRANTY_STEPS)[number];
export type WarrantyStepId = WarrantyStep['id'];

export function findStepByPath(pathname: string): WarrantyStep | undefined {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return WARRANTY_STEPS.find((step) => step.path === normalized);
}

function indexOfStep(id: WarrantyStepId): number {
  return WARRANTY_STEPS.findIndex((step) => step.id === id);
}

function firstIncompleteId(state: WarrantyFlowState): WarrantyStepId {
  if (state.activation) return 'confirmation';
  if (!state.customer) return 'identification';
  if (!state.product) return 'product';
  if (!state.invoice || !isInvoiceComplete(state.invoice)) return 'invoice';
  return 'confirmation';
}

/** First step whose data is still missing. After activation, the only step left is the last one. */
export function getFirstIncompleteStep(state: WarrantyFlowState): WarrantyStep {
  const id = firstIncompleteId(state);
  return WARRANTY_STEPS.find((step) => step.id === id) ?? WARRANTY_STEPS[0];
}

/** A step is reachable when every previous step is complete. Nothing is editable once activated. */
export function canAccessStep(state: WarrantyFlowState, id: WarrantyStepId): boolean {
  if (state.activation) return id === 'confirmation';
  return indexOfStep(id) <= indexOfStep(getFirstIncompleteStep(state).id);
}
