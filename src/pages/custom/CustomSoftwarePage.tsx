import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CheckCircle2,
  ShieldCheck,
  Send,
  Store,
  Layers,
  Laptop,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

const ALL_MODULES = [
  { id: 'sales', label: 'Sales & Invoicing', category: 'Core Operations' },
  { id: 'purchases', label: 'Purchases & Vendors', category: 'Core Operations' },
  { id: 'inventory', label: 'Inventory & Stock Auditing', category: 'Core Operations' },
  { id: 'pos', label: 'Point-of-Sale (POS) Fast Terminal', category: 'Sales & Retail' },
  { id: 'invoices', label: 'Custom Tax Invoices & Print Templates', category: 'Sales & Retail' },
  { id: 'expenses', label: 'Expense Tracking & Payables', category: 'Financials' },
  { id: 'customers', label: 'Customer Directory & Credit Ledgers', category: 'CRM' },
  { id: 'suppliers', label: 'Supplier Catalogues & Payables', category: 'CRM' },
  { id: 'employees', label: 'Employee Profiles & Permissions', category: 'Management' },
  { id: 'reports', label: 'Financial & Sales Analytics Reports', category: 'Financials' },
  { id: 'accounting', label: 'Simplified Accounting & Balance Sheets', category: 'Financials' },
  { id: 'payroll', label: 'Staff Payroll, Deductions & Shifts', category: 'Management' },
  { id: 'multi_branch', label: 'Multi-Branch Inventory & Syncing', category: 'Scale' },
  { id: 'mobile', label: 'Mobile Tablet & Phone Responsive View', category: 'Platforms' },
  { id: 'desktop', label: 'Offline Windows Desktop App (.bat installer)', category: 'Platforms' },
  { id: 'web', label: 'Cloud Web App (Browser Access)', category: 'Platforms' },
] as const;

const PRESETS = [
  {
    name: 'Retail Store / Supermarket',
    icon: <Store className="h-4 w-4" />,
    modules: ['sales', 'inventory', 'pos', 'invoices', 'customers', 'desktop', 'reports'],
  },
  {
    name: 'Wholesale & Distribution',
    icon: <Layers className="h-4 w-4" />,
    modules: ['sales', 'purchases', 'inventory', 'invoices', 'customers', 'suppliers', 'multi_branch', 'reports'],
  },
  {
    name: 'Service Agency / Consultancy',
    icon: <Laptop className="h-4 w-4" />,
    modules: ['sales', 'invoices', 'expenses', 'customers', 'employees', 'accounting', 'reports', 'web'],
  },
];

const customRequestSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  email: z.string().email('Please enter a valid business email'),
  phone: z.string().min(6, 'Please provide a valid contact phone or WhatsApp number'),
  country: z.string().min(2, 'Country or territory is required'),
  businessType: z.string().min(2, 'Please select your industry or business model'),
  employeeCount: z.string().min(1, 'Please select number of employees'),
  branchCount: z.string().min(1, 'Please select branch count'),
  skuCount: z.string().min(1, 'Please select approximate product count'),
  modules: z.array(z.string()).min(1, 'Please select at least one module requirement'),
  deploymentPreference: z.enum(['cloud', 'on_premises', 'hybrid']),
  estimatedBudget: z.string().min(1, 'Please select your anticipated budget range'),
  targetTimeline: z.string().min(1, 'Please select target launch timeline'),
  additionalRequirements: z.string().optional(),
});

type CustomRequestFormData = z.infer<typeof customRequestSchema>;

