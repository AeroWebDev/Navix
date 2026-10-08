# TEST_CASES.md — Test Cases

## Accounting Software Showcase & Custom Software Platform

> Update the **Status** column after each test run. Valid values: `not run` | `pass` | `fail`

---

## Navigation & Routing

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| NAV-001 | Routing | Home route renders landing page | Navigate to `/` | `LandingPage` component renders with hero section visible | not run |
| NAV-002 | Routing | Features route renders features page | Navigate to `/features` | `FeaturesPage` renders with all feature groups | not run |
| NAV-003 | Routing | Pricing route renders pricing page | Navigate to `/pricing` | `PricingPage` renders with 3 pricing tiers | not run |
| NAV-004 | Routing | Contact route renders contact page | Navigate to `/contact` | `ContactPage` renders with the contact form | not run |
| NAV-005 | Routing | Custom request route renders | Navigate to `/custom` | `CustomRequestPage` renders Step 1 | not run |
| NAV-006 | Routing | Demo redirect works | Navigate to `/demo` | Browser redirects to `/demo/dashboard` | not run |
| NAV-007 | Routing | Dashboard route renders | Navigate to `/demo/dashboard` | `DashboardPage` renders inside `AppShell` | not run |
| NAV-008 | Routing | Unknown route shows 404 | Navigate to `/does-not-exist` | `NotFoundPage` renders with a "go home" link | not run |
| NAV-009 | Routing | 404 go-home link works | Click go-home link on 404 page | Browser navigates to `/` | not run |
| NAV-010 | Navbar | All marketing nav links render | Render `Navbar` | Links for Features, Pricing, Contact, Try Demo are all present in the DOM | not run |
| NAV-011 | Navbar | "Try Demo" CTA navigates to demo | Click "Try Demo" in Navbar | Browser navigates to `/demo/dashboard` | not run |
| NAV-012 | Sidebar | All sidebar nav sections render | Render `Sidebar` inside AppShell | All section headings (Sales, Purchases, etc.) are visible | not run |
| NAV-013 | Sidebar | Active link is highlighted | Navigate to `/demo/sales` | Sales sidebar link has the active CSS class applied | not run |
| NAV-014 | Sidebar | Sidebar toggles on mobile | Click hamburger button at 375px width | Sidebar opens; clicking again closes it | not run |
| NAV-015 | Sidebar | Each sidebar link navigates correctly | Click "Expenses" sidebar link | Browser navigates to `/demo/expenses` | not run |

---

## Landing Page

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| LP-001 | Hero Section | Headline renders | Render `LandingPage` | Primary headline text is visible | not run |
| LP-002 | Hero Section | CTA buttons render | Render `LandingPage` | "Try Demo" and "Request Custom" buttons are present | not run |
| LP-003 | Hero Section | "Try Demo" CTA links to demo | Render `LandingPage` | "Try Demo" button href points to `/demo/dashboard` | not run |
| LP-004 | Features Section | Feature cards render | Render `LandingPage` | At least 3 feature cards with icon, title, and description are visible | not run |
| LP-005 | Testimonials | Testimonials render | Render `LandingPage` | At least 2 testimonial quotes are visible | not run |
| LP-006 | Bottom CTA | CTA banner renders | Render `LandingPage` | Bottom CTA section with a button is visible | not run |
| LP-007 | Responsiveness | No horizontal scroll on mobile | View `LandingPage` at 375px width | `document.body.scrollWidth` equals window width (no overflow) | not run |
| LP-008 | Footer | Footer renders | Render `LandingPage` | Footer component is present with copyright text | not run |

---

## Demo Authentication & Role Permissions (RBAC)

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| AUTH-001 | Demo Login | Unauthenticated redirect | Visit `/demo` or `/demo/dashboard` without session | Redirects to `/demo/login` | not run |
| AUTH-002 | Demo Login | Invalid password error | Enter wrong password on login page | Displays error "Invalid password for this account" | not run |
| AUTH-003 | Demo Login | Quick-pick login | Click "Super Admin" quick-fill button and Submit | Authenticates and navigates to `/demo/dashboard` | not run |
| AUTH-004 | Role Guard | Cashier restricted route | Log in as Cashier, navigate to `/demo/accounting` | Access denied / redirected with permission message | not run |
| AUTH-005 | Role Sidebar | Restricted sidebar items | Log in as Cashier | Accounting, Expenses, Suppliers links hidden in sidebar | not run |
| AUTH-006 | Ephemeral Data | Zero persistent storage | Modify sale or product, refresh browser | State resets to clean demo baseline (nothing in storage) | not run |
| AUTH-007 | Demo Reset | Quick reset button | Click "Reset Demo Data" button in TopBar | In-memory state instantly resets to initial data | not run |
| AUTH-008 | User Switcher | Role switcher in TopBar | Switch from Admin to Accountant via dropdown | Session switches role and refreshes access permissions | not run |

