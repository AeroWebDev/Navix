import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgressBar } from '@/components/common/ScrollProgressBar';
import { BackToTopButton } from '@/components/common/BackToTopButton';

export interface MarketingLayoutProps {
  children?: React.ReactNode;
}

export const MarketingLayout: React.FC<MarketingLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary relative">
      <ScrollProgressBar />
      <Navbar />
      <main key={location.pathname} className="flex-1 animate-teleport-in">
        {children || <Outlet />}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};
