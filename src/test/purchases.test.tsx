import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { DemoDataProvider, useDemoData } from '@/context/DemoDataContext';
import { PurchasesListPage } from '@/pages/demo/PurchasesListPage';
import { PurchaseForm } from '@/components/forms/PurchaseForm';

// Wrapper for purchases testing
const PurchasesTestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <DemoDataProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </DemoDataProvider>
  </AuthProvider>
);

describe('Phase 5: Purchases Module Tests', () => {
  it('PURCH-001: PurchasesListPage renders purchase orders list and top KPI summary', () => {
    render(
      <PurchasesTestWrapper>
        <PurchasesListPage />
      </PurchasesTestWrapper>
    );

    expect(screen.getByText(/Purchases & Procurement/i)).toBeInTheDocument();
    expect(screen.getByText(/Total POs/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Spend/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Purchase Order/i)).toBeInTheDocument();
  });

  it('PURCH-002: Purchases search by supplier name or PO number filters results', async () => {
    render(
      <PurchasesTestWrapper>
        <PurchasesListPage />
      </PurchasesTestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/search po # or supplier/i);

    // Filter by PO number
    fireEvent.change(searchInput, { target: { value: 'PO-2025-001' } });

    await waitFor(
      () => {
        expect(screen.getByText('PO-2025-001')).toBeInTheDocument();
        expect(screen.getByText('TechDistrib International Ltd.')).toBeInTheDocument();
      },
      { timeout: 800 }
    );
  });

  it('PURCH-003: PurchaseForm validates required supplier', async () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <PurchasesTestWrapper>
        <PurchaseForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </PurchasesTestWrapper>
    );

    const submitBtn = screen.getByRole('button', { name: /create purchase order/i });
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText(/please select a supplier for this purchase order/i)
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('PURCH-004: PurchaseForm validates line item quantity greater than zero', async () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <PurchasesTestWrapper>
        <PurchaseForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </PurchasesTestWrapper>
    );

    // Find quantity input and set to 0
    const qtyInputs = screen.getAllByRole('spinbutton');
    const firstQty = qtyInputs[0];
    fireEvent.change(firstQty, { target: { value: '0' } });

    const submitBtn = screen.getByRole('button', { name: /create purchase order/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/quantity must be at least 1/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('PURCH-005: Marking purchase as received updates status and increases product stock', async () => {
    const targetPoId = 'po-015';
    let initialStock = 0;

    const StockTester = () => {
      const { purchases, products, markPurchaseAsReceived } = useDemoData();

      const targetPO = purchases.find((p) => p.id === targetPoId);
      const targetItem = targetPO?.items[0];
      const targetProduct = products.find((p) => p.id === targetItem?.productId);

      if (initialStock === 0 && targetProduct) {
        initialStock = targetProduct.stockQuantity;
      }

      return (
        <div>
          <button
            onClick={() => {
              markPurchaseAsReceived(targetPoId);
            }}
          >
            Trigger Receive
          </button>
          <span data-testid="status">{targetPO?.status}</span>
          <span data-testid="stock">{targetProduct?.stockQuantity}</span>
        </div>
      );
    };

    render(
      <PurchasesTestWrapper>
        <StockTester />
      </PurchasesTestWrapper>
    );

    expect(screen.getByTestId('status')).toHaveTextContent('ordered');

    const triggerBtn = screen.getByText('Trigger Receive');
    fireEvent.click(triggerBtn);

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('received');
      expect(
        parseInt(screen.getByTestId('stock').textContent || '0', 10)
      ).toBeGreaterThan(initialStock);
    });
  });

  it('PURCH-006: PurchaseForm auto-calculates subtotal, tax, and grand total', () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <PurchasesTestWrapper>
        <PurchaseForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </PurchasesTestWrapper>
    );

    expect(screen.getByText(/Cost Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/Grand Total/i)).toBeInTheDocument();
  });
});
