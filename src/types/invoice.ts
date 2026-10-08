export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft' | 'cancelled';

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  taxRatePercent: number;
  lineTotal: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerTaxNumber?: string;
  items: InvoiceLineItem[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  total: number;
  status: InvoiceStatus;
  paymentTerms: string;
  notes?: string;
  paymentMethod?: string;
  paidDate?: string;
}
