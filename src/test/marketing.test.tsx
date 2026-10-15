import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { LandingPage } from '../pages/marketing/LandingPage';
import { ContactPage } from '../pages/marketing/ContactPage';
import { NotFoundPage } from '../pages/marketing/NotFoundPage';
import { CustomSoftwarePage } from '../pages/custom/CustomSoftwarePage';

describe('Phase 1: Marketing Components & Pages', () => {
  it('LP-001 / NAV-010: Navbar renders brand and primary navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText(/NAVIX/i)).toBeInTheDocument();
    expect(screen.getByText(/Features/i)).toBeInTheDocument();
    expect(screen.getByText(/How It Works/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Software/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /explore demo/i })[0]).toBeInTheDocument();
  });

  it('LP-008: Footer renders with company name and legal links', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms & Conditions/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Disclaimer/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  it('LP-001 / LP-002: LandingPage renders hero headline and CTA buttons', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Complete Accounting Software Built Around Your Business/i)
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /explore demo/i })[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request your software/i })).toBeInTheDocument();
    expect(screen.getByText(/Sales & Smart Invoicing/i)).toBeInTheDocument();
    expect(screen.getByText(/Real-Time Inventory/i)).toBeInTheDocument();
  });

  it('FORM-001: ContactPage shows validation errors when submitted empty', async () => {
    render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /send inquiry/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('NAV-008: NotFoundPage renders 404 message and navigation links', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back to homepage/i })).toBeInTheDocument();
  });

  it('CUST-001: CustomSoftwarePage renders headline, form fields, and presets', () => {
    render(
      <BrowserRouter>
        <CustomSoftwarePage />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Need an Accounting System Built for Your Business\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /request my software/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Retail Store \/ Supermarket/i)).toBeInTheDocument();
    expect(screen.getByText(/Business Information/i)).toBeInTheDocument();
  });

  it('CUST-002: CustomSoftwarePage validates required fields on empty submit', async () => {
    render(
      <BrowserRouter>
        <CustomSoftwarePage />
      </BrowserRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /request my software/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/full name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/business name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid business email/i)).toBeInTheDocument();
    });
  });
});