---

## Demo App Shell

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| SHELL-001 | AppShell | Renders with sidebar and content area | Navigate to any `/demo/*` route | Both `Sidebar` and main content area are visible | not run |
| SHELL-002 | TopBar | Dynamic page title updates | Navigate to `/demo/sales` | TopBar shows "Sales" as the page title | not run |
| SHELL-003 | TopBar | User avatar dropdown renders | Render `TopBar` | Avatar button is present | not run |
| SHELL-004 | TopBar | "Exit Demo" link navigates home | Click "Exit Demo" in avatar dropdown | Browser navigates to `/` | not run |
| SHELL-005 | AppShell | Sidebar closes on route change (mobile) | At 375px, open sidebar then click a nav link | Sidebar closes after navigation | not run |

---

## Dashboard

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| DASH-001 | KPI Cards | Total Revenue card renders | Render `DashboardPage` with mock data | A stat card labeled "Total Revenue" is visible | not run |
| DASH-002 | KPI Cards | Total Revenue shows correct sum | Render `DashboardPage` with mock data | Revenue value matches the sum of all completed sales totals | not run |
| DASH-003 | KPI Cards | Total Expenses shows correct sum | Render `DashboardPage` with mock data | Expenses value matches the sum of all paid expenses | not run |
| DASH-004 | KPI Cards | Net Profit is revenue minus expenses | Render `DashboardPage` with mock data | Net Profit = Total Revenue - Total Expenses | not run |
| DASH-005 | KPI Cards | Outstanding Invoices card renders | Render `DashboardPage` | A stat card for outstanding invoices is visible with the correct amount | not run |
| DASH-006 | Charts | Revenue vs Expenses bar chart renders | Render `DashboardPage` | A Recharts `BarChart` is present in the DOM without errors | not run |
| DASH-007 | Charts | Expense pie chart renders | Render `DashboardPage` | A Recharts `PieChart` is present with at least one segment | not run |
| DASH-008 | Recent Sales | Recent sales table shows last 5 sales | Render `DashboardPage` with 40 mock sales | Exactly 5 rows appear in the recent sales table | not run |
| DASH-009 | Recent Invoices | Recent invoices table shows last 5 | Render `DashboardPage` with 20 mock invoices | Exactly 5 rows appear in the recent invoices table | not run |
| DASH-010 | Low Stock | Low-stock alerts list products below reorder level | Render `DashboardPage` with products where stock ≤ reorder level | Each such product appears in the low-stock list | not run |
| DASH-011 | Low Stock | No low-stock message when all stock is healthy | Render `DashboardPage` with all products above reorder level | An "all stock is healthy" or empty state message appears | not run |

---

