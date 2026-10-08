# TODO.md — Task Checklist

## Accounting Software Showcase & Custom Software Platform

> Source of truth for implementation progress. Tick a box only when the task is done **and tested**.

---

## Phase 0: Project Initialization

- [x] Initialize Vite + React + TypeScript project with `npm create vite@latest` — done when `src/main.tsx` exists and `npm run dev` starts without errors
- [x] Install and configure Tailwind CSS with PostCSS — done when Tailwind utility classes apply in the browser
- [x] Initialize shadcn/ui and design system — done when `cn()` helper and tokens are available
- [x] Add shadcn/ui core components: Button, Card, Input, Label, Select, Dialog/Modal, Tabs, Badge, EmptyState, LoadingSpinner — done when all components import without errors
- [x] Install React Router v6 (`react-router-dom`) — done when `BrowserRouter` wraps `App.tsx`
- [x] Install Recharts — done when Recharts dependency is installed and tested
- [x] Install Lucide React — done when an icon renders in the browser
- [x] Install React Hook Form + Zod + `@hookform/resolvers` — done when installed and types compile
- [x] Install date-fns — done when formatters work and tested
- [x] Install Vitest + React Testing Library + jsdom + `@testing-library/jest-dom` — done when `npm run test` runs without config errors
- [x] Configure `vite.config.ts`: set test environment to `jsdom`, add path alias `@/ → src/` — done when `@/components/...` imports resolve
- [x] Configure `tsconfig.json` with path alias `@/*` mapping — done when TypeScript does not error on `@/` imports
- [x] Create full folder structure: `src/types`, `src/data`, `src/context`, `src/hooks`, `src/utils`, `src/components/ui`, `src/components/layout`, `src/components/common`, `src/pages/marketing`, `src/pages/demo`, `src/pages/custom`, `src/styles` — done when all folders exist
- [x] Create `src/styles/globals.css` with Tailwind directives and shadcn/ui CSS variables — done when styles apply globally
- [x] Create `.gitignore` (node_modules, dist, .env, coverage) — done when Git does not track those paths
- [x] Create `.env.example` with placeholder variable names — done when file exists
- [x] Create basic `README.md` with project name, stack, and setup commands — done when file exists
- [x] Initialize Git repo, stage all files, make initial commit `chore: initial project scaffold` on `main` — done when `git log` shows the commit
- [x] Verify: `npm run dev` starts, `npm run test` passes, `npm run type-check` passes, `npm run build` produces `dist/` — done when all commands succeed

---

## Phase 1: Landing Pages

- [x] Create `src/components/layout/Navbar.tsx` with logo, nav links (Features, How It Works, Custom Software, FAQ, Contact, Explore Demo CTA) — done when all links render and are keyboard-navigable
- [x] Create `src/components/layout/Footer.tsx` with links, contacts, disclaimer, and copyright — done when footer renders at bottom of all marketing pages
- [x] Create marketing layout wrapper that includes Navbar and Footer (`MarketingLayout.tsx`) — done when all marketing routes share the same layout
- [x] Implement `LandingPage.tsx` hero section (headline, sub-headline, Explore Demo & Request Software CTAs, live preview card) — done when text and buttons render correctly
- [x] Implement `LandingPage.tsx` features overview section (6 feature cards with Lucide icons) — done when all cards render
- [x] Implement `LandingPage.tsx` testimonials section (3 demo/fictional testimonials clearly labeled) — done when section renders
- [x] Implement `LandingPage.tsx` bottom CTA banner — done when banner renders with a working link
- [x] Implement `FeaturesPage.tsx` with feature groups per module and SaaS comparison matrix — done when page renders all groups
- [x] Implement `HowItWorksPage.tsx` with 4-step onboarding journey and deployment modes — done when page renders
- [x] Implement `ContactPage.tsx` with React Hook Form + Zod validated form, direct WhatsApp trigger, and SLA notices — done when invalid submission shows errors and valid submission shows success state
- [x] Implement `FAQPage.tsx` with instant search and category filtering — done when all categories filter questions
- [x] Implement `PrivacyPage.tsx`, `TermsPage.tsx`, and `DisclaimerPage.tsx` legal templates — done when legal pages render
- [x] Implement `NotFoundPage.tsx` with user-friendly recovery links — done when navigating to unknown URL shows 404
- [x] Configure React Router routes in `App.tsx` for all marketing pages — done when navigating to each URL renders the correct page
- [x] Ensure landing pages are responsive at 375px, 768px, and 1280px viewports — done when responsive layout renders cleanly
- [x] Write test: `Navbar` and `Footer` render all brand and legal links — done when test passes
- [x] Write test: `LandingPage` renders hero, buttons, and feature cards — done when test passes
- [x] Write test: `ContactPage` form shows validation errors on empty submit — done when test passes
- [x] Write test: `NotFoundPage` renders 404 message and home link — done when test passes
- [x] Commit: `feat: add marketing landing pages and legal templates` — done when commit exists

