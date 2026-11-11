import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call for demonstration
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.info('Contact form submitted:', data);
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="py-16 sm:py-24 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <Badge variant="default" className="text-xs uppercase">
          Direct Inquiries & Consultations
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Let's Discuss Your Business Requirements
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question about the interactive demo, pricing, or custom feature development? Reach out to our engineering team directly.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & WhatsApp Channel */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-gradient-to-br from-card to-muted/30">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Direct Channels</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Typical response time: under 4 business hours.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* WhatsApp Quick Chat */}
                  <a
                    href="https://wa.me/201108710742?text=Hello%20NAVIX%2C%20I%20am%20interested%20in%20a%20custom%20accounting%20system."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">WhatsApp Direct Consultation</p>
                        <p className="text-xs opacity-90">+20 110 871 0742</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                  </a>

                  {/* Email */}
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Email</p>
                      <a
                        href="mailto:aeroteam.agency@gmail.com"
                        className="text-sm font-bold text-foreground hover:text-primary transition-colors"
                      >
                        aeroteam.agency@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Telephone</p>
                      <p className="text-sm font-bold text-foreground">+20 110 871 0742</p>
                      <p className="text-[11px] text-muted-foreground">Sun–Thu: 9:00 AM – 6:00 PM (EET)</p>
                    </div>
                  </div>

                  {/* Location & Support */}
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Headquarters & Operations</p>
                      <p className="text-sm font-bold text-foreground">Aero Team</p>
                      <p className="text-xs text-muted-foreground">Cairo, Egypt</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-muted-foreground border-t border-border flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>SLA Guarantee: Inquiries answered within 24 hours.</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7">
            <Card>
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Send Us a Direct Message</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Fill out the form below and an engineer will reply directly to your inbox.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="p-8 text-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-4 animate-in fade-in">
                    <div className="h-12 w-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs text-muted-foreground max-w-md mx-auto">
                      Thank you for contacting NAVIX Solutions. A software consultant has received your message and will review it shortly.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-2"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">Full Name *</label>
                        <Input
                          placeholder="e.g. Sarah Jenkins"
                          {...register('fullName')}
                          error={errors.fullName?.message}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">Business Email *</label>
                        <Input
                          type="email"
                          placeholder="e.g. s.jenkins@company.com"
                          {...register('email')}
                          error={errors.email?.message}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">Phone or WhatsApp</label>
                        <Input
                          placeholder="e.g. +1 (555) 012-3456"
                          {...register('phone')}
                          error={errors.phone?.message}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">Subject *</label>
                        <Input
                          placeholder="e.g. Quotation for 3 Retail Branches"
                          {...register('subject')}
                          error={errors.subject?.message}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground">Message / Business Details *</label>
                      <textarea
                        rows={5}
                        className="w-full rounded-lg border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
                        placeholder="Tell us about your business, current software pain points, number of branches, and any custom requirements..."
                        {...register('message')}
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive font-medium">{errors.message.message}</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto gap-2">
                        <Send className="h-4 w-4" />
                        Send Inquiry
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
