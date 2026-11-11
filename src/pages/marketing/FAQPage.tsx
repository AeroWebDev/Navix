import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Customization' | 'Deployment' | 'Pricing' | 'Compliance';
}

export const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First open by default

  const faqs: FAQItem[] = [
    {
      category: 'General',
      question: 'Is the interactive demo running real accounting logic?',
      answer:
        'Yes! The interactive demo runs true accounting calculations in-memory, including sales subtotal, percentage discounts, line-item tax additions, real-time inventory deductions, and dynamic financial statements. However, as this is a demonstration environment, all data is ephemeral and resets upon page reload or clicking "Reset Demo".',
    },
    {
      category: 'General',
      question: 'Can I test different staff roles in the demo?',
      answer:
        'Yes. You can log into the demo as an Owner (super admin), Branch Manager, Accountant, or Cashier. Each role enforces strict permissions—for example, Cashiers cannot access financial reports, while Accountants have direct access to general ledger and profit/loss statements.',
    },
    {
      category: 'Customization',
      question: 'How much can the software be customized for my business?',
      answer:
        'The software can be 100% customized. Because we own and develop the complete source code architecture, we can alter database models, add custom invoice fields, configure thermal receipt templates, build specific POS workflows, connect barcode scanners, and implement multi-warehouse transfers tailored specifically to your company.',
    },
    {
      category: 'Customization',
      question: 'Can you migrate data from our existing Excel sheets or old accounting app?',
      answer:
        'Yes. As part of our tailored deployment service, we write automated migration scripts to import your existing product catalogs, customer phone books, supplier balances, and historical invoices into your new database.',
    },
    {
      category: 'Deployment',
      question: 'Can we install this locally on our Windows PCs without internet?',
      answer:
        'Yes! We provide an automated 1-Click Windows installer package (`install.bat` and PowerShell launcher) that sets up the system on your local office PCs or local store server. It works 100% offline with zero cloud dependency and keeps all financial records inside your physical store.',
    },
    {
      category: 'Deployment',
      question: 'Can we run this on the cloud with multi-branch synchronization?',
      answer:
        'Absolutely. The architecture is cloud-native and can be deployed to your private AWS, Vercel, or DigitalOcean cloud with encrypted PostgreSQL database clustering, allowing head office managers to monitor real-time sales across multiple physical branch stores.',
    },
    {
      category: 'Pricing',
      question: 'Do you charge recurring monthly fees per user?',
      answer:
        'No. Unlike standard SaaS platforms that penalize growing teams with escalating monthly fees per cashier or accountant, our custom software platform is typically delivered as a one-time build or perpetual license with optional annual maintenance and SLA support.',
    },
    {
      category: 'Compliance',
      question: 'Does the software support localized tax compliance (e.g., VAT, ZATCA)?',
      answer:
        'Yes. We can configure the tax engine to generate compliant QR codes (such as ZATCA Phase 1 & 2 for Saudi Arabia, HMRC formats for the UK, or GST specifications for UAE/India) directly on printable and downloadable invoices.',
    },
    {
      category: 'Compliance',
      question: 'Is this demo version legally certified as an official accounting book?',
      answer:
        'No. This online showcase is an interactive demonstration and prototype to help clients evaluate workflows before commissioning custom software. Final commercial installations are configured to meet the specific legal accounting guidelines of your jurisdiction.',
    },
  ];

  const categories = ['All', 'General', 'Customization', 'Deployment', 'Pricing', 'Compliance'];

  const toggleIndex = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 sm:py-24 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <Badge variant="default" className="text-xs uppercase">
          Frequently Asked Questions
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Everything You Need to Know
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers about our interactive software preview, customization capabilities, and deployment options.
        </p>

        {/* Search bar */}
        <div className="max-w-xl mx-auto pt-4">
          <Input
            placeholder="Search questions (e.g., Windows installer, VAT, roles, pricing)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Category filter pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Questions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 rounded-xl border border-dashed border-border p-6 space-y-2">
            <HelpCircle className="h-8 w-8 text-muted-foreground mx-auto" />
            <p className="text-sm font-semibold text-foreground">No questions found</p>
            <p className="text-xs text-muted-foreground">
              Try searching with different keywords or switch categories.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                className={cn(
                  'rounded-xl border border-border bg-card overflow-hidden transition-all duration-300',
                  isOpen ? 'border-accent/40 shadow-md shadow-emerald-500/5' : 'hover:border-accent/30'
                )}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-muted/20 transition-colors"
                >
                  <div className="space-y-1 pr-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 text-muted-foreground transition-transform duration-200 shrink-0',
                      isOpen && 'rotate-180 text-primary'
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/60 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still have questions CTA */}
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4 pt-6">
        <h3 className="text-xl font-bold text-foreground">Still have questions?</h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Our technical advisors are available to review your exact business requirements.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/contact">
            <Button variant="outline" size="sm">
              Contact Engineering Team
            </Button>
          </Link>
          <Link to="/custom-software">
            <Button size="sm">
              Request Custom Software
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
