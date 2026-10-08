export type PurchaseStatus = 'ordered' | 'received' | 'partially_received' | 'cancelled';

export interface PurchaseItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitCost: number;
  taxRate: number;
  total: number;
}

export interface Purchase {
  id: string;
  purchaseOrderNumber: string;
  supplierId: string;
  supplierName: string;
  orderDate: string;
  expectedDate: string;
  items: PurchaseItem[];
  subtotal: number;
  taxTotal: number;
  grandTotal: number;
  status: PurchaseStatus;
  paymentStatus: 'paid' | 'pending' | 'partially_paid';
  notes?: string;
  createdBy: string;
}
