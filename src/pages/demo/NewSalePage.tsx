import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useSales } from '@/hooks/useSales';
import { SaleForm } from '@/components/forms/SaleForm';
import { Sale } from '@/types/sale';

export const NewSalePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { sales, addSale, updateSale } = useSales();

  const isEditing = Boolean(id);
  const existingSale = isEditing ? sales.find((s) => s.id === id) : undefined;

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (saleData: Omit<Sale, 'id'>) => {
    if (isEditing && id) {
      updateSale(id, saleData);
      setToastMessage(`Sale ${saleData.invoiceNumber} updated successfully!`);
    } else {
      addSale(saleData);
      setToastMessage(`New sale ${saleData.invoiceNumber} recorded successfully!`);
    }

    setTimeout(() => {
      navigate('/demo/sales');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/60">
        <div>
          <Link
            to="/demo/sales"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Sales Ledger
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {isEditing ? `Edit Sale #${existingSale?.invoiceNumber}` : 'Record New Sale Transaction'}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Process point-of-sale orders, compute multi-item line taxes, and generate customer invoices.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <SaleForm
        initialData={existingSale}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/demo/sales')}
        isEditing={isEditing}
      />
    </div>
  );
};
