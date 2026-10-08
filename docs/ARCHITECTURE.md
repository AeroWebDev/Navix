# ARCHITECTURE.md — Accounting Software Showcase & Custom Software Platform

## 1. Overview

This is a **client-side-only** React application with two primary purposes:

1. **Showcase** — A marketing landing page demonstrating the capabilities of a custom accounting software product.
2. **Demo App** — A fully interactive, mock-data-driven accounting application that visitors can explore without signing up.

There is no backend, database, or authentication. All data is stored in-memory or in `localStorage` and is seeded from local mock data files.

---

## 2. Technology Stack

| Layer | Technology | Version | Reason |
|---|---|---|---|
| UI Framework | React | 18.x | Industry standard, large ecosystem |
| Language | TypeScript | 5.x | Type safety, better DX |
| Build Tool | Vite | 5.x | Fast HMR, modern ESM bundling |
| Routing | React Router | v6 | Declarative nested routing |
| Styling | Tailwind CSS | 3.x | Utility-first, consistent design |
| Component Library | shadcn/ui (Radix UI) | latest | Accessible, unstyled primitives |
| Charts | Recharts | 2.x | React-native charting library |
| Icons | Lucide React | latest | Consistent SVG icon set |
| Forms | React Hook Form + Zod | latest | Performant forms + schema validation |
| Date Utilities | date-fns | 3.x | Lightweight date manipulation |
| Testing | Vitest + React Testing Library | latest | Fast unit/integration tests |

**Package manager:** `npm`

---

