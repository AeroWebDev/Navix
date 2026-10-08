export type ExpenseCategory =
  | 'Rent'
  | 'Salaries'
  | 'Electricity & Utilities'
  | 'Transportation'
  | 'Marketing & Ads'
  | 'Maintenance'
  | 'Office Supplies'
  | 'Software Subscriptions'
  | 'Other';

export interface Expense {
  id: string;
  expenseNumber: string;
  category: ExpenseCategory;
  title: string;
  amount: number;
  date: string;
  paymentMethod: 'cash' | 'bank_transfer' | 'credit_card' | 'company_card';
  paidTo: string;
  referenceNumber?: string;
  taxDeductible: boolean;
  receiptAttached: boolean;
  notes?: string;
  createdBy: string;
}
