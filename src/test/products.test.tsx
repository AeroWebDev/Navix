import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { DemoDataProvider, useDemoData } from '@/context/DemoDataContext';
import { ProductsListPage } from '@/pages/demo/ProductsListPage';
import { ProductForm } from '@/components/forms/ProductForm';

// Wrapper for products testing
const ProductsTestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <DemoDataProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </DemoDataProvider>
  </AuthProvider>
);

describe('Phase 6: Products & Inventory Module Tests', () => {
  it('PROD-001: ProductsListPage renders catalogue and top KPI cards', () => {
    render(
      <ProductsTestWrapper>
        <ProductsListPage />
      </ProductsTestWrapper>
    );

    expect(
      screen.getByText(/Products & Inventory Catalogue/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Catalogue SKUs/i)).toBeInTheDocument();
    expect(screen.getByText(/Asset Valuation/i)).toBeInTheDocument();
    expect(screen.getByText(/Reorder Alerts/i)).toBeInTheDocument();
    expect(screen.getByText(/Add New Product/i)).toBeInTheDocument();
  });

  it('PROD-002: Low-stock products have the highlight class applied', () => {
    const { container } = render(
      <ProductsTestWrapper>
        <ProductsListPage />
      </ProductsTestWrapper>
    );

    // Products where stockQuantity <= minStockLevel have 'low-stock-highlight' class
    const highlightedRows = container.querySelectorAll('.low-stock-highlight');
    expect(highlightedRows.length).toBeGreaterThan(0);
  });

  it('PROD-003: Product search by name or SKU filters results', async () => {
    render(
      <ProductsTestWrapper>
        <ProductsListPage />
      </ProductsTestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(
      /search by product name or sku/i
    );

    // Search for a specific SKU: 'LPT-PRO-001'
    fireEvent.change(searchInput, { target: { value: 'LPT-PRO-001' } });

    await waitFor(
      () => {
        expect(screen.getByText('Laptop Pro 15"')).toBeInTheDocument();
        expect(screen.getByText('LPT-PRO-001')).toBeInTheDocument();
      },
      { timeout: 800 }
    );
  });

  it('PROD-004: ProductForm validates required name and SKU', async () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <ProductsTestWrapper>
        <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </ProductsTestWrapper>
    );

    // Clear the name input
    const nameInput = screen.getByPlaceholderText(/e\.g\. Ergonomic Office Chair/i);
    fireEvent.change(nameInput, { target: { value: '' } });

    const submitBtn = screen.getByRole('button', { name: /create catalogue item/i });
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText(/product name is required/i)
    ).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('PROD-005: Stock adjustment increases or decreases stockQuantity correctly', async () => {
    const targetProdId = 'prod-001';
    let initialQty = 0;

    const AdjustTester = () => {
      const { products, adjustStock } = useDemoData();
      const product = products.find((p) => p.id === targetProdId);

      if (initialQty === 0 && product) {
        initialQty = product.stockQuantity;
      }

      return (
        <div>
          <button
            onClick={() => {
              adjustStock(targetProdId, 10, 'Direct restock test');
            }}
          >
            Add 10 Units
          </button>
          <button
            onClick={() => {
              adjustStock(targetProdId, -5, 'Write-off test');
            }}
          >
            Subtract 5 Units
          </button>
          <span data-testid="test-stock-qty">{product?.stockQuantity}</span>
        </div>
      );
    };

    render(
      <ProductsTestWrapper>
        <AdjustTester />
      </ProductsTestWrapper>
    );

    expect(screen.getByTestId('test-stock-qty')).toHaveTextContent(
      String(initialQty)
    );

    // Click Add 10 Units
    const addBtn = screen.getByText('Add 10 Units');
    fireEvent.click(addBtn);

    await waitFor(() => {
      expect(screen.getByTestId('test-stock-qty')).toHaveTextContent(
        String(initialQty + 10)
      );
    });

    // Click Subtract 5 Units
    const subBtn = screen.getByText('Subtract 5 Units');
    fireEvent.click(subBtn);

    await waitFor(() => {
      expect(screen.getByTestId('test-stock-qty')).toHaveTextContent(
        String(initialQty + 5)
      );
    });
  });
});
