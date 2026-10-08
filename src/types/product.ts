export type ProductCategory =
  | 'Electronics'
  | 'Office Supplies'
  | 'Hardware'
  | 'Software'
  | 'Services'
  | 'Accessories';

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  minStockLevel: number;
  supplierId: string;
  supplierName: string;
  unit: string;
  status: StockStatus;
  description?: string;
}

export interface StockAdjustment {
  id: string;
  productId: string;
  productName: string;
  previousQuantity: number;
  newQuantity: number;
  reason: 'restock' | 'damage' | 'inventory_audit' | 'return';
  adjustedBy: string;
  date: string;
  notes?: string;
}
