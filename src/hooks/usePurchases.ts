import { useDemoData } from '@/context/DemoDataContext';
import { Purchase } from '@/types/purchase';

export const usePurchases = () => {
  const {
    purchases,
    addPurchase,
    updatePurchase,
    deletePurchase,
    markPurchaseAsReceived,
    suppliers,
    products,
  } = useDemoData();

  const getPurchaseById = (id: string): Purchase | undefined => {
    return purchases.find((p) => p.id === id);
  };

  return {
    purchases,
    addPurchase,
    updatePurchase,
    deletePurchase,
    markPurchaseAsReceived,
    getPurchaseById,
    suppliers,
    products,
  };
};
