import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Info } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-3">
        <Badge variant="default" className="text-xs uppercase">
          Legal Template
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-muted-foreground">
          Last updated: October 2026 • Version 1.0 (Commercial Showcase Template)
        </p>
      </div>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
        <Info className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Notice to prospective clients:</strong> This document serves as a standard legal policy template provided for software demonstration purposes. When commissioning a custom software deployment, this document is replaced by your organization's formal privacy and data governance policies.
        </div>
      </div>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Interactive Preview Data Handling</h2>
          <p>
            When utilizing the online interactive demonstration of NAVIX, all data transactions—including creating demo sales, editing sample products, adding mock expenses, and generating invoices—are processed purely in volatile browser memory.
          </p>
          <p className="font-semibold text-foreground">
            Zero persistent data storage: No client-entered records are saved to persistent server databases, third-party analytics trackers, or local storage. Refreshing your web browser immediately purges all temporary demonstration state.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. Custom Software Intake & Inquiries</h2>
          <p>
            When submitting inquiries through our Custom Software Request intake or Contact forms, we collect the information you voluntarily submit (such as full name, email address, phone/WhatsApp number, company name, and software module preferences). This information is utilized solely to prepare your technical architecture scope and estimate quotation.
          </p>
          <p>
            We do not sell, rent, or distribute your contact details to third-party marketing brokers or advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. Enterprise & On-Premises Deployments</h2>
          <p>
            For client organizations deploying customized builds of NAVIX:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>On-Premises / Windows Desktop:</strong> Your database resides strictly within your local computer or private local network. NAVIX retains zero remote access to your commercial records.
            </li>
            <li>
              <strong>Private Cloud:</strong> Deployed inside your private cloud infrastructure (AWS, DigitalOcean, or private VPS) under your exclusive encryption keys and administrative custody.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">4. Contacting Data Governance</h2>
          <p>
            If you have questions regarding data privacy, security architecture, or custom encryption compliance (e.g., GDPR, HIPAA, or regional data sovereignty), contact our engineering compliance officer at{' '}
            <a href="mailto:aeroteam.agency@gmail.com" className="text-primary hover:underline">
              aeroteam.agency@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};
