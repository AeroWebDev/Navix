import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Receipt, Building, Calendar } from 'lucide-react';
import { useDemoData } from '@/context/DemoDataContext';
import { Invoice, InvoiceLineItem, InvoiceStatus } from '@/types/invoice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatters';

interface InvoiceFormProps {
  initialData?: Invoice;
  onSubmit: (invoiceData: Omit<Invoice, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

interface FormLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  taxRatePercent: number;
  lineTotal: number;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const { customers, products } = useDemoData();

  const [customerId, setCustomerId] = useState(
    initialData?.customerId || (customers[0]?.id || '')
  );
  const [issueDate, setIssueDate] = useState(
    initialData?.issueDate || new Date().toISOString().split('T')[0]
  );
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate ||
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [paymentTerms, setPaymentTerms] = useState(
    initialData?.paymentTerms || 'Net 30'
  );
  const [status, setStatus] = useState<InvoiceStatus>(
    initialData?.status || 'pending'
  );
  const [notes, setNotes] = useState(
    initialData?.notes || 'Thank you for choosing NAVIX Solutions.'
  );
  const [invoiceNumber] = useState(
    initialData?.invoiceNumber ||
      `INV-2025-${String(Math.floor(100 + Math.random() * 900))}`
  );

  const selectedCustomer = useMemo(
    () => customers.find((c) => c.id === customerId),
    [customers, customerId]
  );

  const [items, setItems] = useState<FormLineItem[]>(() => {
    if (initialData?.items && initialData.items.length > 0) {
      return initialData.items.map((i) => ({ ...i }));
    }
    const defaultProd = products[0];
    const unitPrice = defaultProd?.sellingPrice || 100;
    const qty = 1;
    const tax = 5;
    const sub = qty * unitPrice;
    const taxAmt = (sub * tax) / 100;
    return [
      {
        id: 'item-1',
        description: defaultProd ? `${defaultProd.name} (${defaultProd.sku})` : 'Commercial Consulting Services',
        quantity: qty,
        unitPrice,
        discountPercent: 0,
        taxRatePercent: tax,
        lineTotal: sub + taxAmt,
      },
    ];
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddItem = () => {
    const newItem: FormLineItem = {
      id: `item-${Date.now()}`,
      description: '',
      quantity: 1,
      unitPrice: 0,
      discountPercent: 0,
      taxRatePercent: 5,
      lineTotal: 0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) {
      setErrors((prev) => ({ ...prev, items: 'Invoice must contain at least one line item.' }));
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (
    id: string,
    field: keyof FormLineItem,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updated = { ...item, [field]: value };
        const qty = Number(updated.quantity) || 0;
        const price = Number(updated.unitPrice) || 0;
        const discountPct = Number(updated.discountPercent) || 0;
        const taxPct = Number(updated.taxRatePercent) || 0;

        const gross = qty * price;
        const discountAmount = (gross * discountPct) / 100;
        const afterDiscount = gross - discountAmount;
        const taxAmount = (afterDiscount * taxPct) / 100;

        updated.lineTotal = Math.max(0, afterDiscount + taxAmount);
        return updated;
      })
    );
  };

  const handleProductSelect = (id: string, prodId: string) => {
    const prod = products.find((p) => p.id === prodId);
    if (!prod) return;

    handleItemChange(id, 'description', `${prod.name} (${prod.sku})`);
    handleItemChange(id, 'unitPrice', prod.sellingPrice);
  };

  // Calculations
  const { subtotal, discountTotal, taxTotal, grandTotal } = useMemo(() => {
    let sub = 0;
    let disc = 0;
    let tax = 0;

    items.forEach((item) => {
      const gross = item.quantity * item.unitPrice;
      const d = (gross * item.discountPercent) / 100;
      const taxable = gross - d;
      const t = (taxable * item.taxRatePercent) / 100;

      sub += gross;
      disc += d;
      tax += t;
    });

    return {
      subtotal: sub,
      discountTotal: disc,
      taxTotal: tax,
      grandTotal: sub - disc + tax,
    };
  }, [items]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!customerId) newErrors.customerId = 'Please select a customer';
    if (!issueDate) newErrors.issueDate = 'Issue date is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    if (items.length === 0) newErrors.items = 'At least one line item is required';

    items.forEach((item, index) => {
      if (!item.description.trim()) {
        newErrors[`item_${index}_desc`] = 'Description is required';
      }
      if (item.quantity <= 0) {
        newErrors[`item_${index}_qty`] = 'Quantity must be > 0';
      }
      if (item.unitPrice < 0) {
        newErrors[`item_${index}_price`] = 'Price cannot be negative';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const invoiceItems: InvoiceLineItem[] = items.map((i) => ({
      id: i.id,
      description: i.description,
      quantity: Number(i.quantity),
      unitPrice: Number(i.unitPrice),
      discountPercent: Number(i.discountPercent),
      taxRatePercent: Number(i.taxRatePercent),
      lineTotal: Number(i.lineTotal.toFixed(2)),
    }));

    onSubmit({
      invoiceNumber,
      issueDate,
      dueDate,
      customerId,
      customerName: selectedCustomer?.name || 'Walk-in Customer',
      customerEmail: selectedCustomer?.email || '',
      customerAddress: selectedCustomer?.address || '',
      customerTaxNumber: selectedCustomer?.taxNumber,
      items: invoiceItems,
      subtotal: Number(subtotal.toFixed(2)),
      discountTotal: Number(discountTotal.toFixed(2)),
      taxTotal: Number(taxTotal.toFixed(2)),
      total: Number(grandTotal.toFixed(2)),
      status,
      paymentTerms,
      notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Info */}
      <Card className="rounded-3xl border-border/60 shadow-soft-island">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              <h3 className="text-base font-bold text-foreground">
                {isEditing ? `Edit Invoice: ${invoiceNumber}` : `New Invoice: ${invoiceNumber}`}
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              Draft Document
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Customer Selector */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Building className="h-3.5 w-3.5 text-primary" />
                Billed Customer *
              </label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full h-10 px-3 rounded-2xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.companyName ? `(${c.companyName})` : ''} — Balance: {formatCurrency(c.outstandingBalance)}
                  </option>
                ))}
              </select>
              {errors.customerId && (
                <p className="text-xs text-rose-500 font-semibold">{errors.customerId}</p>
              )}
            </div>

            {/* Issue Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                Issue Date *
              </label>
              <Input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
              {errors.issueDate && (
                <p className="text-xs text-rose-500 font-semibold">{errors.issueDate}</p>
              )}
            </div>

            {/* Due Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                Payment Due Date *
              </label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              {errors.dueDate && (
                <p className="text-xs text-rose-500 font-semibold">{errors.dueDate}</p>
              )}
            </div>

            {/* Payment Terms */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Payment Terms</label>
              <select
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full h-10 px-3 rounded-2xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="Net 15">Net 15 Days</option>
                <option value="Net 30">Net 30 Days</option>
                <option value="Net 60">Net 60 Days</option>
                <option value="Due on Receipt">Due on Receipt</option>
              </select>
            </div>

            {/* Invoice Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Initial Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
                className="w-full h-10 px-3 rounded-2xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="pending">Pending Payment</option>
                <option value="draft">Draft Document</option>
                <option value="paid">Pre-paid / Paid in Full</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items Table Card */}
      <Card className="rounded-3xl border-border/60 shadow-soft-island overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <div>
              <h3 className="text-base font-bold text-foreground">Invoice Line Items</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add products from your catalog or enter custom billed services
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddItem}
              className="gap-1.5 rounded-full text-xs font-semibold"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Row
            </Button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-muted/20 border border-border/60 grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
              >
                {/* Catalog Quick Picker */}
                <div className="md:col-span-3 space-y-1">
                  <label className="text-[11px] font-bold text-muted-foreground">
                    Catalog Shortcut (Optional)
                  </label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) handleProductSelect(item.id, e.target.value);
                    }}
                    defaultValue=""
                    className="w-full h-9 px-2.5 rounded-xl border border-input bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="">-- Choose Product --</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (${p.sellingPrice})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-3 space-y-1">
                  <label className="text-[11px] font-bold text-foreground">
                    Description *
                  </label>
                  <Input
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    placeholder="Item or service name..."
                    className="h-9 text-xs"
                  />
                  {errors[`item_${index}_desc`] && (
                    <p className="text-[10px] text-rose-500 font-semibold">
                      {errors[`item_${index}_desc`]}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="md:col-span-1 space-y-1">
                  <label className="text-[11px] font-bold text-foreground">Qty *</label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                    className="h-9 text-xs"
                  />
                  {errors[`item_${index}_qty`] && (
                    <p className="text-[10px] text-rose-500 font-semibold">
                      {errors[`item_${index}_qty`]}
                    </p>
                  )}
                </div>

                {/* Unit Price */}
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[11px] font-bold text-foreground">Unit Price ($) *</label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>

                {/* Tax Rate % */}
                <div className="md:col-span-1 space-y-1">
                  <label className="text-[11px] font-bold text-foreground">Tax %</label>
                  <select
                    value={item.taxRatePercent}
                    onChange={(e) => handleItemChange(item.id, 'taxRatePercent', e.target.value)}
                    className="w-full h-9 px-2 rounded-xl border border-input bg-card text-xs text-foreground focus:outline-none"
                  >
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="14">14% (VAT)</option>
                    <option value="15">15%</option>
                  </select>
                </div>

                {/* Line Total */}
                <div className="md:col-span-1 text-right space-y-1 pb-1">
                  <span className="text-[10px] text-muted-foreground block font-semibold">Total</span>
                  <span className="font-mono font-bold text-xs text-foreground block">
                    {formatCurrency(item.lineTotal)}
                  </span>
                </div>

                {/* Delete button */}
                <div className="md:col-span-1 flex justify-end pb-0.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                    className="h-9 w-9 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {errors.items && (
            <p className="text-xs text-rose-500 font-semibold">{errors.items}</p>
          )}

          {/* Subtotals & Grand Total Summary */}
          <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:max-w-md space-y-1.5">
              <label className="text-xs font-bold text-foreground">Invoice Notes / Terms</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-2xl border border-input bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Payment instructions, bank wire info, or thank you note..."
              />
            </div>

            <div className="w-full sm:w-72 p-4 rounded-2xl bg-muted/30 border border-border/60 space-y-2 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal:</span>
                <span className="font-mono font-bold text-foreground">{formatCurrency(subtotal)}</span>
              </div>
              {discountTotal > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-semibold">
                  <span>Discount:</span>
                  <span className="font-mono">-{formatCurrency(discountTotal)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Estimated Tax:</span>
                <span className="font-mono font-bold text-foreground">+{formatCurrency(taxTotal)}</span>
              </div>
              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-sm">
                <span className="font-extrabold text-foreground">Invoice Total:</span>
                <span className="font-mono font-black text-foreground text-base">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="rounded-full px-6"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="rounded-full px-8 bg-accent hover:bg-accent/90 text-white font-bold shadow-md"
        >
          {isEditing ? 'Save Changes' : 'Generate Commercial Invoice'}
        </Button>
      </div>
    </form>
  );
};
