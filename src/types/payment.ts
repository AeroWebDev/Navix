export type PaymentDirection = 'inflow' | 'outflow'; // inflow (customer payment), outflow (supplier/vendor/expense)
export type PaymentMode = 'cash' | 'credit_card' | 'bank_transfer' | 'cheque' | 'online';

export interface Payment {
  id: string;
  paymentNumber: string;
  direction: PaymentDirection;
  partyName: string; // Customer or Supplier or Payee
  relatedDocumentType: 'invoice' | 'purchase' | 'expense' | 'other';
  relatedDocumentNumber?: string;
  amount: number;
  date: string;
  paymentMode: PaymentMode;
  referenceNumber?: string;
  status: 'completed' | 'pending' | 'failed';
  notes?: string;
}