export const CustomSoftwarePage: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<CustomRequestFormData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomRequestFormData>({
    resolver: zodResolver(customRequestSchema),
    defaultValues: {
      fullName: '',
      businessName: '',
      email: '',
      phone: '',
      country: 'United States',
      businessType: 'Retail & Consumer Goods',
      employeeCount: '5-20 staff',
      branchCount: '1-3 locations',
      skuCount: '100-1,000 SKUs',
      modules: ['sales', 'inventory', 'pos', 'invoices', 'expenses', 'reports'],
      deploymentPreference: 'hybrid',
      estimatedBudget: '$2,500 - $5,000',
      targetTimeline: '2 to 4 weeks',
      additionalRequirements: '',
    },
  });

  const selectedModules = watch('modules') || [];

  const handleToggleModule = (moduleId: string) => {
    if (selectedModules.includes(moduleId)) {
      setValue(
        'modules',
        selectedModules.filter((id) => id !== moduleId),
        { shouldValidate: true }
      );
    } else {
      setValue('modules', [...selectedModules, moduleId], { shouldValidate: true });
    }
  };

  const handleApplyPreset = (presetModules: string[]) => {
    setValue('modules', presetModules, { shouldValidate: true });
  };

  const onSubmit = async (data: CustomRequestFormData) => {
    // Simulate API processing
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmittedData(data);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    setSubmittedData(null);
    reset();
  };

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Tailored Commercial Software Architecture</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          Need an Accounting System Built for Your Business?
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          The interactive preview in this portal demonstrates our modular core capabilities. We engineer, customize, and deploy a fully branded version with your exact tax rules, currency, branch workflows, and database infrastructure.
        </p>

        {/* Commercial Deployment Notice */}
        <div className="p-3.5 rounded-xl bg-card border border-border/80 text-xs text-muted-foreground max-w-2xl mx-auto flex items-center justify-center gap-2 shadow-xs">
          <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
          <span>
            <strong className="text-foreground">Commercial Software Delivery:</strong> Every production deployment includes dedicated backend databases, custom source code, and white-label branding.
          </span>
        </div>
      </div>

      {isSuccess && submittedData ? (
        /* Success State View */
        <Card className="max-w-3xl mx-auto border-emerald-500/30 bg-emerald-500/5 shadow-2xl animate-in fade-in duration-300">
          <CardContent className="p-8 sm:p-12 text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-2">
              <Badge variant="success" className="text-xs uppercase">
                Proposal Received & Queued
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Thank You, {submittedData.fullName}!
              </h2>
              <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                We have recorded your custom build specification for <strong>{submittedData.businessName}</strong>. Our lead systems architect is reviewing your module selection and will respond within 4 business hours.
              </p>
            </div>

            {/* Blueprint Summary Box */}
            <div className="rounded-xl border border-border bg-card p-6 text-left space-y-3 text-xs">
              <h3 className="font-bold text-foreground text-sm border-b border-border pb-2">
                Custom Build Blueprint Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Business:</strong> {submittedData.businessName} ({submittedData.country})
                </p>
                <p>
                  <strong className="text-foreground">Industry:</strong> {submittedData.businessType}
                </p>
                <p>
                  <strong className="text-foreground">Deployment:</strong>{' '}
                  <span className="capitalize">{submittedData.deploymentPreference.replace('_', ' ')}</span>
                </p>
                <p>
                  <strong className="text-foreground">Scale:</strong> {submittedData.employeeCount} • {submittedData.branchCount}
                </p>
                <p>
                  <strong className="text-foreground">Timeline:</strong> {submittedData.targetTimeline}
                </p>
                <p>
                  <strong className="text-foreground">Selected Modules:</strong> {submittedData.modules.length} modules
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {submittedData.modules.map((m) => (
                  <span
                    key={m}
                    className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-semibold"
                  >
                    {ALL_MODULES.find((mod) => mod.id === m)?.label || m}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={`https://wa.me/1234567890?text=${encodeURIComponent(
                  `Hello NAVIX team! I just submitted custom software specification for ${submittedData.businessName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto gap-2 bg-emerald-600 hover:bg-emerald-700">
                  <Clock className="h-4 w-4" />
                  Fast-Track Discussion on WhatsApp
                </Button>
              </a>
              <Button variant="outline" onClick={handleResetForm} className="w-full sm:w-auto gap-1.5">
                <RotateCcw className="h-3.5 w-3.5" />
                Submit Another Specification
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* The Detailed Specification Form */
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Section 1: Business Identity */}
          <Card className="shadow-sm">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Business Information</h2>
                  <p className="text-xs text-muted-foreground">
                    Provide the legal or operating entity details for this custom build.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Your Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    {...register('fullName')}
                    placeholder="e.g. David Henderson"
                    error={errors.fullName?.message}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Company / Business Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    {...register('businessName')}
                    placeholder="e.g. Henderson Retail Enterprises Ltd."
                    error={errors.businessName?.message}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Official Business Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="email"
                    {...register('email')}
                    placeholder="david@hendersonretail.com"
                    error={errors.email?.message}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Phone / WhatsApp Number <span className="text-destructive">*</span>
                  </label>
                  <Input
                    {...register('phone')}
                    placeholder="+1 (555) 349-2041"
                    error={errors.phone?.message}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Country / Primary Operating Jurisdiction <span className="text-destructive">*</span>
                  </label>
                  <select
                    {...register('country')}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Saudi Arabia">Saudi Arabia (ZATCA e-Invoicing)</option>
                    <option value="United Arab Emirates">United Arab Emirates (UAE VAT)</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany / EU</option>
                    <option value="Other">Other Global Jurisdiction</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Business Type / Industry <span className="text-destructive">*</span>
                  </label>
                  <select
                    {...register('businessType')}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Retail & Consumer Goods">Retail & Consumer Goods</option>
                    <option value="Wholesale & B2B Distribution">Wholesale & B2B Distribution</option>
                    <option value="Professional Services & Consulting">Professional Services & Consulting</option>
                    <option value="Food, Beverage & Restaurants">Food, Beverage & Restaurants (POS)</option>
                    <option value="Manufacturing & Workshops">Manufacturing & Workshops</option>
                    <option value="Logistics & Warehousing">Logistics & Warehousing</option>
                    <option value="Healthcare & Pharmacy">Healthcare & Pharmacy</option>
                    <option value="Other Industry">Other Industry</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Scale & Operations */}
          <Card className="shadow-sm">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Business Size & Operational Scale</h2>
                  <p className="text-xs text-muted-foreground">
                    Helps us size the database caching layer and concurrent cashier sessions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Staff & Cashier Users</label>
                  <select
                    {...register('employeeCount')}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="1-5 staff">1 - 5 staff members</option>
                    <option value="5-20 staff">5 - 20 staff members</option>
                    <option value="20-50 staff">20 - 50 staff members</option>
                    <option value="50+ staff">50+ staff members (Enterprise)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Physical Branches / Stores</label>
                  <select
                    {...register('branchCount')}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="1 branch">Single location</option>
                    <option value="2-5 branches">2 - 5 physical branches</option>
                    <option value="6-15 branches">6 - 15 regional branches</option>
                    <option value="15+ branches">15+ nationwide chain</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Catalog Size (SKUs)</label>
                  <select
                    {...register('skuCount')}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Under 100 SKUs">Under 100 products</option>
                    <option value="100-1,000 SKUs">100 - 1,000 products</option>
                    <option value="1,000-10,000 SKUs">1,000 - 10,000 products</option>
                    <option value="10,000+ SKUs">10,000+ high-volume SKU catalog</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Required Modules Selection */}
          <Card className="shadow-sm">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">System Modules & Capabilities</h2>
                    <p className="text-xs text-muted-foreground">
                      Select which components your business needs. Deselect what is unnecessary.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">Quick Presets:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESETS.map((p, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleApplyPreset(p.modules)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted hover:bg-accent text-[11px] font-medium text-foreground transition-colors cursor-pointer"
                      >
                        {p.icon}
                        <span>{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {errors.modules && (
                <p className="text-xs text-destructive font-semibold">{errors.modules.message}</p>
              )}

              {/* Module Toggle Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {ALL_MODULES.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => handleToggleModule(mod.id)}
                      className={cn(
                        'p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition-all select-none flex flex-col justify-between space-y-2',
                        isChecked
                          ? 'border-primary bg-primary/5 text-foreground ring-1 ring-primary/30 shadow-xs'
                          : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-foreground">{mod.label}</span>
                        <div
                          className={cn(
                            'h-4 w-4 rounded border flex items-center justify-center shrink-0 mt-0.5',
                            isChecked
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'border-border bg-background'
                          )}
                        >
                          {isChecked && <CheckCircle2 className="h-3.5 w-3.5" />}
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {mod.category}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <span>
                  Currently selected: <strong>{selectedModules.length} of 16 modules</strong>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setValue(
                      'modules',
                      ALL_MODULES.map((m) => m.id),
                      { shouldValidate: true }
                    )
                  }
                  className="text-primary hover:underline font-semibold cursor-pointer"
                >
                  Select All 16 Modules
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Deployment & Budget */}
          <Card className="shadow-sm">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  04
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Deployment Model & Project Scope</h2>
                  <p className="text-xs text-muted-foreground">
                    Select where the software should run and your delivery targets.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Deployment Preference</label>
                  <select
                    {...register('deploymentPreference')}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="cloud">Cloud Native (AWS / Vercel / DigitalOcean)</option>
                    <option value="on_premises">On-Premises Local Windows / Store LAN</option>
                    <option value="hybrid">Hybrid (Local POS with Cloud Central Backup)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Target Implementation Timeline</label>
                  <select
                    {...register('targetTimeline')}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Urgent (under 2 weeks)">Urgent (under 2 weeks)</option>
                    <option value="2 to 4 weeks">2 to 4 weeks (Standard custom build)</option>
                    <option value="1 to 2 months">1 to 2 months</option>
                    <option value="Planning phase / Flexible">Planning phase / Flexible</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Estimated Budget Bracket</label>
                  <select
                    {...register('estimatedBudget')}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Under $2,500">Under $2,500 (Core adaptation)</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000 (Standard commercial build)</option>
                    <option value="$5,000 - $12,000">$5,000 - $12,000 (Multi-branch ERP)</option>
                    <option value="$12,000+">$12,000+ (Enterprise custom platform)</option>
                  </select>
                </div>
              </div>

              {/* Textarea for specific rules */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-foreground">
                  Additional Specific Requirements or Custom Rules (Optional)
                </label>
                <textarea
                  {...register('additionalRequirements')}
                  rows={4}
                  placeholder="Describe any existing software you want to replace, specific hardware (thermal receipt printers, barcode guns), custom tax rates, invoice layout branding, or required language localizations..."
                  className="w-full p-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-y"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Action */}
          <div className="text-center space-y-4 pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="px-10 py-6 text-base font-bold shadow-xl shadow-primary/20 gap-2 cursor-pointer"
            >
              <Send className="h-5 w-5" />
              {isSubmitting ? 'Processing Specification...' : 'Request My Software'}
            </Button>
            <p className="text-xs text-muted-foreground">
              Direct technical review by senior developers. No spam, no aggressive sales calls.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
