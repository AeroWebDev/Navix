import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-3">
        <Badge variant="destructive" className="text-xs uppercase">
          Financial & Regulatory Notice
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Software & Accounting Disclaimer
        </h1>
        <p className="text-xs text-muted-foreground">
          Applicable to all online previews and prototype demonstrations
        </p>
      </div>

      <div className="p-5 rounded-xl bg-destructive/10 border border-destructive/20 text-xs sm:text-sm text-destructive dark:text-rose-300 flex items-start gap-3">
        <AlertTriangle className="h-6 w-6 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block text-sm mb-1">Demonstration Interface Notice</strong>
          The interactive software application displayed in this showcase is a functional design prototype and commercial engineering demonstration. It must not be falsely construed as a certified accounting engine, chartered auditing platform, or authorized tax-filing intermediary in its raw showcase state.
        </div>
      </div>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Fictional & Simulated Data</h2>
          <p>
            All figures, client records, company names, invoices, purchase orders, financial reports, and tax values presented across the demo are entirely fictional and generated to illustrate software performance and UI workflows. Any resemblance to real commercial entities or living persons is purely coincidental.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. Jurisdictional Tax & Compliance Adaptations</h2>
          <p>
            Tax laws (including VAT, sales tax, GST, ZATCA e-invoicing Phase 2, and corporate withholding tax) vary by national jurisdiction and industry sector. While the software platform includes flexible calculation modules and QR code generator hooks:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Clients deploying custom installations must calibrate tax rates to conform with their domestic financial statutes.
            </li>
            <li>
              We offer certified API integration services with official tax authorities during tailored commercial deployments.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. No Professional Accounting Advice</h2>
          <p>
            Content on this website, sample financial reports (P&L, Balance Sheet, Cash Flow), and demo statements do not constitute professional certified public accounting (CPA), legal, or tax advice. Organizations should consult licensed accountants or legal counsel regarding statutory bookkeeping obligations.
          </p>
        </section>
      </div>
    </div>
  );
};
