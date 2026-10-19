import { ActionRow } from '@/shared/components/ActionRow';
import { Alert } from '@/shared/components/Alert';
import { Button } from '@/shared/components/Button';
import { DataList } from '@/shared/components/DataList';
import { PanelHeader } from '@/shared/components/Panel';
import { formatShortDate } from '@/shared/utils/format-date';

import type { Customer } from '../schemas/customer.schema';
import type { CompleteInvoiceData } from '../schemas/invoice.schema';
import type { Product } from '../schemas/product.schema';

interface WarrantySummaryProps {
  customer: Customer;
  product: Product;
  invoice: CompleteInvoiceData;
  isActivating: boolean;
  /** Why the last activation attempt failed, if it did. */
  errorMessage?: string | undefined;
  /** What the customer can do about that failure, when it is not just retrying. */
  errorAction?: { label: string; onClick: () => void } | undefined;
  onBack: () => void;
  onActivate: () => void;
}

/** Last review of everything the customer entered, before activating the warranty. */
export function WarrantySummary({
  customer,
  product,
  invoice,
  isActivating,
  errorMessage,
  errorAction,
  onBack,
  onActivate,
}: WarrantySummaryProps) {
  return (
    <div>
      <PanelHeader
        title="Revisa antes de activar"
        description="Una vez activada, la garantía queda asociada a este número de serie y no puede transferirse."
      />
      <DataList
        className="mb-5"
        items={[
          { label: 'Titular', value: `${customer.firstName} ${customer.lastName}` },
          { label: 'Documento', value: customer.documentNumber },
          { label: 'Contacto', value: customer.email },
          { label: 'Producto', value: product.name },
          { label: 'Número de serie', value: product.serialNumber },
          { label: 'Fecha de compra', value: formatShortDate(invoice.purchaseDate) },
          { label: 'Número de comprobante', value: invoice.receiptNumber },
          { label: 'Emisor', value: invoice.issuer },
        ]}
      />

      {errorMessage && <Alert tone="error">{errorMessage}</Alert>}
      {errorAction && (
        <Button variant="secondary" size="sm" className="mt-3" onClick={errorAction.onClick}>
          {errorAction.label}
        </Button>
      )}

      <ActionRow>
        <Button variant="secondary" onClick={onBack} disabled={isActivating}>
          Atrás
        </Button>
        <Button onClick={onActivate} loading={isActivating}>
          Activar garantía
        </Button>
      </ActionRow>
    </div>
  );
}
