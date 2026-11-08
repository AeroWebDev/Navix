import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { AppShell } from '@/components/layout/AppShell';

// Marketing Pages
import { LandingPage } from '@/pages/marketing/LandingPage';
import { FeaturesPage } from '@/pages/marketing/FeaturesPage';
import { HowItWorksPage } from '@/pages/marketing/HowItWorksPage';
import { ContactPage } from '@/pages/marketing/ContactPage';
import { FAQPage } from '@/pages/marketing/FAQPage';
import { PrivacyPage } from '@/pages/marketing/PrivacyPage';
import { TermsPage } from '@/pages/marketing/TermsPage';
import { DisclaimerPage } from '@/pages/marketing/DisclaimerPage';
import { NotFoundPage } from '@/pages/marketing/NotFoundPage';
import { CustomSoftwarePage } from '@/pages/custom/CustomSoftwarePage';

// Demo Pages
import { DemoLoginPage } from '@/pages/demo/DemoLoginPage';
import { DashboardPage } from '@/pages/demo/DashboardPage';
import { SalesListPage } from '@/pages/demo/SalesListPage';
import { NewSalePage } from '@/pages/demo/NewSalePage';
import { SaleDetailPage } from '@/pages/demo/SaleDetailPage';
import { PurchasesListPage } from '@/pages/demo/PurchasesListPage';
import { NewPurchasePage } from '@/pages/demo/NewPurchasePage';
import { PurchaseDetailPage } from '@/pages/demo/PurchaseDetailPage';
import { ProductsListPage } from '@/pages/demo/ProductsListPage';
import { NewProductPage } from '@/pages/demo/NewProductPage';
import { ProductDetailPage } from '@/pages/demo/ProductDetailPage';
import { CustomersListPage } from '@/pages/demo/CustomersListPage';
import { NewCustomerPage } from '@/pages/demo/NewCustomerPage';
import { CustomerDetailPage } from '@/pages/demo/CustomerDetailPage';
import { SuppliersListPage } from '@/pages/demo/SuppliersListPage';
import { NewSupplierPage } from '@/pages/demo/NewSupplierPage';
import { SupplierDetailPage } from '@/pages/demo/SupplierDetailPage';
import { DemoModulePlaceholder } from '@/pages/demo/DemoModulePlaceholder';
import { DemoDataProvider } from '@/context/DemoDataContext';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Marketing Portal Routes */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/custom-software" element={<CustomSoftwarePage />} />
            <Route path="/custom" element={<Navigate to="/custom-software" replace />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Route>

          {/* Demo Auth Portal */}
          <Route path="/demo/login" element={<DemoLoginPage />} />
          <Route path="/demo" element={<Navigate to="/demo/dashboard" replace />} />

          {/* Protected Interactive Accounting Demo Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DemoDataProvider>
                  <AppShell />
                </DemoDataProvider>
              </ProtectedRoute>
            }
          >
            <Route
              path="/demo/dashboard"
              element={
                <ProtectedRoute requiredPermission="dashboard">
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/sales"
              element={
                <ProtectedRoute requiredPermission="sales">
                  <SalesListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/sales/new"
              element={
                <ProtectedRoute requiredPermission="sales">
                  <NewSalePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/sales/:id"
              element={
                <ProtectedRoute requiredPermission="sales">
                  <SaleDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/sales/:id/edit"
              element={
                <ProtectedRoute requiredPermission="sales">
                  <NewSalePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/purchases"
              element={
                <ProtectedRoute requiredPermission="purchases">
                  <PurchasesListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/purchases/new"
              element={
                <ProtectedRoute requiredPermission="purchases">
                  <NewPurchasePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/purchases/:id"
              element={
                <ProtectedRoute requiredPermission="purchases">
                  <PurchaseDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/purchases/:id/edit"
              element={
                <ProtectedRoute requiredPermission="purchases">
                  <NewPurchasePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/products"
              element={
                <ProtectedRoute requiredPermission="products">
                  <ProductsListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/products/new"
              element={
                <ProtectedRoute requiredPermission="products">
                  <NewProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/products/:id"
              element={
                <ProtectedRoute requiredPermission="products">
                  <ProductDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/products/:id/edit"
              element={
                <ProtectedRoute requiredPermission="products">
                  <NewProductPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/inventory"
              element={
                <ProtectedRoute requiredPermission="inventory">
                  <DemoModulePlaceholder
                    title="Inventory & Stock Movement"
                    moduleKey="Warehouse Control"
                    description="Audit stock quantities, batch adjustments, and loss/damage tracking."
                    features={[
                      'Stock adjustment logs (Audit, Damage, Restock)',
                      'Low stock visual warnings',
                      'Multi-location tracking readiness',
                    ]}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/customers"
              element={
                <ProtectedRoute requiredPermission="customers">
                  <CustomersListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/customers/new"
              element={
                <ProtectedRoute requiredPermission="customers">
                  <NewCustomerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/customers/:id"
              element={
                <ProtectedRoute requiredPermission="customers">
                  <CustomerDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/customers/:id/edit"
              element={
                <ProtectedRoute requiredPermission="customers">
                  <NewCustomerPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/suppliers"
              element={
                <ProtectedRoute requiredPermission="suppliers">
                  <SuppliersListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/suppliers/new"
              element={
                <ProtectedRoute requiredPermission="suppliers">
                  <NewSupplierPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/suppliers/:id"
              element={
                <ProtectedRoute requiredPermission="suppliers">
                  <SupplierDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/demo/suppliers/:id/edit"
              element={
                <ProtectedRoute requiredPermission="suppliers">
                  <NewSupplierPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/expenses"
              element={
                <ProtectedRoute requiredPermission="expenses">
                  <DemoModulePlaceholder
                    title="Expense Management"
                    moduleKey="Cash Outflow"
                    description="Log and categorize operating expenses, petty cash, and overhead costs."
                    features={[
                      '8 Standard expense categories (Rent, Salaries, Utilities, etc.)',
                      'Payment method and receipt tracking',
                      'Tax-deductible expense indicators',
                    ]}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/invoices"
              element={
                <ProtectedRoute requiredPermission="invoices">
                  <DemoModulePlaceholder
                    title="Invoices & Printing"
                    moduleKey="Billing Engine"
                    description="Generate and preview client invoices with dedicated print layout and tax breakdown."
                    features={[
                      'Printable invoice layout (@media print)',
                      'Custom discount and tax rates',
                      'Payment status lifecycle (Draft, Pending, Paid, Overdue)',
                    ]}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/payments"
              element={
                <ProtectedRoute requiredPermission="payments">
                  <DemoModulePlaceholder
                    title="Payment Transactions"
                    moduleKey="Inflow & Outflow"
                    description="Reconcile payments received from customers and payments made to vendors."
                    features={[
                      'Inflow vs Outflow cash movements',
                      'Payment modes (Cash, Bank, Card, Cheque)',
                      'Linked invoice and expense references',
                    ]}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/employees"
              element={
                <ProtectedRoute requiredPermission="employees">
                  <DemoModulePlaceholder
                    title="Staff & Permissions (RBAC)"
                    moduleKey="Staff Management"
                    description="Manage employee profiles, role assignments, and permission matrices."
                    features={[
                      'Owner, Manager, Accountant, Cashier profiles',
                      'Granular module access controls',
                      'Department and staff directory',
                    ]}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/reports"
              element={
                <ProtectedRoute requiredPermission="reports">
                  <DemoModulePlaceholder
                    title="Financial & Analytical Reports"
                    moduleKey="Business Intelligence"
                    description="Detailed statements and exportable reports across custom date ranges."
                    features={[
                      'Profit & Loss statement with margin analysis',
                      'Sales summaries and category breakdowns',
                      'Accounts receivable aging reports',
                      'Cash flow analysis',
                    ]}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/accounting"
              element={
                <ProtectedRoute requiredPermission="accounting">
                  <DemoModulePlaceholder
                    title="Accounting Statements & General Ledger"
                    moduleKey="General Ledger"
                    description="Simplified general ledger, balance summaries, and financial audit logs."
                    features={[
                      'Trial balance & balance sheet summary',
                      'Accounts receivable vs. accounts payable',
                      'Regulatory disclaimer regarding certified bookkeeping',
                    ]}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/settings"
              element={
                <ProtectedRoute requiredPermission="settings">
                  <DemoModulePlaceholder
                    title="System Settings"
                    moduleKey="Configuration"
                    description="Business profile, currency, tax rates, invoice numbering, and theme preferences."
                    features={[
                      'Currency switcher (USD, SAR, AED, EUR, GBP)',
                      'Tax and VAT rate configuration',
                      'Company details and address customizer',
                    ]}
                  />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Catch-all 404 */}
          <Route
            path="*"
            element={
              <MarketingLayout>
                <NotFoundPage />
              </MarketingLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
