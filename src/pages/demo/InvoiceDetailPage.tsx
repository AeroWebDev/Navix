import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  CreditCard,
  Trash2,
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Receipt,
  FileText,
} from 'lucide-react';
import { useInvoices } from '@/hooks/useInvoices';
import { InvoiceStatus } from '@/types/invoice';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { RecordPaymentModal } from '@/components/modals/RecordPaymentModal';
import { formatCurrency, formatDate } from '@/utils/formatters';

export const InvoiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { invoices, deleteInvoice, recordPaymentForInvoice } = useInvoices();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center space-y-4">
        <Receipt className="h-12 w-12 text-muted-foreground mx-auto" />
        <h2 className="text-xl font-bold text-foreground">Invoice Not Found</h2>
        <p className="text-xs text-muted-foreground">
          The requested billing document does not exist or has been removed.
        </p>
        <Link to="/demo/invoices">
          <Button variant="outline" size="sm">
            Back to Invoices
          </Button>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = () => {
    deleteInvoice(invoice.id);
    navigate('/demo/invoices');
  };

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return (
          <Badge variant="success" className="gap-1.5 py-1 px-3 text-xs font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Paid & Settled
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="warning" className="gap-1.5 py-1 px-3 text-xs font-semibold">
            <Clock className="h-3.5 w-3.5" />
            Pending Payment
          </Badge>
        );
      case 'overdue':
        return (
          <Badge variant="destructive" className="gap-1.5 py-1 px-3 text-xs font-semibold">
            <AlertTriangle className="h-3.5 w-3.5" />
            Overdue
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="secondary" className="gap-1.5 py-1 px-3 text-xs font-semibold">
            <FileText className="h-3.5 w-3.5" />
            Draft
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="default" className="gap-1.5 py-1 px-3 text-xs font-semibold">
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Toolbar (Hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <Link
            to="/demo/invoices"
            className="p-2 rounded-full border border-border/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                {invoice.invoiceNumber}
              </h1>
              {getStatusBadge(invoice.status)}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Issued on {formatDate(invoice.issueDate)} • Due {formatDate(invoice.dueDate)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
            <Button
              variant="primary"
              size="sm"
              className="gap-1.5"
              onClick={() => setShowPaymentModal(true)}
            >
              <CreditCard className="h-4 w-4" />
              Record Payment
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            Print / PDF
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Official Commercial Invoice Document Sheet */}
      <Card className="rounded-3xl border border-border/80 shadow-xl bg-card overflow-hidden print:border-none print:shadow-none print:rounded-none">
        <CardContent className="p-8 sm:p-12 space-y-8">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-border/60">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-lg tracking-wider">
                  N
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-foreground">
                    NAVIX
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                    Enterprise ERP Solutions
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-3 space-y-0.5">
                <p className="font-semibold text-foreground">NAVIX Global Technologies Inc.</p>
                <p>Financial District, Corporate Tower, Suite 1400</p>
                <p>VAT ID: US-98234-NAVIX • Tax Code: 489201</p>
                <p>support@aeroteam.agency</p>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="text-2xl font-black text-foreground tracking-tight block">
                COMMERCIAL INVOICE
              </span>
              <p className="text-sm font-bold text-primary">{invoice.invoiceNumber}</p>
              <div className="text-xs text-muted-foreground pt-2 space-y-0.5">
                <p>
                  <span className="font-medium text-foreground">Issue Date:</span>{' '}
                  {formatDate(invoice.issueDate)}
                </p>
                <p>
                  <span className="font-medium text-foreground">Payment Due:</span>{' '}
                  {formatDate(invoice.dueDate)}
                </p>
                <p>
                  <span className="font-medium text-foreground">Terms:</span>{' '}
                  {invoice.paymentTerms || 'Net 30 Days'}
                </p>
              </div>
            </div>
          </div>

          {/* Billed To / Client Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 bg-muted/30 rounded-2xl border border-border/50">
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                Billed To
              </span>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary shrink-0" />
                <h3 className="text-base font-bold text-foreground">
                  {invoice.customerName}
                </h3>
              </div>
              {invoice.customerEmail && (
                <p className="text-xs text-muted-foreground mt-1">
                  {invoice.customerEmail}
                </p>
              )}
              {invoice.customerAddress && (
                <p className="text-xs text-muted-foreground whitespace-pre-line mt-0.5">
                  {invoice.customerAddress}
                </p>
              )}
              {invoice.customerTaxNumber && (
                <p className="text-xs font-medium text-foreground mt-1">
                  Client Tax Reg: {invoice.customerTaxNumber}
                </p>
              )}
            </div>

            <div className="sm:text-right space-y-2">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                Payment Status
              </span>
              <div>{getStatusBadge(invoice.status)}</div>
              {invoice.paidDate && (
                <p className="text-xs text-emerald-600 font-semibold mt-1">
                  Settled on {formatDate(invoice.paidDate)}
                  {invoice.paymentMethod && ` via ${invoice.paymentMethod}`}
                </p>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-border/80 text-muted-foreground font-semibold">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Item & Description</th>
                  <th className="py-3 px-2 text-right">Qty</th>
                  <th className="py-3 px-2 text-right">Unit Price</th>
                  <th className="py-3 px-2 text-right">Discount</th>
                  <th className="py-3 px-2 text-right">VAT Rate</th>
                  <th className="py-3 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {invoice.items.map((item, idx) => (
                  <tr key={item.id} className="text-foreground">
                    <td className="py-3 px-2 text-muted-foreground">{idx + 1}</td>
                    <td className="py-3 px-2 font-medium">{item.description}</td>
                    <td className="py-3 px-2 text-right">{item.quantity}</td>
                    <td className="py-3 px-2 text-right">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="py-3 px-2 text-right">
                      {item.discountPercent > 0 ? `${item.discountPercent}%` : '—'}
                    </td>
                    <td className="py-3 px-2 text-right">
                      {item.taxRatePercent > 0 ? `${item.taxRatePercent}%` : '0%'}
                    </td>
                    <td className="py-3 px-2 text-right font-bold">
                      {formatCurrency(item.lineTotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-border/60">
            <div className="max-w-sm space-y-3">
              <div>
                <span className="text-xs font-bold text-foreground block">
                  Remittance & Payment Notes:
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {invoice.notes ||
                    'Please make payments via bank transfer referencing the invoice number.'}
                </p>
              </div>

              <div className="p-3 bg-muted/40 rounded-xl border border-border/50 text-[11px] text-muted-foreground space-y-0.5">
                <p className="font-semibold text-foreground">Direct Bank Wire:</p>
                <p>Bank: JPMorgan Chase NA (Commercial Banking)</p>
                <p>IBAN: US92 CHAS 0000 2891 9021 34</p>
                <p>Routing: 021000021 • Swift: CHASUS33</p>
              </div>
            </div>

            <div className="w-full sm:w-72 space-y-2 bg-muted/20 p-4 rounded-2xl border border-border/50">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Subtotal:</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(invoice.subtotal)}
                </span>
              </div>
              {invoice.discountTotal > 0 && (
                <div className="flex justify-between text-xs text-emerald-600">
                  <span>Discount:</span>
                  <span className="font-medium">
                    -{formatCurrency(invoice.discountTotal)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Value Added Tax (VAT):</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(invoice.taxTotal)}
                </span>
              </div>
              <div className="pt-2 border-t border-border/60 flex justify-between items-baseline">
                <span className="text-sm font-bold text-foreground">Total Due:</span>
                <span className="text-lg font-black text-primary">
                  {formatCurrency(invoice.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Sign-off */}
          <div className="pt-8 border-t border-border/40 text-center text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">
              Thank you for partnering with NAVIX Enterprise.
            </p>
            <p>
              For questions regarding this invoice, contact our billing department at{' '}
              <a href="mailto:aeroteam.agency@gmail.com" className="text-primary hover:underline">
                aeroteam.agency@gmail.com
              </a>{' '}
              or +20 110 871 0742.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        title="Delete Invoice"
        message={`Are you sure you want to delete invoice ${invoice.invoiceNumber}? This action cannot be reversed.`}
        onConfirm={handleDelete}
        onClose={() => setShowDeleteModal(false)}
      />

      {/* Record Payment Modal */}
      <RecordPaymentModal
        isOpen={showPaymentModal}
        invoice={invoice}
        onConfirm={(amount, method) => {
          recordPaymentForInvoice(invoice.id, amount, method);
          setShowPaymentModal(false);
        }}
        onClose={() => setShowPaymentModal(false)}
      />
    </div>
  );
};
