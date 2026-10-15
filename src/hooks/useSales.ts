import { useDemoData } from '@/context/DemoDataContext';
import { Sale } from '@/types/sale';

export const useSales = () => {
  const { sales, addSale, updateSale, deleteSale, customers, products } = useDemoData();

  const getSaleById = (id: string): Sale | undefined => {
    return sales.find((s) => s.id === id);
  };

  return {
    sales,
    addSale,
    updateSale,
    deleteSale,
    getSaleById,
    customers,
    products,
  };
};
