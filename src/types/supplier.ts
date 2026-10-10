export interface Supplier {
  id: string;
  supplierNumber: string;
  name?: string;
  companyName: string;
  contactPerson?: string;
  email: string;
  phone: string;
  address: string;
  taxNumber?: string;
  category?: string;
  paymentTerms: string;
  outstandingPayable?: number;
  amountOwed?: number;
  totalPurchased: number;
  status: 'active' | 'inactive';
}