---

## Phase 2: Demo App Shell & Role-Based Access Control (RBAC)

- [x] Create `src/context/AuthContext.tsx` with in-memory session, current user state, role permissions, login/logout functions — done when roles (Owner, Manager, Accountant, Cashier) are handled purely in memory
- [x] Create `src/pages/demo/DemoLoginPage.tsx` with role quick-pick accounts, password verification, error handling — done when valid credentials authenticate and invalid trigger error feedback
- [x] Create `src/components/auth/ProtectedRoute.tsx` and role-based route guard — done when unauthorized roles are redirected or shown permission notice
- [x] Create `src/components/layout/AppShell.tsx` with demo banner highlighting ephemeral in-memory preview (no persistent data saved) — done when banner renders and resets state on demand
- [x] Create `src/components/layout/Sidebar.tsx` with grouped nav links filtered dynamically by active role permissions — done when links render only for authorized roles
- [x] Implement Sidebar active link highlighting using `NavLink` from React Router — done when current route's link is visually highlighted
- [x] Implement Sidebar mobile toggle (hamburger button closes/opens sidebar) — done when sidebar slides in/out on mobile
- [x] Create `src/components/layout/TopBar.tsx` with active role badge, user switcher dropdown, demo reset button, and logout action — done when all elements render and function
- [x] Create `src/pages/marketing/NotFoundPage.tsx` with a 404 message and link back to `/` — done when navigating to an unknown URL shows the 404 page
- [x] Configure `/demo/*` nested routes in `App.tsx` using `AppShell` as layout and route guards — done when all `/demo/` paths render inside AppShell
- [x] Add redirect from `/demo` to `/demo/login` (if unauthenticated) or `/demo/dashboard` — done when visiting `/demo` performs correct redirection
- [x] Write test: `DemoLoginPage` authenticates valid credentials and rejects incorrect password — done when test passes
- [x] Write test: `Sidebar` hides restricted routes for Cashier role — done when test passes
- [x] Write test: navigating to unknown route renders `NotFoundPage` — done when test passes
- [x] Commit: `feat: add demo app shell with role auth and RBAC navigation` — done when commit exists

---

## Phase 3: Dashboard

