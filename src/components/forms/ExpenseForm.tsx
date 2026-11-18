import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Expense, ExpenseCategory } from '@/types/expense';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { DollarSign, FileText, Calendar, Building, Tag } from 'lucide-react';

const expenseCategories: ExpenseCategory[] = [
  'Rent',
  'Salaries',
  'Electricity & Utilities',
  'Transportation',
  'Marketing & Ads',
  'Maintenance',
  'Office Supplies',
  'Software Subscriptions',
  'Other',
];

const expenseSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  category: z.enum([
    'Rent',
    'Salaries',
    'Electricity & Utilities',
    'Transportation',
    'Marketing & Ads',
    'Maintenance',
    'Office Supplies',
    'Software Subscriptions',
    'Other',
  ]),
  amount: z.coerce.number().positive('Amount must be greater than 0'),
  date: z.string().min(1, 'Date is required'),
  paymentMethod: z.enum(['cash', 'bank_transfer', 'credit_card', 'company_card']),
  paidTo: z.string().min(2, 'Vendor / Payee name must be at least 2 characters'),
  referenceNumber: z.string().optional(),
  taxDeductible: z.boolean().default(true),
  receiptAttached: z.boolean().default(false),
  notes: z.string().optional(),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  initialData?: Partial<Expense>;
  onSubmit: (data: ExpenseFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: initialData?.title || '',
      category: initialData?.category || 'Office Supplies',
      amount: initialData?.amount || ('' as unknown as number),
      date: initialData?.date || new Date().toISOString().split('T')[0],
      paymentMethod: initialData?.paymentMethod || 'bank_transfer',
      paidTo: initialData?.paidTo || '',
      referenceNumber: initialData?.referenceNumber || '',
      taxDeductible: initialData?.taxDeductible ?? true,
      receiptAttached: initialData?.receiptAttached ?? false,
      notes: initialData?.notes || '',
    },
  });

  const selectedCategory = watch('category');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="rounded-3xl border-border/60 shadow-soft-island">
        <CardContent className="p-6 space-y-5">
          <div className="border-b border-border/60 pb-3">
            <h3 className="text-base font-bold text-foreground">Expense Details</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Record commercial cash outflows and operating costs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-foreground">Expense Title *</label>
              <Input
                placeholder="e.g., Office Internet & Fiberoptic Subscription"
                {...register('title')}
                icon={<FileText className="h-4 w-4" />}
              />
              {errors.title && (
                <p className="text-xs text-rose-500 font-semibold">{errors.title.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-foreground">Expense Category *</label>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {expenseCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setValue('category', cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-accent text-white shadow-xs'
                        : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {errors.category && (
                <p className="text-xs text-rose-500 font-semibold">{errors.category.message}</p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Amount ($) *</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('amount')}
                icon={<DollarSign className="h-4 w-4" />}
              />
              {errors.amount && (
                <p className="text-xs text-rose-500 font-semibold">{errors.amount.message}</p>
              )}
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Payment Date *</label>
              <Input
                type="date"
                {...register('date')}
                icon={<Calendar className="h-4 w-4" />}
              />
              {errors.date && (
                <p className="text-xs text-rose-500 font-semibold">{errors.date.message}</p>
              )}
            </div>

            {/* Paid To */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Paid To (Vendor / Payee) *</label>
              <Input
                placeholder="e.g., Telecom Egypt / Landlord / Amazon Web Services"
                {...register('paidTo')}
                icon={<Building className="h-4 w-4" />}
              />
              {errors.paidTo && (
                <p className="text-xs text-rose-500 font-semibold">{errors.paidTo.message}</p>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Payment Method</label>
              <select
                {...register('paymentMethod')}
                className="w-full h-10 px-3 rounded-2xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="bank_transfer">Bank Wire / Transfer</option>
                <option value="company_card">Company Debit/Credit Card</option>
                <option value="cash">Petty Cash / Vault</option>
                <option value="credit_card">Commercial Credit Line</option>
              </select>
            </div>

            {/* Reference Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Vendor Receipt / Invoice Ref #</label>
              <Input
                placeholder="e.g., REC-2025-9981"
                {...register('referenceNumber')}
                icon={<Tag className="h-4 w-4" />}
              />
            </div>

            {/* Tax & Receipt Flags */}
            <div className="space-y-2 pt-2 flex flex-col justify-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('taxDeductible')}
                  className="rounded border-border text-accent focus:ring-accent h-4 w-4"
                />
                <span className="text-xs font-semibold text-foreground">
                  Tax Deductible Commercial Expense
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('receiptAttached')}
                  className="rounded border-border text-accent focus:ring-accent h-4 w-4"
                />
                <span className="text-xs font-semibold text-foreground">
                  Official Proof / Paperwork Attached
                </span>
              </label>
            </div>

            {/* Notes */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-foreground">Internal Accounting Notes</label>
              <textarea
                rows={3}
                placeholder="Optional explanation for internal audit or tax reconciliation..."
                {...register('notes')}
                className="w-full p-3 rounded-2xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Action Controls */}
      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-full px-6"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full px-8 bg-accent hover:bg-accent/90 text-white font-bold shadow-md"
        >
          {isSubmitting ? 'Saving Expense...' : 'Save Expense Record'}
        </Button>
      </div>
    </form>
  );
};
