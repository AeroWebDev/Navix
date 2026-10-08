# PLAN.md — Implementation Plan

## Accounting Software Showcase & Custom Software Platform

> **Rule:** Build one phase at a time. Each phase must be fully tested and committed before the next begins. The MVP is Phases 0–3 (scaffold + landing + demo shell + dashboard).

---

## Phase 0: Project Initialization

**Goal:** Working project scaffold with all tools configured and CI-ready.

**Tasks:**
1. Initialize Vite + React + TypeScript project with `npm create vite@latest`.
2. Install and configure Tailwind CSS with `postcss`.
3. Install and configure shadcn/ui (init, add core components).
4. Install all remaining dependencies: React Router v6, Recharts, Lucide React, React Hook Form, Zod, date-fns.
5. Install Vitest + React Testing Library + jsdom + `@testing-library/jest-dom`.
6. Configure `vite.config.ts` for test environment (vitest settings, coverage).
7. Configure ESLint (with TypeScript + React rules).
8. Configure path aliases (`@/` → `src/`) in `tsconfig.json` and `vite.config.ts`.
9. Create folder structure: `src/types`, `src/data`, `src/store`, `src/hooks`, `src/utils`, `src/constants`, `src/components/ui`, `src/components/layout`, `src/pages`.
10. Create `.gitignore`, `.env.example`, `README.md`.
11. Initialize Git repo, make initial commit on `main`.
12. Verify: `npm run dev`, `npm run test`, `npm run lint`, `npm run build` all pass.

**Dependencies:** None  
**Risk:** Low

---

## Phase 1: Landing Pages (Marketing Site)

**Goal:** A polished, responsive public-facing website that communicates the product's value and drives conversions.

**Tasks:**
1. Create `Navbar.tsx` — logo, nav links (Features, Pricing, Contact, Try Demo), CTA button.
2. Create `Footer.tsx` — links, copyright, social icons.
3. Implement `LandingPage.tsx`:
   - Hero section: headline, sub-headline, CTA buttons (Try Demo, Request Custom).
   - Features overview (3–6 feature cards with icons).
   - Screenshot / mockup section (static image or animated preview).
   - Testimonials section (static quotes).
   - CTA banner (bottom of page).
4. Implement `FeaturesPage.tsx`:
   - Full feature list grouped by module (Sales, Purchases, Inventory, etc.).
   - Icon + title + description for each feature.
5. Implement `PricingPage.tsx`:
   - Pricing tiers (e.g., Starter, Professional, Enterprise).
   - Feature comparison table per tier.
   - CTA per tier.
6. Implement `ContactPage.tsx`:
   - Contact form (name, email, subject, message) with Zod validation + React Hook Form.
   - Fake form submission (success toast, form reset).
   - Contact info (email, phone, location — placeholder data).
7. Configure React Router: `/`, `/features`, `/pricing`, `/contact` routes.
8. Ensure full responsiveness (mobile-first, tested at 375px, 768px, 1280px).
9. Write tests for Navbar links, footer links, and contact form validation.

**Dependencies:** Phase 0  
**Risk:** Low

---

## Phase 2: Demo App Shell & Role-Based Access Control (RBAC)

**Goal:** A fully functional app wrapper that all demo pages live inside, with role login, password validation, permission filtering, responsive sidebar, and pure ephemeral in-memory state.

**Tasks:**
1. Create `AuthContext.tsx`: in-memory session, current user state, 4 roles (Owner, Manager, Accountant, Cashier), login/logout handlers.
2. Create `DemoLoginPage.tsx`: interactive login portal with role quick-fill cards, password authentication, and friendly error feedback.
3. Create `ProtectedRoute.tsx`: role-based route guard preventing unauthorized access.
4. Create `AppShell.tsx` — layout wrapper with sidebar + main content area + preview disclaimer banner.
5. Create `Sidebar.tsx`:
   - Logo and app name at top.
   - Navigation links dynamically filtered by active user role permissions.
   - Active link highlighting.
   - Collapsible on mobile (hamburger toggle).
6. Create `TopBar.tsx`:
   - Page title (dynamic).
   - Active role badge & user role switcher dropdown.
   - "Reset Demo" button to restore pristine in-memory state.
   - Logout action.
7. Create `NotFoundPage.tsx` — 404 with link back to `/`.
8. Set up the `/demo/*` nested route in React Router with `AppShell` and route guards.
9. Set up redirect from `/demo` → `/demo/login` or `/demo/dashboard`.
10. Test: login validation, password check, role-restricted routes, and mobile sidebar toggles.

**Dependencies:** Phase 1  
**Risk:** Low

---

## Phase 3: Dashboard

**Goal:** A data-rich overview page showing the key business health metrics using charts and stat cards.

