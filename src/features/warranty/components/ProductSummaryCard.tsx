import { Package } from 'lucide-react';

import { IconBadge } from '@/shared/components/IconBadge';

import type { Product } from '../schemas/product.schema';

/**
 * Name of the identified product, with the serial of the unit or, when the serial was not
 * recognized and the product was found by its SAP code, that code.
 */
export function ProductSummaryCard({ product }: { product: Product }) {
  return (
    <div className="flex items-center gap-4 rounded-card border border-line bg-white p-3.5">
      <IconBadge tone="brand" size="xl">
        <Package className="size-7" />
      </IconBadge>
      <div className="min-w-0">
        <h3 className="mb-0.5 text-base">{product.name}</h3>
        <p className="text-sm font-light text-ink-muted">
          {product.identifiedBy === 'sap-code'
            ? `SAP ${product.code}`
            : `Serie ${product.serialNumber}`}
        </p>
      </div>
    </div>
  );
}
