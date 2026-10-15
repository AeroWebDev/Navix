import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  FileText,
  Printer,
  CheckCircle2,
  AlertCircle,
  Calendar,
  CreditCard,
  User,
} from 'lucide-react';
import { useSales } from '@/hooks/useSales';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/utils/formatters';

export const SaleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sales, deleteSale } = useSales();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const sale = sales.find((s) => s.id === id);

  if (!sale) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <AlertCircle className="h-12 w-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-foreground">Sale Transaction Not Found</h2>
        <p className="text-xs text-muted-foreground">
          The requested sales transaction could not be located in current in-memory preview state.
        </p>
        <Link to="/demo/sales">
          <Button variant="outline" size="sm" className="rounded-full px-5">
            Return to Sales Ledger
          </Button>
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteSale(sale.id);
    navigate('/demo/sales');
  };

  const handlePrintDemo = () => {
    window.print();
  };

  const handleCreateInvoice = () => {
    setFeedbackToast(`Invoice drafted for sale ${sale.invoiceNumber}!`);
    setTimeout(() => {
      navigate('/demo/invoices');
    }, 1200);
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
            to="/demo/sales"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Sales Ledger
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Sale #{sale.invoiceNumber}
            </h1>
            <StatusBadge status={sale.paymentStatus} />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Recorded on {formatDate(sale.date)} • Created by {sale.createdBy}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrintDemo}
            className="rounded-full text-xs gap-1.5"
            title="Print commercial receipt"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Print</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCreateInvoice}
            className="rounded-full text-xs gap-1.5 text-accent border-accent/30 hover:bg-accent/10"
            title="Convert sale to official accounting invoice"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Create Invoice</span>
          </Button>

          <Link to={`/demo/sales/${sale.id}/edit`}>
            <Button variant="outline" size="sm" className="rounded-full text-xs gap-1.5">
              <Edit className="h-3.5 w-3.5" />
              <span>Edit</span>
            </Button>
          </Link>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteModalOpen(true)}
            className="rounded-full text-xs gap-1.5 bg-rose-600 hover:bg-rose-700 text-white"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </Button>
        </div>
      </div>

      {/* Sale Meta Snapshot Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Customer Info */}
        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
            <User className="h-4 w-4 text-accent" />
            <span>Customer Account</span>
          </div>
          <p className="text-base font-bold text-foreground truncate">{sale.customerName}</p>
          <p className="text-[11px] text-muted-foreground font-mono">ID: {sale.customerId}</p>
        </div>

        {/* Date & Terms */}
        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
            <Calendar className="h-4 w-4 text-accent" />
            <span>Timeline</span>
          </div>
          <p className="text-xs font-semibold text-foreground">
            Issued: <span className="font-mono">{formatDate(sale.date)}</span>
          </p>
          <p className="text-[11px] text-muted-foreground">
            Due: <span className="font-mono">{formatDate(sale.dueDate)}</span>
          </p>
        </div>

        {/* Payment Channel */}
        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
            <CreditCard className="h-4 w-4 text-accent" />
            <span>Settlement Method</span>
          </div>
          <p className="text-base font-bold text-foreground capitalize">
            {sale.paymentMethod.replace('_', ' ')}
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            {sale.paymentStatus === 'paid' ? 'Settled in Full' : 'Open Balance Pending'}
          </p>
        </div>

        {/* Grand Total Highlight */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#172A3A] to-[#2E8B70] text-white shadow-soft-island space-y-1">
          <p className="text-xs font-semibold text-white/80">Total Order Value</p>
          <p className="text-2xl font-extrabold tracking-tight mt-1">
            {formatCurrency(sale.grandTotal)}
          </p>
          <p className="text-[10px] text-white/70">
            Includes tax & discounts
          </p>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
        <h2 className="text-base font-bold text-foreground pb-2 border-b border-border/50">
          Purchased Items ({sale.items.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-2.5 px-3">Product Name</th>
                <th className="py-2.5 px-3">SKU</th>
                <th className="py-2.5 px-3 text-right">Unit Price</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Discount</th>
                <th className="py-2.5 px-3 text-center">Tax %</th>
                <th className="py-2.5 px-3 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {sale.items.map((item, idx) => (
                <tr key={`${item.productId}-${idx}`} className="hover:bg-muted/20">
                  <td className="py-3 px-3 font-semibold text-foreground">{item.productName}</td>
                  <td className="py-3 px-3 font-mono text-muted-foreground">{item.sku}</td>
                  <td className="py-3 px-3 text-right font-mono">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-3 px-3 text-center font-bold">{item.quantity}</td>
                  <td className="py-3 px-3 text-right font-mono text-rose-600">
                    {item.discount > 0 ? `-${formatCurrency(item.discount)}` : '—'}
                  </td>
                  <td className="py-3 px-3 text-center font-mono">{item.taxRate}%</td>
                  <td className="py-3 px-3 text-right font-mono font-extrabold text-foreground">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Breakdown Table Summary */}
        <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1 text-xs text-muted-foreground max-w-sm">
            <p className="font-semibold text-foreground">Transaction Memo / Notes:</p>
            <p className="italic">{sale.notes || 'No specific delivery notes recorded for this transaction.'}</p>
          </div>

          <div className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal:</span>
              <span className="font-mono font-semibold">{formatCurrency(sale.subtotal)}</span>
            </div>
            {sale.discountTotal > 0 && (
              <div className="flex justify-between text-rose-600">
                <span>Discount Total:</span>
                <span className="font-mono font-semibold">-{formatCurrency(sale.discountTotal)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Tax Total:</span>
              <span className="font-mono font-semibold">{formatCurrency(sale.taxTotal)}</span>
            </div>
            <div className="pt-2 border-t border-border/60 flex justify-between text-base font-extrabold text-foreground">
              <span>Grand Total:</span>
              <span className="font-mono text-accent">{formatCurrency(sale.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Sale Transaction"
        itemName={sale.invoiceNumber}
        message={`Are you sure you want to delete sale ${sale.invoiceNumber} for ${sale.customerName}?`}
      />
    </div>
  );
};
