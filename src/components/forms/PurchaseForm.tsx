import React, { useState } from 'react';
import { Plus, Trash2, Truck, Calculator } from 'lucide-react';
import { usePurchases } from '@/hooks/usePurchases';
import { Purchase, PurchaseStatus } from '@/types/purchase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/utils/formatters';

interface PurchaseFormProps {
  initialData?: Purchase;
  onSubmit: (purchaseData: Omit<Purchase, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

interface FormPurchaseItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitCost: number;
  taxRate: number; // e.g. 0.05 for 5%
  total: number;
}

export const PurchaseForm: React.FC<PurchaseFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const { suppliers, products } = usePurchases();

  // Primary PO Fields
  const [purchaseOrderNumber] = useState(
    initialData?.purchaseOrderNumber || `PO-2025-${Math.floor(100 + Math.random() * 900)}`
  );
  const [supplierId, setSupplierId] = useState(initialData?.supplierId || '');
  const [supplierName, setSupplierName] = useState(initialData?.supplierName || '');
  const [orderDate, setOrderDate] = useState(
    initialData?.orderDate || new Date().toISOString().split('T')[0]
  );
  const [expectedDate, setExpectedDate] = useState(
    initialData?.expectedDate ||
      new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  );
  const [status, setStatus] = useState<PurchaseStatus>(
    initialData?.status || 'ordered'
  );
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'pending' | 'partially_paid'>(
    initialData?.paymentStatus || 'pending'
  );
  const [notes, setNotes] = useState(initialData?.notes || '');

  // Line items state
  const [items, setItems] = useState<FormPurchaseItem[]>(() => {
    if (initialData?.items && initialData.items.length > 0) {
      return initialData.items.map((i) => ({
        id: i.id || `poi-${Math.random()}`,
        productId: i.productId,
        productName: i.productName,
        sku: i.sku,
        quantity: i.quantity,
        unitCost: i.unitCost,
        taxRate: i.taxRate ?? 0.05,
        total: i.total,
      }));
    }
    const defaultProduct = products[0];
    const unitCost = defaultProduct?.costPrice || 100;
    const taxRate = 0.05;
    return [
      {
        id: `poi-1`,
        productId: defaultProduct?.id || '',
        productName: defaultProduct?.name || 'Default Hardware',
        sku: defaultProduct?.sku || 'SKU-001',
        quantity: 1,
        unitCost,
        taxRate,
        total: Math.round(unitCost * (1 + taxRate) * 100) / 100,
      },
    ];
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync supplier name when supplierId changes
  const handleSupplierChange = (id: string) => {
    setSupplierId(id);
    const found = suppliers.find((s) => s.id === id);
    if (found) {
      setSupplierName(found.companyName || found.name || 'Vendor');
    }
  };

  // Recalculate item line total
  const computeItemTotal = (qty: number, cost: number, taxRate: number) => {
    const raw = Math.max(0, qty * cost);
    return Math.round(raw * (1 + taxRate) * 100) / 100;
  };

  const handleProductChange = (index: number, prodId: string) => {
    const prod = products.find((p) => p.id === prodId);
    if (!prod) return;

    setItems((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        const newTotal = computeItemTotal(item.quantity, prod.costPrice, item.taxRate);
        return {
          ...item,
          productId: prod.id,
          productName: prod.name,
          sku: prod.sku,
          unitCost: prod.costPrice,
          total: newTotal,
        };
      })
    );
  };

  const handleItemFieldChange = (
    index: number,
    field: 'quantity' | 'unitCost' | 'taxRate',
    val: number
  ) => {
    setItems((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        const updated = { ...item, [field]: val };
        updated.total = computeItemTotal(
          updated.quantity,
          updated.unitCost,
          updated.taxRate
        );
        return updated;
      })
    );
  };

