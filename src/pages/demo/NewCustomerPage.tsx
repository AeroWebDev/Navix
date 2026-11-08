import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCustomers } from '@/hooks/useCustomers';
import { CustomerForm } from '@/components/forms/CustomerForm';
import { Customer } from '@/types/customer';

export const NewCustomerPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { customers, addCustomer, updateCustomer } = useCustomers();

  const isEditing = Boolean(id);
  const existingCustomer = isEditing ? customers.find((c) => c.id === id) : undefined;

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (customerData: Omit<Customer, 'id'>) => {
    if (isEditing && id) {
      updateCustomer(id, customerData);
      setToastMessage(`Customer "${customerData.name}" updated successfully!`);
    } else {
      addCustomer(customerData);
      setToastMessage(`Customer "${customerData.name}" created successfully!`);
    }

    setTimeout(() => {
      navigate('/demo/customers');
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
            to="/demo/customers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Customer Directory
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {isEditing ? `Edit Customer: ${existingCustomer?.name}` : 'Register New Customer Account'}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Configure contact parameters, corporate tax IDs, client classification, and billing addresses.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <CustomerForm
        initialData={existingCustomer}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/demo/customers')}
        isEditing={isEditing}
      />
    </div>
  );
};