- [ ] Create `src/data/mockSales.ts` with 40 realistic sale records — done when file exports an array of `Sale[]`
- [ ] Create `src/data/mockPurchases.ts` with 30 realistic purchase records — done when file exports `Purchase[]`
- [ ] Create `src/data/mockProducts.ts` with 25 realistic product records — done when file exports `Product[]`
- [ ] Create `src/data/mockCustomers.ts` with 20 realistic customer records — done when file exports `Customer[]`
- [ ] Create `src/data/mockSuppliers.ts` with 15 realistic supplier records — done when file exports `Supplier[]`
- [ ] Create `src/data/mockExpenses.ts` with 35 realistic expense records — done when file exports `Expense[]`
- [ ] Create `src/data/mockInvoices.ts` with 20 realistic invoice records — done when file exports `Invoice[]`
- [ ] Create `src/data/mockPayments.ts` with 25 realistic payment records — done when file exports `Payment[]`
- [ ] Create `src/data/mockEmployees.ts` with 15 realistic employee records — done when file exports `Employee[]`
- [ ] Define all TypeScript interfaces in `src/types/` (one file per entity + `index.ts` re-export) — done when all types import without errors from `@/types`
- [ ] Create `SalesContext.tsx` with `useReducer` (ADD, UPDATE, DELETE, SET actions), seeded from mockSales — done when context provides sales array and dispatch
- [ ] Create `PurchasesContext.tsx` — done when context provides purchases array and dispatch
- [ ] Create `ProductsContext.tsx` — done when context provides products array and dispatch
- [ ] Create `CustomersContext.tsx` — done when context provides customers array and dispatch
- [ ] Create `SuppliersContext.tsx` — done when context provides suppliers array and dispatch
- [ ] Create `ExpensesContext.tsx` — done when context provides expenses array and dispatch
- [ ] Create `InvoicesContext.tsx` — done when context provides invoices array and dispatch
- [ ] Create `PaymentsContext.tsx` — done when context provides payments array and dispatch
- [ ] Create `EmployeesContext.tsx` — done when context provides employees array and dispatch
- [ ] Create `AppProvider.tsx` composing all 9 contexts — done when a single `<AppProvider>` wrap provides all data
- [ ] Wrap `/demo/*` routes in `AppProvider` — done when dashboard can access all context data
- [ ] Create `useLocalStorage` hook — done when state persists across page refreshes
- [ ] Create thin custom hooks: `useSales`, `useProducts`, `useCustomers`, `useSuppliers`, `usePurchases`, `useExpenses`, `useInvoices`, `usePayments`, `useEmployees` — done when each hook returns entity array + CRUD operations
- [ ] Create `src/utils/currency.ts` with `formatCurrency(amount, currency?)` — done when function returns `"$1,234.56"` format
- [ ] Create `src/utils/dates.ts` with `formatDate(isoString, pattern?)` — done when function returns formatted date string
- [ ] Create `src/utils/calculations.ts` with `calculateSubtotal`, `calculateTax`, `calculateTotal`, `calculateProfit` — done when unit tests pass for these functions
- [ ] Create `src/utils/idGenerator.ts` with `generateId()` using `crypto.randomUUID()` — done when it returns a valid UUID string
- [ ] Create `src/components/common/StatCard.tsx` (label, value, icon, optional trend) — done when it renders all props correctly
- [ ] Create `src/components/charts/RevenueChart.tsx` (bar chart, monthly revenue vs expenses) — done when chart renders with axes and legend
- [ ] Create `src/components/charts/ExpensePieChart.tsx` (pie chart by expense category) — done when chart renders with legend
- [ ] Implement `DashboardPage.tsx` KPI stat cards row (Total Revenue, Total Expenses, Net Profit, Outstanding Invoices) — done when correct totals display
- [ ] Implement `DashboardPage.tsx` monthly revenue vs expenses bar chart — done when 12 monthly bars render
- [ ] Implement `DashboardPage.tsx` expense breakdown pie chart — done when pie segments reflect expense categories
- [ ] Implement `DashboardPage.tsx` Recent Sales mini-table (last 5) — done when 5 rows render with correct data
- [ ] Implement `DashboardPage.tsx` Recent Invoices mini-table (last 5) — done when 5 rows render with correct data
- [ ] Implement `DashboardPage.tsx` Low Stock Alerts list — done when products at or below reorder level appear
- [ ] Write test: `DashboardPage` stat card shows correct total revenue — done when test passes
- [ ] Write test: `StatCard` renders label and formatted value — done when test passes
- [ ] Write test: `formatCurrency` returns correctly formatted string — done when test passes
- [ ] Write test: `calculateProfit` returns revenue minus expenses — done when test passes
- [ ] Commit: `feat: add dashboard with charts and KPI cards` — done when commit exists

---

## Phase 4: Sales Module

