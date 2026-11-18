import React, { useState } from 'react';
import { CreditCard, DollarSign, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { Invoice } from '@/types/invoice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/utils/formatters';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice;
  onConfirm: (amount: number, method: string) => void;
}

const PAYMENT_METHODS = [
  'Bank Transfer',
  'Credit Card',
  'Cash',
  'Company Cheque',
  'ACH Direct Debit',
];

export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({
  isOpen,
  onClose,
  invoice,
  onConfirm,
}) => {
  const [amount, setAmount] = useState<number>(invoice.total);
  const [method, setMethod] = useState<string>('Bank Transfer');
  const [reference, setReference] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setError('Payment amount must be greater than zero');
      return;
    }
    onConfirm(amount, method);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl bg-card border border-border/80 p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-border/60">
          <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Record Customer Payment</h3>
            <p className="text-xs text-muted-foreground">
              {invoice.invoiceNumber} • {invoice.customerName}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Outstanding Invoice Summary */}
          <div className="p-3.5 bg-muted/40 rounded-2xl border border-border/50 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-muted-foreground block">
                Total Due
              </span>
              <span className="text-base font-bold text-foreground">
                {formatCurrency(invoice.total)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-medium text-muted-foreground block">
                Due Date
              </span>
              <span className="text-xs font-semibold text-foreground">
                {invoice.dueDate}
              </span>
            </div>
          </div>

          {/* Payment Amount */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-primary" />
              Payment Amount Received *
            </label>
            <Input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                if (error) setError('');
              }}
              className="text-sm font-semibold"
              required
            />
            {error && <p className="text-[11px] text-destructive">{error}</p>}
          </div>

          {/* Payment Method */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5 text-primary" />
              Settlement Method *
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-3 py-2 rounded-2xl border border-input bg-card text-foreground text-xs focus:outline-hidden focus:ring-2 focus:ring-primary/20"
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Reference */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                Date Received
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-primary" />
                Reference / Note
              </label>
              <Input
                type="text"
                placeholder="e.g. TXN-89021"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="text-xs"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              Confirm Payment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
