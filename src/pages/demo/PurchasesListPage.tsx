import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Eye,
  Trash2,
  Edit,
  Truck,
  Filter,
  PackageCheck,
  Clock,
  CircleDollarSign,
} from 'lucide-react';
import { usePurchases } from '@/hooks/usePurchases';
import { Purchase } from '@/types/purchase';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { SearchInput } from '@/components/common/SearchInput';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/utils/formatters';

const PAGE_SIZE = 10;

export const PurchasesListPage: React.FC = () => {
  const { purchases, deletePurchase, markPurchaseAsReceived } = usePurchases();
  const navigate = useNavigate();

  // Search, filter & pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>('orderDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState<Purchase | null>(null);

  // Filter & sort logic
  const filteredPurchases = useMemo(() => {
    return purchases.filter((purchase) => {
      // Search matching
      const matchesSearch =
        !searchQuery ||
        purchase.purchaseOrderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        purchase.supplierName.toLowerCase().includes(searchQuery.toLowerCase());

      // Status matching
      const matchesStatus =
        statusFilter === 'all' || purchase.status === statusFilter;

      // Payment status matching
      const matchesPaymentStatus =
        paymentStatusFilter === 'all' || purchase.paymentStatus === paymentStatusFilter;

      return matchesSearch && matchesStatus && matchesPaymentStatus;
    });
  }, [purchases, searchQuery, statusFilter, paymentStatusFilter]);

  // Sorted purchases
  const sortedPurchases = useMemo(() => {
    return [...filteredPurchases].sort((a, b) => {
      let valA: any = a[sortKey as keyof Purchase];
      let valB: any = b[sortKey as keyof Purchase];

      if (sortKey === 'items') {
        valA = a.items.length;
        valB = b.items.length;
      }

      if (typeof valA === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredPurchases, sortKey, sortDirection]);

  // Paginated purchases
  const paginatedPurchases = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedPurchases.slice(start, start + PAGE_SIZE);
  }, [sortedPurchases, currentPage]);

  const totalPages = Math.ceil(filteredPurchases.length / PAGE_SIZE) || 1;

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
      deletePurchase(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  // KPI Metrics calculation
  const totalVolume = purchases.length;
  const totalSpend = purchases.reduce((acc, p) => acc + p.grandTotal, 0);
  const receivedCount = purchases.filter((p) => p.status === 'received').length;
  const pendingCount = purchases.filter((p) => p.status === 'ordered').length;

  const columns: Column<Purchase>[] = [
    {
      key: 'purchaseOrderNumber',
      header: 'PO #',
      sortable: true,
      render: (purchase) => (
        <span className="font-mono font-bold text-accent hover:underline">
          {purchase.purchaseOrderNumber}
        </span>
      ),
    },
    {
      key: 'orderDate',
      header: 'Date',
      sortable: true,
      render: (purchase) => formatDate(purchase.orderDate),
    },
    {
      key: 'supplierName',
      header: 'Supplier',
      sortable: true,
      render: (purchase) => (
        <div className="font-semibold text-foreground truncate max-w-[200px]">
          {purchase.supplierName}
        </div>
      ),
    },
    {
      key: 'items',
      header: 'Items',
      sortable: true,
      render: (purchase) => (
        <span className="text-muted-foreground font-medium">
          {purchase.items.length} {purchase.items.length === 1 ? 'line' : 'lines'}
        </span>
      ),
    },
    {
      key: 'grandTotal',
      header: 'Grand Total',
      sortable: true,
      className: 'text-right font-mono',
      render: (purchase) => (
        <span className="font-extrabold text-foreground">
          {formatCurrency(purchase.grandTotal)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Fulfillment',
      render: (purchase) => <StatusBadge status={purchase.status} />,
    },
    {
      key: 'paymentStatus',
      header: 'Payment',
      render: (purchase) => <StatusBadge status={purchase.paymentStatus} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (purchase) => (
        <div
          className="flex items-center justify-end gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          {purchase.status !== 'received' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => markPurchaseAsReceived(purchase.id)}
              className="h-8 px-2.5 rounded-full text-[11px] text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 font-medium"
              title="Quick mark as received"
            >
              <PackageCheck className="h-3.5 w-3.5 mr-1" />
              Receive
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/demo/purchases/${purchase.id}`)}
            className="h-8 w-8 p-0 rounded-full hover:bg-accent/10 hover:text-accent text-muted-foreground"
            title="View Details"
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/demo/purchases/${purchase.id}/edit`)}
            className="h-8 w-8 p-0 rounded-full hover:bg-accent/10 hover:text-accent text-muted-foreground"
            title="Edit Purchase"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteTarget(purchase)}
            className="h-8 w-8 p-0 rounded-full hover:bg-rose-50 hover:text-rose-600 text-muted-foreground dark:hover:bg-rose-950/30"
            title="Delete Purchase"
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
              Purchases & Procurement
            </h1>
            <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs font-semibold">
              Live Demo
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage vendor purchase orders, receive incoming inventory shipments, and audit accounts payable.
          </p>
        </div>

        <Link to="/demo/purchases/new">
          <Button className="rounded-full shadow-soft-island px-5 text-xs font-semibold gap-1.5 h-10">
            <Plus className="h-4 w-4" />
            <span>Create Purchase Order</span>
          </Button>
        </Link>
      </div>

      {/* KPI Metrics Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Volume */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Total POs
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5">{totalVolume}</p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-accent/15 flex items-center justify-center text-accent">
            <Truck className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 2: Total Spend */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Total Spend
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5 font-mono">
              {formatCurrency(totalSpend)}
            </p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CircleDollarSign className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 3: Received */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Received
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5">{receivedCount}</p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <PackageCheck className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 4: Pending Delivery */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Awaiting Stock
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5">{pendingCount}</p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Search, Filter & Controls Toolbar */}
      <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="w-full md:w-80">
          <SearchInput
            placeholder="Search PO # or supplier..."
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Fulfillment Status Filter */}
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
              <option value="all">All Statuses</option>
              <option value="ordered">Ordered</option>
              <option value="received">Received</option>
              <option value="partially_received">Partially Received</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Payment Status Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <select
              value={paymentStatusFilter}
              onChange={(e) => {
                setPaymentStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent capitalize"
            >
              <option value="all">All Payment Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="partially_paid">Partially Paid</option>
            </select>
          </div>

          {/* Result counter badge */}
          <div className="text-[11px] font-semibold text-muted-foreground px-2">
            Showing {filteredPurchases.length} of {purchases.length}
          </div>
        </div>
      </div>

      {/* Main DataTable */}
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={paginatedPurchases}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRowClick={(purchase) => navigate(`/demo/purchases/${purchase.id}`)}
          emptyState={
            <div className="py-12 text-center space-y-3">
              <Truck className="h-10 w-10 text-muted-foreground mx-auto opacity-50" />
              <p className="text-sm font-semibold text-foreground">No purchase orders found</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No orders match your active search or filters. Try adjusting your query or create a new purchase order.
              </p>
            </div>
          }
        />

        {/* Pagination bar */}
        {filteredPurchases.length > PAGE_SIZE && (
          <div className="p-3 rounded-2xl bg-card border border-border/60 shadow-soft-island">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredPurchases.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Purchase Order"
        message={`Are you sure you want to delete PO #${deleteTarget?.purchaseOrderNumber}? This action cannot be undone.`}
      />
    </div>
  );
};
