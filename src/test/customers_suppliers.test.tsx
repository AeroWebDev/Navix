import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { DemoDataProvider } from '@/context/DemoDataContext';
import { CustomersListPage } from '@/pages/demo/CustomersListPage';
import { CustomerDetailPage } from '@/pages/demo/CustomerDetailPage';
import { CustomerForm } from '@/components/forms/CustomerForm';
import { SuppliersListPage } from '@/pages/demo/SuppliersListPage';
import { SupplierDetailPage } from '@/pages/demo/SupplierDetailPage';
import { SupplierForm } from '@/components/forms/SupplierForm';

const TestWrapper = ({
  children,
  initialRoute = '/',
}: {
  children: React.ReactNode;
  initialRoute?: string;
}) => (
  <AuthProvider>
    <DemoDataProvider>
      <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
    </DemoDataProvider>
  </AuthProvider>
);

describe('Phase 7: Customers & Suppliers Module Tests', () => {
  it('CUST-001: CustomersListPage renders customer directory and KPI cards', () => {
    render(
      <TestWrapper>
        <CustomersListPage />
      </TestWrapper>
    );

    expect(screen.getByText(/Customer Directory/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Accounts/i)).toBeInTheDocument();
    expect(screen.getByText(/B2B Enterprises/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Customer/i)).toBeInTheDocument();
  });

  it('CUST-002: Customer search filters results by name or email', async () => {
    render(
      <TestWrapper>
        <CustomersListPage />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/search by name, email/i);
    fireEvent.change(searchInput, { target: { value: 'Horizon' } });

    await waitFor(
      () => {
        expect(screen.getByText('Horizon Logistics Inc.')).toBeInTheDocument();
      },
      { timeout: 800 }
    );
  });

  it('CUST-003: CustomerForm validates required name and email', async () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <TestWrapper>
        <CustomerForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </TestWrapper>
    );

    const submitBtn = screen.getByRole('button', {
      name: /create customer account/i,
    });
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText(/customer name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/email address is required/i)
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('CUST-004: CustomerDetailPage sales history tab shows only sales for that customer', async () => {
    // cust-001 has sales in mock data
    render(
      <TestWrapper initialRoute="/demo/customers/cust-001">
        <Routes>
          <Route
            path="/demo/customers/:id"
            element={<CustomerDetailPage />}
          />
        </Routes>
      </TestWrapper>
    );

    expect(screen.getByText('Horizon Logistics Inc.')).toBeInTheDocument();

    // Click Sales History tab
    const salesTab = screen.getByRole('button', { name: /sales history/i });
    fireEvent.click(salesTab);

    // Sales table for this customer renders
    await waitFor(() => {
      const salesTable = screen.getByTestId('customer-sales-table');
      expect(salesTable).toBeInTheDocument();
      // Should contain INV-2025-001 which belongs to Horizon Logistics
      expect(screen.getByText('INV-2025-001')).toBeInTheDocument();
    });
  });

  it('SUPP-001: SuppliersListPage renders suppliers directory and KPI stats', () => {
    render(
      <TestWrapper>
        <SuppliersListPage />
      </TestWrapper>
    );

    expect(
      screen.getByText(/Supplier & Vendor Directory/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Total Suppliers/i)).toBeInTheDocument();
    expect(screen.getByText(/Active Vendors/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Total Procured/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Add Supplier/i)).toBeInTheDocument();
  });

  it('SUPP-002: Supplier search filters by company name or email', async () => {
    render(
      <TestWrapper>
        <SuppliersListPage />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(
      /search by supplier name, category/i
    );
    fireEvent.change(searchInput, { target: { value: 'TechDistrib' } });

    await waitFor(
      () => {
        expect(
          screen.getByText('TechDistrib International Ltd.')
        ).toBeInTheDocument();
      },
      { timeout: 800 }
    );
  });

  it('SUPP-003: SupplierForm validates required company name and email', async () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <TestWrapper>
        <SupplierForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </TestWrapper>
    );

    const submitBtn = screen.getByRole('button', { name: /register vendor/i });
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText(/vendor or company name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/supplier email is required/i)
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('SUPP-004: SupplierDetailPage purchase history tab shows purchase orders for that supplier', async () => {
    // sup-001 is TechDistrib International Ltd. with purchases in mock data
    render(
      <TestWrapper initialRoute="/demo/suppliers/sup-001">
        <Routes>
          <Route
            path="/demo/suppliers/:id"
            element={<SupplierDetailPage />}
          />
        </Routes>
      </TestWrapper>
    );

    expect(
      screen.getByText('TechDistrib International Ltd.')
    ).toBeInTheDocument();

    // Click Purchase History tab
    const purchaseTab = screen.getByRole('button', {
      name: /purchase history/i,
    });
    fireEvent.click(purchaseTab);

    // Purchase history table renders with PO-2025-001
    await waitFor(() => {
      const poTable = screen.getByTestId('supplier-purchases-table');
      expect(poTable).toBeInTheDocument();
      expect(screen.getByText('PO-2025-001')).toBeInTheDocument();
    });
  });
});
