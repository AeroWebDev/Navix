import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../pages/demo/DashboardPage';
import { StatCard } from '../components/common/StatCard';
import { DemoDataProvider } from '../context/DemoDataContext';
import { AuthProvider } from '../context/AuthContext';
import { formatCurrency } from '../utils/currency';
import { calculateProfit, calculateSubtotal } from '../utils/calculations';
import { DollarSign } from 'lucide-react';

describe('Phase 3: Dashboard & Financial Metrics', () => {
  it('DASH-001: StatCard renders label, value, and trend', () => {
    render(
      <StatCard
        label="Monthly Revenue"
        value="$48,290.00"
        icon={<DollarSign data-testid="dollar-icon" />}
        trend={{ value: '+14.2%', isPositive: true }}
      />
    );

    expect(screen.getByText(/Monthly Revenue/i)).toBeInTheDocument();
    expect(screen.getByText('$48,290.00')).toBeInTheDocument();
    expect(screen.getByText('+14.2%')).toBeInTheDocument();
    expect(screen.getByTestId('dollar-icon')).toBeInTheDocument();
  });

  it('DASH-002: formatCurrency formats amounts correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(50000)).toBe('$50,000.00');
  });

  it('DASH-003: calculateProfit returns revenue minus expenses', () => {
    expect(calculateProfit(10000, 4000)).toBe(6000);
    expect(calculateProfit(500, 800)).toBe(-300);
    expect(calculateSubtotal([{ quantity: 3, unitPrice: 100 }])).toBe(300);
  });

  it('DASH-004: DashboardPage renders KPI stat cards with aggregated totals', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <DemoDataProvider>
            <DashboardPage />
          </DemoDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Executive Financial Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Expenses/i)).toBeInTheDocument();
    expect(screen.getByText(/Net Profit/i)).toBeInTheDocument();
    expect(screen.getByText(/Outstanding Receivables/i)).toBeInTheDocument();
  });

  it('DASH-005: DashboardPage renders recent sales and recent invoices tables', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <DemoDataProvider>
            <DashboardPage />
          </DemoDataProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Recent Sales Transactions/i)).toBeInTheDocument();
    expect(screen.getByText(/Recent Invoices/i)).toBeInTheDocument();
    expect(screen.getByText(/Reorder Threshold Alerts/i)).toBeInTheDocument();
  });
});
