# Project Requirements & Assumptions Document (PROJECT_REQUIREMENTS.md)

**Project:** Production-Ready Accounting Software Showcase & Custom Software Platform  
**Version:** 1.0  
**Date:** 2026-10-07  
**Status:** Approved for Implementation  

---

## 1. Project Purpose & Scope

This project is a high-polish, production-ready showcase platform and interactive application prototype for commercial accounting and ERP software. It serves two core business objectives:

1. **Interactive Product Experience:** Allows prospective clients (SMEs, retail operators, freelancers, service enterprises) to test a functional, realistic accounting system in their browser or via a local desktop installer.
2. **Custom Software Lead Generation:** Provides an intake engine for businesses requiring customized accounting and ERP implementations tailored to their specific tax regulations, branches, and workflows.

---

## 2. Requirements Matrix & Gap Analysis

Where business or implementation specifics were open, sensible production assumptions were made to prevent blocking development:

| Item | Requirement Area | Missing/Open Information | Why Needed | Possible Options | Recommended & Selected Option | Current Working Assumption |
|---|---|---|---|---|---|---|
| **REQ-01** | Primary Currency & Regional Formats | Specific domestic currency (USD, SAR, AED, EUR, GBP, EGP) | Financial formatting across tables, charts, invoices | 1. Hardcode USD<br>2. Hardcode local currency<br>3. Dynamic currency switcher in Settings | Dynamic currency setting with USD ($) default, switchable to SAR (ر.س), AED (د.إ), EUR (€), GBP (£) | Defaults to USD ($) with multi-currency toggle in Settings |
| **REQ-02** | Contact & Business Entity Details | Real business phone, WhatsApp number, and office address | Contact page, footer, invoice headers | 1. Generic placeholder text<br>2. Realistic demo business entity details | Realistic professional software agency entity ("Apex Ledger Solutions") with clear demo badge | Uses "Apex Ledger Solutions" / demo WhatsApp action trigger |
| **REQ-03** | Print & PDF Generation Mechanism | Server-side PDF engine vs Client-side HTML/Canvas rendering | Invoice and report downloading | 1. Backend headless Chromium<br>2. Client-side `@media print` CSS engine<br>3. jsPDF library | Dedicated `@media print` styling + browser print dialog integration | Native browser print dialog triggers cleanly formatted printable invoices |
| **REQ-04** | Desktop Installer Strategy | Format for desktop distribution | Offline and local evaluation by potential clients | 1. Heavy Electron bundle<br>2. Automated Windows Batch/PowerShell installer + local production server | Automated Windows One-Click Installer script (`install.bat` + `installer.ps1`) | Installer script compiles production assets, registers desktop shortcut, and runs local server |
| **REQ-05** | Form Submission Endpoints | Live CRM / Email webhook URL | Lead intake on Custom Software & Contact pages | 1. Fails without external API<br>2. Local simulation with toast feedback and exportable JSON | Client-side validation with rich success modals, simulated delay, and local storage retention | Forms validate with Zod and save lead submissions locally for demonstration |
| **REQ-06** | Accounting Standard Compliance | IFRS / GAAP certification status | Financial disclaimer and compliance wording | 1. Imply certified accounting<br>2. Explicit disclaimer of demo prototype | Prominent disclaimer on financial statements stating prototype nature and custom compliance options | Prominent banner indicates demo interface customizable for local tax authorities (ZATCA, HMRC, IRS) |
| **REQ-07** | Preview Data Persistence | Client wants preview only without saving data | Guaranteeing pure preview simulation without persistent side effects | 1. LocalStorage saving<br>2. Pure in-memory React state (ephemeral session) | Zero persistent storage in localStorage or IndexedDB. All mutations stay in React memory and reset on reload. | Completely in-memory state. "Reset Demo" button and page refresh reset state immediately to clean baseline. |
| **REQ-08** | Demo Authentication & RBAC | Realistic login portal and role permission system | Showing multi-role enterprise security to prospective clients | 1. Open unrestricted demo<br>2. Interactive role login with password check | Multi-role demo login portal (`/demo/login`) with password verification and 4 distinct roles (Owner, Manager, Accountant, Cashier) | Interactive login with 4 predefined role accounts, verified passwords, and active route/feature access enforcement |

---

## 3. Installer Architecture

Per project requirements, an installer is included to package and run the application locally or distribute to clients on Windows:

1. **Batch Installer (`install.bat`):**
   - Checks if Node.js is installed.
   - Installs project dependencies.
   - Builds the production release.
   - Generates a `run-app.bat` desktop launcher.
2. **PowerShell Setup Script (`scripts/installer.ps1`):**
   - Configures local port binding.
   - Creates a Windows Desktop shortcut icon.
   - Launches default web browser directly to the local production preview.
3. **Download Package:**
   - Prepares a clean zip-ready bundle for offline execution.
