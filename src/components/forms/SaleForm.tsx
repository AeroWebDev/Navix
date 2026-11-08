import React, { useState } from 'react';
import { Plus, Trash2, ShoppingCart, Calculator } from 'lucide-react';
import { useSales } from '@/hooks/useSales';
import { Sale, PaymentMethod, PaymentStatus } from '@/types/sale';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/utils/formatters';

interface SaleFormProps {
  initialData?: Sale;
  onSubmit: (saleData: Omit<Sale, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

interface FormLineItem {
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

export const SaleForm: React.FC<SaleFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const { customers, products } = useSales();

  // Basic fields
  const [customerId, setCustomerId] = useState(initialData?.customerId || (customers[0]?.id || ''));
  const [customerName, setCustomerName] = useState(
    initialData?.customerName || (customers[0]?.name || '')
  );
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate ||
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    initialData?.paymentMethod || 'credit_card'
  );
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    initialData?.paymentStatus || 'paid'
  );
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [invoiceNumber] = useState(
    initialData?.invoiceNumber || `INV-2025-${Math.floor(100 + Math.random() * 900)}`
  );

  // Line items
  const [items, setItems] = useState<FormLineItem[]>(() => {
    if (initialData?.items && initialData.items.length > 0) {
      return initialData.items.map((i) => ({ ...i }));
    }
    const defaultProd = products[0];
    return [
      {
        id: 'item-1',
        productId: defaultProd?.id || 'prod-001',
        productName: defaultProd?.name || 'Default Item',
        sku: defaultProd?.sku || 'SKU-001',
        quantity: 1,
        unitPrice: defaultProd?.sellingPrice || 100,
        discount: 0,
        taxRate: 5,
        total: defaultProd?.sellingPrice ? defaultProd.sellingPrice * 1.05 : 105,
      },
    ];
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync customer name when customerId changes
  const handleCustomerChange = (id: string) => {
    setCustomerId(id);
    const found = customers.find((c) => c.id === id);
    if (found) {
      setCustomerName(found.name);
    }
  };

  // Recalculate line total
  const computeLineTotal = (qty: number, price: number, discount: number, taxRate: number) => {
    const raw = Math.max(0, qty * price - discount);
    return Math.round(raw * (1 + taxRate / 100) * 100) / 100;
  };

  const handleProductChange = (index: number, prodId: string) => {
    const prod = products.find((p) => p.id === prodId);
    if (!prod) return;

    setItems((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        const newTotal = computeLineTotal(item.quantity, prod.sellingPrice, item.discount, item.taxRate);
        return {
          ...item,
          productId: prod.id,
          productName: prod.name,
          sku: prod.sku,
          unitPrice: prod.sellingPrice,
          total: newTotal,
        };
      })
    );
  };

  const handleItemFieldChange = (
    index: number,
    field: 'quantity' | 'unitPrice' | 'discount' | 'taxRate',
    val: number
  ) => {
    setItems((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        const updated = { ...item, [field]: val };
        updated.total = computeLineTotal(
          updated.quantity,
          updated.unitPrice,
          updated.discount,
          updated.taxRate
        );
        return updated;
      })
    );
  };

  const handleAddItem = () => {
    const prod = products[0];
    const newItem: FormLineItem = {
      id: `item-${Date.now()}-${items.length + 1}`,
      productId: prod?.id || '',
      productName: prod?.name || 'Product Item',
      sku: prod?.sku || 'SKU-000',
      quantity: 1,
      unitPrice: prod?.sellingPrice || 50,
      discount: 0,
      taxRate: 5,
      total: prod?.sellingPrice ? Math.round(prod.sellingPrice * 1.05 * 100) / 100 : 52.5,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) {
      setErrors({ items: 'At least one line item is required in a sale.' });
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
  const subtotal = items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);
  const discountTotal = items.reduce((acc, i) => acc + i.discount, 0);
  const taxTotal = items.reduce(
    (acc, i) => acc + Math.max(0, i.quantity * i.unitPrice - i.discount) * (i.taxRate / 100),
    0
  );
  const grandTotal = Math.round((subtotal - discountTotal + taxTotal) * 100) / 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!customerId) {
      newErrors.customer = 'Please select a customer for this transaction.';
    }

    if (items.length === 0) {
      newErrors.items = 'At least one line item is required.';
    }

