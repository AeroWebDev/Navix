import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Layers,
  Building2,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  CircleDollarSign,
  Boxes,
} from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { StatusBadge } from '@/components/common/StatusBadge';
import { StockAdjustmentModal } from '@/components/modals/StockAdjustmentModal';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatters';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, deleteProduct, adjustStock } = useProducts();

  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <AlertCircle className="h-12 w-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-foreground">Product Not Found</h2>
        <p className="text-xs text-muted-foreground">
          The requested product could not be located in current in-memory inventory.
        </p>
        <Link to="/demo/products">
          <Button variant="outline" size="sm" className="rounded-full px-5">
            Return to Catalogue
          </Button>
        </Link>
      </div>
    );
  }

  const isLowStock = product.stockQuantity <= product.minStockLevel;
  const isOutOfStock = product.stockQuantity === 0;

  const grossProfit = Math.max(0, product.sellingPrice - product.costPrice);
  const marginPercentage =
    product.sellingPrice > 0 ? Math.round((grossProfit / product.sellingPrice) * 100) : 0;

  const handleDelete = () => {
    deleteProduct(product.id);
    navigate('/demo/products');
  };

  const handleStockAdjustment = (deltaQty: number, reason: string) => {
    adjustStock(product.id, deltaQty, reason);
    setFeedbackToast(
      `Inventory adjusted by ${deltaQty > 0 ? `+${deltaQty}` : deltaQty} ${product.unit}s (${reason})`
    );
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <Link
            to="/demo/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Products Catalogue
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {product.name}
            </h1>
            <StatusBadge status={product.status} />
            <Badge variant="outline" className="font-mono text-xs font-bold rounded-full">
              {product.sku}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Category: {product.category} • Supplier: {product.supplierName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            onClick={() => setAdjustModalOpen(true)}
            className="rounded-full text-xs gap-1.5 bg-accent hover:bg-accent/90 text-white shadow-soft-island font-semibold"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Adjust Stock</span>
          </Button>

          <Link to={`/demo/products/${product.id}/edit`}>
            <Button variant="outline" size="sm" className="rounded-full text-xs gap-1.5">
              <Edit className="h-3.5 w-3.5" />
              <span>Edit</span>
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteModalOpen(true)}
            className="rounded-full text-xs gap-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900/40"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </Button>
        </div>
      </div>

      {/* Low Stock Warning Banner if applicable */}
      {isLowStock && (
        <div
          className={`p-4 rounded-3xl border flex items-center gap-3 ${
            isOutOfStock
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200'
          }`}
        >
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <div className="text-xs">
            <span className="font-bold">
              {isOutOfStock ? 'Item is completely Out of Stock!' : 'Reorder Threshold Warning!'}
            </span>{' '}
            Current stock ({product.stockQuantity} {product.unit}s) is at or below the minimum threshold ({product.minStockLevel} {product.unit}s). Consider issuing a purchase order to {product.supplierName}.
          </div>
        </div>
      )}

      {/* Primary Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Inventory Stock Status Card */}
        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
            <Boxes className="h-4 w-4" />
            <span>Stock & Storage</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-border/40">
              <span className="text-muted-foreground">On-Hand Quantity</span>
              <span
                data-testid="detail-stock-quantity"
                className={`font-mono text-base font-extrabold ${
                  isLowStock ? 'text-amber-600 dark:text-amber-400' : 'text-foreground'
                }`}
              >
                {product.stockQuantity} {product.unit}s
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-border/40">
              <span className="text-muted-foreground">Reorder Threshold</span>
              <span className="font-mono font-semibold text-foreground">
                {product.minStockLevel} {product.unit}s
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground">Inventory Health</span>
              <StatusBadge status={product.status} />
            </div>
          </div>
        </div>

        {/* Pricing & Valuation Card */}
        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
            <CircleDollarSign className="h-4 w-4" />
            <span>Commercial Pricing</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-border/40">
              <span className="text-muted-foreground">Retail Selling Price</span>
              <span className="font-mono font-bold text-foreground">
                {formatCurrency(product.sellingPrice)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-border/40">
              <span className="text-muted-foreground">Unit Cost Price</span>
              <span className="font-mono font-medium text-muted-foreground">
                {formatCurrency(product.costPrice)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground">Profit Margin</span>
              <span className="font-mono font-bold text-accent">
                {formatCurrency(grossProfit)} ({marginPercentage}%)
              </span>
            </div>
          </div>
        </div>

        {/* Procurement & Supply Card */}
        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
            <Building2 className="h-4 w-4" />
            <span>Procurement & Logistics</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-border/40">
              <span className="text-muted-foreground">Primary Supplier</span>
              <span className="font-semibold text-foreground truncate max-w-[150px]">
                {product.supplierName}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-border/40">
              <span className="text-muted-foreground">Total Asset Value</span>
              <span className="font-mono font-bold text-foreground">
                {formatCurrency(product.stockQuantity * product.costPrice)}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground">Category</span>
              <span className="font-semibold text-foreground">{product.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Technical Specifications */}
      <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-border/50 text-foreground font-bold text-sm">
          <Layers className="h-4 w-4 text-accent" />
          <h3>Item Description & Technical Overview</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {product.description ||
            'No detailed technical description has been added for this inventory catalogue item.'}
        </p>
      </div>

      {/* Stock Adjustment Modal */}
      <StockAdjustmentModal
        isOpen={adjustModalOpen}
        onClose={() => setAdjustModalOpen(false)}
        product={product}
        onConfirm={handleStockAdjustment}
      />

      {/* Confirm Deletion Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Catalogue Product"
        message={`Are you sure you want to delete "${product.name}" (${product.sku})? This will permanently remove it from inventory.`}
      />
    </div>
  );
};
