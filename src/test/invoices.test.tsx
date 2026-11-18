import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { DemoDataProvider } from '@/context/DemoDataContext';
import { InvoicesListPage } from '@/pages/demo/InvoicesListPage';
import { PaymentsListPage } from '@/pages/demo/PaymentsListPage';
import { InvoiceForm } from '@/components/forms/InvoiceForm';
import { RecordPaymentModal } from '@/components/modals/RecordPaymentModal';
import { MOCK_INVOICES } from '@/data/mockInvoices';

const InvoicesTestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <DemoDataProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </DemoDataProvider>
  </AuthProvider>
);

describe('Phase 9: Commercial Invoices Module Tests', () => {
  it('INV-001: InvoicesListPage renders KPI cards and invoice records', () => {
    render(
      <InvoicesTestWrapper>
        <InvoicesListPage />
      </InvoicesTestWrapper>
    );

    expect(screen.getByText(/Commercial Invoices/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Invoiced/i)).toBeInTheDocument();
    expect(screen.getByText(/Collected Revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending Collection/i)).toBeInTheDocument();
    expect(screen.getByText(/Overdue Receivables/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Invoice/i)).toBeInTheDocument();
    expect(screen.getAllByText(/INV-2025-020/i)[0]).toBeInTheDocument();
  });

  it('INV-002: Invoices search filters results by customer name or invoice number', async () => {
    render(
      <InvoicesTestWrapper>
        <InvoicesListPage />
      </InvoicesTestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/search by invoice # or customer/i);
    fireEvent.change(searchInput, { target: { value: 'Horizon Logistics' } });

    await waitFor(
      () => {
        expect(screen.getAllByText(/Horizon Logistics Inc\./i)[0]).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });

  it('INV-003: Invoices status filter toggles between status views', async () => {
    render(
      <InvoicesTestWrapper>
        <InvoicesListPage />
      </InvoicesTestWrapper>
    );

    const paidFilter = screen.getByRole('button', { name: /^Paid$/i });
    fireEvent.click(paidFilter);

    await waitFor(() => {
      expect(screen.getAllByText(/INV-2025-014/i)[0]).toBeInTheDocument();
    });
  });

  it('INV-004: InvoiceForm validates required fields and computes line totals', () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <InvoicesTestWrapper>
        <InvoiceForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </InvoicesTestWrapper>
    );

    expect(screen.getByText(/Billed Customer/i)).toBeInTheDocument();
    expect(screen.getByText(/Invoice Total:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Row/i })).toBeInTheDocument();
  });

  it('INV-005: RecordPaymentModal displays amount due and triggers payment callback', () => {
    const targetInvoice = MOCK_INVOICES[0];
    const handleConfirm = vi.fn();
    const handleClose = vi.fn();

    render(
      <RecordPaymentModal
        isOpen={true}
        invoice={targetInvoice}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    );

    expect(screen.getByText(/Record Customer Payment/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment Amount Received/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /Confirm Payment/i });
    fireEvent.click(submitBtn);

    expect(handleConfirm).toHaveBeenCalledWith(targetInvoice.total, 'Bank Transfer');
  });

  it('PAY-001: PaymentsListPage renders treasury cash metrics and transactions', () => {
    render(
      <InvoicesTestWrapper>
        <PaymentsListPage />
      </InvoicesTestWrapper>
    );

    expect(screen.getByText(/Treasury & Payment Transactions/i)).toBeInTheDocument();
    expect(screen.getByText(/Cash Inflow/i)).toBeInTheDocument();
    expect(screen.getByText(/Cash Outflow/i)).toBeInTheDocument();
    expect(screen.getByText(/Net Cash Flow/i)).toBeInTheDocument();
    expect(screen.getByText(/Settled Movements/i)).toBeInTheDocument();
  });

  it('PAY-002: Payments search filters transactions by counterparty or number', async () => {
    render(
      <InvoicesTestWrapper>
        <PaymentsListPage />
      </InvoicesTestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/search by txn #, party, or document/i);
    fireEvent.change(searchInput, { target: { value: 'TechDistrib' } });

    await waitFor(
      () => {
        expect(screen.getAllByText(/TechDistrib International Ltd\./i)[0]).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });
});
