export interface Supplier {
  id: string;
  supplierNumber: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  taxNumber?: string;
  paymentTerms: string;
  outstandingPayable: number;
  totalPurchased: number;
  status: 'active' | 'inactive';
}
