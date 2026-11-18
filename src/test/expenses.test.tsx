import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { DemoDataProvider } from '@/context/DemoDataContext';
import { ExpensesListPage } from '@/pages/demo/ExpensesListPage';
import { ExpenseForm } from '@/components/forms/ExpenseForm';

const ExpensesTestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <DemoDataProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </DemoDataProvider>
  </AuthProvider>
);

describe('Phase 8: Expenses Module Tests', () => {
  it('EXP-001: ExpensesListPage renders operating expenses list and top aggregate summary', () => {
    render(
      <ExpensesTestWrapper>
        <ExpensesListPage />
      </ExpensesTestWrapper>
    );

    expect(screen.getByText(/Operating Expenses & Payables/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Operating Outflow/i)).toBeInTheDocument();
    expect(screen.getByText(/Tax-Deductible Costs/i)).toBeInTheDocument();
    expect(screen.getByText(/Top Cost Center/i)).toBeInTheDocument();
    expect(screen.getByText(/Record Expense/i)).toBeInTheDocument();
  });

  it('EXP-002: Expenses search filters results correctly', async () => {
    render(
      <ExpensesTestWrapper>
        <ExpensesListPage />
      </ExpensesTestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/search expenses by title/i);
    fireEvent.change(searchInput, { target: { value: 'Lease' } });

    await waitFor(
      () => {
        expect(screen.getAllByText(/Headquarters Main Office Lease/i)[0]).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });

  it('EXP-003: Expense category filter shows only matching expenses', async () => {
    render(
      <ExpensesTestWrapper>
        <ExpensesListPage />
      </ExpensesTestWrapper>
    );

    // Click on "Rent" category pill
    const rentPill = screen.getAllByRole('button', { name: /^Rent$/i })[0];
    fireEvent.click(rentPill);

    await waitFor(() => {
      expect(screen.getAllByText(/Headquarters Main Office Lease/i)[0]).toBeInTheDocument();
    });
  });

  it('EXP-004: ExpenseForm validates required title and amount', async () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <ExpensesTestWrapper>
        <ExpenseForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </ExpensesTestWrapper>
    );

    // Submit empty form
    const submitBtn = screen.getByRole('button', { name: /save expense record/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/title must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/amount must be greater than 0/i)).toBeInTheDocument();
      expect(screen.getByText(/vendor \/ payee name must be at least 2 characters/i)).toBeInTheDocument();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('EXP-005: ExpenseForm submits valid data correctly', async () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <ExpensesTestWrapper>
        <ExpenseForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </ExpensesTestWrapper>
    );

    const titleInput = screen.getByPlaceholderText(/office internet/i);
    fireEvent.change(titleInput, { target: { value: 'High Speed Fiber Internet' } });

    const amountInput = screen.getByPlaceholderText('0.00');
    fireEvent.change(amountInput, { target: { value: '180.50' } });

    const paidToInput = screen.getByPlaceholderText(/telecom egypt/i);
    fireEvent.change(paidToInput, { target: { value: 'Telecom Provider LLC' } });

    const submitBtn = screen.getByRole('button', { name: /save expense record/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    const callArgs = handleSubmit.mock.calls[0][0];
    expect(callArgs.title).toBe('High Speed Fiber Internet');
    expect(callArgs.amount).toBe(180.5);
    expect(callArgs.paidTo).toBe('Telecom Provider LLC');
  });
});
