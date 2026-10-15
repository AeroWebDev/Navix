import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Eye,
  Trash2,
  Edit,
  ShoppingCart,
  Filter,
} from 'lucide-react';
import { useSales } from '@/hooks/useSales';
import { Sale } from '@/types/sale';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { SearchInput } from '@/components/common/SearchInput';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/utils/formatters';

const PAGE_SIZE = 10;

export const SalesListPage: React.FC = () => {
  const { sales, deleteSale } = useSales();
  const navigate = useNavigate();

  // Search, filter & pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState<Sale | null>(null);

  // Filter & sort logic
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      // Search matching
      const matchesSearch =
        !searchQuery ||
        sale.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.customerName.toLowerCase().includes(searchQuery.toLowerCase());

      // Status matching
      const matchesStatus =
        statusFilter === 'all' || sale.paymentStatus === statusFilter;

      // Date matching
      let matchesDate = true;
      if (dateFilter === 'jan') {
        matchesDate = sale.date.startsWith('2025-01');
      } else if (dateFilter === 'feb') {
        matchesDate = sale.date.startsWith('2025-02');
      } else if (dateFilter === 'mar') {
        matchesDate = sale.date.startsWith('2025-03');
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [sales, searchQuery, statusFilter, dateFilter]);

  // Sorted sales
  const sortedSales = useMemo(() => {
    return [...filteredSales].sort((a, b) => {
      let valA: any = a[sortKey as keyof Sale];
      let valB: any = b[sortKey as keyof Sale];

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
  }, [filteredSales, sortKey, sortDirection]);

  // Paginated sales
  const paginatedSales = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedSales.slice(start, start + PAGE_SIZE);
  }, [sortedSales, currentPage]);

  const totalPages = Math.ceil(filteredSales.length / PAGE_SIZE) || 1;

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteSale(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  // Metrics summary
  const totalVolume = useMemo(
    () => filteredSales.reduce((acc, s) => acc + s.grandTotal, 0),
    [filteredSales]
  );
  const paidCount = useMemo(
    () => filteredSales.filter((s) => s.paymentStatus === 'paid').length,
    [filteredSales]
  );

  const columns: Column<Sale>[] = [
    {
      key: 'invoiceNumber',
      header: 'Invoice #',
      sortable: true,
      render: (sale) => (
        <span className="font-mono font-bold text-accent hover:underline">
          {sale.invoiceNumber}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      render: (sale) => formatDate(sale.date),
    },
    {
      key: 'customerName',
      header: 'Customer',
      sortable: true,
      render: (sale) => (
        <div className="font-semibold text-foreground truncate max-w-[180px]">
          {sale.customerName}
        </div>
      ),
    },
    {
      key: 'items',
      header: 'Items',
      sortable: true,
      render: (sale) => (
        <span className="text-muted-foreground font-medium">
          {sale.items.length} {sale.items.length === 1 ? 'line' : 'lines'}
        </span>
      ),
    },
    {
      key: 'grandTotal',
      header: 'Grand Total',
      sortable: true,
      className: 'text-right font-mono',
      render: (sale) => (
        <span className="font-extrabold text-foreground">
          {formatCurrency(sale.grandTotal)}
        </span>
      ),
    },
    {
      key: 'paymentMethod',
      header: 'Method',
      render: (sale) => (
        <span className="capitalize text-[11px] text-muted-foreground font-medium">
          {sale.paymentMethod.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'paymentStatus',
      header: 'Status',
      sortable: true,
      render: (sale) => <StatusBadge status={sale.paymentStatus} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (sale) => (
        <div
          className="flex items-center justify-end gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => navigate(`/demo/sales/${sale.id}`)}
            className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="View Sale Details"
            aria-label="View sale details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate(`/demo/sales/${sale.id}/edit`)}
            className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Edit Sale"
            aria-label="Edit sale"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDeleteTarget(sale)}
            className="p-1.5 rounded-full hover:bg-rose-500/10 text-muted-foreground hover:text-rose-600 transition-colors cursor-pointer"
            title="Delete Sale"
            aria-label="Delete sale"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick KPI Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Sales & POS Engine
            </h1>
            <Badge variant="outline" className="text-[10px] uppercase font-bold rounded-full">
              {sales.length} Total Records
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Commercial transaction ledger, customer invoices, and retail point-of-sale checkouts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/demo/sales/new">
            <Button size="sm" className="gap-1.5 text-xs font-bold bg-accent hover:bg-accent/90 text-white rounded-full px-5 shadow-xs">
              <Plus className="h-4 w-4" />
              New Sale POS
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-3xl border border-border/60 bg-card shadow-soft-island">
          <p className="text-[11px] text-muted-foreground font-semibold">Active Sales Volume</p>
          <p className="text-xl font-extrabold text-foreground mt-1">
            {formatCurrency(totalVolume)}
          </p>
        </div>
        <div className="p-4 rounded-3xl border border-border/60 bg-card shadow-soft-island">
          <p className="text-[11px] text-muted-foreground font-semibold">Completed Orders</p>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {paidCount} Paid
          </p>
        </div>
        <div className="p-4 rounded-3xl border border-border/60 bg-card shadow-soft-island">
          <p className="text-[11px] text-muted-foreground font-semibold">Pending Settlement</p>
          <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {filteredSales.filter((s) => s.paymentStatus === 'pending').length} Orders
          </p>
        </div>
        <div className="p-4 rounded-3xl border border-border/60 bg-card shadow-soft-island">
          <p className="text-[11px] text-muted-foreground font-semibold">Average Ticket</p>
          <p className="text-xl font-extrabold text-foreground mt-1">
            {filteredSales.length > 0
              ? formatCurrency(totalVolume / filteredSales.length)
              : '$0.00'}
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island">
        <SearchInput
          value={searchQuery}
          onChange={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          placeholder="Search by customer name or invoice number..."
          className="max-w-md"
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Filter className="h-3.5 w-3.5" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter by payment status"
              className="h-8 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter by date period"
            className="h-8 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <option value="all">All Dates</option>
            <option value="jan">January 2025</option>
            <option value="feb">February 2025</option>
            <option value="mar">March 2025</option>
          </select>

          {(searchQuery || statusFilter !== 'all' || dateFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setDateFilter('all');
                setCurrentPage(1);
              }}
              className="text-xs font-semibold text-accent hover:underline px-2 py-1 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Data Table */}
      <div className="space-y-0">
        <DataTable
          columns={columns}
          data={paginatedSales}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRowClick={(sale) => navigate(`/demo/sales/${sale.id}`)}
          emptyState={
            <div className="py-12 text-center space-y-3">
              <ShoppingCart className="h-10 w-10 text-muted-foreground mx-auto opacity-50" />
              <p className="text-sm font-semibold text-foreground">No sales transactions found</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No orders match your active search or filters. Try adjusting your query or create a new sale.
              </p>
            </div>
          }
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredSales.length}
          pageSize={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Sale Transaction"
        itemName={deleteTarget?.invoiceNumber}
        message={
          deleteTarget
            ? `Are you sure you want to delete sale ${deleteTarget.invoiceNumber} for ${deleteTarget.customerName} (${formatCurrency(
                deleteTarget.grandTotal
              )})? This will remove the record from current preview memory.`
            : undefined
        }
      />
    </div>
  );
};
