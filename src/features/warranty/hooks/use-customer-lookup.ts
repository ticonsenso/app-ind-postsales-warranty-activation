import { useState } from 'react';

import { useRequestSignal } from '@/shared/hooks/use-request-signal';
import { isAbortError } from '@/shared/utils/abort';

import type { Customer, CustomerLookupResult } from '../schemas/customer.schema';
import { getCustomer } from '../api/clients/clients-api';
import type { IdentifiedCustomer } from '../state/warranty-flow-reducer';

export type CustomerLookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'found'; customer: Customer }
  | { status: 'not-found' }
  | { status: 'error' };

function toInitialState(initial: IdentifiedCustomer | null): CustomerLookupState {
  if (!initial) return { status: 'idle' };
  return initial.isExisting
    ? { status: 'found', customer: initial.customer }
    : { status: 'not-found' };
}

/**
 * Looks a customer up by document number.
 * `lookup` resolves with the result, or `null` when the request failed or was superseded.
 *
 * @param initial - Previously identified customer, used to restore the state when coming back to the step.
 */
export function useCustomerLookup(initial: IdentifiedCustomer | null) {
  const [state, setState] = useState<CustomerLookupState>(() => toInitialState(initial));
  const { nextSignal } = useRequestSignal();

  const lookup = async (documentNumber: string): Promise<CustomerLookupResult | null> => {
    const signal = nextSignal();
    setState({ status: 'loading' });

    try {
      const result = await getCustomer(documentNumber, signal);
      setState(
        result.found ? { status: 'found', customer: result.customer } : { status: 'not-found' },
      );
      return result;
    } catch (error) {
      if (!isAbortError(error)) setState({ status: 'error' });
      return null;
    }
  };

  const reset = () => {
    setState({ status: 'idle' });
  };

  return { state, lookup, reset };
}