## 3. Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run test         # Run Vitest test suite
npm run lint         # Run ESLint
```

---

## 4. Folder Structure

```
p:\projects\Accounting app\
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── main.tsx                    # App entry point
│   ├── App.tsx                     # Root router setup
│   ├── vite-env.d.ts
│   │
│   ├── assets/                     # Static images, fonts
│   │   └── logo.svg
│   │
│   ├── components/                 # Shared, reusable UI components
│   │   ├── ui/                     # shadcn/ui generated components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Marketing site top nav
│   │   │   ├── Footer.tsx          # Marketing site footer
│   │   │   ├── AppShell.tsx        # Demo app wrapper (sidebar + topbar)
│   │   │   ├── Sidebar.tsx         # Demo app sidebar navigation
│   │   │   └── TopBar.tsx          # Demo app top bar
│   │   ├── charts/
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── ExpensePieChart.tsx
│   │   │   └── SalesTrendChart.tsx
│   │   ├── tables/
│   │   │   ├── DataTable.tsx       # Generic sortable/filterable table
│   │   │   └── Pagination.tsx
│   │   ├── forms/
│   │   │   ├── SaleForm.tsx
│   │   │   ├── PurchaseForm.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── CustomerForm.tsx
│   │   │   ├── SupplierForm.tsx
│   │   │   ├── ExpenseForm.tsx
│   │   │   ├── InvoiceForm.tsx
│   │   │   └── EmployeeForm.tsx
│   │   ├── modals/
│   │   │   ├── ConfirmDeleteModal.tsx
│   │   │   └── InvoicePreviewModal.tsx
│   │   └── common/
│   │       ├── StatCard.tsx        # KPI metric card
│   │       ├── StatusBadge.tsx     # Colored status pill
│   │       ├── EmptyState.tsx      # Empty list placeholder
│   │       ├── LoadingSpinner.tsx
│   │       └── SearchInput.tsx
│   │
│   ├── pages/                      # Route-level page components
│   │   ├── marketing/              # Public marketing site
│   │   │   ├── LandingPage.tsx
│   │   │   ├── FeaturesPage.tsx
│   │   │   ├── PricingPage.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── demo/                   # Demo accounting app
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── sales/
│   │   │   │   ├── SalesListPage.tsx
│   │   │   │   ├── SaleDetailPage.tsx
│   │   │   │   └── NewSalePage.tsx
│   │   │   ├── purchases/
│   │   │   │   ├── PurchasesListPage.tsx
│   │   │   │   ├── PurchaseDetailPage.tsx
│   │   │   │   └── NewPurchasePage.tsx
│   │   │   ├── products/
│   │   │   │   ├── ProductsListPage.tsx
│   │   │   │   ├── ProductDetailPage.tsx
│   │   │   │   └── NewProductPage.tsx
│   │   │   ├── customers/
│   │   │   │   ├── CustomersListPage.tsx
│   │   │   │   └── CustomerDetailPage.tsx
│   │   │   ├── suppliers/
│   │   │   │   ├── SuppliersListPage.tsx
│   │   │   │   └── SupplierDetailPage.tsx
│   │   │   ├── expenses/
│   │   │   │   ├── ExpensesListPage.tsx
│   │   │   │   └── NewExpensePage.tsx
│   │   │   ├── invoices/
│   │   │   │   ├── InvoicesListPage.tsx
│   │   │   │   ├── InvoiceDetailPage.tsx
│   │   │   │   └── NewInvoicePage.tsx
│   │   │   ├── payments/
│   │   │   │   └── PaymentsListPage.tsx
│   │   │   ├── employees/
│   │   │   │   ├── EmployeesListPage.tsx
│   │   │   │   └── EmployeeDetailPage.tsx
│   │   │   ├── reports/
│   │   │   │   ├── ReportsPage.tsx
│   │   │   │   ├── ProfitLossPage.tsx
│   │   │   │   └── BalanceSheetPage.tsx
│   │   │   └── settings/
│   │   │       └── SettingsPage.tsx
│   │   ├── custom/
│   │   │   └── CustomRequestPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── data/                       # Mock data & seed files
│   │   ├── mockSales.ts
│   │   ├── mockPurchases.ts
│   │   ├── mockProducts.ts
│   │   ├── mockCustomers.ts
│   │   ├── mockSuppliers.ts
│   │   ├── mockExpenses.ts
│   │   ├── mockInvoices.ts
│   │   ├── mockPayments.ts
│   │   └── mockEmployees.ts
│   │
│   ├── store/                      # In-memory state (React Context)
│   │   ├── AppProvider.tsx         # Root provider combining all contexts
│   │   ├── SalesContext.tsx
│   │   ├── PurchasesContext.tsx
│   │   ├── ProductsContext.tsx
│   │   ├── CustomersContext.tsx
│   │   ├── SuppliersContext.tsx
│   │   ├── ExpensesContext.tsx
│   │   ├── InvoicesContext.tsx
│   │   ├── PaymentsContext.tsx
│   │   └── EmployeesContext.tsx
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useSales.ts
│   │   ├── usePurchases.ts
│   │   ├── useProducts.ts
│   │   ├── useCustomers.ts
│   │   ├── useSuppliers.ts
│   │   ├── useExpenses.ts
│   │   ├── useInvoices.ts
│   │   ├── usePayments.ts
│   │   ├── useEmployees.ts
│   │   ├── useSearch.ts            # Generic debounced search hook
│   │   ├── usePagination.ts        # Generic pagination hook
│   │   └── useLocalStorage.ts      # Persist context state to localStorage
│   │
│   ├── utils/                      # Pure utility functions
│   │   ├── currency.ts             # formatCurrency, parseCurrency
│   │   ├── dates.ts                # formatDate, parseDate helpers
│   │   ├── calculations.ts         # totals, tax, profit, balance sheet math
│   │   ├── validators.ts           # Zod schemas (re-exported for forms)
│   │   └── idGenerator.ts          # generateId() using crypto.randomUUID
│   │
│   ├── types/                      # Shared TypeScript interfaces & enums
│   │   ├── index.ts                # Re-exports everything
│   │   ├── sale.ts
│   │   ├── purchase.ts
│   │   ├── product.ts
│   │   ├── customer.ts
│   │   ├── supplier.ts
│   │   ├── expense.ts
│   │   ├── invoice.ts
│   │   ├── payment.ts
│   │   └── employee.ts
│   │
│   ├── constants/
│   │   ├── routes.ts               # Route path constants
│   │   ├── categories.ts           # Expense/product category lists
│   │   └── config.ts               # App-wide config (currency, date format, etc.)
│   │
│   └── styles/
│       └── globals.css             # Tailwind directives + CSS variables
│
├── tests/                          # Test files mirroring src structure
│   ├── components/
│   │   ├── StatCard.test.tsx
│   │   ├── DataTable.test.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── DashboardPage.test.tsx
│   │   ├── SalesListPage.test.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useSearch.test.ts
│   │   └── usePagination.test.ts
│   ├── utils/
│   │   ├── currency.test.ts
│   │   ├── calculations.test.ts
│   │   └── dates.test.ts
│   └── setup.ts                    # Vitest global setup
│
├── docs/
│   ├── PRD.md
│   ├── SPEC.md
│   ├── ARCHITECTURE.md             ← this file
│   ├── PLAN.md
│   ├── TODO.md
│   └── TEST_CASES.md
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.ts
├── postcss.config.js
├── .eslintrc.cjs
├── .gitignore
├── .env.example
└── package.json
```

---

## 5. Data Models (TypeScript Interfaces)

### 5.1 Sale

```typescript
// src/types/sale.ts

export type SaleStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;        // price at time of sale (snapshot)
  discount: number;         // percentage 0–100
  totalPrice: number;       // (unitPrice * quantity) * (1 - discount/100)
}

