import React, { createContext, useContext, useState } from 'react';
import { User, Role, Permission, ROLE_PERMISSIONS, DemoAccount } from '@/types/auth';

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    user: {
      id: 'usr-1',
      name: 'Alexander Hayes',
      email: 'owner@apexledger.demo',
      role: 'owner',
      branch: 'Headquarters (HQ)',
    },
    passwordHint: 'admin123',
    passwordHash: 'admin123',
    roleLabel: 'Owner / Super Admin',
    description: 'Full unhindered access to all 14 modules, financial statements, and system settings.',
  },
  {
    user: {
      id: 'usr-2',
      name: 'Samantha Reed',
      email: 'manager@apexledger.demo',
      role: 'manager',
      branch: 'North Retail Branch',
    },
    passwordHint: 'manager123',
    passwordHash: 'manager123',
    roleLabel: 'Branch Manager',
    description: 'Operational control over Sales, Purchases, Inventory, CRM, and Expenses.',
  },
  {
    user: {
      id: 'usr-3',
      name: 'David Chen, CPA',
      email: 'accountant@apexledger.demo',
      role: 'accountant',
      branch: 'Finance Department',
    },
    passwordHint: 'accountant123',
    passwordHash: 'accountant123',
    roleLabel: 'Head Accountant',
    description: 'Direct access to General Ledger, P&L, Invoicing, Tax, and Cash Flow analytics.',
  },
  {
    user: {
      id: 'usr-4',
      name: 'Maya Lin',
      email: 'cashier@apexledger.demo',
      role: 'cashier',
      branch: 'POS Terminal #02',
    },
    passwordHint: 'cashier123',
    passwordHash: 'cashier123',
    roleLabel: 'Cashier / POS Staff',
    description: 'Restricted sales checkout, customer lookup, and invoice printing view.',
  },
];

interface AuthContextType {
  user: User | null;
  role: Role | null;
  permissions: Permission | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  loginAsRole: (role: Role) => void;
  logout: () => void;
  hasPermission: (module: keyof Permission) => boolean;
  activeAccount: DemoAccount;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Purely in-memory React state (zero persistence to localStorage per strict preview requirement)
  const [user, setUser] = useState<User | null>(DEMO_ACCOUNTS[0].user); // Defaults to Owner for instant demo access
  const [activeAccount, setActiveAccount] = useState<DemoAccount>(DEMO_ACCOUNTS[0]);

  const role = user ? user.role : null;
  const permissions = role ? ROLE_PERMISSIONS[role] : null;

  const login = (email: string, password: string) => {
    const account = DEMO_ACCOUNTS.find((acc) => acc.user.email.toLowerCase() === email.toLowerCase());

    if (!account) {
      return { success: false, error: 'Account not found. Please choose a demo role account.' };
    }

    if (password !== account.passwordHash) {
      return { success: false, error: 'Invalid password for this account. Use the documented password hint.' };
    }

    setUser(account.user);
    setActiveAccount(account);
    return { success: true };
  };

  const loginAsRole = (targetRole: Role) => {
    const account = DEMO_ACCOUNTS.find((acc) => acc.user.role === targetRole) || DEMO_ACCOUNTS[0];
    setUser(account.user);
    setActiveAccount(account);
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (module: keyof Permission): boolean => {
    if (!role) return false;
    return !!ROLE_PERMISSIONS[role][module];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        permissions,
        isAuthenticated: !!user,
        login,
        loginAsRole,
        logout,
        hasPermission,
        activeAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
