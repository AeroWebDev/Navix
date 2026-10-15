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
  ChevronRight,
  Star,
  Quote,
  Coins,
  Download,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 border-b border-border bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Custom ERP & Accounting Software Architecture</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                Complete Accounting Software Built Around Your Business
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Manage sales, inventory, expenses, customers, suppliers, invoices and financial reports from one powerful system.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link to="/demo/login" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-6 shadow-md hover:shadow-lg transition-all">
                    Explore Demo
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/custom-software" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base px-8 py-6 bg-card hover:bg-accent">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    Request Your Software
                  </Button>
                </Link>
              </div>

              {/* Micro specs trust bar */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>100% In-Memory Interactive Demo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Download className="h-4 w-4 text-primary" />
                  <span>Windows Installer Included</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>Role-Based Access (RBAC)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Realistic Application Window Preview */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-xl lg:max-w-none rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-card shadow-2xl shadow-zinc-950/10 overflow-hidden ring-1 ring-zinc-950/5">
                {/* Simulated macOS / Desktop App Window Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono font-medium text-muted-foreground">
                      navix.local/demo
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live In-Memory State
                    </span>
                  </div>
                </div>

                {/* Dashboard Stats Snapshot */}
                <div className="p-5 space-y-4">
                  {/* Top Metric Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-muted/30 border border-border">
                      <p className="text-[11px] text-muted-foreground font-medium">Monthly Revenue</p>
                      <p className="text-lg font-extrabold text-foreground mt-0.5">$48,290.00</p>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
                        <TrendingUp className="h-3 w-3" /> +14.2%
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-muted/30 border border-border">
                      <p className="text-[11px] text-muted-foreground font-medium">Net Profit</p>
                      <p className="text-lg font-extrabold text-foreground mt-0.5">$19,450.50</p>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
                        <TrendingUp className="h-3 w-3" /> 40.2% margin
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-muted/30 border border-border">
                      <p className="text-[11px] text-muted-foreground font-medium">Low Stock Alerts</p>
                      <p className="text-lg font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">3 Items</p>
                      <span className="text-[10px] text-muted-foreground mt-1 block">
                        Auto-reorder on
                      </span>
                    </div>
                  </div>

                  {/* Real-time Ledger Stream */}
                  <div className="rounded-xl border border-border overflow-hidden bg-card">
                    <div className="flex items-center justify-between px-3.5 py-2 bg-muted/30 border-b border-border text-xs font-semibold text-muted-foreground">
                      <span>Recent Sales Ledger</span>
                      <span className="font-mono text-[10px]">14 Modules Active</span>
                    </div>

                    <div className="divide-y divide-border text-xs">
                      <div className="p-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-[10px]">
                            HL
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">INV-2026-0891</p>
                            <p className="text-[10px] text-muted-foreground">Horizon Logistics • 3 line items</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">$4,200.00</p>
                          <Badge variant="success" className="text-[9px] px-1.5 py-0">
                            Paid (Cash)
                          </Badge>
                        </div>
                      </div>

                      <div className="p-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                            NC
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">INV-2026-0892</p>
                            <p className="text-[10px] text-muted-foreground">Nexus Creative • IT Support</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">$1,850.00</p>
                          <Badge variant="warning" className="text-[9px] px-1.5 py-0">
                            Pending Net-30
                          </Badge>
                        </div>
                      </div>

                      <div className="p-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold text-[10px]">
                            AM
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">INV-2026-0893</p>
                            <p className="text-[10px] text-muted-foreground">Al-Mansoor Retail • Wholesale</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">$12,400.00</p>
                          <Badge variant="success" className="text-[9px] px-1.5 py-0">
                            Paid (Transfer)
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive launcher bar */}
                  <div className="pt-1">
                    <Link to="/demo/login" className="block">
                      <Button variant="secondary" className="w-full text-xs font-bold justify-center py-5 border border-border/80">
                        Launch Full 14-Module Interactive Application
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <Badge variant="default" className="text-xs uppercase">
              Modular Capabilities
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Engineered for Real Commercial Workflows
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Explore the fourteen interconnected modules that make up the NAVIX architecture.
            </p>
          </div>

          {/* Asymmetrical High-Craft Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 - Sales & Invoicing */}
            <Card className="hover:border-primary/50 transition-all shadow-xs">
              <CardContent className="p-6 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Receipt className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Sales & Smart Invoicing</h3>
                  <p className="text-xs text-muted-foreground mt-1">Point-of-sale & billing engine</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Generate professional tax invoices, calculate discounts, manage payment statuses, and trigger clean print views with one click.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground font-medium">
                  <span className="px-2 py-0.5 rounded bg-muted">Fast POS Mode</span>
                  <span className="px-2 py-0.5 rounded bg-muted">Line Discounts</span>
                  <span className="px-2 py-0.5 rounded bg-muted">Printable Invoices</span>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 - Inventory */}
            <Card className="hover:border-primary/50 transition-all shadow-xs">
              <CardContent className="p-6 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Boxes className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Real-Time Inventory</h3>
                  <p className="text-xs text-muted-foreground mt-1">Catalog & warehouse tracking</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Track catalog stock quantities, set automated minimum stock thresholds, prevent stockouts, and audit batch adjustments.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground font-medium">
                  <span className="px-2 py-0.5 rounded bg-muted">SKU Management</span>
                  <span className="px-2 py-0.5 rounded bg-muted">Low Stock Alerts</span>
                  <span className="px-2 py-0.5 rounded bg-muted">Audit Logs</span>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 - Expenses */}
            <Card className="hover:border-primary/50 transition-all shadow-xs">
              <CardContent className="p-6 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Expense & Payables Control</h3>
                  <p className="text-xs text-muted-foreground mt-1">Cash outflow tracking</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Categorize operating expenses (Rent, Salaries, Utilities, Supplies) and reconcile cash flow against incoming revenue.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground font-medium">
                  <span className="px-2 py-0.5 rounded bg-muted">8 Categories</span>
                  <span className="px-2 py-0.5 rounded bg-muted">Vendor Receipts</span>
                  <span className="px-2 py-0.5 rounded bg-muted">Tax Deductible</span>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4 - CRM */}
            <Card className="hover:border-primary/50 transition-all shadow-xs">
              <CardContent className="p-6 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Customer & Vendor CRM</h3>
                  <p className="text-xs text-muted-foreground mt-1">Credit limits & histories</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Maintain complete client directories, monitor outstanding accounts receivable, track supplier credit, and view transaction history.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground font-medium">
                  <span className="px-2 py-0.5 rounded bg-muted">Receivables Aging</span>
                  <span className="px-2 py-0.5 rounded bg-muted">Credit Balance</span>
                  <span className="px-2 py-0.5 rounded bg-muted">Order Timelines</span>
                </div>
              </CardContent>
            </Card>

            {/* Feature 5 - Reports */}
            <Card className="hover:border-primary/50 transition-all shadow-xs">
              <CardContent className="p-6 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Executive Financial Reports</h3>
                  <p className="text-xs text-muted-foreground mt-1">P&L and analytics</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Generate instant Profit & Loss statements, Cash Flow summaries, Sales analytics, and Tax reports across custom date ranges.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground font-medium">
                  <span className="px-2 py-0.5 rounded bg-muted">Profit & Loss</span>
                  <span className="px-2 py-0.5 rounded bg-muted">Cash Flow</span>
                  <span className="px-2 py-0.5 rounded bg-muted">CSV Export</span>
                </div>
              </CardContent>
            </Card>

            {/* Feature 6 - RBAC */}
            <Card className="hover:border-primary/50 transition-all shadow-xs">
              <CardContent className="p-6 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Role-Based Access (RBAC)</h3>
                  <p className="text-xs text-muted-foreground mt-1">Staff security & permissions</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Secure staff workflows with 5 predefined roles (Owner, Manager, Accountant, Cashier). Granular permission matrix for every screen.
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground font-medium">
                  <span className="px-2 py-0.5 rounded bg-muted">Owner</span>
                  <span className="px-2 py-0.5 rounded bg-muted">Manager</span>
                  <span className="px-2 py-0.5 rounded bg-muted">Accountant</span>
                  <span className="px-2 py-0.5 rounded bg-muted">Cashier</span>
                </div>
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

      {/* Comparison: Standard SaaS vs. NAVIX Custom Software */}
      <section className="py-20 bg-muted/20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" className="text-xs uppercase">
              Architecture Comparison
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Why Choose Custom Software Over Generic SaaS?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Standard commercial platforms force you into costly recurring subscriptions and rigid workflows. We give you full flexibility and ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Generic SaaS */}
            <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="text-base font-bold text-foreground">Generic Off-The-Shelf SaaS</h3>
                <span className="text-xs text-destructive font-semibold">Rigid & Costly</span>
              </div>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <span>Escalating monthly fees per user ($30-$80/user/mo) that penalize business growth</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <span>Requires persistent internet; stalls retail checkout during network outages</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <span>Rigid US/EU tax schemas; difficult or impossible to adapt to regional tax authorities</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <span>Your financial transactions and customer contacts locked in a third-party cloud</span>
                </li>
              </ul>
            </div>

            {/* NAVIX Tailored Build */}
            <div className="p-6 rounded-2xl border-2 border-primary/40 bg-primary/5 space-y-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-primary/20">
                <h3 className="text-base font-bold text-foreground">NAVIX Custom Build</h3>
                <Badge variant="default" className="text-xs">
                  Your Terms
                </Badge>
              </div>
              <ul className="space-y-3 text-xs text-foreground">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>One-time build or perpetual license with zero per-cashier recurring penalties</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>100% Offline Windows desktop installer (.bat) with automated LAN syncing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Configured precisely for your jurisdiction (VAT, ZATCA e-invoicing Phase 2, GST)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Complete source code & database ownership on your private infrastructure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Clearly Labeled Demo Testimonials) */}
      <section className="py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <Badge variant="secondary" className="text-[10px] uppercase">
              Demonstration Client Profiles
            </Badge>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
              Built for Ambitious Business Operators
            </h2>
            <p className="text-xs text-muted-foreground italic">
              (Sample fictional testimonials demonstrating commercial use-cases and industry adaptations)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'NAVIX allowed us to completely replace three disconnected spreadsheets. The real-time low-stock alerts alone saved us tens of thousands in lost sales.',
                author: 'Tariq Al-Mansoor',
                role: 'Managing Director, Al-Mansoor Retail Group',
                industry: 'Retail & Distribution (5 Branches)',
                metric: 'Cut daily audit time by 75%',
              },
              {
                quote:
                  'Having a system customized specifically for our service business without paying enterprise ERP fees changed our cash flow overnight. Highly recommended.',
                author: 'Elena Rostova',
                role: 'Founder & CEO, Horizon Engineering Services',
                industry: 'Consulting & Technical Services',
                metric: 'Saved $14,000/yr in SaaS seats',
              },
              {
                quote:
                  'The role-based cashier layout made training new staff take less than 15 minutes. It is fast, clean, and our daily reconciliation is finally stress-free.',
                author: 'Marcus Vance',
                role: 'Operations Lead, Urban Pulse Logistics',
                industry: 'Logistics & Warehousing',
                metric: '100% offline warehouse uptime',
              },
            ].map((t, idx) => (
              <Card key={idx} className="bg-card flex flex-col justify-between">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      {t.metric}
                    </span>
                  </div>
                  <Quote className="h-6 w-6 text-primary/20" />
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{t.quote}"
                  </p>
                  <div className="pt-3 border-t border-border">
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
      <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to Upgrade Your Financial Operations?
            </h2>
            <p className="text-emerald-100 text-lg sm:text-xl leading-relaxed">
              Experience the full 14-module interactive demo right now, or request your custom build tailored to your business rules.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/demo/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-emerald-900 hover:bg-zinc-100 font-bold px-8 py-6">
                Explore Demo Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/custom-software" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-emerald-400 text-white hover:bg-white/10 px-8 py-6 font-bold"
              >
                Request Custom Software Quote
              </Button>
            </Link>
          </div>

          <p className="text-xs text-emerald-200">
            No credit card required. Pure interactive preview with realistic data and instant reset.
          </p>
        </div>
      </section>
    </div>
  );
};
