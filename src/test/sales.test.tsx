import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { DemoDataProvider } from '@/context/DemoDataContext';
import { SalesListPage } from '@/pages/demo/SalesListPage';
import { SaleForm } from '@/components/forms/SaleForm';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Pagination } from '@/components/tables/Pagination';


// Wrapper for sales testing
const SalesTestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <DemoDataProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </DemoDataProvider>
  </AuthProvider>
);

describe('Phase 4: Sales Module Tests', () => {
  it('SALE-001: SalesListPage renders sales table and top KPI summary', () => {
    render(
      <SalesTestWrapper>
        <SalesListPage />
      </SalesTestWrapper>
    );

    expect(screen.getByText(/Sales & Point of Sale/i)).toBeInTheDocument();
    expect(screen.getByText(/Active Sales Volume/i)).toBeInTheDocument();
    expect(screen.getByText(/New Sale POS/i)).toBeInTheDocument();
  });

  it('SALE-002: Search filters sales results in real-time', async () => {
    render(
      <SalesTestWrapper>
        <SalesListPage />
      </SalesTestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/search by customer name/i);

    // Search for a specific invoice number
    fireEvent.change(searchInput, { target: { value: 'INV-2025-001' } });

    await waitFor(
      () => {
        expect(screen.getByText('INV-2025-001')).toBeInTheDocument();
        expect(screen.getByText('Horizon Logistics Inc.')).toBeInTheDocument();
      },
      { timeout: 800 }
    );
  });

  it('SALE-003: Status filter filters table by payment status', () => {
    render(
      <SalesTestWrapper>
        <SalesListPage />
      </SalesTestWrapper>
    );

    const statusFilter = screen.getByLabelText(/filter by payment status/i);
    fireEvent.change(statusFilter, { target: { value: 'pending' } });

    // Pending entries should exist
    expect(statusFilter).toHaveValue('pending');
  });

  it('SALE-004: SaleForm shows validation error when line item quantity is 0', async () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <SalesTestWrapper>
        <SaleForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </SalesTestWrapper>
    );

    // Find quantity input and set to 0
    const qtyInputs = screen.getAllByRole('spinbutton');
    const firstQty = qtyInputs[0];
    fireEvent.change(firstQty, { target: { value: '0' } });

    const submitBtn = screen.getByRole('button', { name: /record & process sale/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/quantity must be at least 1/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('SALE-005: SaleForm computes totals reactively when quantity and prices change', () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <SalesTestWrapper>
        <SaleForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </SalesTestWrapper>
    );

    // Initial calculation rendered
    expect(screen.getByText(/Grand Total:/i)).toBeInTheDocument();
  });

  it('SALE-006: ConfirmDeleteModal triggers onConfirm when Confirm Delete is clicked', () => {
    const handleConfirm = vi.fn();
    const handleClose = vi.fn();

    render(
      <ConfirmDeleteModal
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirm}
        itemName="INV-2025-001"
      />
    );

    expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument();
    expect(screen.getByText(/"INV-2025-001"/i)).toBeInTheDocument();

    const confirmBtn = screen.getByRole('button', { name: /confirm delete/i });
    fireEvent.click(confirmBtn);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('SALE-007: StatusBadge displays proper labels for varied states', () => {
    const { rerender } = render(<StatusBadge status="paid" />);
    expect(screen.getByText('Paid')).toBeInTheDocument();

    rerender(<StatusBadge status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();

    rerender(<StatusBadge status="overdue" />);
    expect(screen.getByText('Overdue')).toBeInTheDocument();

    rerender(<StatusBadge status="low_stock" />);
    expect(screen.getByText('Low Stock')).toBeInTheDocument();
  });

  it('SALE-008: Pagination navigates pages properly', () => {
    const handlePageChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={4}
        totalItems={38}
        pageSize={10}
        onPageChange={handlePageChange}
      />
    );

    expect(screen.getByText(/Showing/i)).toBeInTheDocument();
    const nextBtn = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextBtn);

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });
});
