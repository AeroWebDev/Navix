import { useDemoData } from '@/context/DemoDataContext';
import { Customer } from '@/types/customer';

export const useCustomers = () => {
  const {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    sales,
    invoices,
  } = useDemoData();

  const getCustomerById = (id: string): Customer | undefined => {
    return customers.find((c) => c.id === id);
  };

  const getSalesByCustomerId = (customerId: string) => {
    return sales.filter((s) => s.customerId === customerId);
  };

  const getInvoicesByCustomerId = (customerId: string) => {
    return invoices.filter((inv) => inv.customerId === customerId);
  };

  return {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    getSalesByCustomerId,
    getInvoicesByCustomerId,
    sales,
    invoices,
  };
};