**Tasks:**
1. Create mock data files: seed all 9 entities with realistic data (30–50 records each).
2. Create all 9 React Contexts (`SalesContext`, `ProductsContext`, etc.) with `useReducer`, seeded from mock data.
3. Create `AppProvider.tsx` combining all contexts.
4. Wrap the `/demo` route subtree in `AppProvider`.
5. Create custom hooks: `useSales`, `useProducts`, `useCustomers`, etc. (thin wrappers around context).
6. Create `useLocalStorage` hook for optional persistence.
7. Create utility functions: `formatCurrency`, `formatDate`, `calculateTotal`, `calculateProfit`, `calculateTax`.
8. Create `StatCard.tsx` component (label, value, icon, trend indicator).
9. Create `DashboardPage.tsx`:
   - Top row: 4 KPI stat cards (Total Revenue, Total Expenses, Net Profit, Outstanding Invoices).
   - Revenue vs Expenses bar chart (monthly, 12 months) using Recharts.
   - Expense breakdown pie chart by category.
   - Recent Sales table (last 5 sales, columns: date, customer, total, status).
   - Recent Invoices table (last 5 invoices, columns: number, customer, due date, amount, status).
   - Low Stock Alerts section (products below reorder level).
10. Test: stat cards render correct totals, chart renders without errors, tables render rows.

**Dependencies:** Phase 2  
**Risk:** Medium (state architecture decisions locked in here)

---

## Phase 4: Sales Module

**Goal:** Full CRUD for sales records with line items, search, filter, and status management.

**Tasks:**
1. Create `SalesListPage.tsx`:
   - Table: sale number, date, customer, total, status, actions.
   - Search by customer name or sale number.
   - Filter by status and date range.
   - "New Sale" button → `/demo/sales/new`.
   - Pagination.
2. Create `NewSalePage.tsx`:
   - `SaleForm.tsx`: customer selector, date, line items (product selector, qty, unit price, discount), notes, payment method.
   - Dynamic line item add/remove.
   - Auto-calculate subtotal, tax, discount, total.
   - Zod validation (required fields, quantity > 0, etc.).
   - On submit: add to context, show toast, redirect to list.
3. Create `SaleDetailPage.tsx`:
   - Display all sale fields in a read-only view.
   - Status badge.
   - Edit button (inline form or navigate to edit page).
   - Delete button (with `ConfirmDeleteModal`).
   - "Create Invoice" button (pre-fills invoice from sale data).
4. Create `StatusBadge.tsx` reusable component.
5. Create `ConfirmDeleteModal.tsx`.
6. Create `EmptyState.tsx` for empty list.
7. Write tests: list renders, new sale form submits, validation errors show, delete works.

**Dependencies:** Phase 3  
**Risk:** Medium

---

## Phase 5: Purchases Module

**Goal:** Full CRUD for purchase orders from suppliers, mirroring the sales module.

**Tasks:**
1. Create `PurchasesListPage.tsx`:
   - Table: PO number, date, supplier, total, status, payment status, actions.
   - Search by supplier name or PO number.
   - Filter by status, payment status, date range.
   - "New Purchase" button.
   - Pagination.
2. Create `NewPurchasePage.tsx`:
   - `PurchaseForm.tsx`: supplier selector, date, expected delivery date, line items, notes.
   - Auto-calculate totals.
   - Zod validation.
3. Create `PurchaseDetailPage.tsx`:
   - Read-only view with all fields.
   - Status and payment status management.
   - Edit and delete actions.
4. On purchase receipt, update product stock quantity in `ProductsContext`.
5. Write tests: list renders, form submits, stock update occurs on receive.

**Dependencies:** Phase 4  
**Risk:** Medium

---

## Phase 6: Products & Inventory

**Goal:** Product catalog management with stock tracking and low-stock alerts.

**Tasks:**
1. Create `ProductsListPage.tsx`:
   - Table: SKU, name, category, stock qty, reorder level, unit price, cost price, status, actions.
   - Low-stock rows highlighted (stock ≤ reorder level).
   - Search by name or SKU.
   - Filter by category and status.
   - "New Product" button.
   - Pagination.
2. Create `NewProductPage.tsx`:
   - `ProductForm.tsx`: SKU, name, description, category, unit price, cost price, stock qty, reorder level, unit, status.
   - Zod validation (price > 0, stock qty ≥ 0, etc.).
3. Create `ProductDetailPage.tsx`:
   - Full product details.
   - Stock adjustment form (add / subtract stock with reason note).
   - Edit and delete actions.
4. Update `DashboardPage.tsx` low-stock list to link to product detail.
5. Write tests: list renders, form validates, stock adjustment updates quantity.

**Dependencies:** Phase 3  
**Risk:** Low

---

## Phase 7: Customers & Suppliers

**Goal:** CRM-light screens for managing customer and supplier records with linked transaction history.