## Sales Module

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| SAL-001 | Sales List | All mock sales render | Navigate to `/demo/sales` | All seeded sales appear in the table | not run |
| SAL-002 | Sales List | Empty state renders when no sales | Render with empty sales context | `EmptyState` component with "No sales found" appears | not run |
| SAL-003 | Sales List | Pagination splits rows | Mock data has 25+ sales | Only 10 rows are shown on page 1; page 2 shows the next set | not run |
| SAL-004 | Sales Search | Search by customer name filters rows | Type "Alice" in search input | Only sales with customer names matching "Alice" are shown | not run |
| SAL-005 | Sales Search | Search by sale number filters rows | Type "SL-2024-0001" in search input | Only the matching sale is shown | not run |
| SAL-006 | Sales Search | Clearing search restores full list | Type a query then clear the input | All sales are shown again | not run |
| SAL-007 | Sales Filter | Status filter shows only matching sales | Select "completed" from status filter | Only completed sales are visible | not run |
| SAL-008 | Sales Filter | Date range filter applies correctly | Set date range to a specific month | Only sales within that month are shown | not run |
| SAL-009 | New Sale | Form renders with all fields | Navigate to `/demo/sales/new` | Customer selector, date, payment method, notes, and line item section render | not run |
| SAL-010 | New Sale | Validation: customer required | Submit form with no customer selected | Error message "Customer is required" appears | not run |
| SAL-011 | New Sale | Validation: at least one line item required | Submit form with no items added | Error message about needing at least one item appears | not run |
| SAL-012 | New Sale | Validation: quantity must be > 0 | Add a line item, set qty to 0, submit | Error message "Quantity must be greater than 0" appears | not run |
| SAL-013 | New Sale | Totals auto-calculate | Add a line item (qty=2, price=50), select 10% tax | Subtotal shows \$100, tax shows \$10, total shows \$110 | not run |
| SAL-014 | New Sale | Discount reduces total | Add a line item, set 20% discount | Total is reduced by 20% of the item price | not run |
| SAL-015 | New Sale | Successful submit adds to list | Fill valid form and click submit | Success toast shows; navigating to sales list shows the new sale | not run |
| SAL-016 | Sale Detail | All fields display correctly | Navigate to a sale's detail page | All fields (number, date, customer, items, total, status) are visible | not run |
| SAL-017 | Sale Detail | Edit pre-fills form | Click Edit on sale detail | Form opens with all existing values pre-filled | not run |
| SAL-018 | Sale Detail | Edited sale updates in list | Change status, save | Sale list shows updated status | not run |
| SAL-019 | Sale Detail | Delete opens confirmation modal | Click Delete on sale detail | `ConfirmDeleteModal` opens with sale number in the message | not run |
| SAL-020 | Sale Detail | Cancelling delete keeps sale | Click Cancel in the modal | Modal closes; sale remains in the list | not run |
| SAL-021 | Sale Detail | Confirming delete removes sale | Click Confirm Delete in the modal | Sale is removed from context and no longer appears in the list | not run |
| SAL-022 | Sale Detail | "Create Invoice" pre-fills invoice form | Click "Create Invoice" on a sale | Invoice form opens with sale's customer, items, and total pre-populated | not run |
| SAL-023 | Status Badge | Correct color per status | Render `StatusBadge` with "completed" | Badge has green color class | not run |
| SAL-024 | Status Badge | Cancelled status shows red | Render `StatusBadge` with "cancelled" | Badge has red color class | not run |

---

## Purchases Module

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| PUR-001 | Purchases List | All mock purchases render | Navigate to `/demo/purchases` | All seeded purchases appear in the table | not run |
| PUR-002 | Purchases Search | Search by supplier name filters results | Type supplier name in search | Only matching purchases are shown | not run |
| PUR-003 | Purchases Filter | Filter by status and payment status | Select "received" and "paid" | Only purchases matching both filters are shown | not run |
| PUR-004 | New Purchase | Validation: supplier required | Submit form with no supplier | Error message for required supplier appears | not run |
| PUR-005 | New Purchase | Successful submit adds to list | Fill valid form and submit | Success toast shows; new purchase appears in list | not run |
| PUR-006 | Purchase Detail | "Mark as Received" updates status | Click "Mark as Received" | Purchase status changes to "received" | not run |
| PUR-007 | Purchase Detail | "Mark as Received" increases product stock | Click "Mark as Received" on a purchase with line items | Each line item's product `stockQuantity` increases by the ordered quantity | not run |
| PUR-008 | Purchase Detail | Edit and delete work | Edit then delete a purchase | Changes and deletion reflect in the list | not run |

---

## Products & Inventory

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| PRD-001 | Products List | All mock products render | Navigate to `/demo/products` | All seeded products appear in the table | not run |
| PRD-002 | Products List | Low-stock row is highlighted | A product with stock ≤ reorder level exists | That row has a distinct background color | not run |
| PRD-003 | Products List | No highlight on healthy stock | All products have stock > reorder level | No rows have the low-stock highlight | not run |
| PRD-004 | Products Search | Search by SKU filters results | Type a product SKU | Only the matching product is shown | not run |
| PRD-005 | Products Filter | Category filter applies | Select a category | Only products in that category are shown | not run |
| PRD-006 | New Product | Validation: price must be positive | Set unit price to -5 and submit | Error about non-negative price appears | not run |
| PRD-007 | New Product | Successful submit adds to list | Fill valid form and submit | New product appears in list | not run |
| PRD-008 | Product Detail | Stock adjustment (add) increases quantity | On detail page, add 10 units | `stockQuantity` increases by 10 | not run |
| PRD-009 | Product Detail | Stock adjustment (subtract) decreases quantity | On detail page, subtract 5 units | `stockQuantity` decreases by 5 | not run |
| PRD-010 | Product Detail | Cannot subtract more than current stock | Try to subtract 999 units from a product with 5 | Error or validation prevents the adjustment | not run |

