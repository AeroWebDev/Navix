import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Receipt,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Eye,
  CreditCard,
} from 'lucide-react';
import { useInvoices } from '@/hooks/useInvoices';
import { Invoice, InvoiceStatus } from '@/types/invoice';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { SearchInput } from '@/components/common/SearchInput';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { RecordPaymentModal } from '@/components/modals/RecordPaymentModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/utils/formatters';

const PAGE_SIZE = 10;

const STATUS_FILTERS: { label: string; value: 'all' | InvoiceStatus }[] = [
  { label: 'All Invoices', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Draft', value: 'draft' },
  { label: 'Cancelled', value: 'cancelled' },
];

export const InvoicesListPage: React.FC = () => {
  const { invoices, deleteInvoice, recordPaymentForInvoice } = useInvoices();
  const navigate = useNavigate();

  // Search, filter & pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InvoiceStatus>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>('issueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Modals state
  const [deleteTarget, setDeleteTarget] = useState<Invoice | null>(null);
  const [paymentTarget, setPaymentTarget] = useState<Invoice | null>(null);

  // Financial aggregates
  const { totalInvoiced, totalCollected, totalPending, overdueAmount } = useMemo(() => {
    let invoiced = 0;
    let collected = 0;
    let pending = 0;
    let overdue = 0;

    invoices.forEach((inv) => {
      invoiced += inv.total;
      if (inv.status === 'paid') {
        collected += inv.total;
      } else if (inv.status === 'pending') {
        pending += inv.total;
      } else if (inv.status === 'overdue') {
        overdue += inv.total;
      }
    });

    return {
      totalInvoiced: invoiced,
      totalCollected: collected,
      totalPending: pending,
      overdueAmount: overdue,
    };
  }, [invoices]);

  // Filter & sort logic
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        !searchQuery ||
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inv.notes && inv.notes.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === 'all' || inv.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  const sortedInvoices = useMemo(() => {
    return [...filteredInvoices].sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';

      switch (sortKey) {
        case 'invoiceNumber':
          aVal = a.invoiceNumber;
          bVal = b.invoiceNumber;
          break;
        case 'customerName':
          aVal = a.customerName;
          bVal = b.customerName;
          break;
        case 'total':
          aVal = a.total;
          bVal = b.total;
          break;
        case 'dueDate':
          aVal = a.dueDate;
          bVal = b.dueDate;
          break;
        case 'status':
          aVal = a.status;
          bVal = b.status;
          break;
        case 'issueDate':
        default:
          aVal = a.issueDate;
          bVal = b.issueDate;
          break;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredInvoices, sortKey, sortDirection]);

  // Pagination slice
  const totalPages = Math.ceil(sortedInvoices.length / PAGE_SIZE) || 1;
  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedInvoices.slice(start, start + PAGE_SIZE);
  }, [sortedInvoices, currentPage]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const getStatusBadgeVariant = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'destructive';
      case 'draft':
        return 'secondary';
      case 'cancelled':
        return 'default';
      default:
        return 'outline';
    }
  };

  const columns: Column<Invoice>[] = [
    {
      key: 'invoiceNumber',
      header: 'Invoice #',
      sortable: true,
      render: (inv) => (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Receipt className="h-4 w-4" />
          </div>
          <div>
            <span className="font-semibold text-foreground text-xs block">
              {inv.invoiceNumber}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {inv.paymentTerms || 'Standard Terms'}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'customerName',
      header: 'Customer',
      sortable: true,
      render: (inv) => (
        <div>
          <span className="font-medium text-foreground text-xs block">
            {inv.customerName}
          </span>
          <span className="text-[11px] text-muted-foreground truncate max-w-[160px] block">
            {inv.customerEmail || 'No email on record'}
          </span>
        </div>
      ),
    },
    {
      key: 'issueDate',
      header: 'Issue Date',
      sortable: true,
      render: (inv) => (
        <span className="text-xs text-muted-foreground">
          {formatDate(inv.issueDate)}
        </span>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      render: (inv) => (
        <span
          className={`text-xs font-medium ${
            inv.status === 'overdue' ? 'text-destructive font-semibold' : 'text-foreground'
          }`}
        >
          {formatDate(inv.dueDate)}
        </span>
      ),
    },
    {
      key: 'total',
      header: 'Amount',
      sortable: true,
      render: (inv) => (
        <div>
          <span className="font-bold text-foreground text-xs block">
            {formatCurrency(inv.total)}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {inv.items.length} {inv.items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (inv) => (
        <Badge variant={getStatusBadgeVariant(inv.status)} className="capitalize text-[11px]">
          {inv.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (inv) => (
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            onClick={() => navigate(`/demo/invoices/${inv.id}`)}
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Button>

          {inv.status !== 'paid' && inv.status !== 'cancelled' && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              onClick={() => setPaymentTarget(inv)}
              title="Record Payment"
            >
              <CreditCard className="h-4 w-4" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
            onClick={() => setDeleteTarget(inv)}
            title="Delete Invoice"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Commercial Invoices
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Issue billing invoices, track receivables aging, and record incoming customer payments.
          </p>
        </div>
        <Link to="/demo/invoices/new">
          <Button variant="primary" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft-island">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Total Invoiced</span>
            <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Receipt className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-foreground mt-2">
            {formatCurrency(totalInvoiced)}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            {invoices.length} commercial billing documents
          </p>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft-island">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Collected Revenue</span>
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-emerald-600 mt-2">
            {formatCurrency(totalCollected)}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Settled via bank transfers & checks
          </p>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft-island">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Pending Collection</span>
            <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-amber-600 mt-2">
            {formatCurrency(totalPending)}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Within active credit terms
          </p>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft-island">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Overdue Receivables</span>
            <div className="h-8 w-8 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-rose-600 mt-2">
            {formatCurrency(overdueAmount)}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">
            Requires dunning collection follow-up
          </p>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="w-full md:w-80">
            <SearchInput
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              placeholder="Search by invoice # or customer..."
            />
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => {
                  setStatusFilter(f.value);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  statusFilter === f.value
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-3xl border border-border/70 bg-card shadow-soft-island overflow-hidden">
        <DataTable
          columns={columns}
          data={paginatedInvoices}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRowClick={(inv) => navigate(`/demo/invoices/${inv.id}`)}
          emptyState={
            <div className="py-12 text-center text-xs text-muted-foreground">
              No commercial invoices match the selected filter.
            </div>
          }
        />
        {totalPages > 1 && (
          <div className="p-4 border-t border-border/60">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sortedInvoices.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <ConfirmDeleteModal
          isOpen={true}
          title="Delete Invoice"
          message={`Are you sure you want to delete invoice ${deleteTarget.invoiceNumber} for ${deleteTarget.customerName}? This action cannot be undone.`}
          onConfirm={() => {
            deleteInvoice(deleteTarget.id);
            setDeleteTarget(null);
          }}
          onClose={() => setDeleteTarget(null)}
        />
      )}

      {/* Record Payment Modal */}
      {paymentTarget && (
        <RecordPaymentModal
          isOpen={true}
          invoice={paymentTarget}
          onConfirm={(amount, method) => {
            recordPaymentForInvoice(paymentTarget.id, amount, method);
            setPaymentTarget(null);
          }}
          onClose={() => setPaymentTarget(null)}
        />
      )}
    </div>
  );
};
