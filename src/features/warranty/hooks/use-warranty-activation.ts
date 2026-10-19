import { useRef, useState } from 'react';

import { isApiError } from '@/shared/api/api-error';
import { useRequestSignal } from '@/shared/hooks/use-request-signal';
import { isAbortError } from '@/shared/utils/abort';

import { GENERIC_ERROR_MESSAGE } from '../constants';
import type { Activation, ActivationRequest } from '../schemas/activation.schema';
import { createWarranty } from '../api/warranties/warranties-api';

const CLIENT_ALREADY_EXISTS = 'CLIENT_ALREADY_EXISTS';

/** Backend codes the user can act on; anything else shows the generic message. */
const ERROR_MESSAGES: Readonly<Record<string, string | undefined>> = {
  PURCHASE_DATE_IN_FUTURE:
    'La fecha de compra de la factura es posterior a hoy. Revisa el comprobante y súbelo de nuevo.',
  TOO_MANY_REQUESTS: 'Hiciste demasiados intentos. Espera unos minutos y vuelve a intentarlo.',
  [CLIENT_ALREADY_EXISTS]:
    'Ya existe un cliente registrado con tu identificación. Vuelve al paso 1 y busca tus datos de nuevo.',
};

function toErrorMessage(error: unknown): string {
  return (isApiError(error) && ERROR_MESSAGES[error.code]) || GENERIC_ERROR_MESSAGE;
}

function fingerprintOf({ customer, product, invoice }: ActivationRequest): string {
  const { file, ...invoiceData } = invoice;
  // The whole customer: a new one is registered with the warranty, so any change is a new attempt.
  return JSON.stringify([
    customer,
    product.id,
    product.serialNumber,
    invoiceData,
    [file.name, file.size, file.lastModified],
  ]);
}

export type WarrantyActivationState =
  | { status: 'idle' }
  | { status: 'activating' }
  | {
      status: 'error';
      message: string;
      /** The new customer's identification was registered meanwhile: they must search again. */
      customerAlreadyExists: boolean;
    };

/**
 * Registers the warranty (and a new customer with it). `activate` resolves with the activation,
 * or `null` when it failed.
 *
 * Each attempt sends an idempotency key. The key is kept while the data does not change, so
 * retrying after a network failure cannot register the warranty twice.
 */
export function useWarrantyActivation() {
  const [state, setState] = useState<WarrantyActivationState>({ status: 'idle' });
  const { nextSignal } = useRequestSignal();
  const attemptRef = useRef<{ fingerprint: string; key: string } | null>(null);

  const keyFor = (request: ActivationRequest): string => {
    const fingerprint = fingerprintOf(request);
    if (attemptRef.current?.fingerprint !== fingerprint) {
      attemptRef.current = { fingerprint, key: crypto.randomUUID() };
    }
    return attemptRef.current.key;
  };

  const activate = async (request: ActivationRequest): Promise<Activation | null> => {
    const signal = nextSignal();
    setState({ status: 'activating' });

    try {
      const activation = await createWarranty(request, keyFor(request), signal);
      setState({ status: 'idle' });
      return activation;
    } catch (error) {
      if (!isAbortError(error)) {
        setState({
          status: 'error',
          message: toErrorMessage(error),
          customerAlreadyExists: isApiError(error, CLIENT_ALREADY_EXISTS),
        });
      }
      return null;
    }
  };

  return { state, activate };
}
