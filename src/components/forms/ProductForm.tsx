import React, { useState } from 'react';
import { Package, Calculator } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Product, ProductCategory, StockStatus } from '@/types/product';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/utils/formatters';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (productData: Omit<Product, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const CATEGORIES: ProductCategory[] = [
  'Electronics',
  'Office Supplies',
  'Hardware',
  'Software',
  'Services',
  'Accessories',
];

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const { suppliers } = useProducts();

  const [name, setName] = useState(initialData?.name || '');
  const [sku, setSku] = useState(
    initialData?.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const [category, setCategory] = useState<ProductCategory>(
    initialData?.category || 'Electronics'
  );
  const [costPrice, setCostPrice] = useState<number>(initialData?.costPrice ?? 50);
  const [sellingPrice, setSellingPrice] = useState<number>(initialData?.sellingPrice ?? 99);
  const [stockQuantity, setStockQuantity] = useState<number>(initialData?.stockQuantity ?? 10);
  const [minStockLevel, setMinStockLevel] = useState<number>(initialData?.minStockLevel ?? 5);
  const [supplierId, setSupplierId] = useState(
    initialData?.supplierId || (suppliers[0]?.id || '')
  );
  const [unit, setUnit] = useState(initialData?.unit || 'unit');
  const [description, setDescription] = useState(initialData?.description || '');

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Computed Margin & Profit
  const grossProfit = Math.max(0, sellingPrice - costPrice);
  const grossMargin = sellingPrice > 0 ? Math.round((grossProfit / sellingPrice) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Product name is required.';
    }

    if (!sku.trim()) {
      newErrors.sku = 'SKU is required.';
    }

    if (costPrice < 0) {
      newErrors.costPrice = 'Cost price cannot be negative.';
    }

    if (sellingPrice < 0) {
      newErrors.sellingPrice = 'Selling price cannot be negative.';
    }

    if (stockQuantity < 0) {
      newErrors.stockQuantity = 'Stock quantity cannot be negative.';
    }

    if (minStockLevel < 0) {
      newErrors.minStockLevel = 'Minimum stock level cannot be negative.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const selectedSupplier = suppliers.find((s) => s.id === supplierId);
    const supplierName = selectedSupplier?.companyName || selectedSupplier?.name || 'Authorized Vendor';

    const status: StockStatus =
      stockQuantity === 0
        ? 'out_of_stock'
        : stockQuantity <= minStockLevel
        ? 'low_stock'
        : 'in_stock';

    const payload: Omit<Product, 'id'> = {
      name: name.trim(),
      sku: sku.trim(),
      category,
      costPrice,
      sellingPrice,
      stockQuantity,
      minStockLevel,
      supplierId,
      supplierName,
      unit,
      status,
      description: description.trim() || undefined,
    };

    onSubmit(payload);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      {/* Top Details Card */}
      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-accent" />
            <h2 className="text-base font-bold text-foreground">Product Specification</h2>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
            {sku}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Product Name */}
          <div className="space-y-1 sm:col-span-2">
            <label className="font-semibold text-foreground">Product Name *</label>
            <Input
              type="text"
              placeholder="e.g. Ergonomic Office Chair"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 rounded-full text-xs"
              required
            />
            {errors.name && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.name}</p>
            )}
          </div>

          {/* SKU */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">SKU / Barcode *</label>
            <Input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="h-9 rounded-full text-xs font-mono"
              required
            />
            {errors.sku && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.sku}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Supplier */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Primary Supplier</label>
            <select
              value={supplierId}
              onChange={(e) => setSupplierId(e.target.value)}
              className="w-full h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.companyName || s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Unit of Measurement */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Unit</label>
            <Input
              type="text"
              placeholder="unit, set, box..."
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="h-9 rounded-full text-xs"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1 text-xs pt-1">
          <label className="font-semibold text-foreground">Product Description</label>
          <textarea
            rows={3}
            placeholder="Detailed product specifications, dimensions, warranty terms..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-2xl border border-input bg-card p-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </div>
      </div>

      {/* Pricing & Inventory Metrics Card */}
      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-accent" />
            <h3 className="text-sm font-bold text-foreground">Pricing & Inventory Levels</h3>
          </div>
          <span className="text-xs text-muted-foreground font-semibold">
            Margin: <span className="text-accent font-bold">{grossMargin}%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Cost Price */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Cost Price ($) *</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={costPrice}
              onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
              className="h-9 rounded-full text-xs font-mono"
            />
            {errors.costPrice && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.costPrice}</p>
            )}
          </div>

          {/* Selling Price */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Selling Price ($) *</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
              className="h-9 rounded-full text-xs font-mono"
            />
            {errors.sellingPrice && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.sellingPrice}</p>
            )}
          </div>

          {/* Initial Stock Quantity */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">On-Hand Quantity *</label>
            <Input
              type="number"
              min="0"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(parseInt(e.target.value) || 0)}
              className="h-9 rounded-full text-xs font-mono"
            />
            {errors.stockQuantity && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.stockQuantity}</p>
            )}
          </div>

          {/* Reorder Threshold */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Low Stock Threshold *</label>
            <Input
              type="number"
              min="0"
              value={minStockLevel}
              onChange={(e) => setMinStockLevel(parseInt(e.target.value) || 0)}
              className="h-9 rounded-full text-xs font-mono"
            />
            {errors.minStockLevel && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.minStockLevel}</p>
            )}
          </div>
        </div>

        {/* Financial Summary Strip */}
        <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/50 grid grid-cols-3 gap-3 text-center text-xs">
          <div>
            <span className="text-muted-foreground block text-[11px]">Unit Profit</span>
            <span className="font-mono font-bold text-foreground">{formatCurrency(grossProfit)}</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[11px]">Stock Value (Cost)</span>
            <span className="font-mono font-bold text-foreground">{formatCurrency(stockQuantity * costPrice)}</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[11px]">Stock Value (Retail)</span>
            <span className="font-mono font-bold text-accent">{formatCurrency(stockQuantity * sellingPrice)}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="rounded-full px-5 text-xs h-9"
        >
          Cancel
        </Button>
        <Button type="submit" className="rounded-full px-6 text-xs h-9 font-semibold">
          {isEditing ? 'Save Product Changes' : 'Create Catalogue Item'}
        </Button>
      </div>
    </form>
  );
};