  const handleAddItem = () => {
    const prod = products[0];
    const unitCost = prod?.costPrice || 100;
    const taxRate = 0.05;
    const newItem: FormPurchaseItem = {
      id: `item-${Date.now()}-${items.length + 1}`,
      productId: prod?.id || '',
      productName: prod?.name || 'Supply Item',
      sku: prod?.sku || 'SKU-000',
      quantity: 1,
      unitCost,
      taxRate,
      total: Math.round(unitCost * (1 + taxRate) * 100) / 100,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) {
      setErrors({ items: 'At least one line item is required in a purchase order.' });
      return;
    }
    setItems(items.filter((_, idx) => idx !== index));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.items;
      return copy;
    });
  };

  // Grand totals
  const subtotal = items.reduce((acc, i) => acc + i.quantity * i.unitCost, 0);
  const taxTotal = items.reduce(
    (acc, i) => acc + i.quantity * i.unitCost * i.taxRate,
    0
  );
  const grandTotal = Math.round((subtotal + taxTotal) * 100) / 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!supplierId) {
      newErrors.supplier = 'Please select a supplier for this purchase order.';
    }

    if (items.length === 0) {
      newErrors.items = 'At least one line item is required.';
    }

    items.forEach((item, idx) => {
      if (item.quantity <= 0) {
        newErrors[`item_qty_${idx}`] = 'Quantity must be at least 1.';
      }
      if (item.unitCost < 0) {
        newErrors[`item_cost_${idx}`] = 'Unit cost cannot be negative.';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const purchasePayload: Omit<Purchase, 'id'> = {
      purchaseOrderNumber,
      supplierId,
      supplierName,
      orderDate,
      expectedDate,
      items: items.map((i) => ({ ...i })),
      subtotal: Math.round(subtotal * 100) / 100,
      taxTotal: Math.round(taxTotal * 100) / 100,
      grandTotal,
      status,
      paymentStatus,
      notes: notes || undefined,
      createdBy: 'Alexander Hayes',
    };

    onSubmit(purchasePayload);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      {/* Top Details Card */}
      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-accent" />
            <h2 className="text-base font-bold text-foreground">Purchase Order Details</h2>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
            {purchaseOrderNumber}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Supplier Selector */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Supplier *</label>
            <select
              value={supplierId}
              onChange={(e) => handleSupplierChange(e.target.value)}
              className="w-full h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              required
            >
              <option value="">Select supplier...</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.companyName || s.name} ({s.category || 'Vendor'})
                </option>
              ))}
            </select>
            {errors.supplier && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.supplier}</p>
            )}
          </div>

          {/* Order Date */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Order Date *</label>
            <Input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="h-9 rounded-full text-xs"
              required
            />
          </div>

          {/* Expected Date */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Expected Delivery</label>
            <Input
              type="date"
              value={expectedDate}
              onChange={(e) => setExpectedDate(e.target.value)}
              className="h-9 rounded-full text-xs"
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Fulfillment Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PurchaseStatus)}
              className="w-full h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent capitalize"
            >
              <option value="ordered">Ordered</option>
              <option value="received">Received</option>
              <option value="partially_received">Partially Received</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-2">
          {/* Payment Status */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as any)}
              className="w-full h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent capitalize"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="partially_paid">Partially Paid</option>
            </select>
          </div>

          {/* Notes */}
          <div className="space-y-1 sm:col-span-3">
            <label className="font-semibold text-foreground">Internal Notes</label>
            <Input
              type="text"
              placeholder="e.g. Expedited shipping, warehouse dock 3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-9 rounded-full text-xs"
            />
          </div>
        </div>
      </div>

      {/* Line Items Card */}
      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <div>
            <h3 className="text-sm font-bold text-foreground">Order Items & Inventory</h3>
            <p className="text-[11px] text-muted-foreground">
              Select catalogue items and quantities to purchase from vendor.
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleAddItem}
            className="rounded-full text-xs gap-1.5 h-8 px-3"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Item
          </Button>
        </div>

        {errors.items && (
          <p className="text-[11px] text-rose-600 font-semibold">{errors.items}</p>
        )}

        {/* Responsive Table / Item rows */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground">
                <th className="pb-2 font-semibold">Product</th>
                <th className="pb-2 font-semibold w-24">SKU</th>
                <th className="pb-2 font-semibold w-20">Qty</th>
                <th className="pb-2 font-semibold w-28">Unit Cost ($)</th>
                <th className="pb-2 font-semibold w-24">Tax Rate</th>
                <th className="pb-2 font-semibold w-28 text-right">Total</th>
                <th className="pb-2 font-semibold w-12 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {items.map((item, idx) => (
                <tr key={item.id} className="group">
                  <td className="py-2.5 pr-2">
                    <select
                      value={item.productId}
                      onChange={(e) => handleProductChange(idx, e.target.value)}
                      className="w-full h-8 rounded-full border border-input bg-card px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2.5 pr-2 font-mono text-[11px] text-muted-foreground">
                    {item.sku}
                  </td>
                  <td className="py-2.5 pr-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemFieldChange(idx, 'quantity', parseInt(e.target.value) || 0)
                      }
                      className="h-8 rounded-full text-xs px-2"
                    />
                    {errors[`item_qty_${idx}`] && (
                      <p className="text-[10px] text-rose-600 font-semibold mt-0.5">
                        {errors[`item_qty_${idx}`]}
                      </p>
                    )}
                  </td>
                  <td className="py-2.5 pr-2">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitCost}
                      onChange={(e) =>
                        handleItemFieldChange(idx, 'unitCost', parseFloat(e.target.value) || 0)
                      }
                      className="h-8 rounded-full text-xs px-2"
                    />
                    {errors[`item_cost_${idx}`] && (
                      <p className="text-[10px] text-rose-600 font-semibold mt-0.5">
                        {errors[`item_cost_${idx}`]}
                      </p>
                    )}
                  </td>
                  <td className="py-2.5 pr-2">
                    <select
                      value={item.taxRate}
                      onChange={(e) =>
                        handleItemFieldChange(idx, 'taxRate', parseFloat(e.target.value) || 0)
                      }
                      className="w-full h-8 rounded-full border border-input bg-card px-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    >
                      <option value="0">0% (Zero)</option>
                      <option value="0.05">5% (Standard)</option>
                      <option value="0.10">10%</option>
                      <option value="0.15">15%</option>
                    </select>
                  </td>
                  <td className="py-2.5 pr-2 text-right font-semibold font-mono text-foreground">
                    {formatCurrency(item.total)}
                  </td>
                  <td className="py-2.5 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      disabled={items.length <= 1}
                      className="text-muted-foreground hover:text-rose-600 disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation summary card */}
        <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row justify-end items-end gap-4">
          <div className="w-full sm:w-72 p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 pb-1 border-b border-border/50 text-foreground font-semibold">
              <Calculator className="h-3.5 w-3.5 text-accent" />
              <span>Cost Summary</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-mono text-foreground">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax Total</span>
              <span className="font-mono text-foreground">{formatCurrency(taxTotal)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border/60 font-bold text-sm text-foreground">
              <span>Grand Total</span>
              <span className="font-mono text-accent">{formatCurrency(grandTotal)}</span>
            </div>
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
          {isEditing ? 'Save Purchase Order' : 'Create Purchase Order'}
        </Button>
      </div>
    </form>
  );
};
