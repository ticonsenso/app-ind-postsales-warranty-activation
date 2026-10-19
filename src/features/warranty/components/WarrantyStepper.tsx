import { useLocation } from 'react-router';

import { Stepper } from '@/shared/components/Stepper';

import { findStepByPath, WARRANTY_STEPS } from '../state/steps';

/** Stepper wired to the current route. */
export function WarrantyStepper() {
  const { pathname } = useLocation();
  const current = findStepByPath(pathname);
  const currentIndex = WARRANTY_STEPS.findIndex((step) => step.id === current?.id);

  return <Stepper steps={WARRANTY_STEPS} currentIndex={Math.max(currentIndex, 0)} />;
}
