# Software Specification (SPEC.md)
## Accounting Software Showcase & Custom Software Platform

**Version:** 1.0  
**Date:** 2026-10-07  
**Status:** Ready for Review  

---

## 1. System Overview & Routing Architecture

### 1.1 Web Application Routes
- `/` - Landing Page (Hero, Value Prop, Interactive Teaser, Features, Customization CTA, Testimonials, FAQ, Footer)
- `/features` - Comprehensive feature breakdown with interactive screenshots and module comparisons
- `/how-it-works` - 4-step implementation & onboarding process for custom deployments
- `/custom-software` - Detailed consultation & custom requirements intake form with dynamic quote/specs estimator
- `/contact` - Direct contact details, WhatsApp integration trigger, verified interactive form
- `/faq` - Searchable, categorized frequently asked questions
- `/privacy` - Privacy Policy document (customizable legal template)
- `/terms` - Terms & Conditions document (customizable legal template)
- `/disclaimer` - Software Financial/Regulatory Disclaimer
- `*` - 404 Not Found Page with smart redirection to demo or homepage

### 1.2 Interactive Accounting App Demo Routes (Layout with Sidebar & Header)
- `/demo` - Redirects to `/demo/login` if not authenticated, or `/demo/dashboard`
- `/demo/login` - Demo Login Portal with selectable role accounts and password verification
- `/demo/dashboard` - Executive KPI metrics, financial charts, recent sales/invoices, low-stock alerts
- `/demo/sales` - Sales management, POS transaction log, sales filters, new sale modal, invoice generation
- `/demo/purchases` - Supplier purchase orders, procurement tracking, status tags (Restricted for Cashier)
- `/demo/products` - Product inventory catalog, SKU tracking, pricing, low-stock warnings, adjustments
- `/demo/inventory` - Stock movement log, warehouse batch adjustments, audit history
- `/demo/customers` - CRM directory, outstanding balances, transaction histories, customer profiles
- `/demo/suppliers` - Vendor directory, payables tracking, supply logs (Restricted for Cashier)
- `/demo/expenses` - Categorized expense ledger, payment receipts, expense distribution analytics (Restricted for Cashier)
- `/demo/invoices` - Invoicing engine, PDF view/print generation preview, status lifecycle
- `/demo/payments` - Inflow & outflow payment tracking, payment methods (Cash, Card, Bank, Transfer)
- `/demo/employees` - Staff directory, role-based access control (RBAC) permission matrix (Owner/Admin only)
- `/demo/reports` - 8+ financial and operational reports with customizable date ranges and export options (Owner/Admin/Accountant only)
- `/demo/accounting` - Financial statements, Profit & Loss, Accounts Receivable/Payable, Balance summary (Owner/Admin/Accountant only)
- `/demo/settings` - Business profile, currency, tax rates, invoice templates, user preferences (Owner/Admin only)

---

## 2. Interactive Accounting Demo Specifications

### 2.0 In-Memory Preview & Ephemeral Session Rules (Zero Data Persistence)
- **Zero Local/Server Persistence:** Per strict preview requirements, NO data changes are persisted to localStorage, IndexedDB, or server database.
- **In-Memory State:** All mutations (creating a sale, adjusting stock, adding an expense, editing an invoice) exist purely in React memory state for the active preview session.
- **Session Reset:** Refreshing the page or clicking "Reset Demo" immediately resets the entire dataset to pristine initial demo state.
- **Demo Mode Banner:** Prominent disclaimer banner at the top of the demo: *"Interactive Preview Mode: All operations are simulated in-memory and will not be saved permanently."*

### 2.0.1 Authentication & Role-Based Access Control (RBAC)
- **Demo Login Portal (`/demo/login`):**
  - Interactive login card with preset quick-fill role accounts or manual email/password entry.
  - Required password verification (demo passwords documented on screen, e.g., `admin123`, `manager123`, `accountant123`, `cashier123`).
  - Available Roles with distinct permission profiles:
    1. **Owner / Super Admin:** Full access to all 14 modules, financial statements, user & RBAC settings.
    2. **Branch Manager:** Access to Sales, Purchases, Inventory, Customers, Suppliers, Expenses, Invoices, Payments, Reports. Cannot modify system roles or sensitive company tax config.
    3. **Accountant:** Access to Dashboard, Expenses, Invoices, Payments, Reports, Full Accounting & Financial Statements. Restricted from adding products or changing employee roles.
    4. **Cashier / POS Staff:** Restricted minimal view: Dashboard summary, Sales creation, Customer lookup, Invoice preview. Blocked from Accounting, Supplier payables, Expenses, and System Settings.
