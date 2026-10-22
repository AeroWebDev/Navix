import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { ProductForm } from '@/components/forms/ProductForm';
import { Product } from '@/types/product';

export const NewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { products, addProduct, updateProduct } = useProducts();

  const isEditing = Boolean(id);
  const existingProduct = isEditing ? products.find((p) => p.id === id) : undefined;

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (productData: Omit<Product, 'id'>) => {
    if (isEditing && id) {
      updateProduct(id, productData);
      setToastMessage(`Product "${productData.name}" updated successfully!`);
    } else {
      addProduct(productData);
      setToastMessage(`Product "${productData.name}" added to catalogue!`);
    }

    setTimeout(() => {
      navigate('/demo/products');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Back Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/60">
        <div>
          <Link
            to="/demo/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Products Catalogue
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {isEditing ? `Edit Product: ${existingProduct?.name}` : 'New Catalogue Product'}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Configure product metadata, pricing margins, vendor associations, and reorder points.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <Sparkles className="h-4 w-4" />
          <span>Real-Time Inventory Engine</span>
        </div>
      </div>

      {/* Form Card */}
      <ProductForm
        initialData={existingProduct}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/demo/products')}
        isEditing={isEditing}
      />
    </div>
  );
};
