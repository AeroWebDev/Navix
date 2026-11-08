import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useSuppliers } from '@/hooks/useSuppliers';
import { SupplierForm } from '@/components/forms/SupplierForm';
import { Supplier } from '@/types/supplier';

export const NewSupplierPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { suppliers, addSupplier, updateSupplier } = useSuppliers();

  const isEditing = Boolean(id);
  const existingSupplier = isEditing ? suppliers.find((s) => s.id === id) : undefined;

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (supplierData: Omit<Supplier, 'id'>) => {
    if (isEditing && id) {
      updateSupplier(id, supplierData);
      setToastMessage(
        `Supplier "${supplierData.companyName || supplierData.name}" updated successfully!`
      );
    } else {
      addSupplier(supplierData);
      setToastMessage(
        `Supplier "${supplierData.companyName || supplierData.name}" added to directory!`
      );
    }

    setTimeout(() => {
      navigate('/demo/suppliers');
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
            to="/demo/suppliers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Supplier Directory
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {isEditing
              ? `Edit Supplier: ${existingSupplier?.companyName || existingSupplier?.name}`
              : 'Register New Vendor Account'}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Configure supplier commercial terms, representative contacts, dispatch addresses, and tax numbers.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <SupplierForm
        initialData={existingSupplier}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/demo/suppliers')}
        isEditing={isEditing}
      />
    </div>
  );
};
