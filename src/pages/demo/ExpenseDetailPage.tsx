import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Trash2,
  Edit,
  Printer,
  Calendar,
  Building,
  CreditCard,
  FileCheck2,
  Tag,
} from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { ExpenseForm, ExpenseFormData } from '@/components/forms/ExpenseForm';
import { formatCurrency, formatDate } from '@/utils/formatters';

export const ExpenseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { expenses, updateExpense, deleteExpense } = useExpenses();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-foreground">Expense Record Not Found</h2>
        <p className="text-xs text-muted-foreground">The requested expense identifier does not exist.</p>
        <Link to="/demo/expenses">
          <Button variant="outline" className="rounded-full">Back to Expenses</Button>
        </Link>
      </div>
    );
  }

  const handleUpdate = (data: ExpenseFormData) => {
    updateExpense(expense.id, {
      title: data.title,
      category: data.category,
      amount: data.amount,
      date: data.date,
      paymentMethod: data.paymentMethod,
      paidTo: data.paidTo,
      referenceNumber: data.referenceNumber,
      taxDeductible: data.taxDeductible,
      receiptAttached: data.receiptAttached,
      notes: data.notes,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteExpense(expense.id);
    navigate('/demo/expenses');
  };

  const handlePrint = () => {
    window.print();
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(false)}
            className="rounded-full p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Edit Expense {expense.expenseNumber}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Update expenditure metadata and general ledger allocation
            </p>
          </div>
        </div>

        <ExpenseForm
          initialData={expense}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div className="flex items-center gap-3">
          <Link
            to="/demo/expenses"
            className="p-2 rounded-full border border-border/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                {expense.expenseNumber}
              </h1>
              <Badge variant="outline" className="text-xs rounded-full">
                {expense.category}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Posted on {formatDate(expense.date)} by {expense.createdBy}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="rounded-full gap-1.5 text-xs font-semibold"
          >
            <Printer className="h-3.5 w-3.5" />
            Print Voucher
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="rounded-full gap-1.5 text-xs font-semibold"
          >
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteModalOpen(true)}
            className="rounded-full gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 border-rose-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </div>

      {/* Voucher Card Container */}
      <Card className="rounded-3xl border-border/60 shadow-soft-island bg-card overflow-hidden">
        <div className="p-6 sm:p-8 space-y-6">
          {/* Main Title & Amount Box */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-muted/30 border border-border/60">
            <div>
              <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
                Expense Description
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-foreground mt-1">
                {expense.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                <Building className="h-3.5 w-3.5 text-primary" /> Paid to: <span className="font-semibold text-foreground">{expense.paidTo}</span>
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
                Total Amount Paid
              </p>
              <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mt-1">
                {formatCurrency(expense.amount)}
              </p>
              {expense.taxDeductible && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full mt-1">
                  <FileCheck2 className="h-3.5 w-3.5" /> Tax Deductible
                </span>
              )}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary" /> Transaction Date
              </span>
              <p className="text-sm font-bold text-foreground">{formatDate(expense.date)}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5 text-primary" /> Payment Method
              </span>
              <p className="text-sm font-bold text-foreground capitalize">
                {expense.paymentMethod.replace('_', ' ')}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-primary" /> Reference / Invoice #
              </span>
              <p className="text-sm font-bold text-foreground font-mono">
                {expense.referenceNumber || 'N/A'}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-semibold">Cost Allocation</span>
              <p className="text-sm font-bold text-foreground">{expense.category}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-semibold">Supporting Documents</span>
              <p className="text-sm font-bold text-foreground">
                {expense.receiptAttached ? 'Receipt Attached ✓' : 'Direct Electronic Bank Record'}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-semibold">Authorized By</span>
              <p className="text-sm font-bold text-foreground">{expense.createdBy}</p>
            </div>
          </div>

          {/* Internal Notes */}
          {expense.notes && (
            <div className="p-4 rounded-2xl bg-muted/20 border border-border/50 space-y-1">
              <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Accounting & Audit Notes
              </p>
              <p className="text-xs text-foreground leading-relaxed">{expense.notes}</p>
            </div>
          )}
        </div>
      </Card>

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Expense Record"
        message={`Are you sure you want to delete ${expense.expenseNumber}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
