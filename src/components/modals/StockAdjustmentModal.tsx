import React, { useState } from 'react';
import { PackagePlus, PackageMinus, AlertCircle } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface StockAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onConfirm: (deltaQty: number, reason: string) => void;
}

export const StockAdjustmentModal: React.FC<StockAdjustmentModalProps> = ({
  isOpen,
  onClose,
  product,
  onConfirm,
}) => {
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'subtract'>('add');
  const [amount, setAmount] = useState<number>(5);
  const [reason, setReason] = useState<string>('restock');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const delta = adjustmentType === 'add' ? amount : -amount;
  const projectedQuantity = Math.max(0, product.stockQuantity + delta);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    const finalReason = notes ? `${reason}: ${notes}` : reason;
    onConfirm(delta, finalReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md rounded-3xl bg-card border border-border/80 p-6 shadow-2xl space-y-4">
        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-border/60">
          <div className="h-10 w-10 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
            {adjustmentType === 'add' ? (
              <PackagePlus className="h-5 w-5" />
            ) : (
              <PackageMinus className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Adjust Inventory Stock</h3>
            <p className="text-xs text-muted-foreground">{product.name} ({product.sku})</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Operation Type Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-muted/40 rounded-full border border-border/50">
            <button
              type="button"
              onClick={() => setAdjustmentType('add')}
              className={`py-1.5 px-3 rounded-full font-semibold transition-all flex items-center justify-center gap-1.5 ${
                adjustmentType === 'add'
                  ? 'bg-card text-accent shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <PackagePlus className="h-3.5 w-3.5" />
              <span>Add Stock (+)</span>
            </button>
            <button
              type="button"
              onClick={() => setAdjustmentType('subtract')}
              className={`py-1.5 px-3 rounded-full font-semibold transition-all flex items-center justify-center gap-1.5 ${
                adjustmentType === 'subtract'
                  ? 'bg-card text-rose-600 shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <PackageMinus className="h-3.5 w-3.5" />
              <span>Subtract (-)</span>
            </button>
          </div>

          {/* Adjustment Quantity */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Quantity to Adjust *</label>
            <Input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 0))}
              className="h-9 rounded-full text-xs font-mono"
              required
            />
          </div>

          {/* Reason Selector */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Audit Reason *</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <option value="restock">Direct Restock / Incoming Delivery</option>
              <option value="inventory_audit">Periodic Inventory Audit / Correction</option>
              <option value="damage">Damaged / Expired Goods Write-off</option>
              <option value="return">Customer Return to Inventory</option>
            </select>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Memo / Audit Notes</label>
            <Input
              type="text"
              placeholder="e.g. Verified by warehouse lead on cycle count"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-9 rounded-full text-xs"
            />
          </div>

          {/* Stock Projection Alert */}
          <div className="p-3 rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-between">
            <span className="text-muted-foreground">Current: <strong className="text-foreground">{product.stockQuantity}</strong></span>
            <span className="text-muted-foreground">Projected: <strong className={projectedQuantity <= product.minStockLevel ? 'text-amber-600 font-bold' : 'text-accent font-bold'}>{projectedQuantity} {product.unit}s</strong></span>
          </div>

          {projectedQuantity <= product.minStockLevel && (
            <p className="text-[11px] text-amber-600 font-semibold flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              Warning: Projected stock is at or below the reorder threshold ({product.minStockLevel}).
            </p>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="rounded-full px-4 text-xs h-8"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="rounded-full px-5 text-xs h-8 font-semibold"
            >
              Confirm Adjustment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