---

## Customers & Suppliers

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| CUS-001 | Customers List | All mock customers render | Navigate to `/demo/customers` | All seeded customers appear in the table | not run |
| CUS-002 | Customers Search | Search by email filters results | Type a customer email | Only matching customers are shown | not run |
| CUS-003 | Customers Filter | Type filter (individual/business) applies | Select "business" | Only business customers are shown | not run |
| CUS-004 | Customer Detail | Sales history tab shows only that customer's sales | Open customer detail, click "Sales" tab | Only sales with matching `customerId` are shown | not run |
| CUS-005 | Customer Detail | Invoices tab shows only that customer's invoices | Click "Invoices" tab | Only invoices with matching `customerId` are shown | not run |
| CUS-006 | New Customer | Name is required | Submit empty name | Error "Name is required" appears | not run |
| CUS-007 | New Customer | Valid submit adds to list | Fill valid form and submit | New customer appears in the list | not run |
| CUS-008 | Suppliers List | All mock suppliers render | Navigate to `/demo/suppliers` | All seeded suppliers appear in the table | not run |
| CUS-009 | Supplier Detail | Purchase history tab shows correct data | Open supplier detail, click "Purchases" tab | Only purchases with matching `supplierId` are shown | not run |

---

## Expenses Module

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| EXP-001 | Expenses List | All mock expenses render | Navigate to `/demo/expenses` | All seeded expenses appear in the table | not run |
| EXP-002 | Expenses Search | Search by title filters results | Type expense title | Only matching expenses are shown | not run |
| EXP-003 | Expenses Filter | Category filter applies | Select "utilities" category | Only utility expenses are shown | not run |
| EXP-004 | Expenses Filter | Status filter applies | Select "pending" | Only pending expenses are shown | not run |
| EXP-005 | Expenses Filter | Date range filter applies | Set a specific month | Only expenses within that month are shown | not run |
| EXP-006 | Category Totals | Summary totals are accurate | View expenses list | Total per visible category matches sum of filtered expense amounts | not run |
| EXP-007 | New Expense | Title required validation | Submit with empty title | Error "Title is required" appears | not run |
| EXP-008 | New Expense | Amount must be positive | Enter amount of 0 and submit | Error "Amount must be greater than 0" appears | not run |
| EXP-009 | New Expense | Valid submit adds to list | Fill valid form and submit | New expense appears in the list | not run |
| EXP-010 | Edit Expense | Edit pre-fills form values | Click Edit on an expense | Form opens with all existing values pre-filled | not run |
| EXP-011 | Delete Expense | Confirmation required | Click Delete | `ConfirmDeleteModal` opens | not run |

---

## Invoices & Payments

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| INV-001 | Invoices List | All mock invoices render | Navigate to `/demo/invoices` | All seeded invoices appear in the table | not run |
| INV-002 | Invoices List | Overdue invoices are visually distinct | An invoice with passed due date and "sent" status exists | Row is highlighted in red or has an overdue badge | not run |
| INV-003 | Invoices Search | Search by invoice number | Type "INV-2024-0001" | Only that invoice is shown | not run |
| INV-004 | Invoices Filter | Status filter applies | Select "paid" | Only paid invoices are shown | not run |
| INV-005 | New Invoice | Customer required validation | Submit without selecting customer | Error "Customer is required" appears | not run |
| INV-006 | New Invoice | Due date required | Submit without a due date | Error "Due date is required" appears | not run |
| INV-007 | New Invoice | Totals auto-calculate | Add a line item (qty=3, price=100, 10% tax) | Subtotal=\$300, tax=\$30, total=\$330 | not run |
| INV-008 | New Invoice | Valid submit adds to list | Fill valid form and submit | Success toast; new invoice appears in list | not run |
| INV-009 | Invoice Preview | Invoice detail renders as a document | Navigate to an invoice's detail page | Invoice number, customer info, line items, and totals are displayed in document format | not run |
| INV-010 | Invoice Preview | Print action is triggered | Click Print / Download PDF button | `window.print()` is called | not run |
| INV-011 | Record Payment | Partial payment updates amountPaid | Record a payment for half the invoice total | `amountPaid` increases; `amountDue` decreases by the same amount | not run |
| INV-012 | Record Payment | Full payment marks invoice as paid | Record a payment equal to the remaining amount due | Invoice status changes to "paid" | not run |
| INV-013 | Record Payment | Cannot overpay invoice | Try to record a payment greater than the amount due | Error or validation prevents overpayment | not run |
| INV-014 | Invoice Status | Overdue auto-logic triggers on page load | An invoice with due date yesterday and "sent" status | Its status is shown as "overdue" in the list | not run |
| INV-015 | Invoice Status | Draft invoice can be edited | Navigate to a draft invoice's detail | Edit button is present and enabled | not run |
| INV-016 | Invoice Status | Non-draft invoice cannot be edited | Navigate to a "paid" invoice's detail | Edit button is absent or disabled | not run |
| INV-017 | Payments List | All mock payments render | Navigate to `/demo/payments` | All seeded payments appear in the table | not run |
| INV-018 | Payments Filter | Filter by type (incoming/outgoing) | Select "incoming" | Only incoming payments are shown | not run |

