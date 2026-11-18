import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Trash2,
  FileCheck2,
  Coins,
  CreditCard,
  Building,
  Eye,
} from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';
import { Expense, ExpenseCategory } from '@/types/expense';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { SearchInput } from '@/components/common/SearchInput';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/utils/formatters';

const PAGE_SIZE = 10;

const ALL_CATEGORIES: ('All' | ExpenseCategory)[] = [
  'All',
  'Rent',
  'Salaries',
  'Electricity & Utilities',
  'Transportation',
  'Marketing & Ads',
  'Maintenance',
  'Office Supplies',
  'Software Subscriptions',
  'Other',
];

export const ExpensesListPage: React.FC = () => {
  const { expenses, deleteExpense } = useExpenses();
  const navigate = useNavigate();

  // Search, filter & pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ExpenseCategory>('All');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);

  // Financial aggregates
  const { totalAmount, taxDeductibleAmount, topCategory } = useMemo(() => {
    let total = 0;
    let deductible = 0;
    const catMap: Record<string, number> = {};

    expenses.forEach((e) => {
      total += e.amount;
      if (e.taxDeductible) {
        deductible += e.amount;
      }
      catMap[e.category] = (catMap[e.category] || 0) + e.amount;
    });

    let topCatName = 'N/A';
    let topCatAmount = 0;
    Object.entries(catMap).forEach(([cat, val]) => {
      if (val > topCatAmount) {
        topCatAmount = val;
        topCatName = cat;
      }
    });

    return {
      totalAmount: total,
      taxDeductibleAmount: deductible,
      topCategory: { name: topCatName, amount: topCatAmount },
    };
  }, [expenses]);

  // Filter & sort logic
  const filteredExpenses = useMemo(() => {
    return expenses.filter((exp) => {
      // Search matching
      const matchesSearch =
        !searchQuery ||
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.paidTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.expenseNumber.toLowerCase().includes(searchQuery.toLowerCase());

      // Category matching
      const matchesCategory =
        selectedCategory === 'All' || exp.category === selectedCategory;

      // Payment method matching
      const matchesPayment =
        paymentMethodFilter === 'all' || exp.paymentMethod === paymentMethodFilter;

      return matchesSearch && matchesCategory && matchesPayment;
    });
  }, [expenses, searchQuery, selectedCategory, paymentMethodFilter]);

  // Sort
  const sortedExpenses = useMemo(() => {
    return [...filteredExpenses].sort((a, b) => {
      let aVal = a[sortKey as keyof Expense];
      let bVal = b[sortKey as keyof Expense];

      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? (aVal as string).localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal as string);
      }
      if (typeof aVal === 'number') {
        return sortDirection === 'asc'
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number);
      }
      return 0;
    });
  }, [filteredExpenses, sortKey, sortDirection]);

  // Paginate
  const totalPages = Math.ceil(sortedExpenses.length / PAGE_SIZE);
  const paginatedExpenses = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedExpenses.slice(start, start + PAGE_SIZE);
  }, [sortedExpenses, currentPage]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteExpense(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  // Table columns definition
  const columns: Column<Expense>[] = [
    {
      key: 'expenseNumber',
      header: 'Expense #',
      sortable: true,
      render: (exp) => (
        <span className="font-mono font-bold text-foreground">{exp.expenseNumber}</span>
      ),
    },
    {
      key: 'title',
      header: 'Description & Vendor',
      sortable: true,
      render: (exp) => (
        <div className="space-y-0.5">
          <p className="font-semibold text-foreground">{exp.title}</p>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Building className="h-3 w-3" /> {exp.paidTo}
            {exp.referenceNumber && <span>• Ref: {exp.referenceNumber}</span>}
          </p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (exp) => (
        <Badge variant="outline" className="text-xs font-semibold rounded-full px-2.5">
          {exp.category}
        </Badge>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      render: (exp) => (
        <span className="text-muted-foreground text-xs">{formatDate(exp.date)}</span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (exp) => (
        <div className="text-right">
          <span className="font-mono font-extrabold text-foreground text-sm">
            {formatCurrency(exp.amount)}
          </span>
          {exp.taxDeductible && (
            <span className="block text-[10px] text-emerald-600 font-semibold">
              Tax Deductible
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'paymentMethod',
      header: 'Method',
      sortable: true,
      render: (exp) => {
        const methodLabels: Record<string, string> = {
          bank_transfer: 'Bank Wire',
          company_card: 'Company Card',
          cash: 'Cash / Vault',
          credit_card: 'Credit Line',
        };
        return (
          <span className="text-xs text-muted-foreground capitalize">
            {methodLabels[exp.paymentMethod] || exp.paymentMethod}
          </span>
        );
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (exp) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/demo/expenses/${exp.id}`);
            }}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteTarget(exp);
            }}
            className="h-8 w-8 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-50"
            title="Delete Expense"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Operating Expenses & Payables
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Log, categorize and audit commercial expenditures, overhead, and vendor payments.
          </p>
        </div>

        <Link to="/demo/expenses/new">
          <Button className="gap-2 bg-accent hover:bg-accent/90 text-white rounded-full font-bold px-5 shadow-sm">
            <Plus className="h-4 w-4" />
            Record Expense
          </Button>
        </Link>
      </div>

      {/* Aggregate Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold">Total Operating Outflow</span>
            <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Coins className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground">
            {formatCurrency(totalAmount)}
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            {expenses.length} total logged expenses
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold">Tax-Deductible Costs</span>
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <FileCheck2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
            {formatCurrency(taxDeductibleAmount)}
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            {((taxDeductibleAmount / (totalAmount || 1)) * 100).toFixed(0)}% eligible for corporate deduction
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-bold">Top Cost Center</span>
            <div className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground truncate">
            {topCategory.name}
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            {formatCurrency(topCategory.amount)} spent in Q1
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pb-1">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-accent text-white shadow-xs font-bold'
                : 'bg-card border border-border/70 text-muted-foreground hover:bg-muted/70 hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:max-w-md">
          <SearchInput
            placeholder="Search expenses by title, vendor, or number..."
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={paymentMethodFilter}
            onChange={(e) => {
              setPaymentMethodFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 px-3 rounded-2xl border border-input bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-accent w-full sm:w-auto"
          >
            <option value="all">All Payment Methods</option>
            <option value="bank_transfer">Bank Wire</option>
            <option value="company_card">Company Card</option>
            <option value="cash">Petty Cash</option>
            <option value="credit_card">Credit Line</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-3xl border border-border/60 bg-card overflow-hidden shadow-soft-island">
        <DataTable<Expense>
          columns={columns}
          data={paginatedExpenses}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRowClick={(item: Expense) => navigate(`/demo/expenses/${item.id}`)}
        />

        {totalPages > 1 && (
          <div className="p-4 border-t border-border/60 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–
              {Math.min(currentPage * PAGE_SIZE, sortedExpenses.length)} of {sortedExpenses.length} entries
            </span>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sortedExpenses.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Expense Record"
        message={`Are you sure you want to permanently delete expense "${deleteTarget?.title}" (${deleteTarget?.expenseNumber})? This will update operating cash flow aggregates.`}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};