- [ ] Create `src/components/common/EmptyState.tsx` with icon, title, description, optional CTA button — done when it renders all props
- [ ] Create `src/components/common/StatusBadge.tsx` with color variants per status string — done when badge renders correct color per status
- [ ] Create `src/components/modals/ConfirmDeleteModal.tsx` with message, Cancel, and Confirm Delete buttons — done when modal opens, cancels, and confirms correctly
- [ ] Create `src/components/tables/Pagination.tsx` with page number, previous/next buttons — done when correct page info renders and callbacks fire
- [ ] Create `src/components/tables/DataTable.tsx` generic table with sortable columns and row actions slot — done when it renders any typed data array
- [ ] Create `src/components/common/SearchInput.tsx` with debounced `onChange` (300ms) — done when rapid typing only fires callback once after delay
- [ ] Implement `SalesListPage.tsx` table rendering all sales — done when all mock sales appear in the table
- [ ] Implement sales search by customer name or sale number — done when typing filters the table in real time
- [ ] Implement sales filter by status — done when selecting a status filters the table
- [ ] Implement sales filter by date range — done when selecting date range filters the table
- [ ] Implement sales table pagination (10 rows per page) — done when rows are split across pages
- [ ] Implement `NewSalePage.tsx` with `SaleForm.tsx`: customer selector, date, payment method, notes fields — done when all fields render
- [ ] Implement `SaleForm.tsx` dynamic line items: add/remove rows, product selector, qty, unit price, discount per row — done when items can be added and removed
- [ ] Implement `SaleForm.tsx` auto-calculation: subtotal, tax, discount, total update reactively — done when changing qty updates total without submit
- [ ] Implement `SaleForm.tsx` Zod validation (customer required, at least 1 item, qty > 0, price ≥ 0) — done when invalid form shows inline error messages
- [ ] On valid submit: dispatch `ADD_SALE`, show success toast, navigate to `/demo/sales` — done when form submits and list updates
- [ ] Implement `SaleDetailPage.tsx` read-only display of all sale fields — done when all fields render correctly
- [ ] Implement edit action on `SaleDetailPage` (pre-fill form with existing data) — done when edited sale reflects changes in the list
- [ ] Implement delete action on `SaleDetailPage` with `ConfirmDeleteModal` — done when sale is removed from list after confirm
- [ ] Implement "Create Invoice" button on `SaleDetailPage` that navigates to `/demo/invoices/new` with pre-filled data — done when invoice form is pre-populated from sale
- [ ] Write test: `SalesListPage` renders all mock sales — done when test passes
- [ ] Write test: sales search filters results correctly — done when test passes
- [ ] Write test: `SaleForm` shows validation error when no customer selected — done when test passes
- [ ] Write test: `SaleForm` shows validation error when line item qty is 0 — done when test passes
- [ ] Write test: new sale submission adds sale to context — done when test passes
- [ ] Write test: `ConfirmDeleteModal` calls onConfirm when Confirm Delete clicked — done when test passes
- [ ] Commit: `feat: add sales module with CRUD and search` — done when commit exists

---

## Phase 5: Purchases Module

- [ ] Implement `PurchasesListPage.tsx` table with all purchases — done when all mock purchases render
- [ ] Implement purchases search by supplier name or PO number — done when search filters the table
- [ ] Implement purchases filter by status and payment status — done when filters apply correctly
- [ ] Implement `NewPurchasePage.tsx` with `PurchaseForm.tsx` (supplier selector, dates, line items, notes) — done when form renders and validates
- [ ] Implement `PurchaseForm.tsx` Zod validation — done when invalid form shows inline errors
- [ ] On valid submit: dispatch `ADD_PURCHASE`, show success toast, navigate to list — done when list updates
- [ ] Implement `PurchaseDetailPage.tsx` read-only view with status and payment status controls — done when all fields render
- [ ] Implement "Mark as Received" action: updates purchase status and dispatches stock update to `ProductsContext` for each line item — done when product stock qty increases
- [ ] Implement edit and delete actions on `PurchaseDetailPage` — done when changes reflect in list
- [ ] Write test: `PurchasesListPage` renders all mock purchases — done when test passes
- [ ] Write test: marking purchase as received increases product stock quantity — done when test passes
- [ ] Write test: `PurchaseForm` validates required supplier — done when test passes
- [ ] Commit: `feat: add purchases module with stock update on receive` — done when commit exists

---

## Phase 6: Products & Inventory

- [ ] Implement `ProductsListPage.tsx` table with all products — done when all mock products render
- [ ] Implement low-stock row highlighting (background color change when stock ≤ reorder level) — done when low-stock rows are visually distinct
- [ ] Implement product search by name or SKU — done when search filters results
- [ ] Implement product filter by category and status — done when filters apply correctly
- [ ] Implement `NewProductPage.tsx` with `ProductForm.tsx` (all product fields, Zod validation) — done when form validates and submits
- [ ] Implement `ProductDetailPage.tsx` full display of product fields — done when all fields render
- [ ] Implement stock adjustment form on `ProductDetailPage` (add/subtract qty with reason note) — done when adjusting stock updates `stockQuantity` in context
- [ ] Implement edit and delete on `ProductDetailPage` — done when changes and deletions reflect in the list
- [ ] Update `DashboardPage` low-stock list to link to each product's detail page — done when clicking an alert navigates to the product
- [ ] Write test: `ProductsListPage` renders all mock products — done when test passes
- [ ] Write test: low-stock products have the highlight class applied — done when test passes
- [ ] Write test: stock adjustment increases or decreases `stockQuantity` correctly — done when test passes
- [ ] Commit: `feat: add products and inventory module` — done when commit exists

