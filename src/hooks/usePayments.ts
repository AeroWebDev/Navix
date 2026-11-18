import { usePayments as usePaymentsContext } from '@/context/DemoDataContext';

export const usePayments = () => {
  return usePaymentsContext();
};
