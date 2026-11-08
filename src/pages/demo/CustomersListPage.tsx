import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Eye,
  Trash2,
  Edit,
  UserCheck,
  Building2,
  Filter,
  Users,
  CircleDollarSign,
  Clock,
} from 'lucide-react';
import { useCustomers } from '@/hooks/useCustomers';
import { Customer } from '@/types/customer';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { SearchInput } from '@/components/common/SearchInput';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatters';

const PAGE_SIZE = 10;

export const CustomersListPage: React.FC = () => {
  const { customers, deleteCustomer } = useCustomers();
  const navigate = useNavigate();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);

  // Filter & sort logic
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      // Search matching by Name, Email, or Customer Number
      const matchesSearch =
        !searchQuery ||
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.customerNumber.toLowerCase().includes(searchQuery.toLowerCase());

      // Type matching
      const matchesType =
        typeFilter === 'all' || customer.type === typeFilter;

      // Status matching
      const matchesStatus =
        statusFilter === 'all' || customer.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [customers, searchQuery, typeFilter, statusFilter]);

  // Sorted customers
  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      let valA: any = a[sortKey as keyof Customer];
      let valB: any = b[sortKey as keyof Customer];

      if (typeof valA === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(a[sortKey as keyof Customer] as string);
      }
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredCustomers, sortKey, sortDirection]);

  // Paginated customers
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedCustomers.slice(start, start + PAGE_SIZE);
  }, [sortedCustomers, currentPage]);

  const totalPages = Math.ceil(filteredCustomers.length / PAGE_SIZE) || 1;

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
      deleteCustomer(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  // KPI Calculations
  const totalCount = customers.length;
  const businessCount = customers.filter((c) => c.type === 'business').length;
  const totalRevenue = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const totalReceivables = customers.reduce(
    (acc, c) => acc + c.outstandingBalance,
    0
  );

  const columns: Column<Customer>[] = [
    {
      key: 'name',
      header: 'Customer / Entity',
      sortable: true,
      render: (c) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            {c.type === 'business' ? (
              <Building2 className="h-3.5 w-3.5 text-accent shrink-0" />
            ) : (
              <UserCheck className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            )}
            <span className="hover:underline">{c.name}</span>
          </div>
          <span className="block text-[11px] font-mono text-muted-foreground">
            {c.customerNumber} {c.companyName ? `• ${c.companyName}` : ''}
          </span>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Contact Info',
      sortable: true,
      render: (c) => (
        <div className="text-[11px] space-y-0.5">
          <p className="text-foreground font-medium">{c.email}</p>
          <p className="text-muted-foreground">{c.phone || 'No phone'}</p>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Category',
      sortable: true,
      render: (c) => (
        <Badge
          variant="outline"
          className="capitalize text-[10px] font-semibold rounded-full"
        >
          {c.type}
        </Badge>
      ),
    },
    {
      key: 'ordersCount',
      header: 'Orders',
      sortable: true,
      className: 'text-center',
      render: (c) => (
        <span className="font-semibold text-muted-foreground font-mono">
          {c.ordersCount}
        </span>
      ),
    },
    {
      key: 'totalSpent',
      header: 'Lifetime Spent',
      sortable: true,
      className: 'text-right font-mono',
      render: (c) => (
        <span className="font-bold text-foreground">
          {formatCurrency(c.totalSpent)}
        </span>
      ),
    },
    {
      key: 'outstandingBalance',
      header: 'Receivable',
      sortable: true,
      className: 'text-right font-mono',
      render: (c) => (
        <span
          className={`font-bold ${
            c.outstandingBalance > 0
              ? 'text-rose-600 dark:text-rose-400'
              : 'text-muted-foreground'
          }`}
        >
          {formatCurrency(c.outstandingBalance)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (c) => <StatusBadge status={c.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (c) => (
        <div
          className="flex items-center justify-end gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/demo/customers/${c.id}`)}
            className="h-8 w-8 p-0 rounded-full hover:bg-accent/10 hover:text-accent text-muted-foreground"
            title="View Profile"
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/demo/customers/${c.id}/edit`)}
            className="h-8 w-8 p-0 rounded-full hover:bg-accent/10 hover:text-accent text-muted-foreground"
            title="Edit Customer"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteTarget(c)}
            className="h-8 w-8 p-0 rounded-full hover:bg-rose-50 hover:text-rose-600 text-muted-foreground dark:hover:bg-rose-950/30"
            title="Delete Customer"
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
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Customer Directory
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage corporate accounts, individual clients, sales history, and accounts receivable.
          </p>
        </div>

        <Link to="/demo/customers/new">
          <Button className="rounded-full shadow-soft-island px-5 text-xs font-semibold gap-1.5 h-10">
            <Plus className="h-4 w-4" />
            <span>Add Customer</span>
          </Button>
        </Link>
      </div>

      {/* KPI Metrics Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Directory */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Total Accounts
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5">{totalCount}</p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-accent/15 flex items-center justify-center text-accent">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 2: B2B Accounts */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              B2B Enterprises
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5">{businessCount}</p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-indigo-500/15 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Building2 className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 3: Total Revenue */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Client Revenue
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5 font-mono">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CircleDollarSign className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 4: Outstanding Receivables */}
        <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Receivables Due
            </p>
            <p className="text-xl font-extrabold text-foreground mt-0.5 font-mono text-rose-600 dark:text-rose-400">
              {formatCurrency(totalReceivables)}
            </p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-rose-500/15 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <Clock className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Search, Filter & Controls Toolbar */}
      <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="w-full md:w-80">
          <SearchInput
            placeholder="Search by name, email, or account #..."
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Customer Type Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 rounded-full border border-input bg-card px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent capitalize"
            >
              <option value="all">All Account Types</option>
              <option value="business">Commercial Business (B2B)</option>
              <option value="individual">Individual / Retail</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs">
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
            Showing {filteredCustomers.length} of {customers.length}
          </div>
        </div>
      </div>

      {/* Main DataTable */}
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={paginatedCustomers}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRowClick={(c) => navigate(`/demo/customers/${c.id}`)}
          emptyState={
            <div className="py-12 text-center space-y-3">
              <Users className="h-10 w-10 text-muted-foreground mx-auto opacity-50" />
              <p className="text-sm font-semibold text-foreground">No customer records found</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No accounts match your current search or type filter. Try adjusting your query or register a new customer.
              </p>
            </div>
          }
        />

        {/* Pagination bar */}
        {filteredCustomers.length > PAGE_SIZE && (
          <div className="p-3 rounded-2xl bg-card border border-border/60 shadow-soft-island">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredCustomers.length}
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
        title="Delete Customer Account"
        message={`Are you sure you want to delete customer "${deleteTarget?.name}" (${deleteTarget?.customerNumber})? This action cannot be undone.`}
      />
    </div>
  );
};
