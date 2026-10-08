import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { LandingPage } from '@/pages/marketing/LandingPage';
import { FeaturesPage } from '@/pages/marketing/FeaturesPage';
import { HowItWorksPage } from '@/pages/marketing/HowItWorksPage';
import { ContactPage } from '@/pages/marketing/ContactPage';
import { FAQPage } from '@/pages/marketing/FAQPage';
import { PrivacyPage } from '@/pages/marketing/PrivacyPage';
import { TermsPage } from '@/pages/marketing/TermsPage';
import { DisclaimerPage } from '@/pages/marketing/DisclaimerPage';
import { NotFoundPage } from '@/pages/marketing/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing Portal Routes */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Route>

        {/* Demo Redirect placeholder before AppShell */}
        <Route path="/demo" element={<Navigate to="/demo/login" replace />} />

        {/* Catch-all 404 */}
        <Route
          path="*"
          element={
            <MarketingLayout>
              <NotFoundPage />
            </MarketingLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
