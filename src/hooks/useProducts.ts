import { useDemoData } from '@/context/DemoDataContext';
import { Product } from '@/types/product';

export const useProducts = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
    suppliers,
  } = useDemoData();

  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
    getProductById,
    suppliers,
  };
};
