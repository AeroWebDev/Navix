import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';
import { ExpenseForm, ExpenseFormData } from '@/components/forms/ExpenseForm';

export const NewExpensePage: React.FC = () => {
  const { addExpense, expenses } = useExpenses();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: ExpenseFormData) => {
    setIsSubmitting(true);
    const nextNumber = `EXP-2025-${String(expenses.length + 1).padStart(4, '0')}`;

    addExpense({
      expenseNumber: nextNumber,
      category: data.category,
      title: data.title,
      amount: data.amount,
      date: data.date,
      paymentMethod: data.paymentMethod,
      paidTo: data.paidTo,
      referenceNumber: data.referenceNumber,
      taxDeductible: data.taxDeductible,
      receiptAttached: data.receiptAttached,
      notes: data.notes,
      createdBy: 'Finance Admin',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/demo/expenses');
    }, 150);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/demo/expenses"
          className="p-2 rounded-full border border-border/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Record Commercial Expense
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Post an operating expenditure to general ledger accounts
          </p>
        </div>
      </div>

      <ExpenseForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/demo/expenses')}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
