import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Info } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-3">
        <Badge variant="default" className="text-xs uppercase">
          Legal Agreement
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-muted-foreground">
          Last updated: October 2026 • Version 1.0 (Commercial Showcase Template)
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
        <Info className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Template Agreement Notice:</strong> These terms govern your interaction with this demonstration portal. Individual custom software commissions are governed by a separate Master Services Agreement (MSA) signed between the parties.
        </div>
      </div>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Demonstration Use & Scope</h2>
          <p>
            The software interface presented on this website is an interactive prototype showcase designed to exhibit accounting and ERP workflows. Access to the preview is provided free of charge for evaluation purposes. You agree not to attempt to decompile, disrupt, or exploit the demonstration infrastructure.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. Custom Software Quotations & Scoping</h2>
          <p>
            Submission of a request through the Custom Software intake form does not constitute a binding contract until formal engineering scopes, deliverables, timelines, and payment schedules are countersigned in a formal statement of work.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. Intellectual Property</h2>
          <p>
            All brand trademarks, interface designs, codebase assets, and architectural patterns of NAVIX Solutions remain the intellectual property of NAVIX Solutions until customized licenses are formally conveyed per commercial contract.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">4. Limitation of Liability</h2>
          <p>
            The demonstration platform is provided "as is" without warranty of any kind. Under no circumstances shall NAVIX Solutions be liable for damages resulting from reliance on sample calculations or demonstration figures generated within the preview environment.
          </p>
        </section>
      </div>
    </div>
  );
};
