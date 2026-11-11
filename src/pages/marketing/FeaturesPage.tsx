import React from 'react';
import { Link } from 'react-router-dom';
import {
  Receipt,
  Boxes,
  Users,
  Coins,
  BarChart3,
  Lock,
  ArrowRight,
  CheckCircle2,
  Building,
  Printer,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/common/ScrollReveal';

export const FeaturesPage: React.FC = () => {
  const modules = [
    {
      icon: <Receipt className="h-6 w-6 text-emerald-600" />,
      title: 'Sales & POS Management',
      badge: 'Core Engine',
      description:
        'Comprehensive point-of-sale and sales invoicing system. Create transactions, apply percentage or fixed discounts, select tax rates, and manage payments.',
      capabilities: [
        'Instant sale creation with line-item discounts',
        'Multiple payment modes: Cash, Card, Bank Transfer, Cheque',
        'Real-time inventory deduction upon completion',
        'Sales sorting, customer search, and date-range filters',
        'Export sales logs directly to CSV format',
      ],
      link: '/demo/login',
    },
    {
      icon: <Boxes className="h-6 w-6 text-blue-600" />,
      title: 'Products & Real-Time Inventory',
      badge: 'Stock Control',
      description:
        'Complete SKU tracking, category management, margin calculation, and automated minimum stock warnings to prevent stockouts.',
      capabilities: [
        'SKU code, unit cost, and retail pricing management',
        'Low stock threshold alerts (Amber & Red flags)',
        'Stock adjustment logs (Restock, Damage, Audit corrections)',
        'Category filtering (Electronics, Hardware, Services, etc.)',
        'Supplier association for 1-click reordering',
      ],
      link: '/demo/login',
    },
    {
      icon: <Printer className="h-6 w-6 text-purple-600" />,
      title: 'Professional Invoicing & Printing',
      badge: 'Tax Compliant',
      description:
        'Generate beautiful, branded client invoices with automated calculations for subtotals, VAT/tax, and discounts. Built-in clean print formatting.',
      capabilities: [
        'Branded company header with tax registration numbers',
        'Clean client billing and address format',
        'Native browser print layout (@media print) with hidden UI elements',
        'Simulated PDF generation and digital receipt transmission',
        'Status lifecycle tracking (Draft, Pending, Paid, Overdue)',
      ],
      link: '/demo/login',
    },
    {
      icon: <Coins className="h-6 w-6 text-amber-600" />,
      title: 'Expenses & Cash Outflow Ledger',
      badge: 'Cost Control',
      description:
        'Categorize operating expenditure, track vendor receipts, and maintain a clear audit trail of company cash flow.',
      capabilities: [
        '8 standard categories: Rent, Salaries, Utilities, Marketing, etc.',
        'Payment method and transaction reference tracking',
        'Visual category breakdown donut and bar analytics',
        'Tax-deductible flag for annual accounting prep',
        'Receipt attachment indicator and notes field',
      ],
      link: '/demo/login',
    },
    {
      icon: <Users className="h-6 w-6 text-rose-600" />,
      title: 'Customers & Suppliers CRM',
      badge: 'Directory',
      description:
        'Centralized profiles for clients and suppliers. Track credit limits, outstanding balances, order histories, and payment timelines.',
      capabilities: [
        'Accounts receivable tracking by customer',
        'Accounts payable tracking by supplier',
        'Detailed transaction history timeline per contact',
        'Company vs. Individual client categorization',
        'Direct contact links and billing tax identifiers',
      ],
      link: '/demo/login',
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-indigo-600" />,
      title: 'Financial Statements & Reports',
      badge: 'Executive',
      description:
        '8+ business intelligence reports that give leadership instant clarity on financial health, profit margins, and inventory value.',
      capabilities: [
        'Profit & Loss (P&L) statement with margin percentage',
        'Sales summary by period, category, and cashier',
        'Accounts Receivable Aging and Payables breakdown',
        'Cash flow trend and monthly performance charts',
        'Inventory valuation and stock movement audit',
      ],
      link: '/demo/login',
    },
    {
      icon: <Lock className="h-6 w-6 text-emerald-600" />,
      title: 'Role-Based Access Control (RBAC)',
      badge: 'Security',
      description:
        'Prevent unauthorized operations and protect financial confidentiality with strict permission matrices across roles.',
      capabilities: [
        '5 Pre-configured roles: Owner, Manager, Accountant, Cashier',
        'Dynamic navigation filtering based on role permissions',
        'Restricted routes: Cashiers cannot view reports or financial statements',
        'Demo password authentication with interactive quick-fill accounts',
        '1-click active role switching in preview mode',
      ],
      link: '/demo/login',
    },
    {
      icon: <Building className="h-6 w-6 text-blue-600" />,
      title: 'Multi-Branch & Custom Adaptations',
      badge: 'Enterprise',
      description:
        'Engineered to scale from a single shop to multi-branch regional distribution networks with centralized synchronization.',
      capabilities: [
        'Branch-level stock isolation and transfer tracking',
        'Consolidated head-office accounting and reports',
        'Custom local tax integrations (ZATCA, HMRC, IRS, GST)',
        'Thermal receipt printer and barcode scanner hardware support',
        'Self-hosted on-premises or cloud container deployment options',
      ],
      link: '/custom-software',
    },
  ];

  return (
    <div className="py-16 sm:py-24 space-y-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <Badge variant="default" className="text-xs uppercase">
          Software Architecture & Modules
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Everything You Need to Run Your Business
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore every subsystem included in the interactive demo and available for custom client adaptation.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((m, idx) => (
            <ScrollReveal key={idx} delay={(idx % 3) * 100}>
              <Card className="flex flex-col justify-between hover:border-accent/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-muted/60 flex items-center justify-center">
                      {m.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {m.badge}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">{m.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{m.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                      Key Capabilities:
                    </p>
                    <ul className="space-y-1.5">
                      {m.capabilities.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <div className="p-6 pt-0">
                  <Link to={m.link}>
                    <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs font-semibold justify-center hover:border-accent/40 hover:bg-accent/5">
                      Test in Interactive Demo
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Comparison Table Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Off-The-Shelf SaaS vs. NAVIX Custom Software
            </h2>
            <p className="text-sm text-muted-foreground">
              Why growing businesses choose a customized platform over rigid subscriptions.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-4">Evaluation Factor</th>
                  <th className="py-3 px-4">Generic SaaS Accounting</th>
                  <th className="py-3 px-4 text-primary font-bold">NAVIX Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs sm:text-sm">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-foreground">Pricing Model</td>
                  <td className="py-3.5 px-4 text-muted-foreground">Endless monthly fees per user</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">One-time / customized ownership</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-foreground">Data Privacy & Sovereignty</td>
                  <td className="py-3.5 px-4 text-muted-foreground">Locked in 3rd party public cloud</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Your private cloud or local Windows network</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-foreground">Custom Business Logic</td>
                  <td className="py-3.5 px-4 text-muted-foreground">Rigid, impossible to modify</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">100% tailor-made to your workflows</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-foreground">Hardware & POS Support</td>
                  <td className="py-3.5 px-4 text-muted-foreground">Limited to certified expensive devices</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Standard thermal printers, scanners, PCs</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-foreground">Tax Authority Compliance</td>
                  <td className="py-3.5 px-4 text-muted-foreground">Generic global templates</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Configured for your country & tax rules</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-foreground">Experience the Software Live</h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          No sign up required to test the preview. Log in as an Owner, Accountant, or Cashier to explore the workflows.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/demo/login">
            <Button size="lg" className="gap-2">
              Explore Demo Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/custom-software">
            <Button variant="outline" size="lg">
              Request Custom Software Build
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
