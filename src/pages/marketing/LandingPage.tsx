import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Receipt,
  Boxes,
  Users,
  BarChart3,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Star,
  Quote,
  Coins,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-primary/5 via-background to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next-Generation Accounting & ERP Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Complete Accounting Software Built Around Your Business
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Manage sales, inventory, expenses, customers, suppliers, invoices and financial reports from one powerful system.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/demo/login" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-6 shadow-lg shadow-primary/20">
                    Explore Demo
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/custom-software" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-6">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    Request Your Software
                  </Button>
                </Link>
              </div>

              {/* Offline / Windows installer badge */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>100% In-Memory Interactive Demo</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Download className="h-4 w-4 text-primary" />
                  <span>Windows Installer Ready</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>Role-Based Security</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Dashboard Mockup Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl border border-border bg-card p-4 shadow-2xl overflow-hidden">
                {/* Header bar of preview */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-xs font-medium text-muted-foreground">Apex Ledger Preview</span>
                  </div>
                  <Badge variant="success" className="text-[10px]">
                    Live Demo
                  </Badge>
                </div>

                {/* Dashboard Stats Snapshot */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="text-xs text-muted-foreground font-medium">Monthly Revenue</p>
                      <p className="text-xl font-bold text-foreground mt-1">$48,290.00</p>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
                        <TrendingUp className="h-3 w-3" /> +14.2% vs last month
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/40 border border-border">
                      <p className="text-xs text-muted-foreground font-medium">Net Profit</p>
                      <p className="text-xl font-bold text-foreground mt-1">$19,450.50</p>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
                        <TrendingUp className="h-3 w-3" /> 40.2% Margin
                      </span>
                    </div>
                  </div>

                  {/* Mini Table Mock */}
                  <div className="rounded-lg border border-border p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground pb-1 border-b border-border">
                      <span>Recent Invoice</span>
                      <span>Status</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1">
                      <div>
                        <p className="font-medium text-foreground">INV-2026-0891</p>
                        <p className="text-[10px] text-muted-foreground">Horizon Logistics</p>
                      </div>
                      <Badge variant="success">Paid ($4,200)</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1">
                      <div>
                        <p className="font-medium text-foreground">INV-2026-0892</p>
                        <p className="text-[10px] text-muted-foreground">Nexus Creative</p>
                      </div>
                      <Badge variant="warning">Pending ($1,850)</Badge>
                    </div>
                  </div>

                  {/* Teaser CTA Button inside card */}
                  <Link to="/demo/login" className="block">
                    <Button variant="secondary" className="w-full text-xs font-semibold justify-center">
                      Launch Full 14-Module Experience
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary">Comprehensive Capabilities</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Everything Your Business Needs to Thrive
            </p>
            <p className="text-muted-foreground text-base sm:text-lg">
              Engineered for seamless everyday bookkeeping, point-of-sale efficiency, and real-time executive decision making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Receipt className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Sales & Smart Invoicing</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Generate professional tax invoices, calculate discounts, manage payment statuses, and trigger clean print views with one click.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Boxes className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Real-Time Inventory</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Track catalog stock quantities, set automated minimum stock thresholds, prevent stockouts, and audit batch adjustments.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <Coins className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Expense & Payables Control</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Categorize operating expenses (Rent, Salaries, Utilities, Supplies) and reconcile cash flow against incoming revenue.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Customer & Vendor CRM</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Maintain complete client directories, monitor outstanding accounts receivable, track supplier credit, and view transaction history.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Executive Financial Reports</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Generate instant Profit & Loss statements, Cash Flow summaries, Sales analytics, and Tax reports across custom date ranges.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <Lock className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Role-Based Access (RBAC)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Secure staff workflows with 5 predefined roles (Owner, Manager, Accountant, Cashier). Granular permission matrix for every screen.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Link to="/features">
              <Button variant="outline" className="gap-2">
                Explore All Feature Specifications
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Customization Section */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary">
                Why Apex Ledger
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Not Just a Template — A Production Software Foundation
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Most off-the-shelf software locks you into rigid subscriptions with hundreds of features you never use. We build and adapt this entire system to match your precise workflows, local tax regulations, and branch networks.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Zero Bloat, 100% Focused</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Tailored to your industry—retail, wholesale, consultancy, food & beverage, or multi-branch service operations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Deploy On Cloud or On-Premises</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Run securely on AWS/Vercel or install locally on your office network and Windows machines with our automated installer.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Local Tax Compliance Ready</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Easily configurable for VAT, ZATCA e-invoicing Phase 2, GST, sales tax, or custom multi-currency operations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/custom-software">
                  <Button className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Configure Your Custom System
                  </Button>
                </Link>
              </div>
            </div>

            {/* Customization Graphic Card */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">Customization Engine</h3>
                    <p className="text-xs text-muted-foreground">Select what you need, leave what you don't</p>
                  </div>
                </div>
                <Badge variant="default">Flexible</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  'Point-of-Sale (POS) Mode',
                  'Barcode Scanner Integration',
                  'Multi-Branch Syncing',
                  'Custom Invoice Styling',
                  'Staff Payroll & Shifts',
                  'WhatsApp Notifications',
                  'Thermal Receipt Printing',
                  'Automatic DB Backups',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40 border border-border/70">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-xs text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">Need specialized hardware or legacy integration?</p>
                <p>
                  We build custom connectors for receipt printers, cash drawers, barcode scanners, and payment terminals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary">Process & Delivery</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              From Interactive Demo to Custom Live Deployment
            </p>
            <p className="text-muted-foreground">
              A transparent, 4-step journey to getting commercial accounting software tailored to your company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Explore Demo',
                desc: 'Experience our 14-module interactive preview directly in your browser or through the local desktop installer.',
              },
              {
                step: '02',
                title: 'Submit Spec',
                desc: 'Fill out our detailed custom software request form specifying your exact business workflows and branches.',
              },
              {
                step: '03',
                title: 'Review & Quote',
                desc: 'We prepare a custom engineering scope, architecture blueprint, pricing estimate, and timeline within 24 hours.',
              },
              {
                step: '04',
                title: 'Build & Deploy',
                desc: 'Our team tailors the codebase, tests against your test data, and deploys it on your cloud or local infrastructure.',
              },
            ].map((s, idx) => (
              <div key={idx} className="relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors space-y-3">
                <span className="text-3xl font-black text-primary/30">{s.step}</span>
                <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/how-it-works">
              <Button variant="outline" className="gap-2">
                Read Full Implementation Guide
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Clearly Labeled Demo Testimonials) */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <Badge variant="secondary" className="text-[10px] uppercase">
              Demonstration Feedback
            </Badge>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
              Trusted by Ambitious Business Operators
            </h2>
            <p className="text-xs text-muted-foreground italic">
              (Sample fictional testimonials demonstrating client use-cases and industry adaptations)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'Apex Ledger allowed us to completely replace three disconnected spreadsheets. The real-time low-stock alerts alone saved us tens of thousands in lost sales.',
                author: 'Tariq Al-Mansoor',
                role: 'Managing Director, Al-Mansoor Retail Group',
                industry: 'Retail & Distribution (5 Branches)',
              },
              {
                quote:
                  'Having a system customized specifically for our service business without paying enterprise ERP fees changed our cash flow overnight. Highly recommended.',
                author: 'Elena Rostova',
                role: 'Founder & CEO, Apex Engineering Services',
                industry: 'Consulting & Technical Services',
              },
              {
                quote:
                  'The role-based cashier layout made training new staff take less than 15 minutes. It is fast, clean, and our daily reconciliation is finally stress-free.',
                author: 'Marcus Vance',
                role: 'Operations Lead, Urban Pulse Logistics',
                industry: 'Logistics & Warehousing',
              },
            ].map((t, idx) => (
              <Card key={idx} className="bg-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary/20" />
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{t.quote}"
                  </p>
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm font-bold text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                    <span className="inline-block mt-1 text-[10px] text-primary font-semibold">
                      {t.industry}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to Upgrade Your Financial Operations?
            </h2>
            <p className="text-primary-100 text-lg sm:text-xl leading-relaxed">
              Experience the full 14-module interactive demo right now, or request your custom build tailored to your business rules.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/demo/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-primary-700 hover:bg-slate-100 font-bold px-8 py-6">
                Explore Demo Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/custom-software" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10 px-8 py-6 font-bold"
              >
                Request Custom Software Quote
              </Button>
            </Link>
          </div>

          <p className="text-xs text-primary-200">
            No credit card required. Pure interactive preview with realistic data and instant reset.
          </p>
        </div>
      </section>
    </div>
  );
};