- **Permission Enforcement:**
  - Sidebar dynamically hides or disables restricted navigation links based on active user role.
  - Route guards redirect unauthorized roles attempting to access restricted modules with a friendly "Insufficient Permissions" notice.
  - User profile menu displays current active role badge and allows 1-click role switching or logout.

### 2.1 Demo Layout & Navigation
- **Collapsible Sidebar:** Toggle button to collapse to icon-only view or expand. Remembers state in local storage.
- **Top Navigation Bar:** Global search modal shortcut (`Ctrl+K`), quick notifications popover, business switcher, profile dropdown.
- **Responsive Navigation:** Bottom bar or slide-out drawer on viewports `< 768px`.
- **Demo Data Indicator:** Persistent non-intrusive badge showing "Demo Mode — Local Realistic Data".

### 2.2 Dashboard Module
- **KPI Metric Cards:**
  - Total Revenue (trend % vs last month)
  - Total Expenses (trend % vs last month)
  - Net Profit (with margin percentage)
  - Outstanding Payments (Accounts Receivable total)
  - Total Sales count
  - Inventory items & Low Stock warning count
  - Active Customers & Suppliers
- **Charts:**
  - Revenue vs Expenses (Area/Line chart with monthly/weekly toggle)
  - Profit Trend (Bar chart)
  - Sales by Category (Pie/Donut chart)
  - Cash Flow Overview
- **Data Tables:**
  - Recent Transactions table with status badges and quick view
  - Low Stock Warning table with direct stock adjustment action

### 2.3 Sales Module
- **Inputs & Filters:** Search by invoice ID or customer name, filter by payment status (Paid, Pending, Overdue, Cancelled), date picker range, sort by date or amount.
- **Actions:**
  - New Sale Modal: Select customer, pick items with quantity/discount, calculate subtotal/tax/total, select payment method, save to local state.
  - View Sale Details: Full item breakdown, payment status, timeline.
  - Edit & Delete: In-memory CRUD with confirmation modal.
  - Export: Export to CSV simulation.

### 2.4 Products & Inventory Module
- **Fields:** Product Name, SKU, Category, Cost Price, Retail Price, In Stock, Reorder Point, Supplier, Status (In Stock, Low Stock, Out of Stock).
- **Features:**
  - Stock Adjustment Modal: Add/remove quantities with reason (Restock, Damage, Audit Correction).
  - Add/Edit Product Modal with validation (SKU uniqueness check, non-negative prices).
  - Low stock visual indicators (amber/red badges).

### 2.5 Customers & Suppliers Modules
- **Customer CRM:** Name, Email, Phone, Company, Balance Due, Lifetime Value, Status.
  - Detail View: Customer profile, historical invoices, payment timeline.
  - Add/Edit Customer modal.
- **Suppliers:** Company Name, Contact Person, Phone, Email, Current Payables, Payment Terms.
  - Detail View: Purchase order history, balance settlement modal.

### 2.6 Invoices & Printing Engine
- **Preview Modal & Standalone View:**
  - Company branding (Logo, Name, Tax ID, Address, Contact).
  - Client billing information.
  - Line items with Unit Price, Quantity, Tax %, Discount, Line Total.
  - Calculation summaries (Subtotal, Tax Total, Net Total).
  - Payment details, bank account notes, terms & conditions.
- **Action Buttons:**
  - Print Invoice: Triggers `@media print` CSS layout hiding navigation and rendering clean print page.
  - Download PDF: Generates/triggers formatted download.
  - Send Invoice: Mock email/WhatsApp dispatch with toast confirmation.

### 2.7 Expenses Module
- **Ledger:** Date, Expense Category (Rent, Salaries, Utilities, Marketing, Software, Logistics, Supplies, Maintenance), Description, Amount, Payment Method, Receipt attachment indicator.
- **Charts:** Monthly category breakdown donut chart, trend analysis.

