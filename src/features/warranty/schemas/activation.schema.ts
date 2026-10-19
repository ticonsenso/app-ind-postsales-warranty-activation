import type { Customer } from './customer.schema';
import type { CompleteInvoiceData, ExtractedInvoice } from './invoice.schema';
import type { Product } from './product.schema';

/** Everything the backend needs to register a warranty. */
export interface ActivationRequest {
  customer: Customer;
  product: Product;
  invoice: ExtractedInvoice & CompleteInvoiceData;
}

/** Warranty registered in the CRM. */
export interface Activation {
  /** `Id` of the warranty (`INDProductoEnCliente`) in the CRM. */
  warrantyId: string;
}
