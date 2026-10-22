import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { Supplier } from '@/types/supplier';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface SupplierFormProps {
  initialData?: Supplier;
  onSubmit: (supplierData: Omit<Supplier, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const SupplierForm: React.FC<SupplierFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [companyName, setCompanyName] = useState(
    initialData?.companyName || initialData?.name || ''
  );
  const [supplierNumber] = useState(
    initialData?.supplierNumber || `SUP-${Math.floor(100 + Math.random() * 900)}`
  );
  const [contactPerson, setContactPerson] = useState(initialData?.contactPerson || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [taxNumber, setTaxNumber] = useState(initialData?.taxNumber || '');
  const [category, setCategory] = useState(
    initialData?.category || 'Hardware & Electronics'
  );
  const [paymentTerms, setPaymentTerms] = useState(
    initialData?.paymentTerms || 'Net 30'
  );
  const [status, setStatus] = useState<'active' | 'inactive'>(
    initialData?.status || 'active'
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!companyName.trim()) {
      newErrors.companyName = 'Vendor or company name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Supplier email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload: Omit<Supplier, 'id'> = {
      supplierNumber,
      companyName: companyName.trim(),
      name: companyName.trim(),
      contactPerson: contactPerson.trim() || undefined,
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      taxNumber: taxNumber.trim() || undefined,
      category: category.trim() || undefined,
      paymentTerms,
      totalPurchased: initialData?.totalPurchased ?? 0,
      amountOwed: initialData?.amountOwed ?? 0,
      outstandingPayable: initialData?.outstandingPayable ?? 0,
      status,
    };

    onSubmit(payload);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      {/* Primary Details Card */}
      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-accent" />
            <h2 className="text-base font-bold text-foreground">
              {isEditing ? 'Vendor Supplier Profile' : 'New Vendor Registration'}
            </h2>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
            {supplierNumber}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Vendor Company Name */}
          <div className="space-y-1 sm:col-span-2">
            <label className="font-semibold text-foreground">Supplier / Company Name *</label>
            <Input
              type="text"
              placeholder="e.g. TechDistrib International Ltd."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="h-9 rounded-full text-xs"
              required
            />
            {errors.companyName && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.companyName}</p>
            )}
          </div>

          {/* Contact Person */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Account Representative</label>
            <Input
              type="text"
              placeholder="e.g. David Miller"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="h-9 rounded-full text-xs"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Orders / Accounts Email *</label>
            <Input
              type="email"
              placeholder="orders@vendor.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 rounded-full text-xs"
              required
            />
            {errors.email && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Direct Telephone</label>
            <Input
              type="tel"
              placeholder="+1 (555) 789-4561"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-9 rounded-full text-xs"
            />
          </div>

          {/* Supply Category */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Commercial Category</label>
            <Input
              type="text"
              placeholder="e.g. Hardware & Electronics"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-9 rounded-full text-xs"
            />
          </div>

          {/* Payment Terms */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Payment Terms</label>
            <select
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              className="w-full h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <option value="Net 15">Net 15 Days</option>
              <option value="Net 30">Net 30 Days</option>
              <option value="Net 60">Net 60 Days</option>
              <option value="Due on Receipt">Due on Receipt / Cash</option>
              <option value="Advance">Advance Prepayment</option>
            </select>
          </div>

          {/* Tax Number */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Tax Registration / VAT ID</label>
            <Input
              type="text"
              placeholder="e.g. US-CA-9871234"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
              className="h-9 rounded-full text-xs font-mono"
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
              className="w-full h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent capitalize"
            >
              <option value="active">Active Vendor</option>
              <option value="inactive">Inactive / On Hold</option>
            </select>
          </div>

          {/* Address */}
          <div className="space-y-1 sm:col-span-2 lg:col-span-3">
            <label className="font-semibold text-foreground">Dispatch / Remittance Address</label>
            <Input
              type="text"
              placeholder="Facility address, City, State, Country"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-9 rounded-full text-xs"
            />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="rounded-full px-5 text-xs h-9"
        >
          Cancel
        </Button>
        <Button type="submit" className="rounded-full px-6 text-xs h-9 font-semibold">
          {isEditing ? 'Save Supplier Details' : 'Register Vendor'}
        </Button>
      </div>
    </form>
  );
};
