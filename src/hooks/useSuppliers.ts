import { useDemoData } from '@/context/DemoDataContext';
import { Supplier } from '@/types/supplier';

export const useSuppliers = () => {
  const {
    suppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    purchases,
  } = useDemoData();

  const getSupplierById = (id: string): Supplier | undefined => {
    return suppliers.find((s) => s.id === id);
  };

  const getPurchasesBySupplierId = (supplierId: string) => {
    return purchases.filter((p) => p.supplierId === supplierId);
  };

  return {
    suppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierById,
    getPurchasesBySupplierId,
    purchases,
  };
};
