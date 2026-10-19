import { useState } from 'react';

import { useRequestSignal } from '@/shared/hooks/use-request-signal';
import { isAbortError } from '@/shared/utils/abort';

import type { Product } from '../schemas/product.schema';
import { getProductBySerialNumber } from '../api/products/products-api';

export type ProductValidationState =
  { status: 'idle' } | { status: 'validating' } | { status: 'not-found' } | { status: 'error' };

/**
 * Checks a serial number against the CRM.
 * `validate` resolves with the product when it exists, otherwise `null` (see `state` for why).
 */
export function useProductValidation() {
  const [state, setState] = useState<ProductValidationState>({ status: 'idle' });
  const { nextSignal } = useRequestSignal();

  const validate = async (serialNumber: string): Promise<Product | null> => {
    const signal = nextSignal();
    setState({ status: 'validating' });

    try {
      const product = await getProductBySerialNumber(serialNumber, signal);
      setState(product ? { status: 'idle' } : { status: 'not-found' });
      return product;
    } catch (error) {
      if (!isAbortError(error)) setState({ status: 'error' });
      return null;
    }
  };

  const reset = () => {
    setState({ status: 'idle' });
  };

  return { state, validate, reset };
}
