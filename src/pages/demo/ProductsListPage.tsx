import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Eye,
  Trash2,
  Edit,
  Package,
  Filter,
  AlertTriangle,
  SlidersHorizontal,
  Boxes,
  CircleDollarSign,
  Layers,
} from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Product, ProductCategory } from '@/types/product';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { SearchInput } from '@/components/common/SearchInput';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { StockAdjustmentModal } from '@/components/modals/StockAdjustmentModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatters';

const PAGE_SIZE = 10;

const CATEGORIES: (ProductCategory | 'all')[] = [
  'all',
  'Electronics',
  'Office Supplies',
  'Hardware',
  'Software',
  'Services',
  'Accessories',
];

export const ProductsListPage: React.FC = () => {
  const { products, deleteProduct, adjustStock } = useProducts();
  const navigate = useNavigate();

  // Search, filter & pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Modals state
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [adjustTarget, setAdjustTarget] = useState<Product | null>(null);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search matching by Name or SKU
      const matchesSearch =
        !searchQuery ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.sku.toLowerCase().includes(searchQuery.toLowerCase());

      // Category matching
      const matchesCategory =
        categoryFilter === 'all' || prod.category === categoryFilter;

      // Status matching
      const matchesStatus =
        statusFilter === 'all' || prod.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, categoryFilter, statusFilter]);

  // Sorted products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      let valA: any = a[sortKey as keyof Product];
      let valB: any = b[sortKey as keyof Product];

      if (typeof valA === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredProducts, sortKey, sortDirection]);

  // Paginated products
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedProducts.slice(start, start + PAGE_SIZE);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const handleStockAdjustConfirm = (deltaQty: number, reason: string) => {
    if (adjustTarget) {
      adjustStock(adjustTarget.id, deltaQty, reason);
      setAdjustTarget(null);
    }
  };

  // KPI Metrics calculation
  const totalSKUs = products.length;
  const inStockCount = products.filter((p) => p.status === 'in_stock').length;
  const lowStockCount = products.filter(
    (p) => p.stockQuantity <= p.minStockLevel
  ).length;
  const totalValuation = products.reduce(
    (acc, p) => acc + p.stockQuantity * p.costPrice,
    0
  );

  const columns: Column<Product>[] = [
    {
      key: 'name',
      header: 'Product Name',
      sortable: true,
      render: (prod) => (
        <div className="space-y-0.5">
          <span className="font-bold text-foreground hover:underline">
            {prod.name}
          </span>
          <span className="block text-[11px] font-mono text-muted-foreground">
            {prod.sku}
          </span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (prod) => (
        <span className="font-medium text-muted-foreground">
          {prod.category}
        </span>
      ),
    },
    {
      key: 'costPrice',
      header: 'Cost',
      sortable: true,
      className: 'text-right font-mono',
      render: (prod) => (
        <span className="text-muted-foreground">
          {formatCurrency(prod.costPrice)}
        </span>
      ),
    },
    {
      key: 'sellingPrice',
      header: 'Selling Price',
      sortable: true,
      className: 'text-right font-mono',
      render: (prod) => (
        <span className="font-bold text-foreground">
          {formatCurrency(prod.sellingPrice)}
        </span>
      ),
    },
    {
      key: 'stockQuantity',
      header: 'Stock Level',
      sortable: true,
      className: 'text-center font-mono',
      render: (prod) => {
        const isLow = prod.stockQuantity <= prod.minStockLevel;
        return (
          <div className="inline-flex items-center gap-1 font-bold">
            <span
              className={
                isLow
                  ? 'text-amber-600 dark:text-amber-400 font-extrabold'
                  : 'text-foreground'
              }
            >
              {prod.stockQuantity}
            </span>
            <span className="text-[10px] text-muted-foreground font-normal">
              / min {prod.minStockLevel}
            </span>
          </div>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (prod) => <StatusBadge status={prod.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (prod) => (
        <div
          className="flex items-center justify-end gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAdjustTarget(prod)}
            className="h-8 px-2 rounded-full text-[11px] text-accent hover:bg-accent/10 font-medium"
            title="Adjust Stock Quantity"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1" />
            Stock
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/demo/products/${prod.id}`)}
            className="h-8 w-8 p-0 rounded-full hover:bg-accent/10 hover:text-accent text-muted-foreground"
            title="View Product"
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/demo/products/${prod.id}/edit`)}
            className="h-8 w-8 p-0 rounded-full hover:bg-accent/10 hover:text-accent text-muted-foreground"
            title="Edit Product"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteTarget(prod)}
            className="h-8 w-8 p-0 rounded-full hover:bg-rose-50 hover:text-rose-600 text-muted-foreground dark:hover:bg-rose-950/30"
            title="Delete Product"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Products & Inventory Catalogue
            </h1>
            <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs font-semibold">
              Live Stock Engine
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Real-time stock valuation, SKU tracking, reorder alert monitoring, and supply adjustments.
          </p>
        </div>

        <Link to="/demo/products/new">
          <Button className="rounded-full shadow-soft-island px-5 text-xs font-semibold gap-1.5 h-10">
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </Button>
        </Link>
      </div>

      {/* KPI Metrics Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total SKUs */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Catalogue SKUs
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5">{totalSKUs}</p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-accent/15 flex items-center justify-center text-accent">
            <Package className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 2: Asset Valuation */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Asset Valuation
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5 font-mono">
              {formatCurrency(totalValuation)}
            </p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CircleDollarSign className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 3: In Stock */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              In Stock
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5">{inStockCount}</p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Boxes className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 4: Low Stock Alerts */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Reorder Alerts
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5 text-amber-600 dark:text-amber-400">
              {lowStockCount}
            </p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Search, Filter & Controls Toolbar */}
      <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="w-full md:w-80">
          <SearchInput
            placeholder="Search by product name or SKU..."
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <Layers className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.filter((c) => c !== 'all').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent capitalize"
            >
              <option value="all">All Stock Statuses</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock (At or Below Threshold)</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          {/* Result counter badge */}
          <div className="text-[11px] font-semibold text-muted-foreground px-2">
            Showing {filteredProducts.length} of {products.length}
          </div>
        </div>
      </div>

      {/* Main DataTable */}
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={paginatedProducts}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRowClick={(prod) => navigate(`/demo/products/${prod.id}`)}
          rowClassName={(prod) =>
            prod.stockQuantity <= prod.minStockLevel
              ? 'bg-amber-500/10 hover:bg-amber-500/20 low-stock-highlight'
              : undefined
          }
          emptyState={
            <div className="py-12 text-center space-y-3">
              <Package className="h-10 w-10 text-muted-foreground mx-auto opacity-50" />
              <p className="text-sm font-semibold text-foreground">No products found</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No items match your search or category filter. Try clearing filters or create a new product.
              </p>
            </div>
          }
        />

        {/* Pagination bar */}
        {filteredProducts.length > PAGE_SIZE && (
          <div className="p-3 rounded-2xl bg-card border border-border/60 shadow-soft-island">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredProducts.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Stock Adjustment Modal */}
      {adjustTarget && (
        <StockAdjustmentModal
          isOpen={Boolean(adjustTarget)}
          onClose={() => setAdjustTarget(null)}
          product={adjustTarget}
          onConfirm={handleStockAdjustConfirm}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Catalogue Item"
        message={`Are you sure you want to delete "${deleteTarget?.name}" (${deleteTarget?.sku})? This action cannot be undone.`}
      />
    </div>
  );
};
