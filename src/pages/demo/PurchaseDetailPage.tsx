import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Printer,
  CheckCircle2,
  AlertCircle,
  Calendar,
  CreditCard,
  Building2,
  PackageCheck,
  User,
  Truck,
} from 'lucide-react';
import { usePurchases } from '@/hooks/usePurchases';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/utils/formatters';

export const PurchaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { purchases, deletePurchase, markPurchaseAsReceived, suppliers } = usePurchases();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const purchase = purchases.find((p) => p.id === id);

  if (!purchase) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <AlertCircle className="h-12 w-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-foreground">Purchase Order Not Found</h2>
        <p className="text-xs text-muted-foreground">
          The requested purchase order could not be located in records.
        </p>
        <Link to="/demo/purchases">
          <Button variant="outline" size="sm" className="rounded-full px-5">
            Return to Purchase Orders
          </Button>
        </Link>
      </div>
    );
  }

  const supplier = suppliers.find((s) => s.id === purchase.supplierId);

  const handleDelete = () => {
    deletePurchase(purchase.id);
    navigate('/demo/purchases');
  };

  const handleMarkAsReceived = () => {
    markPurchaseAsReceived(purchase.id);
    setFeedbackToast(
      `PO #${purchase.purchaseOrderNumber} marked as received! Product inventory has been updated.`
    );
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3000);
  };

  const handlePrintDemo = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <Link
            to="/demo/purchases"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Purchase Orders
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              PO #{purchase.purchaseOrderNumber}
            </h1>
            <StatusBadge status={purchase.status} />
            <StatusBadge status={purchase.paymentStatus} />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Issued on {formatDate(purchase.orderDate)} • Created by {purchase.createdBy}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {purchase.status !== 'received' && (
            <Button
              size="sm"
              onClick={handleMarkAsReceived}
              className="rounded-full text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-soft-island font-semibold"
            >
              <PackageCheck className="h-4 w-4" />
              <span>Mark as Received</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrintDemo}
            className="rounded-full text-xs gap-1.5"
            title="Print purchase order"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Print</span>
          </Button>

          <Link to={`/demo/purchases/${purchase.id}/edit`}>
            <Button variant="outline" size="sm" className="rounded-full text-xs gap-1.5">
              <Edit className="h-3.5 w-3.5" />
              <span>Edit</span>
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteModalOpen(true)}
            className="rounded-full text-xs gap-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900/40"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </Button>
        </div>
      </div>

      {/* Primary Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Supplier Profile Card */}
        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
            <Building2 className="h-4 w-4" />
            <span>Vendor / Supplier</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground">
              {purchase.supplierName}
            </h3>
            {supplier && (
              <>
                <p className="text-xs text-muted-foreground">{supplier.contactPerson || 'Purchasing Rep'}</p>
                <p className="text-xs text-muted-foreground">{supplier.email}</p>
                <p className="text-xs text-muted-foreground">{supplier.phone}</p>
                <p className="text-xs text-muted-foreground">{supplier.address}</p>
              </>
            )}
          </div>
        </div>

        {/* PO Logistics & Schedule Card */}
        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
            <Truck className="h-4 w-4" />
            <span>Logistics & Fulfillment</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-border/40">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Order Date
              </span>
              <span className="font-semibold text-foreground">{formatDate(purchase.orderDate)}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-border/40">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Expected Arrival
              </span>
              <span className="font-semibold text-foreground">
                {purchase.expectedDate ? formatDate(purchase.expectedDate) : 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <PackageCheck className="h-3.5 w-3.5" /> Stock Status
              </span>
              <span className="font-semibold capitalize text-foreground">
                {purchase.status === 'received' ? 'Stock Added to Inventory' : 'Awaiting Delivery'}
              </span>
            </div>
          </div>
        </div>

        {/* Payment & Audit Card */}
        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
            <CreditCard className="h-4 w-4" />
            <span>Payment & Settlement</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-border/40">
              <span className="text-muted-foreground">Payment Status</span>
              <StatusBadge status={purchase.paymentStatus} />
            </div>
            <div className="flex justify-between items-center py-1 border-b border-border/40">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> Created By
              </span>
              <span className="font-semibold text-foreground">{purchase.createdBy}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground">Payment Terms</span>
              <span className="font-semibold text-foreground">
                {supplier?.paymentTerms || 'Net 30'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Line Items Table Card */}
      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <h3 className="text-sm font-bold text-foreground">Ordered Line Items</h3>
          <span className="text-xs text-muted-foreground">
            {purchase.items.length} {purchase.items.length === 1 ? 'item' : 'items'} in order
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground font-semibold">
                <th className="pb-2.5">Product Name</th>
                <th className="pb-2.5">SKU</th>
                <th className="pb-2.5 text-center">Qty</th>
                <th className="pb-2.5 text-right">Unit Cost</th>
                <th className="pb-2.5 text-right">Tax Rate</th>
                <th className="pb-2.5 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {purchase.items.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                  <td className="py-3 font-semibold text-foreground">{item.productName}</td>
                  <td className="py-3 font-mono text-[11px] text-muted-foreground">{item.sku}</td>
                  <td className="py-3 text-center font-semibold text-foreground">{item.quantity}</td>
                  <td className="py-3 text-right font-mono text-muted-foreground">
                    {formatCurrency(item.unitCost)}
                  </td>
                  <td className="py-3 text-right font-mono text-muted-foreground">
                    {Math.round(item.taxRate * 100)}%
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-foreground">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Breakdown & Notes */}
        <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row justify-between gap-6">
          <div className="text-xs max-w-md space-y-2">
            <span className="font-semibold text-foreground">Order Notes & Instructions:</span>
            <p className="text-muted-foreground italic bg-muted/20 p-3 rounded-2xl border border-border/40">
              {purchase.notes || 'No notes attached to this purchase order.'}
            </p>
          </div>

          <div className="w-full sm:w-72 p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-2 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-mono text-foreground">{formatCurrency(purchase.subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax Total</span>
              <span className="font-mono text-foreground">{formatCurrency(purchase.taxTotal)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border/60 font-bold text-sm text-foreground">
              <span>Grand Total</span>
              <span className="font-mono text-accent">{formatCurrency(purchase.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Purchase Order"
        message={`Are you sure you want to delete PO #${purchase.purchaseOrderNumber}? This action cannot be undone.`}
      />
    </div>
  );
};
