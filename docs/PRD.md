# Product Requirements Document (PRD)
## Accounting Software Showcase & Custom Software Platform

**Version:** 1.0  
**Date:** 2026-10-07  
**Status:** Draft

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Target Users](#2-target-users)
3. [Business Goals](#3-business-goals)
4. [Core Features](#4-core-features)
5. [User Stories](#5-user-stories)
6. [Out of Scope](#6-out-of-scope)
7. [Success Criteria](#7-success-criteria)
8. [Demo Data Strategy](#8-demo-data-strategy)
9. [Website Pages](#9-website-pages)
10. [Demo App Modules](#10-demo-app-modules)

---

## 1. Problem Statement

Small and medium-sized businesses, freelancers, retail shops, and service companies across the Arabic-speaking world and beyond struggle with a common set of operational problems:

- They rely on paper-based bookkeeping, disconnected spreadsheets, or generic tools that don't match their workflow.
- Off-the-shelf accounting software is often too expensive, too complex, or designed for Western markets with irrelevant features.
- Business owners lack visibility into real-time financial health: cash flow, outstanding invoices, inventory levels, and profit/loss.
- Hiring accountants or finance staff is prohibitively expensive for small operations.
- Customization of existing software is either impossible or costs tens of thousands of dollars.

There is a clear market need for a modern, approachable, affordable accounting and business-management software that can be tailored to the specific needs of each business — and a need for a compelling way to showcase that software to potential buyers before they commit.

This platform solves both problems: it presents a fully functional interactive demo of the software so prospects can explore every feature risk-free, and it provides a clear, trustworthy path for them to request a version customized exactly for their business.

---

## 2. Target Users

### 2.1 Primary Segments

| Segment | Description | Key Pain Points |
|---|---|---|
| **Small Business Owners** | Businesses with 1–20 employees in retail, trade, or services | No financial visibility, manual invoicing, inventory chaos |
| **Freelancers & Consultants** | Independent professionals: designers, engineers, lawyers, coaches | Invoice tracking, expense management, client payment follow-up |
| **Retail Shop Owners** | Physical or online shops selling products | Inventory management, supplier tracking, POS-style sales |
| **Service Companies** | Cleaning, maintenance, delivery, catering, agencies | Job costing, employee tracking, recurring billing |
| **Medium-Sized Businesses** | 20–200 employees, multiple departments | Multi-user access, roles and permissions, detailed reporting |

### 2.2 Secondary Segments

- **Accountants and Bookkeepers** who manage books for multiple clients and want to recommend a modern tool.
- **Business Consultants** evaluating software for their clients.
- **Investors / Partners** assessing the product's capabilities.

### 2.3 User Personas

**Persona 1 — Ahmad, Retail Shop Owner (37)**  
Runs a mid-sized electronics shop with 5 employees. Currently tracks sales in a notebook and uses WhatsApp to order from suppliers. Struggles with knowing his exact profit at month-end and often runs out of stock on fast-moving items. Wants a simple system to manage sales, inventory, and supplier payments.

**Persona 2 — Sara, Freelance Graphic Designer (28)**  
Works with 10–15 clients per month. Sends PDF invoices manually. Loses track of who has paid and who hasn't. Needs invoice tracking, expense logging, and a simple income report.

**Persona 3 — Khalid, Restaurant Chain Manager (45)**  
Manages 3 locations with 40 employees. Needs multi-branch reporting, employee payroll visibility, supplier management, and P&L per location. Currently uses a mix of Excel and a legacy system.

**Persona 4 — Nour, Cleaning Services Company Owner (33)**  
Provides B2B cleaning contracts. Needs to track recurring invoices, client balances, employee assignments, and expenses. Currently does everything manually.

---

## 3. Business Goals

### 3.1 Primary Goals

1. **Generate qualified leads** — Capture contact information from potential customers who have experienced the demo and are ready to discuss a custom solution.
2. **Establish credibility** — Demonstrate technical capability and professionalism through a polished, fully functional demo application.
3. **Reduce sales cycle friction** — Let prospects self-qualify by exploring all modules before speaking to a sales representative.
4. **Communicate value clearly** — Show the breadth of features and the depth of customization available through the "How It Works" and "Custom Software" pages.

### 3.2 Secondary Goals

5. **Build brand authority** — Position the company as a trusted software partner for SMBs in the region.
6. **Support SEO growth** — Create content-rich pages that rank for relevant keywords (accounting software, business management software, invoicing software, etc.).
7. **Minimize support burden** — Provide a comprehensive FAQ and clear documentation so prospects understand the product without needing to contact support.
8. **Enable scalability** — The custom software request form and CRM integration should allow the team to handle high lead volume without manual effort.

### 3.3 Key Business Metrics

- Number of demo sessions per week
- Custom software request form submissions per week
- Contact form submissions per week
- Time on demo (average session duration)
- Module engagement rate (which modules are visited most)
- Bounce rate on landing page
- Lead-to-call conversion rate

---

## 4. Core Features

### 4.1 Marketing Website Features

| # | Feature | Priority |
|---|---|---|
| W1 | Hero section with animated stats and primary CTA | P0 |
| W2 | Features overview section with icons and descriptions | P0 |
| W3 | Interactive demo access (prominent CTA) | P0 |
| W4 | "How It Works" step-by-step section | P0 |
| W5 | Custom Software Request form | P0 |
| W6 | Testimonials / social proof section | P1 |
| W7 | Contact form with email notification | P0 |
| W8 | FAQ page with accordion | P1 |
| W9 | Privacy Policy, Terms & Conditions, Disclaimer pages | P0 |
| W10 | 404 error page with navigation | P1 |
| W11 | SEO meta tags, Open Graph, structured data | P0 |
| W12 | Fully responsive design (mobile-first) | P0 |
| W13 | RTL language support (Arabic) | P1 |
| W14 | Dark mode support | P2 |
| W15 | Cookie consent banner | P1 |

### 4.2 Demo Application Features

| # | Feature | Priority |
|---|---|---|
| D1 | Dashboard with KPI cards and charts | P0 |
| D2 | Sales management (CRUD, search, filter) | P0 |
| D3 | Purchases management | P0 |
| D4 | Products & catalog management | P0 |
| D5 | Inventory tracking and stock alerts | P0 |
| D6 | Customer management with history | P0 |
| D7 | Supplier management | P0 |
| D8 | Expense tracking with categories | P0 |
| D9 | Invoice creation, preview, and demo print | P0 |
| D10 | Payment recording and tracking | P0 |
| D11 | Employee management and role simulation | P1 |
| D12 | Reports (sales, purchases, expenses, P&L, inventory) | P0 |
| D13 | Accounting summary (simplified ledger) | P1 |
| D14 | Settings panel (business info, currency, tax, appearance) | P1 |
| D15 | Sidebar navigation with collapse | P0 |
| D16 | Mobile-responsive demo layout | P0 |
| D17 | Demo badge / banner indicating demo mode | P0 |
| D18 | Demo data reset capability | P1 |

---

## 5. User Stories

### 5.1 Marketing Website Stories

**US-001 — Hero engagement**  
As a first-time visitor, I want to immediately understand what this product does and why it matters for my business, so that I can decide in under 10 seconds whether it's worth exploring further.  
*Acceptance: Hero loads within 2s, headline is clear, CTA is visible above the fold on all screen sizes.*

**US-002 — Features discovery**  
As a potential customer, I want to see a comprehensive list of features organized by category, so that I can quickly assess whether this software covers my specific business needs.  
*Acceptance: Features section lists all modules with icons, names, and one-sentence descriptions, organized into logical groups.*

**US-003 — Demo access**  
As a curious prospect, I want to click a button and immediately access a working demo of the software without signing up or providing personal information, so that I can evaluate it without friction.  
*Acceptance: "Try the Demo" CTA navigates to /demo/dashboard. No login or email required.*

**US-004 — Understanding customization**  
As a business owner with specific needs, I want to understand how the custom software process works (steps, timeline, what's included), so that I can decide whether to request a quote.  
*Acceptance: "How It Works" section displays at least 4 clear numbered steps with icons and descriptions.*

**US-005 — Requesting custom software**  
As a business owner ready to move forward, I want to fill out a detailed form describing my business and requirements, so that the team can prepare a relevant, personalized proposal.  
*Acceptance: Form is accessible at /custom-software, has all required fields, validates inputs, and shows a success message after submission.*

**US-006 — Contacting the team**  
As a prospect with a quick question, I want to send a short message via a contact form without needing to open my email client, so that I can get answers quickly.  
*Acceptance: Contact form at /contact submits successfully and shows confirmation message.*

**US-007 — Reading answers to common questions**  
As a skeptical prospect, I want to read answers to common questions about the software, pricing, customization, and support, so that I can address my concerns before deciding to reach out.  
*Acceptance: FAQ page at /faq has at least 15 Q&A items organized in an accordion with categories.*

**US-008 — Legal compliance**  
As a privacy-conscious user, I want to read how my data is collected and used, so that I can trust the platform with my personal information.  
*Acceptance: Privacy Policy and Terms pages exist and are linked from the footer.*

**US-009 — Mobile browsing**  
As a business owner browsing on my phone, I want the entire website to look and function perfectly on a small screen, so that I can explore the product on the go.  
*Acceptance: All pages are fully responsive. No horizontal scrolling. Touch targets are at least 44×44px.*

**US-010 — Social proof**  
As a skeptical visitor, I want to read testimonials from other business owners who have used this software, so that I can trust the product is real and effective.  
*Acceptance: Testimonials section on the home page shows at least 3 cards with name, business type, photo/avatar, and quote.*

### 5.2 Demo Application Stories

**US-011 — Dashboard overview**  
As a business owner using the demo, I want to see key business metrics at a glance (revenue, expenses, outstanding invoices, inventory alerts), so that I can understand the value of real-time financial visibility.  
*Acceptance: Dashboard shows at least 6 KPI cards with icons, values, and trend indicators, plus charts and recent activity tables.*

**US-012 — Recording a sale**  
As a sales user in the demo, I want to add a new sale by selecting a customer, adding products, and setting payment terms, so that I can see how the sales workflow would work in my real business.  
*Acceptance: "Add Sale" modal opens, fields are validated, sale appears in the list after submission, and dashboard revenue updates.*

**US-013 — Managing inventory**  
As a shop owner in the demo, I want to see current stock levels for all products, get visual warnings for low-stock items, and simulate a stock adjustment, so that I can understand how inventory control works.  
*Acceptance: Products list shows stock quantity with color-coded indicators (green/yellow/red). Low-stock items are filterable. Stock adjustment modal works.*

**US-014 — Viewing a customer's profile**  
As a user in the demo, I want to click on a customer and see their full profile including contact details, total purchases, outstanding balance, and transaction history, so that I can understand CRM capabilities.  
*Acceptance: Customer detail page loads with all sub-sections populated from demo data.*

**US-015 — Creating and previewing an invoice**  
As a user in the demo, I want to create an invoice, see a professional print-ready preview, and click a "Print" or "Download PDF" button (demo-mode placeholder), so that I can evaluate invoicing capabilities.  
*Acceptance: Invoice builder works, preview renders a formatted invoice, and the demo PDF button shows a friendly "Available in your custom version" message.*

**US-016 — Tracking expenses**  
As a business owner in the demo, I want to add an expense, assign it to a category, and see a chart showing expense breakdown by category, so that I can understand expense management.  
*Acceptance: Add Expense form works. Expense chart updates after adding. Categories are selectable from a preset list.*

**US-017 — Viewing financial reports**  
As a manager in the demo, I want to generate a Profit & Loss report for a custom date range and see it rendered as a table and chart, so that I can assess the reporting capabilities.  
*Acceptance: Reports page has P&L, Sales, Expenses, and Inventory reports. Date range filter applies. Data renders in both table and chart form.*

**US-018 — Simulating employee roles**  
As an HR manager in the demo, I want to view the list of employees, see their roles (Owner, Manager, Accountant, Cashier), and understand what access level each role has, so that I can evaluate multi-user permission capabilities.  
*Acceptance: Employees page lists demo employees with roles. Clicking a role shows a permission matrix.*

**US-019 — Navigating on mobile**  
As a prospect checking the demo on a smartphone, I want the demo application to work fully on my phone with a mobile-friendly navigation (hamburger menu or bottom bar), so that I can explore all features without needing a desktop.  
*Acceptance: Demo sidebar collapses to a hamburger menu on mobile. All pages are usable on a 375px wide screen.*

**US-020 — Exploring accounting summary**  
As an accountant or finance-minded user in the demo, I want to see a simplified accounting view with income, expenses, accounts receivable, accounts payable, and a cash flow summary, so that I can evaluate the accounting depth.  
*Acceptance: Accounting module shows at minimum: income total, expense total, AR total, AP total, net cash flow, and a basic P&L chart.*

**US-021 — Exploring settings**  
As a business owner in the demo, I want to explore the settings panel to see what can be configured (business name, logo, currency, tax rates, invoice templates, user roles), so that I can understand the level of customization available.  
*Acceptance: Settings page has at least 6 sections. Fields are interactive (even if they reset on page reload in demo mode).*

**US-022 — Viewing purchase orders**  
As a procurement manager in the demo, I want to view and create purchase orders, link them to suppliers, and see their status (Pending, Received, Cancelled), so that I can assess purchasing workflow.  
*Acceptance: Purchases list shows orders with supplier, date, amount, and status badge. Add Purchase modal works.*

**US-023 — Payment recording**  
As a cashier in the demo, I want to record a payment against an invoice and see the invoice status update from "Unpaid" to "Paid" or "Partial", so that I can understand the payment tracking system.  
*Acceptance: Record Payment modal appears on invoice or payment page. Invoice status updates after payment is recorded.*

**US-024 — Searching and filtering**  
As a user with a growing dataset in the demo, I want to search for a specific record (customer, product, invoice) and apply filters to narrow down lists, so that I can evaluate usability at scale.  
*Acceptance: Every list/table has a search input. At least 2 filters per module. Results update in real time (or on submit).*

**US-025 — Demo reset**  
As a user who has made many changes in the demo, I want to reset all demo data back to its original state with a single click, so that I can start fresh without reloading the page.  
*Acceptance: "Reset Demo Data" button in Settings or a global banner resets all in-memory state to initial demo data.*

---

## 6. Out of Scope

The following items are explicitly **not** part of this project:

| # | Item | Reason |
|---|---|---|
| OS-1 | Real backend / database (server-side persistence) | Demo is client-side only; real data storage belongs to the custom software product |
| OS-2 | Real user authentication and login | Demo is public and requires no login; security belongs to custom deployments |
| OS-3 | Real PDF generation and download | Requires server; demo shows a placeholder message |
| OS-4 | Real email delivery from contact/request forms | Backend integration deferred; forms show success UI only (or use a static form service) |
| OS-5 | Payment gateway integration | Not a showcase requirement; demo shows payment recording UI only |
| OS-6 | Multi-language support beyond Arabic/English | Only Arabic and English RTL/LTR switching in scope |
| OS-7 | Real-time collaboration / multi-user demo sessions | Each visitor has an isolated in-browser demo instance |
| OS-8 | Mobile app (iOS/Android) | Web only |
| OS-9 | Offline support / PWA | Not required for the showcase |
| OS-10 | CRM or ERP integration | Belongs to custom software implementations |
| OS-11 | Payroll calculation engine | Employees module shows structure only; payroll math not implemented |
| OS-12 | Bank feed / reconciliation | Accounting module is simplified; no bank integration |
| OS-13 | Tax filing or government portal integration | Out of scope for showcase |
| OS-14 | Multi-currency real-time conversion | Settings supports currency choice but no live exchange rates |
| OS-15 | A/B testing infrastructure | Nice to have but not required at launch |

---

## 7. Success Criteria

### 7.1 Launch Criteria (must be true to go live)

- [ ] All 10 website pages are complete, responsive, and accessible (WCAG 2.1 AA).
- [ ] All 14 demo app modules are navigable and populated with realistic demo data.
- [ ] Custom Software Request form submits and shows a success state.
- [ ] Contact form submits and shows a success state.
- [ ] Lighthouse score ≥ 90 for Performance, Accessibility, Best Practices, and SEO on all major pages.
- [ ] No JavaScript errors on page load in Chrome, Firefox, and Safari.
- [ ] All pages render correctly on 375px, 768px, 1024px, and 1440px widths.
- [ ] Privacy Policy and Terms of Service pages are complete.
- [ ] 404 page is implemented and tested.
- [ ] Git history is clean and all code is committed.

### 7.2 Post-Launch Success Metrics (measured after 30 days)

| Metric | Target |
|---|---|
| Average demo session duration | ≥ 3 minutes |
| Demo module engagement (pages visited per session) | ≥ 4 modules |
| Custom software form submissions | ≥ 10 per week |
| Landing page bounce rate | ≤ 55% |
| Lighthouse Performance score | ≥ 90 |
| Accessibility score | ≥ 90 |
| Mobile traffic that completes demo visit | ≥ 40% of mobile visitors |

---

## 8. Demo Data Strategy

### 8.1 Principles

- All demo data must be **realistic but fictional** — real-looking names, amounts, dates, and products that tell a coherent business story.
- The demo should simulate a **healthy, growing mid-sized business** so users see a rich dataset, not an empty or trivially small one.
- All data is stored **in-memory (JavaScript module/store)** and is reset on page load or by a manual reset action.
- Demo data should be **internally consistent**: customers referenced in sales must exist in the customer list, products in invoices must exist in the product catalog, etc.

### 8.2 Demo Business Profile

- **Business name:** Horizon Trading Co.
- **Industry:** Mixed retail and wholesale (electronics and accessories)
- **Location:** Cairo, Egypt (or adjustable in Settings)
- **Currency:** Egyptian Pound (EGP) by default
- **Period covered by data:** Last 12 months of transactions

### 8.3 Dataset Sizes

| Entity | Count |
|---|---|
| Customers | 25 |
| Suppliers | 10 |
| Products | 40 |
| Sales orders | 60 |
| Purchase orders | 30 |
| Invoices | 50 |
| Payments | 45 |
| Expenses | 35 |
| Employees | 8 |
| Expense categories | 8 |

### 8.4 Data Coherence Rules

1. Every sales order references a valid customer from the customer list.
2. Every purchase order references a valid supplier from the supplier list.
3. Every invoice is linked to a sales order or a customer.
4. Inventory quantities are consistent with initial stock + purchases - sales.
5. Payment amounts match or partially match invoice amounts (to show both paid and unpaid states).
6. Expense dates fall within the last 12 months and are spread evenly across months.
7. At least 3 products are below the minimum stock threshold (to demonstrate stock alerts).
8. At least 5 invoices are overdue (due date in the past, status = Unpaid) to show AR aging.
9. Employee roles cover all 5 roles: Owner × 1, Manager × 1, Accountant × 1, Cashier × 2, Employee × 3.

### 8.5 Data Seeding

- Demo data is defined in a single seed file: `src/data/seed.js` (or `seed.ts`).
- The app initializes its state store from this seed file on load.
- CRUD operations in the demo mutate in-memory state only (no persistence).
- A "Reset Demo" action re-initializes state from the seed file.

---

## 9. Website Pages

| Route | Page Name | Purpose |
|---|---|---|
| `/` | Home | Landing page: hero, features overview, how it works, testimonials, CTA |
| `/features` | Features | Detailed feature list organized by module/category |
| `/demo` | Interactive Demo | Redirect to `/demo/dashboard` or demo landing page |
| `/demo/*` | Demo App | Full embedded demo application (all module routes) |
| `/how-it-works` | How It Works | Step-by-step explanation of the custom software process |
| `/custom-software` | Custom Software | Custom software request form and benefits |
| `/contact` | Contact | Contact form and business contact information |
| `/faq` | FAQ | Accordion-style frequently asked questions |
| `/privacy-policy` | Privacy Policy | Full legal privacy policy |
| `/terms` | Terms & Conditions | Full terms of service |
| `/disclaimer` | Disclaimer | Legal disclaimer |
| `*` | 404 | Not found page with navigation back to home |

---

## 10. Demo App Modules

| Route | Module | Key Capabilities |
|---|---|---|
| `/demo/dashboard` | Dashboard | KPI cards, revenue/expense charts, recent sales, low-stock alerts |
| `/demo/sales` | Sales | Sales order list, CRUD, search/filter, status badges |
| `/demo/purchases` | Purchases | Purchase order list, CRUD, supplier linking, status |
| `/demo/products` | Products | Product catalog, categories, pricing, stock display |
| `/demo/inventory` | Inventory | Stock levels, adjustments, low-stock warnings, history |
| `/demo/customers` | Customers | Customer list, profile view, purchase history, balance |
| `/demo/suppliers` | Suppliers | Supplier list, profile view, purchase history, balance |
| `/demo/expenses` | Expenses | Expense list, categories, category chart, CRUD |
| `/demo/invoices` | Invoices | Invoice list, builder, preview, demo print/PDF |
| `/demo/payments` | Payments | Payment list, record payment, link to invoice |
| `/demo/employees` | Employees | Employee list, roles, permission matrix |
| `/demo/reports` | Reports | Sales report, P&L, expense report, inventory report |
| `/demo/accounting` | Accounting | Income, expenses, AR, AP, cash flow, simplified ledger |
| `/demo/settings` | Settings | Business info, currency, tax, invoice, users, appearance |