**Tasks:**
1. Create `CustomersListPage.tsx`:
   - Table: customer number, name, type, email, phone, outstanding balance, actions.
   - Search by name or email.
   - Filter by type (individual / business).
   - "New Customer" button (modal or page).
2. Create `CustomerDetailPage.tsx`:
   - Full customer info.
   - Tab: Sales history (filtered sales for this customer).
   - Tab: Invoices (filtered invoices for this customer).
   - Outstanding balance display.
   - Edit and delete actions.
3. Create `SuppliersListPage.tsx` — mirrors customer list.
4. Create `SupplierDetailPage.tsx`:
   - Full supplier info.
   - Tab: Purchase history (filtered POs for this supplier).
   - Outstanding balance.
   - Edit and delete actions.
5. Write tests: list renders, detail tabs switch, search works.

**Dependencies:** Phase 4, Phase 5  
**Risk:** Low

---

## Phase 8: Expenses Module

**Goal:** Track and categorize business expenses with status management.

**Tasks:**
1. Create `ExpensesListPage.tsx`:
   - Table: expense number, title, category, amount, date, status, paid by, actions.
   - Search by title.
   - Filter by category, status, date range.
   - Total expenses by category (summary row or mini chart).
   - "New Expense" button.
   - Pagination.
2. Create `NewExpensePage.tsx`:
   - `ExpenseForm.tsx`: title, category (dropdown), amount, date, paid by, payment method, notes.
   - Zod validation.
3. Edit expense: inline or navigate to edit form.
4. Delete expense with confirmation.
5. Update `DashboardPage.tsx` expense pie chart to reflect current data.
6. Write tests: list renders, form submits, category filter works.

**Dependencies:** Phase 3  
**Risk:** Low

---

## Phase 9: Invoices & Payments

**Goal:** Invoice generation, preview, and payment tracking with status lifecycle management.

**Tasks:**
1. Create `InvoicesListPage.tsx`:
   - Table: invoice number, customer, issue date, due date, total, amount due, status, actions.
   - Color-coded status (overdue in red, paid in green, etc.).
   - Search by invoice number or customer.
   - Filter by status, date range.
   - "New Invoice" button.
   - Pagination.
2. Create `NewInvoicePage.tsx`:
   - `InvoiceForm.tsx`: customer selector, issue date, due date, line items (description, qty, unit price, discount), notes, T&C.
   - Auto-calculate totals.
   - Zod validation.
3. Create `InvoiceDetailPage.tsx`:
   - Invoice preview mode (styled as a real invoice document).
   - Print / "Download PDF" button (uses `window.print()` with print-specific CSS).
   - "Record Payment" form (amount, date, method).
   - Status management (send, mark paid, cancel).
   - Edit and delete for draft invoices only.
4. Create `InvoicePreviewModal.tsx` (invoice rendered as a printable document).
5. Create `PaymentsListPage.tsx`:
   - Table: payment number, type (incoming/outgoing), reference, amount, date, method, status.
   - Search and filter.
   - Payments are created from invoice "Record Payment" or manually.
6. Auto-mark invoice as `overdue` if due date has passed and status is `sent`.
7. Write tests: invoice renders, record payment updates amountPaid and status, overdue logic triggers.

**Dependencies:** Phase 4, Phase 7  
**Risk:** Medium

---

## Phase 10: Employees & Settings

**Goal:** Employee directory and app-level settings (company info, currency, date format).

**Tasks:**
1. Create `EmployeesListPage.tsx`:
   - Table: employee number, name, department, job title, employment type, salary, status, actions.
   - Search by name.
   - Filter by department, status.
   - "New Employee" button.
2. Create `EmployeeDetailPage.tsx`:
   - Full employee profile.
   - Edit and deactivate / terminate actions.
3. Create `SettingsPage.tsx`:
   - Company info form (name, address, logo, tax ID) — stored in localStorage.
   - Currency and date format preferences.
   - "Reset Demo Data" button (reloads all mock data, clears localStorage).
   - Danger zone section.
4. Propagate company info from Settings to invoice headers.
5. Write tests: employee list renders, settings save to localStorage, reset data restores mocks.

**Dependencies:** Phase 3  
**Risk:** Low

---

## Phase 11: Reports & Accounting

**Goal:** Financial summary reports that aggregate data from across all modules.

**Tasks:**
1. Create `ReportsPage.tsx` — report hub with links/cards for each report.
2. Create `ProfitLossPage.tsx`:
   - Date range selector (month, quarter, year, custom).
   - Revenue section (total sales by category / product).
   - Expenses section (total expenses by category).
   - Gross Profit, Net Profit.
   - Month-by-month table.
   - Export to CSV (client-side, using `Blob` + `<a download>`).
3. Create `BalanceSheetPage.tsx`:
   - Assets section (cash approximated from payments received).
   - Liabilities section (outstanding payables).
   - Equity section (calculated).
   - As-of date selector.
