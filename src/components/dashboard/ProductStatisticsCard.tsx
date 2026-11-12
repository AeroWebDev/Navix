import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useDemoData } from '@/context/DemoDataContext';
import { formatCurrency } from '@/utils/formatters';
import { PackageCheck, AlertTriangle } from 'lucide-react';

export const ProductStatisticsCard: React.FC = () => {
  const { products } = useDemoData();

  const { totalUnits, totalValuation, categoryBreakdown, inStockCount, lowStockCount } = useMemo(() => {
    let units = 0;
    let valuation = 0;
    let inStock = 0;
    let lowStock = 0;

    const catMap: Record<string, { count: number; units: number; value: number }> = {};

    products.forEach((p) => {
      units += p.stockQuantity;
      valuation += p.stockQuantity * p.costPrice;
      if (p.stockQuantity <= p.minStockLevel) {
        lowStock += 1;
      } else {
        inStock += 1;
      }

      if (!catMap[p.category]) {
        catMap[p.category] = { count: 0, units: 0, value: 0 };
      }
      catMap[p.category].count += 1;
      catMap[p.category].units += p.stockQuantity;
      catMap[p.category].value += p.stockQuantity * p.costPrice;
    });

    const breakdown = Object.entries(catMap)
      .map(([name, stat]) => ({
        name,
        count: stat.count,
        units: stat.units,
        value: stat.value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 4);

    return {
      totalUnits: units,
      totalValuation: valuation,
      categoryBreakdown: breakdown,
      inStockCount: inStock,
      lowStockCount: lowStock,
    };
  }, [products]);

  const colorPalette = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  return (
    <Card className="rounded-3xl border-border/60 shadow-soft-island bg-card flex flex-col justify-between">
      <CardHeader className="flex flex-row items-start justify-between pb-2 border-b border-border/40">
        <div>
          <CardTitle className="text-base font-bold text-foreground">
            Inventory Valuation & Stock
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time warehouse asset distribution
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-muted/60 text-xs font-semibold text-muted-foreground">
          {products.length} Active SKUs
        </span>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Metric summary header */}
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/60 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-muted-foreground font-semibold">Total Stock Valuation</p>
            <p className="text-xl font-extrabold text-foreground tracking-tight">
              {formatCurrency(totalValuation)}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {totalUnits} physical units counted
            </p>
          </div>
          <div className="text-right space-y-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
              <PackageCheck className="h-3 w-3" />
              {inStockCount} In Stock
            </span>
            {lowStockCount > 0 && (
              <div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600">
                  <AlertTriangle className="h-3 w-3" />
                  {lowStockCount} Low Reorder
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Real Category Breakdown List */}
        <div className="space-y-2.5 text-xs">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Top Categories by Asset Value:
          </p>
          {categoryBreakdown.map((cat, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: colorPalette[idx % colorPalette.length] }}
                />
                <span className="font-semibold text-foreground">{cat.name}</span>
                <span className="text-[11px] text-muted-foreground font-mono">
                  ({cat.count} SKUs)
                </span>
              </div>

              <div className="text-right">
                <span className="font-bold text-foreground font-mono">
                  {formatCurrency(cat.value)}
                </span>
                <span className="block text-[10px] text-muted-foreground font-mono">
                  {cat.units} units
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