---

## Form Validation (Cross-Module)

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| FORM-001 | Zod Validation | Required field shows error immediately on blur | Focus then blur an empty required field | Inline error message appears below the field | not run |
| FORM-002 | Zod Validation | Error clears when valid value entered | Enter a valid value in a field with an error | Error message disappears | not run |
| FORM-003 | Zod Validation | Form cannot submit while errors exist | Click submit on a form with validation errors | Form does not submit; all errors are visible | not run |
| FORM-004 | React Hook Form | Submit button shows loading state | Submit a valid form | Button shows a loading indicator while processing | not run |

---

## Charts & Data Visualization

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| CHART-001 | Revenue Bar Chart | Chart renders without throwing | Render `RevenueChart` with 12 months of mock data | No JS errors; chart SVG is present in the DOM | not run |
| CHART-002 | Revenue Bar Chart | Chart has correct number of bars | Render `RevenueChart` with 12 months of data | 12 bar groups are present (or 24 bars for revenue+expenses) | not run |
| CHART-003 | Expense Pie Chart | Pie chart renders without throwing | Render `ExpensePieChart` with mock expense data | No JS errors; pie SVG is present | not run |
| CHART-004 | Expense Pie Chart | Legend entries match expense categories | Render `ExpensePieChart` | Number of legend entries equals number of distinct categories | not run |
| CHART-005 | Sales Trend Chart | Line chart renders | Render `SalesTrendChart` with mock data | Line chart SVG is present with correct number of data points | not run |

---

## Custom Software Request Page

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| CSR-001 | Multi-step Form | Step 1 renders on load | Navigate to `/custom` | Step 1 form fields (name, email, phone) are visible; step indicator shows "Step 1 of 3" | not run |
| CSR-002 | Multi-step Form | Cannot advance with invalid email in Step 1 | Enter invalid email, click Next | Error "Invalid email" appears; stays on Step 1 | not run |
| CSR-003 | Multi-step Form | Valid Step 1 advances to Step 2 | Fill valid Step 1 fields, click Next | Step 2 form fields are shown; indicator shows "Step 2 of 3" | not run |
| CSR-004 | Multi-step Form | Back button returns to previous step | On Step 2, click Back | Step 1 form is shown with previously entered values preserved | not run |
| CSR-005 | Multi-step Form | Valid Step 2 advances to Step 3 | Fill valid Step 2 fields, click Next | Step 3 fields appear; indicator shows "Step 3 of 3" | not run |
| CSR-006 | Multi-step Form | Submit on Step 3 shows success | Fill valid Step 3 fields, click Submit | Success message "We'll contact you within 24 hours" is shown | not run |
| CSR-007 | Multi-step Form | Form resets after successful submit | Submit, then navigate away and back | Form is back at Step 1 with empty fields | not run |

---

## Mobile & Responsive

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| MOB-001 | Landing Page | No horizontal scroll at 375px | Render `LandingPage` at 375px | `scrollWidth === clientWidth` | not run |
| MOB-002 | Demo App | Sidebar hidden by default on mobile | Render `AppShell` at 375px | Sidebar is not visible without opening | not run |
| MOB-003 | Demo App | Tables are horizontally scrollable on mobile | View `SalesListPage` at 375px | Table scrolls horizontally inside its container without breaking the layout | not run |
| MOB-004 | Demo App | Stat cards stack vertically on mobile | View `DashboardPage` at 375px | KPI cards are in a single column | not run |
| MOB-005 | Forms | Form fields are full-width on mobile | Open any form at 375px | All input fields span the full width | not run |

