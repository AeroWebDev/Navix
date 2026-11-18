import { useInvoices as useInvoicesContext } from '@/context/DemoDataContext';

export const useInvoices = () => {
  return useInvoicesContext();
};