export interface Sale {
  id: string;
  saleNumber: string;       // e.g. "SL-2024-0001"
  customerId: string;
  customerName: string;     // snapshot
  date: string;             // ISO 8601
  items: SaleItem[];
  subtotal: number;
  taxRate: number;          // percentage
  taxAmount: number;
  discountAmount: number;
  total: number;
  status: SaleStatus;
  paymentMethod: 'cash' | 'card' | 'bank_transfer' | 'cheque';
  notes?: string;
  invoiceId?: string;       // linked invoice if created
  createdAt: string;
  updatedAt: string;
}
```

### 5.2 Purchase

```typescript
// src/types/purchase.ts

export type PurchaseStatus = 'pending' | 'received' | 'partially_received' | 'cancelled';

export interface PurchaseItem {
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface Purchase {
  id: string;
  purchaseNumber: string;   // e.g. "PO-2024-0001"
  supplierId: string;
  supplierName: string;     // snapshot
  date: string;             // ISO 8601
  expectedDeliveryDate?: string;
  items: PurchaseItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: PurchaseStatus;
  paymentStatus: 'unpaid' | 'partially_paid' | 'paid';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### 5.3 Product

```typescript
// src/types/product.ts

export type ProductStatus = 'active' | 'inactive' | 'discontinued';

export interface Product {
  id: string;
  sku: string;              // Stock Keeping Unit
  name: string;
  description?: string;
  category: string;
  unitPrice: number;        // selling price
  costPrice: number;        // purchase/cost price
  stockQuantity: number;
  reorderLevel: number;     // alert when stock falls below this
  unit: string;             // e.g. "pcs", "kg", "liter"
  status: ProductStatus;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
```

### 5.4 Customer

```typescript
// src/types/customer.ts

export type CustomerType = 'individual' | 'business';

export interface Customer {
  id: string;
  customerNumber: string;   // e.g. "CUS-001"
  type: CustomerType;
  name: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  taxId?: string;           // VAT / TIN number
  creditLimit?: number;
  outstandingBalance: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### 5.5 Supplier

```typescript
// src/types/supplier.ts

export interface Supplier {
  id: string;
  supplierNumber: string;   // e.g. "SUP-001"
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  taxId?: string;
  paymentTerms?: string;    // e.g. "Net 30"
  outstandingBalance: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### 5.6 Expense

```typescript
// src/types/expense.ts

export type ExpenseCategory =
  | 'rent'
  | 'utilities'
  | 'salaries'
  | 'marketing'
  | 'travel'
  | 'office_supplies'
  | 'maintenance'
  | 'insurance'
  | 'taxes'
  | 'other';

export type ExpenseStatus = 'pending' | 'approved' | 'rejected' | 'paid';

export interface Expense {
  id: string;
  expenseNumber: string;    // e.g. "EXP-2024-0001"
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;             // ISO 8601
  paidBy?: string;          // employee name / department
  paymentMethod?: 'cash' | 'card' | 'bank_transfer';
  receiptUrl?: string;
  status: ExpenseStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### 5.7 Invoice

```typescript
// src/types/invoice.ts

export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;         // percentage
  totalPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;    // e.g. "INV-2024-0001"
  customerId: string;
  customerName: string;     // snapshot
  customerEmail?: string;
  customerAddress?: string;
  issueDate: string;        // ISO 8601
  dueDate: string;          // ISO 8601
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  amountPaid: number;
  amountDue: number;        // total - amountPaid
  status: InvoiceStatus;
  notes?: string;
  termsAndConditions?: string;
  saleId?: string;          // linked sale if auto-generated
  createdAt: string;
  updatedAt: string;
}
```

### 5.8 Payment

```typescript
// src/types/payment.ts

export type PaymentType = 'incoming' | 'outgoing';
export type PaymentMethod = 'cash' | 'card' | 'bank_transfer' | 'cheque' | 'online';

export interface Payment {
  id: string;
  paymentNumber: string;    // e.g. "PAY-2024-0001"
  type: PaymentType;
  referenceType: 'invoice' | 'purchase' | 'expense' | 'other';
  referenceId?: string;     // ID of the linked document
  referenceNumber?: string; // human-readable reference (e.g. "INV-2024-0001")
  amount: number;
  date: string;             // ISO 8601
  method: PaymentMethod;
  description?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}
```

### 5.9 Employee

```typescript
// src/types/employee.ts

export type EmploymentType = 'full_time' | 'part_time' | 'contractor' | 'intern';
export type EmployeeStatus = 'active' | 'inactive' | 'terminated';

export interface Employee {
  id: string;
  employeeNumber: string;   // e.g. "EMP-001"
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  jobTitle: string;
  employmentType: EmploymentType;
  salary: number;           // monthly gross
  startDate: string;        // ISO 8601
  endDate?: string;         // ISO 8601, if terminated
  status: EmployeeStatus;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## 6. Routing Architecture

```
/                               → LandingPage
/features                       → FeaturesPage
/pricing                        → PricingPage
/contact                        → ContactPage
/custom                         → CustomRequestPage

/demo                           → redirect → /demo/login or /demo/dashboard
/demo/login                     → DemoLoginPage         (role quick-fill & password auth)
/demo/dashboard                 → DashboardPage         (inside AppShell)
/demo/sales                     → SalesListPage
/demo/sales/new                 → NewSalePage
/demo/sales/:id                 → SaleDetailPage
/demo/purchases                 → PurchasesListPage     (Restricted for Cashier)
/demo/purchases/new             → NewPurchasePage
/demo/purchases/:id             → PurchaseDetailPage
/demo/products                  → ProductsListPage
/demo/products/new              → NewProductPage
/demo/products/:id              → ProductDetailPage
/demo/customers                 → CustomersListPage
/demo/customers/:id             → CustomerDetailPage
/demo/suppliers                 → SuppliersListPage     (Restricted for Cashier)
/demo/suppliers/:id             → SupplierDetailPage
/demo/expenses                  → ExpensesListPage      (Restricted for Cashier)
/demo/expenses/new              → NewExpensePage
/demo/invoices                  → InvoicesListPage
/demo/invoices/new              → NewInvoicePage
/demo/invoices/:id              → InvoiceDetailPage
/demo/payments                  → PaymentsListPage
/demo/employees                 → EmployeesListPage     (Admin/Owner only)
/demo/employees/:id             → EmployeeDetailPage
/demo/reports                   → ReportsPage           (Admin/Owner/Accountant)
/demo/reports/profit-loss       → ProfitLossPage
/demo/reports/balance-sheet     → BalanceSheetPage
/demo/settings                  → SettingsPage          (Admin/Owner only)

*                               → NotFoundPage
```

---

## 7. State Management & Ephemeral Preview Architecture

**Decision: React Context + `useReducer` purely in memory (Strictly ZERO persistent storage).**

Rationale:
- **No Data Saved Requirement:** This is strictly an interactive preview and demonstration system. No user changes should persist across browser sessions.
- **Pure In-Memory State:** All state is held in React Context (`SalesContext`, `ProductsContext`, etc.) seeded from pristine initial mock data.
- **Zero LocalStorage/IndexedDB:** No mutations are saved to persistent browser storage.
- **Instant Reset:** Reloading the browser or clicking "Reset Demo" immediately restores the initial seed baseline.
- **RBAC & Auth State:** `AuthContext` holds the active user profile, authenticated role (`Owner`, `Manager`, `Accountant`, `Cashier`), and session tokens in memory only.

**Pattern per context:**

```
MockData → initialState → Context (useReducer in-memory) → Custom Hook → Components
```

Actions per context:
- `ADD_<ENTITY>`
- `UPDATE_<ENTITY>`
- `DELETE_<ENTITY>`
- `RESET_STATE` (reverts immediately to initial seed data)

---

## 8. Form Handling

All forms use **React Hook Form** with **Zod** schemas:

- Zod schema lives in `src/utils/validators.ts` (re-exported per entity).
- `useForm` + `zodResolver` used in every form component.
- Validation is synchronous (no async since there's no backend).
- On submit: call the relevant context action, show a toast notification, navigate away.

---

## 9. Key Architectural Decisions

| Decision | Choice | Reason |
|---|---|---|
| No backend | Mock/localStorage | Demo-only app; no infra needed |
| No global state library | React Context + useReducer | Sufficient for domain-isolated data |
| shadcn/ui | Yes | Accessible, customizable, no styling lock-in |
| Recharts | Yes | Most popular React charting lib, easy API |
| Zod | Yes | Runtime validation + TypeScript inference |
| CSS framework | Tailwind CSS | Utility-first, consistent spacing/colors |
| date-fns | Yes | Tree-shakeable, immutable date helpers |
| localStorage | Optional persistence | Lets users see their changes survive refresh |
| No auth | None | It's a demo—any visitor can interact with data |
| No i18n | English only (MVP) | Out of scope for MVP |

---

## 10. Security Considerations

- No sensitive data is stored or transmitted.
- No `.env` secrets (no backend keys needed).
- All user inputs are validated via Zod before being applied to state.
- No `dangerouslySetInnerHTML` usage.
- Invoice preview renders plain React elements (no raw HTML injection).

---

*Last updated: Phase 0 — Project Initialization*
