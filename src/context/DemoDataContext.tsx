import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Sale,
  Purchase,
  Product,
  Customer,
  Supplier,
  Expense,
  Invoice,
  Payment,
  Employee,
} from '@/types';
import {
  MOCK_SALES,
  MOCK_PURCHASES,
  MOCK_PRODUCTS,
  MOCK_CUSTOMERS,
  MOCK_SUPPLIERS,
  MOCK_EXPENSES,
  MOCK_INVOICES,
  MOCK_PAYMENTS,
  MOCK_EMPLOYEES,
} from '@/data';

export interface DemoDataContextType {
  // Sales
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id'>) => Sale;
  updateSale: (id: string, updates: Partial<Sale>) => void;
  deleteSale: (id: string) => void;

  // Purchases
  purchases: Purchase[];
  addPurchase: (purchase: Omit<Purchase, 'id'>) => Purchase;
  updatePurchase: (id: string, updates: Partial<Purchase>) => void;
  deletePurchase: (id: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  adjustStock: (id: string, deltaQuantity: number, reason: string) => void;

  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => Customer;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Suppliers
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id'>) => Supplier;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;

  // Expenses
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => Expense;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;

  // Invoices
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id'>) => Invoice;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  recordPaymentForInvoice: (invoiceId: string, amount: number, method: string) => void;

  // Payments
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'>) => Payment;
  updatePayment: (id: string, updates: Partial<Payment>) => void;
  deletePayment: (id: string) => void;

  // Employees
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => Employee;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;

  // Global In-Memory Reset
  resetAllData: () => void;
}

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

export const DemoDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Pure in-memory React state (Zero localStorage / Zero IndexedDB)
  const [sales, setSales] = useState<Sale[]>(MOCK_SALES);
  const [purchases, setPurchases] = useState<Purchase[]>(MOCK_PURCHASES);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);

  // Sales CRUD
  const addSale = (saleData: Omit<Sale, 'id'>): Sale => {
    const newSale: Sale = {
      ...saleData,
      id: `sale-${Date.now()}`,
    };
    setSales((prev) => [newSale, ...prev]);

    // Also deduct product stock in memory
    newSale.items.forEach((item) => {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === item.productId) {
            const newQty = Math.max(0, p.stockQuantity - item.quantity);
            const status = newQty === 0 ? 'out_of_stock' : newQty <= p.minStockLevel ? 'low_stock' : 'in_stock';
            return { ...p, stockQuantity: newQty, status };
          }
          return p;
        })
      );
    });

    return newSale;
  };

  const updateSale = (id: string, updates: Partial<Sale>) => {
    setSales((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSale = (id: string) => {
    setSales((prev) => prev.filter((s) => s.id !== id));
  };

  // Purchases CRUD
  const addPurchase = (purchaseData: Omit<Purchase, 'id'>): Purchase => {
    const newPurchase: Purchase = {
      ...purchaseData,
      id: `po-${Date.now()}`,
    };
    setPurchases((prev) => [newPurchase, ...prev]);
    return newPurchase;
  };

  const updatePurchase = (id: string, updates: Partial<Purchase>) => {
    setPurchases((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deletePurchase = (id: string) => {
    setPurchases((prev) => prev.filter((p) => p.id !== id));
  };

  // Products CRUD
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          const status =
            updated.stockQuantity === 0
              ? 'out_of_stock'
              : updated.stockQuantity <= updated.minStockLevel
              ? 'low_stock'
              : 'in_stock';
          return { ...updated, status };
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const adjustStock = (id: string, deltaQuantity: number, _reason: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newQty = Math.max(0, p.stockQuantity + deltaQuantity);
          const status = newQty === 0 ? 'out_of_stock' : newQty <= p.minStockLevel ? 'low_stock' : 'in_stock';
          return { ...p, stockQuantity: newQty, status };
        }
        return p;
      })
    );
  };

  // Customers CRUD
  const addCustomer = (customerData: Omit<Customer, 'id'>): Customer => {
    const newCustomer: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`,
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    return newCustomer;
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  // Suppliers CRUD
  const addSupplier = (supplierData: Omit<Supplier, 'id'>): Supplier => {
    const newSupplier: Supplier = {
      ...supplierData,
      id: `sup-${Date.now()}`,
    };
    setSuppliers((prev) => [newSupplier, ...prev]);
    return newSupplier;
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  // Expenses CRUD
  const addExpense = (expenseData: Omit<Expense, 'id'>): Expense => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
    };
    setExpenses((prev) => [newExpense, ...prev]);
    return newExpense;
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // Invoices CRUD
  const addInvoice = (invoiceData: Omit<Invoice, 'id'>): Invoice => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `inv-${Date.now()}`,
    };
    setInvoices((prev) => [newInvoice, ...prev]);
    return newInvoice;
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, ...updates } : inv)));
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const recordPaymentForInvoice = (invoiceId: string, amount: number, method: string) => {
    const targetInvoice = invoices.find((inv) => inv.id === invoiceId);
    if (!targetInvoice) return;

    // Update invoice status
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: 'paid',
              paidDate: new Date().toISOString().split('T')[0],
              paymentMethod: method,
            }
          : inv
      )
    );

    // Record incoming payment
    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      paymentNumber: `PAY-${Date.now().toString().slice(-6)}`,
      direction: 'inflow',
      partyName: targetInvoice.customerName,
      relatedDocumentType: 'invoice',
      relatedDocumentNumber: targetInvoice.invoiceNumber,
      amount,
      date: new Date().toISOString().split('T')[0],
      paymentMode: (method.toLowerCase().includes('card')
        ? 'credit_card'
        : method.toLowerCase().includes('cash')
        ? 'cash'
        : 'bank_transfer'),
      status: 'completed',
      notes: `Recorded payment for ${targetInvoice.invoiceNumber}`,
    };
    setPayments((prev) => [newPayment, ...prev]);
  };

  // Payments CRUD
  const addPayment = (paymentData: Omit<Payment, 'id'>): Payment => {
    const newPayment: Payment = {
      ...paymentData,
      id: `pay-${Date.now()}`,
    };
    setPayments((prev) => [newPayment, ...prev]);
    return newPayment;
  };

  const updatePayment = (id: string, updates: Partial<Payment>) => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deletePayment = (id: string) => {
    setPayments((prev) => prev.filter((p) => p.id !== id));
  };

  // Employees CRUD
  const addEmployee = (employeeData: Omit<Employee, 'id'>): Employee => {
    const newEmployee: Employee = {
      ...employeeData,
      id: `emp-${Date.now()}`,
    };
    setEmployees((prev) => [newEmployee, ...prev]);
    return newEmployee;
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees((prev) => prev.map((emp) => (emp.id === id ? { ...emp, ...updates } : emp)));
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  // Instant In-Memory Baseline Reset
  const resetAllData = () => {
    setSales(MOCK_SALES);
    setPurchases(MOCK_PURCHASES);
    setProducts(MOCK_PRODUCTS);
    setCustomers(MOCK_CUSTOMERS);
    setSuppliers(MOCK_SUPPLIERS);
    setExpenses(MOCK_EXPENSES);
    setInvoices(MOCK_INVOICES);
    setPayments(MOCK_PAYMENTS);
    setEmployees(MOCK_EMPLOYEES);
  };

  return (
    <DemoDataContext.Provider
      value={{
        sales,
        addSale,
        updateSale,
        deleteSale,
        purchases,
        addPurchase,
        updatePurchase,
        deletePurchase,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustStock,
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        suppliers,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        invoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        recordPaymentForInvoice,
        payments,
        addPayment,
        updatePayment,
        deletePayment,
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        resetAllData,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
};

// Main hook
export const useDemoData = (): DemoDataContextType => {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used within a DemoDataProvider');
  }
  return context;
};

// Specialized custom hooks
export const useSales = () => {
  const { sales, addSale, updateSale, deleteSale } = useDemoData();
  return { sales, addSale, updateSale, deleteSale };
};

export const usePurchases = () => {
  const { purchases, addPurchase, updatePurchase, deletePurchase } = useDemoData();
  return { purchases, addPurchase, updatePurchase, deletePurchase };
};

export const useProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, adjustStock } = useDemoData();
  return { products, addProduct, updateProduct, deleteProduct, adjustStock };
};

export const useCustomers = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useDemoData();
  return { customers, addCustomer, updateCustomer, deleteCustomer };
};

export const useSuppliers = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useDemoData();
  return { suppliers, addSupplier, updateSupplier, deleteSupplier };
};

export const useExpenses = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useDemoData();
  return { expenses, addExpense, updateExpense, deleteExpense };
};

export const useInvoices = () => {
  const { invoices, addInvoice, updateInvoice, deleteInvoice, recordPaymentForInvoice } = useDemoData();
  return { invoices, addInvoice, updateInvoice, deleteInvoice, recordPaymentForInvoice };
};

export const usePayments = () => {
  const { payments, addPayment, updatePayment, deletePayment } = useDemoData();
  return { payments, addPayment, updatePayment, deletePayment };
};

export const useEmployees = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useDemoData();
  return { employees, addEmployee, updateEmployee, deleteEmployee };
};
