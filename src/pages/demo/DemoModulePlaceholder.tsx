import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DemoModulePlaceholderProps {
  title: string;
  moduleKey: string;
  description: string;
  features: string[];
}

export const DemoModulePlaceholder: React.FC<DemoModulePlaceholderProps> = ({
  title,
  description,
  features,
}) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/custom-software">
            <Button size="sm" variant="outline" className="rounded-full text-xs font-semibold gap-1.5">
              <span>Request Module Deployment</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Showcase Card */}
      <div className="rounded-3xl border border-border/60 bg-card p-8 sm:p-12 shadow-soft-island text-center space-y-6">
        <div className="h-14 w-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto">
          <Layers className="h-7 w-7" />
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <h2 className="text-xl font-extrabold text-foreground tracking-tight">
            {title} Suite
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Enterprise workflow automation, double-entry audit trails, and multi-currency ledger support configured for your organization.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="pt-6 border-t border-border/60 max-w-xl mx-auto text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
            Module Architecture & Capabilities
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-2xl bg-muted/40 border border-border/40 text-xs text-foreground font-medium"
              >
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links / Navigation Help */}
        <div className="pt-6 border-t border-border/60 flex flex-wrap items-center justify-center gap-3">
          <Link to="/demo/sales">
            <Button size="sm" className="rounded-full text-xs font-bold bg-accent hover:bg-accent/90 text-white px-5 shadow-soft-island">
              Explore Live Sales & POS
            </Button>
          </Link>
          <Link to="/demo/products">
            <Button size="sm" variant="outline" className="rounded-full text-xs font-semibold px-5">
              View Inventory Catalogue
            </Button>
          </Link>
          <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground ml-2">
            <Shield className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Role-Based Access Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
};
