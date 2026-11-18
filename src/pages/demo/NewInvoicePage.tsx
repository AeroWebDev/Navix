import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useInvoices } from '@/hooks/useInvoices';
import { InvoiceForm } from '@/components/forms/InvoiceForm';
import { Invoice } from '@/types/invoice';

export const NewInvoicePage: React.FC = () => {
  const { addInvoice } = useInvoices();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (invoiceData: Omit<Invoice, 'id'>) => {
    setIsSubmitting(true);
    const created = addInvoice(invoiceData);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/demo/invoices/${created.id}`);
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/demo/invoices"
          className="p-2 rounded-full border border-border/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Generate Commercial Invoice
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure line items, discount schedules, VAT rates, and credit terms for clients.
          </p>
        </div>
      </div>

      <div className={isSubmitting ? 'opacity-50 pointer-events-none' : ''}>
        <InvoiceForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/demo/invoices')}
        />
      </div>
    </div>
  );
};