---

## Phase 7: Customers & Suppliers

- [ ] Implement `CustomersListPage.tsx` table — done when all mock customers render
- [ ] Implement customer search by name or email — done when search filters correctly
- [ ] Implement customer filter by type (individual / business) — done when filter applies
- [ ] Implement "New Customer" dialog/page with `CustomerForm.tsx` and Zod validation — done when new customer appears in list after submit
- [ ] Implement `CustomerDetailPage.tsx` with tabs: Overview, Sales History, Invoices — done when tabs switch and data is filtered for that customer
- [ ] Implement edit and delete for customers — done when changes and deletions reflect in the list
- [ ] Implement `SuppliersListPage.tsx` table — done when all mock suppliers render
- [ ] Implement supplier search by name — done when search filters correctly
- [ ] Implement "New Supplier" dialog/page with `SupplierForm.tsx` and Zod validation — done when new supplier appears in list
- [ ] Implement `SupplierDetailPage.tsx` with tabs: Overview, Purchase History — done when tabs switch and data is filtered for that supplier
- [ ] Implement edit and delete for suppliers — done when changes and deletions reflect in the list
- [ ] Write test: `CustomersListPage` renders all mock customers — done when test passes
- [ ] Write test: `CustomerDetailPage` sales history tab shows only sales for that customer — done when test passes
- [ ] Write test: new customer form validates required name field — done when test passes
- [ ] Commit: `feat: add customers and suppliers module` — done when commit exists

---

## Phase 8: Expenses Module

- [ ] Implement `ExpensesListPage.tsx` table — done when all mock expenses render
- [ ] Implement expenses search by title — done when search filters results
- [ ] Implement expenses filter by category and status — done when filters apply correctly
- [ ] Implement expenses filter by date range — done when filter applies correctly
- [ ] Implement category totals summary (total per category shown above or below table) — done when totals are accurate
- [ ] Implement `NewExpensePage.tsx` with `ExpenseForm.tsx` and Zod validation — done when form validates and submits
- [ ] Implement edit expense (pre-fill form) and delete expense with confirmation — done when changes and deletions reflect in list
- [ ] Verify `DashboardPage` expense pie chart reflects current context data — done when adding an expense updates the chart
- [ ] Write test: `ExpensesListPage` renders all mock expenses — done when test passes
- [ ] Write test: expense category filter shows only matching expenses — done when test passes
- [ ] Write test: `ExpenseForm` validates required title and amount — done when test passes
- [ ] Commit: `feat: add expenses module` — done when commit exists

---

## Phase 9: Invoices & Payments

- [ ] Implement `InvoicesListPage.tsx` table with color-coded status — done when all mock invoices render with correct status colors
- [ ] Implement invoice search by invoice number or customer — done when search filters correctly
- [ ] Implement invoice filter by status and date range — done when filters apply
- [ ] Implement `NewInvoicePage.tsx` with `InvoiceForm.tsx` (customer, dates, line items, notes, T&C) — done when form renders and validates
- [ ] Implement auto-calculation of invoice totals (subtotal, tax, discount, total, amount due) — done when amounts update reactively
- [ ] On valid submit: dispatch `ADD_INVOICE`, show success toast, navigate to invoice detail — done when invoice appears in list
- [ ] Implement `InvoiceDetailPage.tsx` in preview mode (styled as printable invoice document) — done when invoice looks like a real document
- [ ] Implement print action on `InvoiceDetailPage` using `window.print()` with print-only CSS — done when print dialog opens with correct content
- [ ] Implement "Record Payment" form on `InvoiceDetailPage` (amount, date, method) — done when submitting updates `amountPaid`, `amountDue`, and invoice `status` in context
- [ ] Implement invoice status actions: mark as sent, mark as cancelled, for draft invoices only allow edit/delete — done when status transitions are enforced
- [ ] Create `InvoicePreviewModal.tsx` — done when modal renders invoice in printable format
- [ ] Auto-mark invoices as `overdue` when due date has passed and status is `sent` — done when overdue invoices show overdue status on page load
- [ ] Implement `PaymentsListPage.tsx` table showing all payments — done when all mock payments render
- [ ] Implement payment search and filter by type and method — done when filters apply
- [ ] Write test: `InvoicesListPage` renders all mock invoices — done when test passes
- [ ] Write test: recording a payment updates `amountPaid` and `amountDue` — done when test passes
- [ ] Write test: overdue logic marks invoice as overdue when past due date — done when test passes
- [ ] Write test: `InvoiceForm` validates required customer and due date — done when test passes
- [ ] Commit: `feat: add invoices and payments module` — done when commit exists

