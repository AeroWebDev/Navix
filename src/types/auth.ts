export type Role = 'owner' | 'manager' | 'accountant' | 'cashier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  branch?: string;
}

export interface Permission {
  dashboard: boolean;
  sales: boolean;
  purchases: boolean;
  products: boolean;
  inventory: boolean;
  customers: boolean;
  suppliers: boolean;
  expenses: boolean;
  invoices: boolean;
  payments: boolean;
  employees: boolean;
  reports: boolean;
  accounting: boolean;
  settings: boolean;
}

export const ROLE_PERMISSIONS: Record<Role, Permission> = {
  owner: {
    dashboard: true,
    sales: true,
    purchases: true,
    products: true,
    inventory: true,
    customers: true,
    suppliers: true,
    expenses: true,
    invoices: true,
    payments: true,
    employees: true,
    reports: true,
    accounting: true,
    settings: true,
  },
  manager: {
    dashboard: true,
    sales: true,
    purchases: true,
    products: true,
    inventory: true,
    customers: true,
    suppliers: true,
    expenses: true,
    invoices: true,
    payments: true,
    employees: true,
    reports: true,
    accounting: false,
    settings: false,
  },
  accountant: {
    dashboard: true,
    sales: true,
    purchases: true,
    products: false,
    inventory: false,
    customers: true,
    suppliers: true,
    expenses: true,
    invoices: true,
    payments: true,
    employees: false,
    reports: true,
    accounting: true,
    settings: false,
  },
  cashier: {
    dashboard: true,
    sales: true,
    purchases: false,
    products: false,
    inventory: false,
    customers: true,
    suppliers: false,
    expenses: false,
    invoices: true,
    payments: true,
    employees: false,
    reports: false,
    accounting: false,
    settings: false,
  },
};

export interface DemoAccount {
  user: User;
  passwordHint: string;
  passwordHash: string; // Plain password for demo check
  roleLabel: string;
  description: string;
}
