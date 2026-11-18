import React, { useState, useMemo } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Trash2,
  DollarSign,
  CheckCircle2,
} from 'lucide-react';
import { usePayments } from '@/hooks/usePayments';
import { Payment, PaymentDirection, PaymentMode } from '@/types/payment';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { SearchInput } from '@/components/common/SearchInput';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/utils/formatters';

const PAGE_SIZE = 10;

export const PaymentsListPage: React.FC = () => {
  const { payments, deletePayment } = usePayments();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [directionFilter, setDirectionFilter] = useState<'all' | PaymentDirection>('all');
  const [modeFilter, setModeFilter] = useState<'all' | PaymentMode>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState<Payment | null>(null);

  // Financial aggregates
  const { totalInflow, totalOutflow, netCashMovement } = useMemo(() => {
    let inflow = 0;
    let outflow = 0;

    payments.forEach((p) => {
      if (p.direction === 'inflow') {
        inflow += p.amount;
      } else {
        outflow += p.amount;
      }
    });

    return {
      totalInflow: inflow,
      totalOutflow: outflow,
      netCashMovement: inflow - outflow,
    };
  }, [payments]);

  // Filtered & sorted payments
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.paymentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.partyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.relatedDocumentNumber &&
          p.relatedDocumentNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.referenceNumber &&
          p.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDirection =
        directionFilter === 'all' || p.direction === directionFilter;

      const matchesMode = modeFilter === 'all' || p.paymentMode === modeFilter;

      return matchesSearch && matchesDirection && matchesMode;
    });
  }, [payments, searchQuery, directionFilter, modeFilter]);

  const sortedPayments = useMemo(() => {
    return [...filteredPayments].sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';

      switch (sortKey) {
        case 'paymentNumber':
          aVal = a.paymentNumber;
          bVal = b.paymentNumber;
          break;
        case 'partyName':
          aVal = a.partyName;
          bVal = b.partyName;
          break;
        case 'amount':
          aVal = a.amount;
          bVal = b.amount;
          break;
        case 'date':
        default:
          aVal = a.date;
          bVal = b.date;
          break;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredPayments, sortKey, sortDirection]);

  const totalPages = Math.ceil(sortedPayments.length / PAGE_SIZE) || 1;
  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedPayments.slice(start, start + PAGE_SIZE);
  }, [sortedPayments, currentPage]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const formatPaymentMode = (mode: PaymentMode) => {
    switch (mode) {
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'credit_card':
        return 'Credit Card';
      case 'cheque':
        return 'Cheque';
      case 'cash':
        return 'Cash';
      case 'online':
        return 'Online Portal';
      default:
        return mode;
    }
  };

  const columns: Column<Payment>[] = [
    {
      key: 'paymentNumber',
      header: 'Transaction #',
      sortable: true,
      render: (p) => (
        <div className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${
              p.direction === 'inflow'
                ? 'bg-emerald-500/10 text-emerald-600'
                : 'bg-rose-500/10 text-rose-600'
            }`}
          >
            {p.direction === 'inflow' ? (
              <ArrowDownLeft className="h-4 w-4" />
            ) : (
              <ArrowUpRight className="h-4 w-4" />
            )}
          </div>
          <div>
            <span className="font-semibold text-foreground text-xs block">
              {p.paymentNumber}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {p.referenceNumber || 'Direct settlement'}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'partyName',
      header: 'Counterparty',
      sortable: true,
      render: (p) => (
        <div>
          <span className="font-medium text-foreground text-xs block">
            {p.partyName}
          </span>
          <span className="text-[11px] text-muted-foreground capitalize">
            {p.direction === 'inflow' ? 'Customer Account' : 'Vendor / Payee'}
          </span>
        </div>
      ),
    },
    {
      key: 'direction',
      header: 'Direction',
      render: (p) => (
        <Badge
          variant={p.direction === 'inflow' ? 'success' : 'destructive'}
          className="capitalize text-[11px]"
        >
          {p.direction === 'inflow' ? 'Inflow (+)' : 'Outflow (-)'}
        </Badge>
      ),
    },
    {
      key: 'paymentMode',
      header: 'Method',
      render: (p) => (
        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
          <CreditCard className="h-3.5 w-3.5 text-primary/70 shrink-0" />
          {formatPaymentMode(p.paymentMode)}
        </span>
      ),
    },
    {
      key: 'relatedDocumentNumber',
      header: 'Linked Ref',
      render: (p) => (
        <div>
          {p.relatedDocumentNumber ? (
            <span className="font-mono text-xs text-primary font-medium">
              {p.relatedDocumentNumber}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
          <span className="text-[10px] text-muted-foreground uppercase block">
            {p.relatedDocumentType}
          </span>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      render: (p) => (
        <span className="text-xs text-muted-foreground">{formatDate(p.date)}</span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (p) => (
        <span
          className={`font-bold text-xs ${
            p.direction === 'inflow' ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {p.direction === 'inflow' ? '+' : '-'}
          {formatCurrency(p.amount)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => (
        <Badge
          variant={p.status === 'completed' ? 'success' : 'secondary'}
          className="capitalize text-[11px]"
        >
          {p.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (p) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
          onClick={() => setDeleteTarget(p)}
          title="Delete Transaction"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Treasury & Payment Transactions
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit commercial cash receipts from customers and payments disbursed to suppliers.
          </p>
        </div>
      </div>

      {/* KPI Aggregate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft-island">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Cash Inflow</span>
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <ArrowDownLeft className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-emerald-600 mt-2">
            +{formatCurrency(totalInflow)}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Customer billings collected</p>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft-island">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Cash Outflow</span>
            <div className="h-8 w-8 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-rose-600 mt-2">
            -{formatCurrency(totalOutflow)}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Vendor & expense disbursements</p>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft-island">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Net Cash Flow</span>
            <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div
            className={`text-xl font-bold mt-2 ${
              netCashMovement >= 0 ? 'text-primary' : 'text-rose-600'
            }`}
          >
            {netCashMovement >= 0 ? '+' : ''}
            {formatCurrency(netCashMovement)}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Net treasury liquidity delta</p>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft-island">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Settled Movements</span>
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-foreground mt-2">
            {payments.length} Records
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Audited ledger entries</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="w-full md:w-80">
          <SearchInput
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            placeholder="Search by txn #, party, or document..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Direction Filter Pills */}
          <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border/50">
            <button
              type="button"
              onClick={() => {
                setDirectionFilter('all');
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                directionFilter === 'all'
                  ? 'bg-card text-foreground shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Movements
            </button>
            <button
              type="button"
              onClick={() => {
                setDirectionFilter('inflow');
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                directionFilter === 'inflow'
                  ? 'bg-emerald-500 text-white shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Inflows (+)
            </button>
            <button
              type="button"
              onClick={() => {
                setDirectionFilter('outflow');
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                directionFilter === 'outflow'
                  ? 'bg-rose-500 text-white shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Outflows (-)
            </button>
          </div>

          {/* Payment Method Selector */}
          <select
            value={modeFilter}
            onChange={(e) => {
              setModeFilter(e.target.value as 'all' | PaymentMode);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 rounded-full border border-border/70 bg-card text-foreground text-xs focus:outline-hidden focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Methods</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="credit_card">Credit Card</option>
            <option value="cheque">Cheque</option>
            <option value="cash">Cash</option>
            <option value="online">Online Portal</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-border/70 bg-card shadow-soft-island overflow-hidden">
        <DataTable
          columns={columns}
          data={paginatedPayments}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          emptyState={
            <div className="py-12 text-center text-xs text-muted-foreground">
              No treasury payment records match the current filters.
            </div>
          }
        />
        {totalPages > 1 && (
          <div className="p-4 border-t border-border/60">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sortedPayments.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {deleteTarget && (
        <ConfirmDeleteModal
          isOpen={true}
          title="Delete Transaction"
          message={`Are you sure you want to delete payment record ${deleteTarget.paymentNumber} for ${deleteTarget.partyName}?`}
          onConfirm={() => {
            deletePayment(deleteTarget.id);
            setDeleteTarget(null);
          }}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};
