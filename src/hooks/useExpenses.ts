import { useExpenses as useExpensesContext } from '@/context/DemoDataContext';

export const useExpenses = () => {
  return useExpensesContext();
};
