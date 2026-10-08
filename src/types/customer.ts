export type CustomerType = 'business' | 'individual';

export interface Customer {
  id: string;
  customerNumber: string;
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  address: string;
  taxNumber?: string;
  type: CustomerType;
  outstandingBalance: number;
  totalSpent: number;
  ordersCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}
