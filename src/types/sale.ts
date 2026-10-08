export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'cancelled';
export type PaymentMethod = 'cash' | 'credit_card' | 'bank_transfer' | 'cheque';

export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  taxRate: number;
  total: number;
}

export interface Sale {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  date: string;
  dueDate: string;
  items: SaleItem[];
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  grandTotal: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdBy: string;
}
