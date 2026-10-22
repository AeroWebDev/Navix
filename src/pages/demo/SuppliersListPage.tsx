import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Eye,
  Trash2,
  Edit,
  Truck,
  Building2,
  Filter,
  CircleDollarSign,
  Clock,
} from 'lucide-react';
import { useSuppliers } from '@/hooks/useSuppliers';
import { Supplier } from '@/types/supplier';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { SearchInput } from '@/components/common/SearchInput';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatters';

const PAGE_SIZE = 10;

export const SuppliersListPage: React.FC = () => {
  const { suppliers, deleteSupplier } = useSuppliers();
  const navigate = useNavigate();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>('companyName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<Supplier | null>(null);

  // Filter & sort logic
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((sup) => {
      const displayName = sup.companyName || sup.name || '';
      const matchesSearch =
        !searchQuery ||
        displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sup.supplierNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sup.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sup.category && sup.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === 'all' || sup.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, searchQuery, statusFilter]);

  // Sorted suppliers
  const sortedSuppliers = useMemo(() => {
    return [...filteredSuppliers].sort((a, b) => {
      const valA = (a.companyName || a.name || '') as string;
      const valB = (b.companyName || b.name || '') as string;

      if (sortKey === 'totalPurchased') {
        const numA = a.totalPurchased || 0;
        const numB = b.totalPurchased || 0;
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      }

      if (sortKey === 'amountOwed') {
        const numA = a.amountOwed || a.outstandingPayable || 0;
        const numB = b.amountOwed || b.outstandingPayable || 0;
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      }

      return sortDirection === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }, [filteredSuppliers, sortKey, sortDirection]);

  // Paginated suppliers
  const paginatedSuppliers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedSuppliers.slice(start, start + PAGE_SIZE);
  }, [sortedSuppliers, currentPage]);

  const totalPages = Math.ceil(filteredSuppliers.length / PAGE_SIZE) || 1;

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
      deleteSupplier(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  // KPI Calculations
  const totalCount = suppliers.length;
  const activeCount = suppliers.filter((s) => s.status === 'active').length;
  const totalProcured = suppliers.reduce((acc, s) => acc + (s.totalPurchased || 0), 0);
  const totalPayables = suppliers.reduce(
    (acc, s) => acc + (s.amountOwed || s.outstandingPayable || 0),
    0
  );

  const columns: Column<Supplier>[] = [
    {
      key: 'companyName',
      header: 'Supplier / Vendor',
      sortable: true,
      render: (s) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Building2 className="h-3.5 w-3.5 text-accent shrink-0" />
            <span className="hover:underline">{s.companyName || s.name}</span>
          </div>
          <span className="block text-[11px] font-mono text-muted-foreground">
            {s.supplierNumber} • Contact: {s.contactPerson || 'Purchasing Desk'}
          </span>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Contact Info',
      sortable: true,
      render: (s) => (
        <div className="text-[11px] space-y-0.5">
          <p className="text-foreground font-medium">{s.email}</p>
          <p className="text-muted-foreground">{s.phone || 'No phone'}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category & Terms',
      render: (s) => (
        <div className="text-[11px] space-y-0.5">
          <Badge variant="outline" className="text-[10px] rounded-full">
            {s.category || 'Vendor'}
          </Badge>
          <span className="block text-muted-foreground">{s.paymentTerms}</span>
        </div>
      ),
    },
    {
      key: 'totalPurchased',
      header: 'Total Procured',
      sortable: true,
      className: 'text-right font-mono',
      render: (s) => (
        <span className="font-bold text-foreground">
          {formatCurrency(s.totalPurchased || 0)}
        </span>
      ),
    },
    {
      key: 'amountOwed',
      header: 'Payables Due',
      sortable: true,
      className: 'text-right font-mono',
      render: (s) => {
        const owed = s.amountOwed || s.outstandingPayable || 0;
        return (
          <span
            className={`font-bold ${
              owed > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-muted-foreground'
            }`}
          >
            {formatCurrency(owed)}
          </span>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (s) => <StatusBadge status={s.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (s) => (
        <div
          className="flex items-center justify-end gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/demo/suppliers/${s.id}`)}
            className="h-8 w-8 p-0 rounded-full hover:bg-accent/10 hover:text-accent text-muted-foreground"
            title="View Vendor Profile"
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/demo/suppliers/${s.id}/edit`)}
            className="h-8 w-8 p-0 rounded-full hover:bg-accent/10 hover:text-accent text-muted-foreground"
            title="Edit Supplier"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteTarget(s)}
            className="h-8 w-8 p-0 rounded-full hover:bg-rose-50 hover:text-rose-600 text-muted-foreground dark:hover:bg-rose-950/30"
            title="Delete Supplier"
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
              Supplier & Vendor Directory
            </h1>
            <Badge variant="outline" className="rounded-full px-2.5 py-0.5 text-xs font-semibold">
              Procurement Desk
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage vendor catalogue contracts, purchasing accounts, payment terms, and accounts payable.
          </p>
        </div>

        <Link to="/demo/suppliers/new">
          <Button className="rounded-full shadow-soft-island px-5 text-xs font-semibold gap-1.5 h-10">
            <Plus className="h-4 w-4" />
            <span>Add Supplier</span>
          </Button>
        </Link>
      </div>

      {/* KPI Metrics Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Directory */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Total Suppliers
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5">{totalCount}</p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-accent/15 flex items-center justify-center text-accent">
            <Building2 className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 2: Active Accounts */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Active Vendors
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5">{activeCount}</p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Truck className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 3: Total Procured */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Total Procured
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5 font-mono">
              {formatCurrency(totalProcured)}
            </p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-accent/15 flex items-center justify-center text-accent">
            <CircleDollarSign className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 4: Outstanding Payables */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Payables Due
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5 font-mono text-rose-600 dark:text-rose-400">
              {formatCurrency(totalPayables)}
            </p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-rose-500/15 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <Clock className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="w-full md:w-80">
          <SearchInput
            placeholder="Search by supplier name, category, email..."
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2">
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
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Result counter badge */}
          <div className="text-[11px] font-semibold text-muted-foreground px-2">
            Showing {filteredSuppliers.length} of {suppliers.length}
          </div>
        </div>
      </div>

      {/* Main DataTable */}
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={paginatedSuppliers}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRowClick={(s) => navigate(`/demo/suppliers/${s.id}`)}
          emptyState={
            <div className="py-12 text-center space-y-3">
              <Truck className="h-10 w-10 text-muted-foreground mx-auto opacity-50" />
              <p className="text-sm font-semibold text-foreground">No suppliers found</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No vendor records match your active search query. Try adjusting your search or register a new vendor.
              </p>
            </div>
          }
        />

        {/* Pagination bar */}
        {filteredSuppliers.length > PAGE_SIZE && (
          <div className="p-3 rounded-2xl bg-card border border-border/60 shadow-soft-island">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredSuppliers.length}
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
        title="Delete Supplier Account"
        message={`Are you sure you want to delete vendor "${deleteTarget?.companyName || deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};
