import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Settings,
  Code2,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Server,
  Cloud,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: <Search className="h-6 w-6 text-primary" />,
      title: 'Explore & Audit Your Workflow',
      tagline: 'Step 1: Test & Discover',
      desc: 'Use our online demo or run the local Windows installer to test the accounting modules with realistic data. Identify which features your business needs and which can be simplified.',
      deliverables: [
        'Hands-on evaluation across all 14 accounting modules',
        'Role-based staff testing (Cashier, Accountant, Manager)',
        'Zero-risk exploration with purely in-memory data',
      ],
    },
    {
      number: '02',
      icon: <Settings className="h-6 w-6 text-blue-600" />,
      title: 'Submit Custom Specification',
      tagline: 'Step 2: Scoping & Architecture',
      desc: 'Fill out our interactive Custom Software Request form. Choose your required modules (POS, Invoicing, Tax, Inventory, Multi-branch) and upload sample invoices or business rules.',
      deliverables: [
        'Detailed engineering requirement specification',
        'Fixed-price quotation and timeline commitment (typically 1–3 weeks)',
        'Database architecture and hosting recommendation',
      ],
    },
    {
      number: '03',
      icon: <Code2 className="h-6 w-6 text-purple-600" />,
      title: 'Tailored Build & Hardware Integration',
      tagline: 'Step 3: Engineering & Adaptation',
      desc: 'Our engineers configure your business logic, customize your invoice templates, configure local tax rates (VAT/ZATCA/GST), and test hardware connections (receipt printers, barcode scanners).',
      deliverables: [
        'Customized branding, colors, and company logo',
        'Preloaded product catalog, customer records, and supplier data',
        'Strict role-based permissions tailored to your organizational chart',
      ],
    },
    {
      number: '04',
      icon: <Rocket className="h-6 w-6 text-emerald-600" />,
      title: 'Deployment & Lifetime Handover',
      tagline: 'Step 4: Go Live',
      desc: 'We deploy your platform to your private cloud (Vercel, AWS, DigitalOcean) or provide an automated Windows 1-Click Installer for on-premises offline servers. Full ownership with no recurring per-user fees.',
      deliverables: [
        'Production release deployment with automated daily backups',
        'Staff training walkthrough and administrator handbook',
        'One-click local installer package for Windows desktop & office PCs',
      ],
    },
  ];

  return (
    <div className="py-16 sm:py-24 space-y-20">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <Badge variant="default" className="text-xs uppercase">
          Client Onboarding & Delivery
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          How We Deliver Your Custom Accounting System
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From testing the interactive preview today to running your fully customized software in your stores and offices.
        </p>
      </div>

      {/* Steps Vertical Timeline */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm"
          >
            {/* Number Column */}
            <div className="md:col-span-3 space-y-2">
              <span className="text-4xl sm:text-5xl font-black text-primary/30 tracking-tight">
                {step.number}
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                {step.tagline}
              </p>
              <div className="pt-2">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
            </div>

            {/* Description & Deliverables */}
            <div className="md:col-span-9 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>

              <div className="pt-2 border-t border-border space-y-2">
                <p className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Deliverables in this stage:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {step.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deployment Modes Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-muted/40 p-8 sm:p-10 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Flexible Deployment Architecture</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Choose the infrastructure that matches your company's connectivity and compliance needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Cloud className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Cloud SaaS Deployment</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Hosted on your preferred cloud provider (Vercel, AWS, DigitalOcean). Accessible securely via web browser from any device, anywhere in the world, with SSL encryption and automated backups.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Server className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Local / On-Premises (Windows)</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Installed directly on your local office PCs or in-store servers using our automated 1-Click Windows installer. Works offline with zero internet dependency and 100% data residency inside your walls.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Next Steps CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-foreground">Start with Step 1 Right Now</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Explore the interactive preview without commitment, or jump straight to requesting your custom build quotation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/demo/login">
            <Button size="lg" className="gap-2">
              Launch Demo System
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/custom-software">
            <Button variant="outline" size="lg">
              Request Custom Software
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
