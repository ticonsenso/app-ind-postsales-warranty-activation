import { useState } from 'react';

import { useRequestSignal } from '@/shared/hooks/use-request-signal';
import { isAbortError } from '@/shared/utils/abort';

import { getProductBySapCode } from '../api/products/products-api';
import type { Product } from '../schemas/product.schema';

export type SapCodeLookupState =
  { status: 'idle' } | { status: 'searching' } | { status: 'not-found' } | { status: 'error' };

/**
 * Looks up a product by its SAP code, for serials SAP does not know.
 * `lookup` resolves with the product when it exists, otherwise `null` (see `state` for why).
 */
export function useSapCodeLookup() {
  const [state, setState] = useState<SapCodeLookupState>({ status: 'idle' });
  const { nextSignal } = useRequestSignal();

  const lookup = async (sapCode: string, serialNumber: string): Promise<Product | null> => {
    const signal = nextSignal();
    setState({ status: 'searching' });

    try {
      const product = await getProductBySapCode(sapCode, serialNumber, signal);
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

  return { state, lookup, reset };
}