---

## Phase 10: Employees & Settings

- [ ] Implement `EmployeesListPage.tsx` table — done when all mock employees render
- [ ] Implement employee search by name — done when search filters results
- [ ] Implement employee filter by department and status — done when filters apply
- [ ] Implement "New Employee" page with `EmployeeForm.tsx` and Zod validation — done when form validates and submits
- [ ] Implement `EmployeeDetailPage.tsx` full employee profile — done when all fields render
- [ ] Implement edit and deactivate/terminate actions for employees — done when status changes reflect in list
- [ ] Implement `SettingsPage.tsx` with company info form (name, address, logo URL, tax ID) using React Hook Form — done when settings save and persist to localStorage
- [ ] Implement currency and date format preferences in Settings, applied globally — done when changing currency format updates display across all money values
- [ ] Implement "Reset Demo Data" button that restores all contexts to their original mock data and clears localStorage — done when clicking reset restores original data
- [ ] Propagate company name, address, and tax ID from Settings into invoice document header — done when invoice preview reflects current settings
- [ ] Write test: `EmployeesListPage` renders all mock employees — done when test passes
- [ ] Write test: `SettingsPage` saves company name to localStorage — done when test passes
- [ ] Write test: "Reset Demo Data" restores original mock data — done when test passes
- [ ] Commit: `feat: add employees module and settings page` — done when commit exists

---

## Phase 11: Reports & Accounting

- [ ] Create `ReportsPage.tsx` hub with cards linking to each report — done when all report cards render and navigate correctly
- [ ] Implement `ProfitLossPage.tsx` date range selector (month, quarter, year, custom) — done when selector changes the report range
- [ ] Implement P&L revenue section aggregated from sales within date range — done when total matches sum of filtered sales
- [ ] Implement P&L expenses section aggregated from expenses within date range — done when total matches sum of filtered expenses
- [ ] Implement P&L gross profit, net profit calculation and display — done when values are mathematically correct
- [ ] Implement month-by-month P&L table — done when each row shows one month's revenue, expenses, and profit
- [ ] Implement CSV export for P&L report using `Blob` + anchor download — done when clicking export downloads a `.csv` file with correct data
- [ ] Create `SalesTrendChart.tsx` monthly line chart — done when chart renders with correct monthly data points
- [ ] Implement `BalanceSheetPage.tsx` with as-of date selector — done when selector changes the balance sheet snapshot
- [ ] Implement balance sheet assets, liabilities, and equity sections — done when sections render with calculated values
- [ ] Add print functionality to all report pages — done when `window.print()` opens with clean report layout
- [ ] Write test: P&L total revenue matches sum of all completed sales in range — done when test passes
- [ ] Write test: CSV export produces correct number of rows — done when test passes
- [ ] Commit: `feat: add reports and accounting module` — done when commit exists

---

## Phase 12: Custom Software Request Page

- [ ] Implement `CustomRequestPage.tsx` with multi-step form structure (3 steps) — done when page renders a step indicator and first step form
- [ ] Implement Step 1 (Contact Info): first name, last name, email, phone — done when fields render and validate with Zod
- [ ] Implement Step 2 (Project Details): project type, industry, feature description textarea — done when fields render and validate
- [ ] Implement Step 3 (Budget & Timeline): budget range selector, timeline selector, how did you hear about us — done when fields render and validate
- [ ] Implement step progress indicator (e.g. "Step 2 of 3") — done when indicator updates on navigation
- [ ] Implement Next/Back navigation between steps with per-step validation (cannot advance with errors) — done when invalid step prevents advancing
- [ ] Implement fake submission on Step 3 (success message, no real API call) — done when submitting Step 3 shows success state
- [ ] Add link to `/custom` from Navbar, Landing page CTA, and Pricing page — done when all three links navigate to `/custom`
- [ ] Write test: Step 1 validation prevents advancing with invalid email — done when test passes
- [ ] Write test: successful submission shows the success state — done when test passes
- [ ] Commit: `feat: add custom software request page` — done when commit exists

---

## Phase 13: SEO, Performance, Accessibility