4. Create `SalesTrendChart.tsx` (monthly line chart, reused from dashboard area).
5. Add print / export CSV functionality to all reports.
6. Write tests: P&L totals match sum of sales minus expenses, CSV export triggers download.

**Dependencies:** Phases 4–9  
**Risk:** Medium (aggregation logic complexity)

---

## Phase 12: Custom Software Request Page

**Goal:** A conversion-focused page for visitors to request custom software development.

**Tasks:**
1. Create `CustomRequestPage.tsx`:
   - Headline and value proposition.
   - Multi-step form (Step 1: contact info; Step 2: project details; Step 3: budget & timeline).
   - React Hook Form + Zod for each step.
   - Progress indicator (step 1 of 3).
   - Fake submission: success message + "We'll contact you within 24 hours" message.
2. Add link to custom request page from Navbar, Landing page CTA, Pricing page.
3. Write tests: each step validates before proceeding, submission shows success state.

**Dependencies:** Phase 1  
**Risk:** Low

---

## Phase 13: SEO, Performance, Accessibility

**Goal:** Production-ready quality: discoverable, fast, and usable by everyone.

**Tasks:**
1. Add `<title>` and `<meta description>` tags per route using a `useDocumentTitle` hook.
2. Add Open Graph meta tags in `index.html`.
3. Add `robots.txt` and `sitemap.xml` to `public/`.
4. Ensure all interactive elements have keyboard focus styles (Tailwind `focus-visible:ring`).
5. Add `aria-label`, `aria-current`, `role` attributes where needed (sidebar nav, modals, dialogs).
6. Audit and fix color contrast issues (WCAG AA minimum).
7. Lazy-load all `/demo/*` routes using `React.lazy` + `Suspense`.
8. Optimize all images (use WebP format, add `width` / `height` attributes).
9. Run Lighthouse audit; target scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90.
10. Add `loading` skeleton states to all data-heavy pages.

**Dependencies:** Phases 1–12  
**Risk:** Low–Medium

---

## Phase 14: Final QA and Build

**Goal:** Every test passes, no console errors, production build is clean.

**Tasks:**
1. Run full test suite (`npm run test`) — all tests must pass.
2. Run ESLint (`npm run lint`) — zero errors.
3. Run TypeScript type check (`npx tsc --noEmit`) — zero errors.
4. Run production build (`npm run build`) — zero warnings.
5. Run `npm run preview` and manually walk through every route.
6. Test all CRUD flows end-to-end on the preview build.
7. Test on Chrome, Firefox, and Safari.
8. Test on mobile viewport (375px) and tablet (768px).
9. Run `npm run test -- --coverage`; review coverage report.
10. Perform security audit: check for `dangerouslySetInnerHTML`, exposed keys, unvalidated inputs.
11. Update `docs/TODO.md` — all tasks checked.
12. Write `docs/PROGRESS.md` final session entry.

**Dependencies:** Phase 13  
**Risk:** Low

---

## Phase 15: GitHub, Installer & Deployment Prep

**Goal:** Code is on GitHub, deployable to Vercel, and packaged with an automated Windows one-click installer.

**Tasks:**
1. Create GitHub repository (public or private per user's choice).
2. Push all commits to `main`.
3. Create `install.bat` one-click Windows installer script.
4. Create `scripts/installer.ps1` PowerShell installation & desktop shortcut automation.
5. Create `start-app.bat` desktop quick-launch script.
6. Add `vercel.json` with SPA redirect rule (`/* → /index.html`).
7. Add GitHub Actions workflow: on push to `main` → install → lint → type-check → test → build.
8. Configure environment variables in Vite (`VITE_APP_NAME`, etc.).
9. Write final `README.md`: project description, screenshots, local setup, installer guide, deploy instructions.
10. Tag release `v1.0.0`.

**Dependencies:** Phase 14  
**Risk:** Low

---

## Phase Summary

| Phase | Focus | MVP? | Est. Complexity |
|---|---|---|---|
| 0 | Project scaffold | ✅ | Low |
| 1 | Landing pages | ✅ | Low |
| 2 | App shell | ✅ | Low |
| 3 | Dashboard | ✅ | Medium |
| 4 | Sales | — | Medium |
| 5 | Purchases | — | Medium |
| 6 | Products | — | Low |
| 7 | Customers & Suppliers | — | Low |
| 8 | Expenses | — | Low |
| 9 | Invoices & Payments | — | Medium |
| 10 | Employees & Settings | — | Low |
| 11 | Reports | — | Medium |
| 12 | Custom Request Page | — | Low |
| 13 | SEO, Perf, A11y | — | Medium |
| 14 | Final QA | — | Low |
| 15 | GitHub & Deploy | — | Low |

---

*Last updated: Phase 0 — Project Initialization*
