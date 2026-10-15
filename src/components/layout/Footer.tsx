import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, MessageSquare, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-foreground">
                NAVIX
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Commercial-grade accounting and business management system showcase. Built to be customized, deployed, and scaled for enterprises, retail chains, and service companies.
            </p>
            <div className="pt-2 text-xs text-muted-foreground/80 bg-muted/40 p-3 rounded-lg border border-border/60">
              <strong className="text-foreground">Interactive Demo Disclaimer:</strong> This portal demonstrates software architecture and UI capabilities. All data is processed in-memory and no personal or financial data is permanently stored.
            </div>
          </div>

          {/* Software Modules */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Demo Modules
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/demo/login" className="hover:text-primary transition-colors">
                  POS & Sales Engine
                </Link>
              </li>
              <li>
                <Link to="/demo/login" className="hover:text-primary transition-colors">
                  Smart Invoicing & Tax
                </Link>
              </li>
              <li>
                <Link to="/demo/login" className="hover:text-primary transition-colors">
                  Inventory & Stock Control
                </Link>
              </li>
              <li>
                <Link to="/demo/login" className="hover:text-primary transition-colors">
                  Expenses & Payables
                </Link>
              </li>
              <li>
                <Link to="/demo/login" className="hover:text-primary transition-colors">
                  Executive Financial Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Solutions */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/features" className="hover:text-primary transition-colors">
                  All Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/custom-software" className="hover:text-primary transition-colors">
                  Custom Software Intake
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Support & Sales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:solutions@navix.demo" className="hover:text-primary truncate">
                  solutions@navix.demo
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="truncate">WhatsApp Consultation</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Global Deployment Ready</span>
              </li>
            </ul>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mt-6 mb-2">
              Legal & Policy
            </h4>
            <div className="flex flex-col space-y-1.5 text-xs text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary">
                Terms & Conditions
              </Link>
              <Link to="/disclaimer" className="hover:text-primary">
                Software Disclaimer
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} NAVIX Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="/disclaimer" className="hover:text-foreground">
              Disclaimer
            </Link>
            <Link to="/custom-software" className="flex items-center gap-1 hover:text-foreground">
              Request Your Software <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