### 2.8 Reports Module
- **Report Types:**
  1. Profit & Loss Statement
  2. Sales Summary Report
  3. Inventory Valuation & Movement Report
  4. Expenses Breakdown Report
  5. Accounts Receivable Aging Report
  6. Accounts Payable Report
  7. Tax Liability & VAT Summary
  8. Cash Flow Statement
- **Capabilities:** Date range picker (This Month, Last Quarter, Year to Date, Custom), export to CSV/PDF view.

### 2.9 Accounting & Financial Statements (Demo Interface)
- Balance sheet summary, trial balance preview, general ledger snapshot.
- Disclaimer banner: "Demo Interface — Not a certified accounting engine. Custom versions can integrate with local tax authorities (ZATCA, HMRC, IRS, etc.)".

### 2.10 Employees & Role-Based Permissions
- Roles: Owner, Administrator, Accountant, Sales Manager, Cashier.
- Interactive permission matrix table showing view/create/edit/delete flags across 10 functional modules.
- Add/Edit Staff member dialog.

### 2.11 Settings
- Business profile configuration (Name, Currency symbol/code, VAT/Tax rate %, Address).
- Invoice numbering customization (`INV-2026-XXXX`).
- UI Theme toggle (Light/Dark mode) & color accent preferences.
- Local demo data reset button ("Reset to Initial Demo State").

---

## 3. Marketing & Conversion Platform Specifications

### 3.1 Custom Software Request Intake Form (`/custom-software`)
- **Step 1: Business Information**
  - Full Name, Business Name, Email (validated), Phone / WhatsApp with country code, Country, Industry type.
- **Step 2: Business Scale**
  - Number of Employees (1-5, 6-20, 21-50, 50+), Number of Branches, Catalog SKU count.
- **Step 3: Module Selection (Checkboxes with dynamic estimation)**
  - Sales & POS, Invoicing, Inventory & Barcodes, Purchasing & Vendors, Expenses & Payables, CRM & Receivables, Staff & Payroll, Multi-Branch Sync, Tax Authority Integration, Mobile Apps (iOS/Android), Cloud vs On-Premises.
- **Step 4: Custom Notes & Architecture Requirements**
  - Freeform requirements textarea, preferred timeline, budget range.
- **Submission Feedback:**
  - Client-side validation using Zod.
  - Loading animation, success confirmation card with consultation booking details and copyable summary.

### 3.2 Contact Page (`/contact`)
- Verification rules: Name >= 2 chars, valid email, phone optional, message >= 10 chars.
- Direct WhatsApp quick-chat link with pre-filled message template.
- Physical address placeholder, business hours, SLA response time.

---

## 4. Desktop & Local Installer Specifications

The platform must support automated deployment and client distribution through a dedicated **Installer Package**:

### 4.1 Windows Desktop & Local One-Click Installer
- **Script:** `install.bat` and `scripts/installer.ps1`
- **Features:**
  1. Environment verification (Node.js & npm presence check with friendly error/download instructions if absent).
  2. Automated dependency installation (`npm install --production=false`).
  3. Production build compilation (`npm run build`).
  4. Local Desktop Launcher shortcut creation (`Accounting App Showcase.lnk` on Windows Desktop / Start Menu).
  5. One-click runner script (`start-app.bat`) that boots the optimized local server and automatically launches the default web browser to `http://localhost:4173` or specified port.
  6. Standalone portable packaging script (`npm run package:installer`).

### 4.2 Web-Based Installer Download Teaser
- "Download Desktop Demo / Offline Package" button on the custom software and demo pages, generating the client launcher package.

---

## 5. Technical, SEO & Accessibility Specifications

### 5.1 SEO Foundation
- `index.html` with primary meta tags, description, keywords, Open Graph, Twitter cards.
- `public/robots.txt` and `public/sitemap.xml` with all standard routes.
- Semantic HTML tags (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- Page-level dynamic document title and meta description updates.

### 5.2 Accessibility (WCAG 2.1 AA)
- High contrast compliant colors across light and dark modes.
- Focus rings visible for keyboard navigation (`focus-visible:ring-2`).
- Semantic form labeling with `aria-describedby` for error states.
- Modal dialogs with focus trap and `Esc` key listener.

### 5.3 Error Handling & Resilience
- Global React Error Boundary displaying friendly recovery UI.
- Empty states with call-to-actions across all search and filter views.
- Robust form feedback with instant inline validation messages.
