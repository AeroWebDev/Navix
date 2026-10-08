import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { DemoLoginPage } from '../pages/demo/DemoLoginPage';
import { Sidebar } from '../components/layout/Sidebar';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

// Test consumer component
const AuthStatus = () => {
  const { user, isAuthenticated, logout, hasPermission, loginAsRole } = useAuth();
  return (
    <div>
      <span data-testid="auth-state">{isAuthenticated ? 'authenticated' : 'unauthenticated'}</span>
      <span data-testid="user-role">{user ? user.role : 'none'}</span>
      <span data-testid="perm-accounting">{hasPermission('accounting') ? 'allowed' : 'denied'}</span>
      <span data-testid="perm-purchases">{hasPermission('purchases') ? 'allowed' : 'denied'}</span>
      <button onClick={logout}>Logout</button>
      <button onClick={() => loginAsRole('cashier')}>Set Cashier</button>
    </div>
  );
};

describe('Phase 2: Authentication & RBAC System', () => {
  it('AUTH-001: AuthContext starts with a default active demo user in memory', () => {
    render(
      <AuthProvider>
        <AuthStatus />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-state')).toHaveTextContent('authenticated');
    expect(screen.getByTestId('user-role')).toHaveTextContent('owner');
    expect(screen.getByTestId('perm-accounting')).toHaveTextContent('allowed');
  });

  it('AUTH-002: DemoLoginPage rejects incorrect password', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <DemoLoginPage />
        </AuthProvider>
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const submitBtn = screen.getByRole('button', { name: /sign in to demo/i });

    // Enter wrong password
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/invalid password/i)).toBeInTheDocument();
  });

  it('AUTH-003: DemoLoginPage quick-pick account fills credentials and logs in', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <DemoLoginPage />
        </AuthProvider>
      </BrowserRouter>
    );

    // Click Cashier quick-pick card
    const cashierCard = screen.getByText(/cashier \/ pos/i);
    fireEvent.click(cashierCard);

    // Submit with cashier prefilled password
    const submitBtn = screen.getByRole('button', { name: /sign in to demo/i });
    fireEvent.click(submitBtn);

    expect(screen.queryByText(/invalid password/i)).not.toBeInTheDocument();
  });

  it('AUTH-004: Role permissions correctly restrict Cashier from Accounting and Purchases', () => {
    render(
      <AuthProvider>
        <AuthStatus />
      </AuthProvider>
    );

    const cashierBtn = screen.getByText('Set Cashier');
    fireEvent.click(cashierBtn);

    expect(screen.getByTestId('user-role')).toHaveTextContent('cashier');
    expect(screen.getByTestId('perm-accounting')).toHaveTextContent('denied');
    expect(screen.getByTestId('perm-purchases')).toHaveTextContent('denied');
  });

  it('AUTH-005: ProtectedRoute shows Access Restricted when user lacks module permission', () => {
    const TestComponent = () => {
      const { loginAsRole } = useAuth();
      return (
        <div>
          <button onClick={() => loginAsRole('cashier')}>Make Cashier</button>
          <ProtectedRoute requiredPermission="accounting">
            <div>Accounting Secret View</div>
          </ProtectedRoute>
        </div>
      );
    };

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    // As owner initially, secret view is rendered
    expect(screen.getByText('Accounting Secret View')).toBeInTheDocument();

    // Switch to cashier
    fireEvent.click(screen.getByText('Make Cashier'));

    // Secret view should be replaced by restriction card
    expect(screen.queryByText('Accounting Secret View')).not.toBeInTheDocument();
    expect(screen.getByText(/access restricted by role/i)).toBeInTheDocument();
  });

  it('AUTH-006: Sidebar renders navigation links with collapse toggle', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Sidebar isCollapsed={false} onToggleCollapse={() => {}} />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Sales & POS')).toBeInTheDocument();
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
