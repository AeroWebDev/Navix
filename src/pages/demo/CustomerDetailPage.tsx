import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Building2,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  Receipt,
  AlertCircle,
  FileText,
  Plus,
} from 'lucide-react';
import { useCustomers } from '@/hooks/useCustomers';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/utils/formatters';

type TabKey = 'overview' | 'sales' | 'invoices';

export const CustomerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    customers,
    deleteCustomer,
    getSalesByCustomerId,
    getInvoicesByCustomerId,
  } = useCustomers();

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <AlertCircle className="h-12 w-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-foreground">Customer Not Found</h2>
        <p className="text-xs text-muted-foreground">
          The requested customer could not be found in the active customer directory.
        </p>
        <Link to="/demo/customers">
          <Button variant="outline" size="sm" className="rounded-full px-5">
            Return to Directory
          </Button>
        </Link>
      </div>
    );
  }

  const customerSales = getSalesByCustomerId(customer.id);
  const customerInvoices = getInvoicesByCustomerId(customer.id);

  const handleDelete = () => {
    deleteCustomer(customer.id);
    navigate('/demo/customers');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <Link
            to="/demo/customers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Customer Directory
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {customer.name}
            </h1>
            <StatusBadge status={customer.status} />
            <Badge variant="outline" className="capitalize text-xs font-semibold rounded-full">
              {customer.type}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Account #{customer.customerNumber} • Enrolled {formatDate(customer.createdAt)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link to={`/demo/sales/new`}>
            <Button
              size="sm"
              className="rounded-full text-xs gap-1.5 bg-accent hover:bg-accent/90 text-white shadow-soft-island font-semibold"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Sale POS</span>
            </Button>
          </Link>

          <Link to={`/demo/customers/${customer.id}/edit`}>
            <Button variant="outline" size="sm" className="rounded-full text-xs gap-1.5">
              <Edit className="h-3.5 w-3.5" />
              <span>Edit</span>
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteModalOpen(true)}
            className="rounded-full text-xs gap-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900/40"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </Button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-2 p-1 bg-muted/40 rounded-full border border-border/50 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-1.5 px-4 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'overview'
              ? 'bg-card text-accent shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <UserCheck className="h-3.5 w-3.5" />
          <span>Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sales')}
          className={`flex-1 py-1.5 px-4 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'sales'
              ? 'bg-card text-accent shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          <span>Sales History ({customerSales.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('invoices')}
          className={`flex-1 py-1.5 px-4 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'invoices'
              ? 'bg-card text-accent shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Receipt className="h-3.5 w-3.5" />
          <span>Invoices ({customerInvoices.length})</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Total Orders
              </span>
              <span className="text-xl font-extrabold text-foreground mt-1 block font-mono">
                {customer.ordersCount || customerSales.length} Transactions
              </span>
            </div>

            <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Lifetime Value (LTV)
              </span>
              <span className="text-xl font-extrabold text-foreground mt-1 block font-mono">
                {formatCurrency(customer.totalSpent)}
              </span>
            </div>

            <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Outstanding Receivable
              </span>
              <span
                className={`text-xl font-extrabold mt-1 block font-mono ${
                  customer.outstandingBalance > 0
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {formatCurrency(customer.outstandingBalance)}
              </span>
            </div>
          </div>

          {/* Detailed Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Details Card */}
            <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider pb-2 border-b border-border/40">
                <UserCheck className="h-4 w-4" />
                <span>Contact Specifications</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 py-1">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground w-20">Email:</span>
                  <span className="font-semibold text-foreground">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground w-20">Phone:</span>
                  <span className="font-semibold text-foreground">
                    {customer.phone || 'Not recorded'}
                  </span>
                </div>
                <div className="flex items-start gap-2 py-1">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground w-20">Address:</span>
                  <span className="font-medium text-foreground">{customer.address}</span>
                </div>
              </div>
            </div>

            {/* Entity Identification Card */}
            <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider pb-2 border-b border-border/40">
                <Building2 className="h-4 w-4" />
                <span>Legal Identification</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Account Classification</span>
                  <span className="font-semibold text-foreground capitalize">
                    {customer.type} Client
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Corporate Name</span>
                  <span className="font-semibold text-foreground">
                    {customer.companyName || 'N/A (Individual)'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Tax Registration / VAT</span>
                  <span className="font-mono font-semibold text-foreground">
                    {customer.taxNumber || 'Unregistered'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Account Status</span>
                  <StatusBadge status={customer.status} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sales History */}
      {activeTab === 'sales' && (
        <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <h3 className="text-sm font-bold text-foreground">
              Sales Records for {customer.name}
            </h3>
            <span className="text-xs text-muted-foreground">
              {customerSales.length} total orders recorded
            </span>
          </div>

          {customerSales.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <ShoppingCart className="h-8 w-8 text-muted-foreground mx-auto opacity-50" />
              <p className="text-xs font-semibold text-foreground">No sales orders found</p>
              <p className="text-[11px] text-muted-foreground">
                This client has not placed any point-of-sale orders yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs" data-testid="customer-sales-table">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground font-semibold">
                    <th className="pb-2.5">Invoice #</th>
                    <th className="pb-2.5">Date</th>
                    <th className="pb-2.5">Items</th>
                    <th className="pb-2.5 text-right">Grand Total</th>
                    <th className="pb-2.5">Payment Method</th>
                    <th className="pb-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {customerSales.map((sale) => (
                    <tr
                      key={sale.id}
                      onClick={() => navigate(`/demo/sales/${sale.id}`)}
                      className="hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <td className="py-3 font-mono font-bold text-accent hover:underline">
                        {sale.invoiceNumber}
                      </td>
                      <td className="py-3 text-muted-foreground">{formatDate(sale.date)}</td>
                      <td className="py-3 text-muted-foreground">
                        {sale.items.length} {sale.items.length === 1 ? 'item' : 'items'}
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-foreground">
                        {formatCurrency(sale.grandTotal)}
                      </td>
                      <td className="py-3 capitalize text-muted-foreground">
                        {sale.paymentMethod.replace('_', ' ')}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={sale.paymentStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Invoices */}
      {activeTab === 'invoices' && (
        <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <h3 className="text-sm font-bold text-foreground">
              Billing Invoices for {customer.name}
            </h3>
            <span className="text-xs text-muted-foreground">
              {customerInvoices.length} invoices generated
            </span>
          </div>

          {customerInvoices.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <FileText className="h-8 w-8 text-muted-foreground mx-auto opacity-50" />
              <p className="text-xs font-semibold text-foreground">No invoices generated</p>
              <p className="text-[11px] text-muted-foreground">
                There are no open or settled billing invoices for this customer.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground font-semibold">
                    <th className="pb-2.5">Invoice #</th>
                    <th className="pb-2.5">Issue Date</th>
                    <th className="pb-2.5">Due Date</th>
                    <th className="pb-2.5 text-right">Total Amount</th>
                    <th className="pb-2.5">Terms</th>
                    <th className="pb-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {customerInvoices.map((inv) => (
                    <tr
                      key={inv.id}
                      onClick={() => navigate(`/demo/invoices`)}
                      className="hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <td className="py-3 font-mono font-bold text-accent hover:underline">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3 text-muted-foreground">{formatDate(inv.issueDate)}</td>
                      <td className="py-3 text-muted-foreground">{formatDate(inv.dueDate)}</td>
                      <td className="py-3 text-right font-mono font-bold text-foreground">
                        {formatCurrency(inv.total)}
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {inv.paymentTerms}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={inv.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Customer Account"
        message={`Are you sure you want to delete ${customer.name}? This will remove all directory references.`}
      />
    </div>
  );
};
