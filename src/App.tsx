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
                  <DemoModulePlaceholder
                    title="Sales & POS Operations"
                    moduleKey="Sales Engine"
                    description="Point of sale terminal, invoice generation, discount calculations, and payment tracking."
                    features={[
                      'Line-item item entry with unit price & tax calculation',
                      'Flexible discounts (fixed & percentage)',
                      'Multiple payment methods (Cash, Card, Transfer)',
                      'Customer lookup and order history',
                    ]}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/purchases"
              element={
                <ProtectedRoute requiredPermission="purchases">
                  <DemoModulePlaceholder
                    title="Purchases & Procurement"
                    moduleKey="Vendor Orders"
                    description="Manage purchase orders from suppliers, track incoming shipments, and audit payables."
                    features={[
                      'Purchase order creation and receiving status',
                      'Supplier catalogue cost tracking',
                      'Tax breakdown and payment status',
                    ]}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/products"
              element={
                <ProtectedRoute requiredPermission="products">
                  <DemoModulePlaceholder
                    title="Products Catalogue"
                    moduleKey="Product Directory"
                    description="SKU management, cost price, selling price, and stock levels."
                    features={[
                      'SKU generation and barcode support',
                      'Category management and filtering',
                      'Supplier assignment and reorder points',
                    ]}
                  />
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
                  <DemoModulePlaceholder
                    title="Customers CRM"
                    moduleKey="Client Ledger"
                    description="Manage customer profiles, contact info, credit balances, and order histories."
                    features={[
                      'Accounts receivable tracking',
                      'Transaction history and invoice logs',
                      'Company vs. Individual categorization',
                    ]}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/demo/suppliers"
              element={
                <ProtectedRoute requiredPermission="suppliers">
                  <DemoModulePlaceholder
                    title="Suppliers & Vendors"
                    moduleKey="Vendor Directory"
                    description="Track supplier details, payables, payment terms, and supply orders."
                    features={[
                      'Outstanding payables ledger',
                      'Purchase order history per vendor',
                      'Contact details and payment terms',
                    ]}
                  />
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
                    title="Accounting Statements (Demo)"
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
