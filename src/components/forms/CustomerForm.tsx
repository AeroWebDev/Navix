import React, { useState } from 'react';
import { UserCheck, Building2 } from 'lucide-react';
import { Customer, CustomerType } from '@/types/customer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface CustomerFormProps {
  initialData?: Customer;
  onSubmit: (customerData: Omit<Customer, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [customerNumber] = useState(
    initialData?.customerNumber || `CUST-${Math.floor(100 + Math.random() * 900)}`
  );
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [type, setType] = useState<CustomerType>(initialData?.type || 'business');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [taxNumber, setTaxNumber] = useState(initialData?.taxNumber || '');
  const [status, setStatus] = useState<'active' | 'inactive'>(
    initialData?.status || 'active'
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Customer name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload: Omit<Customer, 'id'> = {
      customerNumber,
      name: name.trim(),
      companyName: companyName.trim() || undefined,
      type,
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      taxNumber: taxNumber.trim() || undefined,
      outstandingBalance: initialData?.outstandingBalance ?? 0,
      totalSpent: initialData?.totalSpent ?? 0,
      ordersCount: initialData?.ordersCount ?? 0,
      status,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSubmit(payload);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      {/* Primary Details Card */}
      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-accent" />
            <h2 className="text-base font-bold text-foreground">
              {isEditing ? 'Customer Account Profile' : 'New Customer Registration'}
            </h2>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
            {customerNumber}
          </span>
        </div>

        {/* Customer Type Toggle */}
        <div className="flex items-center gap-2 pt-1 pb-2">
          <span className="text-xs font-semibold text-foreground mr-2">Client Category:</span>
          <div className="inline-flex rounded-full p-1 bg-muted/40 border border-border/50">
            <button
              type="button"
              onClick={() => setType('business')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                type === 'business'
                  ? 'bg-card text-accent shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              <span>Commercial Business</span>
            </button>
            <button
              type="button"
              onClick={() => setType('individual')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                type === 'individual'
                  ? 'bg-card text-accent shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Individual / Retail</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Contact / Display Name */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">
              {type === 'business' ? 'Business Contact / Display Name *' : 'Full Name *'}
            </label>
            <Input
              type="text"
              placeholder={type === 'business' ? 'e.g. Apex Corporation Ltd.' : 'e.g. John Doe'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 rounded-full text-xs"
              required
            />
            {errors.name && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.name}</p>
            )}
          </div>

          {/* Legal Company Name */}
          {type === 'business' && (
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Legal Entity / Registered Name</label>
              <Input
                type="text"
                placeholder="e.g. Apex Global Holdings LLC"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="h-9 rounded-full text-xs"
              />
            </div>
          )}

          {/* Tax / VAT Number */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Tax ID / VAT Registration</label>
            <Input
              type="text"
              placeholder="e.g. TAX-9988-771"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
              className="h-9 rounded-full text-xs font-mono"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Billing Email *</label>
            <Input
              type="email"
              placeholder="billing@client.com"
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
            <label className="font-semibold text-foreground">Phone Number</label>
            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-9 rounded-full text-xs"
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Account Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
              className="w-full h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent capitalize"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Address */}
          <div className="space-y-1 sm:col-span-2 lg:col-span-3">
            <label className="font-semibold text-foreground">Physical / Billing Address</label>
            <Input
              type="text"
              placeholder="Street Address, Suite / Unit, City, State, ZIP"
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
          {isEditing ? 'Save Customer Changes' : 'Create Customer Account'}
        </Button>
      </div>
    </form>
  );
};