    items.forEach((item, idx) => {
      if (item.quantity <= 0) {
        newErrors[`item_qty_${idx}`] = 'Quantity must be at least 1.';
      }
      if (item.unitPrice < 0) {
        newErrors[`item_price_${idx}`] = 'Price cannot be negative.';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const salePayload: Omit<Sale, 'id'> = {
      invoiceNumber,
      customerId,
      customerName,
      date,
      dueDate,
      items: items.map((i) => ({ ...i })),
      subtotal,
      discountTotal,
      taxTotal: Math.round(taxTotal * 100) / 100,
      grandTotal,
      paymentMethod,
      paymentStatus,
      notes: notes || undefined,
      createdBy: 'Alexander Hayes',
    };

    onSubmit(salePayload);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      {/* Top Details Card */}
      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-accent" />
            <h2 className="text-base font-bold text-foreground">Transaction Details</h2>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
            {invoiceNumber}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Customer Selector */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Customer *</label>
            <select
              value={customerId}
              onChange={(e) => handleCustomerChange(e.target.value)}
              className="w-full h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              required
            >
              <option value="">Select customer...</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.companyName || 'Individual'})
                </option>
              ))}
            </select>
            {errors.customer && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.customer}</p>
            )}
          </div>

          {/* Sale Date */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Sale Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Due Date */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Payment Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-full h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <option value="credit_card">Credit Card (POS Terminal)</option>
              <option value="cash">Cash Settlement</option>
              <option value="bank_transfer">Direct Bank Wire</option>
              <option value="cheque">Commercial Cheque</option>
            </select>
          </div>

          {/* Payment Status */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Settlement Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
              className="w-full h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <option value="paid">Paid / Settled</option>
              <option value="pending">Pending Settlement</option>
              <option value="overdue">Overdue Notice</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Notes */}
          <div className="sm:col-span-3 space-y-1">
            <label className="font-semibold text-foreground">Invoice Notes / Memo</label>
            <Input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Delivered to downtown branch, PO signed by store manager"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Line Items Section */}
      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <div>
            <h2 className="text-base font-bold text-foreground">Order Items & Inventory Lines</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Select catalog products, adjust quantities, discount rates, and tax jurisdictions.
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleAddItem}
            className="gap-1.5 text-xs font-bold bg-accent hover:bg-accent/90 text-white rounded-full px-4 shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Line Item
          </Button>
        </div>

        {errors.items && (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 text-xs font-semibold">
            {errors.items}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-2.5 px-3 min-w-[200px]">Product</th>
                <th className="py-2.5 px-3 min-w-[90px]">Qty</th>
                <th className="py-2.5 px-3 min-w-[110px]">Unit Price ($)</th>
                <th className="py-2.5 px-3 min-w-[100px]">Discount ($)</th>
                <th className="py-2.5 px-3 min-w-[90px]">Tax (%)</th>
                <th className="py-2.5 px-3 text-right min-w-[100px]">Total ($)</th>
                <th className="py-2.5 px-3 text-center w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  {/* Product picker */}
                  <td className="py-2.5 px-3">
                    <select
                      value={item.productId}
                      onChange={(e) => handleProductChange(idx, e.target.value)}
                      className="w-full h-8 rounded-full border border-input bg-card px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.sku})
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Quantity */}
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemFieldChange(idx, 'quantity', parseInt(e.target.value) || 0)
                      }
                      className="w-full h-8 rounded-full border border-input bg-card px-2 text-center text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    />
                    {errors[`item_qty_${idx}`] && (
                      <p className="text-[10px] text-rose-600 mt-0.5">{errors[`item_qty_${idx}`]}</p>
                    )}
                  </td>

                  {/* Unit Price */}
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleItemFieldChange(idx, 'unitPrice', parseFloat(e.target.value) || 0)
                      }
                      className="w-full h-8 rounded-full border border-input bg-card px-2 text-right text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    />
                  </td>

                  {/* Discount */}
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.discount}
                      onChange={(e) =>
                        handleItemFieldChange(idx, 'discount', parseFloat(e.target.value) || 0)
                      }
                      className="w-full h-8 rounded-full border border-input bg-card px-2 text-right text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    />
                  </td>

                  {/* Tax Rate */}
                  <td className="py-2.5 px-3">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={item.taxRate}
                      onChange={(e) =>
                        handleItemFieldChange(idx, 'taxRate', parseFloat(e.target.value) || 0)
                      }
                      className="w-full h-8 rounded-full border border-input bg-card px-2 text-center text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    />
                  </td>

                  {/* Line Total */}
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-foreground">
                    {formatCurrency(item.total)}
                  </td>

                  {/* Delete Button */}
                  <td className="py-2.5 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      disabled={items.length <= 1}
                      className="p-1.5 rounded-full text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10 transition-colors disabled:opacity-30 cursor-pointer"
                      title="Remove line item"
                      aria-label="Remove line item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live Calculation Footer */}
        <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calculator className="h-4 w-4 text-accent" />
            <span>Taxes and line-item discounts are automatically computed in real-time.</span>
          </div>

          <div className="w-full sm:w-72 space-y-1.5 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal:</span>
              <span className="font-mono font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            {discountTotal > 0 && (
              <div className="flex justify-between text-rose-600">
                <span>Total Discount:</span>
                <span className="font-mono font-semibold">-{formatCurrency(discountTotal)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Tax:</span>
              <span className="font-mono font-semibold">{formatCurrency(taxTotal)}</span>
            </div>
            <div className="pt-2 border-t border-border/60 flex justify-between text-base font-extrabold text-foreground">
              <span>Grand Total:</span>
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
          className="rounded-full px-5 text-xs font-semibold"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="rounded-full px-7 text-xs font-bold bg-accent hover:bg-accent/90 text-white shadow-xs"
        >
          {isEditing ? 'Update Sale Transaction' : 'Record & Process Sale'}
        </Button>
      </div>
    </form>
  );
};