- [ ] Create `useDocumentTitle(title: string)` hook that sets `document.title` — done when each page shows its title in the browser tab
- [ ] Add `<meta name="description">` per route using the hook or a Helmet equivalent — done when each page has a unique meta description
- [ ] Add Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) to `index.html` — done when tags are present in page source
- [ ] Add `robots.txt` to `public/` — done when file is served at `/robots.txt`
- [ ] Add `sitemap.xml` to `public/` listing all marketing and demo routes — done when file is served at `/sitemap.xml`
- [ ] Audit all interactive elements for visible focus rings (add `focus-visible:ring` where missing) — done when tabbing through the page shows a focus indicator on every interactive element
- [ ] Add `aria-label` to icon-only buttons (notification bell, hamburger menu, close buttons) — done when no unlabeled button exists
- [ ] Add `aria-current="page"` to active sidebar nav links — done when attribute is set correctly on active link
- [ ] Add `role="dialog"` and `aria-labelledby` to all modal dialogs — done when modals are correctly marked up
- [ ] Audit and fix WCAG AA color contrast issues — done when no contrast violation exists in the UI
- [ ] Lazy-load all `/demo/*` route components using `React.lazy` + `Suspense` with a spinner fallback — done when demo routes load as separate chunks in the build
- [ ] Add `<LoadingSpinner>` or skeleton screens to data-heavy pages during initial render — done when a loading state appears before data populates
- [ ] Optimize all images: use WebP format, add explicit `width` and `height` attributes — done when no image causes layout shift
- [ ] Run Lighthouse audit on production preview; fix issues until Performance ≥ 90 and Accessibility ≥ 95 — done when Lighthouse scores meet thresholds
- [ ] Commit: `feat: add SEO, performance optimizations, and accessibility improvements` — done when commit exists

---

## Phase 14: Final QA and Build

- [ ] Run `npm run test` — done when all tests pass (0 failures)
- [ ] Run `npm run lint` — done when 0 ESLint errors are reported
- [ ] Run `npx tsc --noEmit` — done when TypeScript reports 0 errors
- [ ] Run `npm run build` — done when build completes with 0 errors
- [ ] Run `npm run preview` and manually walk through every route — done when no visual or functional regressions are found
- [ ] Manually test all CRUD flows in preview build (create, read, update, delete for each module) — done when all operations work correctly in the built app
- [ ] Test in Chrome, Firefox, and Safari — done when no browser-specific bugs are found
- [ ] Test at 375px (mobile) and 768px (tablet) viewports — done when no broken layouts or horizontal scroll exist
- [ ] Run `npm run test -- --coverage` and review coverage report — done when overall coverage ≥ 70%
- [ ] Security audit: check for `dangerouslySetInnerHTML`, exposed API keys, unvalidated inputs, and console errors — done when no issues are found
- [ ] Update `docs/TODO.md` — done when all tasks above this one are checked
- [ ] Write `docs/PROGRESS.md` final session entry — done when entry describes current state, known issues, and next steps
- [ ] Commit: `chore: final QA pass, all tests passing` — done when commit exists

---

## Phase 15: GitHub & Deployment Prep

- [ ] Create GitHub repository (confirm with user: public or private) — done when repo exists on GitHub
- [ ] Push all local commits to `main` on GitHub — done when `git push origin main` succeeds
- [ ] Create `install.bat` one-click Windows installer script for client installation — done when script checks Node.js, runs install and build, and creates launcher
- [ ] Create `scripts/installer.ps1` PowerShell installation & desktop shortcut automation — done when script generates Windows desktop shortcut and opens browser
- [ ] Create `start-app.bat` desktop quick-launch script — done when double-clicking starts local preview server and launches browser
- [ ] Add `vercel.json` with SPA redirect rule `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` — done when file exists
- [ ] Add `.github/workflows/ci.yml` GitHub Actions workflow: trigger on push to `main`, steps: install → lint → type-check → test → build — done when workflow file exists and passes on push
- [ ] Verify environment variable naming convention (`VITE_` prefix) for any public config values — done when all `VITE_` vars are in `.env.example`
- [ ] Write final `README.md`: project description, screenshots, stack, local setup commands, installer instructions, deploy instructions — done when README is comprehensive and accurate
- [ ] Tag release `v1.0.0` — done when `git tag v1.0.0` exists and is pushed
- [ ] Commit: `chore: add deployment config, installer scripts, and CI workflow` — done when commit exists

---

*Last updated: Phase 0 — Project Initialization*
