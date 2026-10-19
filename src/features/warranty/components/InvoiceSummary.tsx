import { Lock } from 'lucide-react';

import { ActionRow } from '@/shared/components/ActionRow';
import { Alert } from '@/shared/components/Alert';
import { Button } from '@/shared/components/Button';
import { DataList, type DataListItem } from '@/shared/components/DataList';
import { formatLongDate } from '@/shared/utils/format-date';

import { isInvoiceComplete, type InvoiceData } from '../schemas/invoice.schema';

const UNREAD_LABEL = 'No pudimos leerlo';

function readValue(value: string | null): Pick<DataListItem, 'value' | 'tone'> {
  return value === null ? { value: UNREAD_LABEL, tone: 'danger' } : { value };
}

interface InvoiceSummaryProps {
  invoice: InvoiceData;
  onReplace: () => void;
  onContinue: () => void;
}

/** Data read from the invoice, for the customer to check against their receipt. */
export function InvoiceSummary({ invoice, onReplace, onContinue }: InvoiceSummaryProps) {
  const isComplete = isInvoiceComplete(invoice);

  return (
    <div>
      {isComplete ? (
        <Alert tone="success">
          Leímos la factura correctamente. Verifica que los datos coincidan con tu comprobante.
        </Alert>
      ) : (
        <Alert tone="error">
          No pudimos leer todos los datos de la factura. Sube una foto más nítida, con el
          comprobante completo.
        </Alert>
      )}

      <DataList
        items={[
          {
            label: 'Fecha de compra',
            ...readValue(invoice.purchaseDate && formatLongDate(invoice.purchaseDate)),
          },
          { label: 'Número de comprobante', ...readValue(invoice.receiptNumber) },
          { label: 'Emisor', ...readValue(invoice.issuer) },
        ]}
      />
      <p className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-light text-ink-muted">
        <Lock className="size-[13px]" />
        Los datos se toman del comprobante y no pueden editarse.
      </p>

      <ActionRow>
        <Button variant="secondary" onClick={onReplace}>
          Subir otra factura
        </Button>
        <Button onClick={onContinue} disabled={!isComplete}>
          Continuar
        </Button>
      </ActionRow>
    </div>
  );
}