---

## Empty States & Loading

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| EMPTY-001 | Sales List | Empty state shows when no sales | Render `SalesListPage` with empty context | `EmptyState` component renders with a helpful message | not run |
| EMPTY-002 | Products List | Empty state shows when no products | Render `ProductsListPage` with empty context | `EmptyState` component renders | not run |
| EMPTY-003 | Customers List | Empty state shows when no customers | Render `CustomersListPage` with empty context | `EmptyState` component renders | not run |
| EMPTY-004 | Search Results | No-results message on zero matches | Search for a term that matches nothing | "No results found" message appears (not a blank page) | not run |
| EMPTY-005 | Loading State | Spinner shows before data populates | Simulate delayed context initialization | Loading spinner or skeleton is visible during the delay | not run |

---

## Accessibility

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| A11Y-001 | Keyboard Nav | All nav links are reachable by Tab | Tab through the Navbar | All links receive visible focus in the correct order | not run |
| A11Y-002 | Keyboard Nav | Modal can be closed with Escape | Open `ConfirmDeleteModal`, press Escape | Modal closes | not run |
| A11Y-003 | Keyboard Nav | Form can be submitted with Enter | Focus the submit button and press Enter | Form submits | not run |
| A11Y-004 | ARIA | Active sidebar link has `aria-current="page"` | Render Sidebar with an active route | Active `<NavLink>` has `aria-current="page"` attribute | not run |
| A11Y-005 | ARIA | Icon-only buttons have `aria-label` | Render notification bell button | Button has a non-empty `aria-label` attribute | not run |
| A11Y-006 | ARIA | Modal has `role="dialog"` and `aria-labelledby` | Open `ConfirmDeleteModal` | Dialog element has correct ARIA attributes | not run |
| A11Y-007 | Color Contrast | Text meets WCAG AA on white background | Inspect body text color against white | Contrast ratio ≥ 4.5:1 | not run |

---

## Utility Functions (Unit Tests)

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| UTIL-001 | formatCurrency | Formats positive number | `formatCurrency(1234.5)` | Returns `"$1,234.50"` | not run |
| UTIL-002 | formatCurrency | Formats zero | `formatCurrency(0)` | Returns `"$0.00"` | not run |
| UTIL-003 | formatCurrency | Formats negative number | `formatCurrency(-50)` | Returns `"-$50.00"` or `"($50.00)"` | not run |
| UTIL-004 | formatDate | Formats ISO date string | `formatDate("2024-03-15")` | Returns `"Mar 15, 2024"` or configured format | not run |
| UTIL-005 | calculateTotal | Computes total correctly | Items with prices, qty, and discount; 10% tax | `total === (subtotal - discount) * 1.1` | not run |
| UTIL-006 | calculateProfit | Returns revenue minus expenses | Revenue=\$5000, Expenses=\$3000 | `profit === 2000` | not run |
| UTIL-007 | generateId | Returns a unique UUID | Call `generateId()` twice | Two calls return different non-empty strings | not run |
| UTIL-008 | useSearch hook | Filters array by search term | Array of objects, search term matching one item | Returns array with only the matching item | not run |
| UTIL-009 | usePagination hook | Slices correct page | 25 items, page size 10, current page 2 | Returns items 11–20 | not run |

---

## Windows Installer & Local Packaging

| ID | Feature | Scenario | Input / Steps | Expected Result | Status |
|---|---|---|---|---|---|
| INST-001 | Batch Installer | `install.bat` checks Node.js | Run `install.bat` in clean terminal | Detects Node.js & npm version or prompts to install | not run |
| INST-002 | Batch Installer | `install.bat` dependency install | Run `install.bat` | Successfully runs `npm install` and builds production output | not run |
| INST-003 | App Launcher | `start-app.bat` starts server | Double-click or execute `start-app.bat` | Starts local preview server on `http://localhost:4173` | not run |
| INST-004 | PowerShell Installer | `installer.ps1` desktop shortcut | Run `scripts/installer.ps1` | Creates valid Windows Desktop shortcut pointing to launcher | not run |
| INST-005 | SPA Routing in Preview | Refresh nested route in preview | Refresh `/demo/invoices` on local server | Page loads correctly without 404 | not run |

---

*Last updated: Phase 0 — Project Initialization*
