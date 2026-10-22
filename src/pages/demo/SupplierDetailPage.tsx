import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Building2,
  Truck,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { useSuppliers } from '@/hooks/useSuppliers';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/utils/formatters';

type TabKey = 'overview' | 'purchases';

export const SupplierDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { suppliers, deleteSupplier, getPurchasesBySupplierId } = useSuppliers();

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const supplier = suppliers.find((s) => s.id === id);

  if (!supplier) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <AlertCircle className="h-12 w-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-foreground">Supplier Not Found</h2>
        <p className="text-xs text-muted-foreground">
          The requested vendor record could not be found in current in-memory records.
        </p>
        <Link to="/demo/suppliers">
          <Button variant="outline" size="sm" className="rounded-full px-5">
            Return to Directory
          </Button>
        </Link>
      </div>
    );
  }

  const supplierPurchases = getPurchasesBySupplierId(supplier.id);
  const owedAmount = supplier.amountOwed || supplier.outstandingPayable || 0;

  const handleDelete = () => {
    deleteSupplier(supplier.id);
    navigate('/demo/suppliers');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <Link
            to="/demo/suppliers"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Supplier Directory
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {supplier.companyName || supplier.name}
            </h1>
            <StatusBadge status={supplier.status} />
            <Badge variant="outline" className="text-xs font-semibold rounded-full">
              {supplier.category || 'Vendor'}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Supplier #{supplier.supplierNumber} • Terms: {supplier.paymentTerms}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link to={`/demo/purchases/new`}>
            <Button
              size="sm"
              className="rounded-full text-xs gap-1.5 bg-accent hover:bg-accent/90 text-white shadow-soft-island font-semibold"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create Purchase Order</span>
            </Button>
          </Link>

          <Link to={`/demo/suppliers/${supplier.id}/edit`}>
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
      <div className="flex items-center gap-2 p-1 bg-muted/40 rounded-full border border-border/50 max-w-xs">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-1.5 px-4 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'overview'
              ? 'bg-card text-accent shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Building2 className="h-3.5 w-3.5" />
          <span>Overview</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('purchases')}
          className={`flex-1 py-1.5 px-4 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'purchases'
              ? 'bg-card text-accent shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Truck className="h-3.5 w-3.5" />
          <span>Purchase History ({supplierPurchases.length})</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Total Orders Placed
              </span>
              <span className="text-xl font-extrabold text-foreground mt-1 block font-mono">
                {supplierPurchases.length} Purchase Orders
              </span>
            </div>

            <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Lifetime Procurement
              </span>
              <span className="text-xl font-extrabold text-foreground mt-1 block font-mono">
                {formatCurrency(supplier.totalPurchased || 0)}
              </span>
            </div>

            <div className="p-4 rounded-3xl bg-card border border-border/60 shadow-soft-island">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Outstanding Payables Due
              </span>
              <span
                className={`text-xl font-extrabold mt-1 block font-mono ${
                  owedAmount > 0
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {formatCurrency(owedAmount)}
              </span>
            </div>
          </div>

          {/* Detailed Supplier Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Details Card */}
            <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider pb-2 border-b border-border/40">
                <Truck className="h-4 w-4" />
                <span>Representative & Contact</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 py-1">
                  <span className="text-muted-foreground w-24">Contact Person:</span>
                  <span className="font-semibold text-foreground">
                    {supplier.contactPerson || 'Purchasing Team'}
                  </span>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground w-20">Email:</span>
                  <span className="font-semibold text-foreground">{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground w-20">Phone:</span>
                  <span className="font-semibold text-foreground">
                    {supplier.phone || 'Not provided'}
                  </span>
                </div>
                <div className="flex items-start gap-2 py-1">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground w-20">Facility:</span>
                  <span className="font-medium text-foreground">{supplier.address}</span>
                </div>
              </div>
            </div>

            {/* Commercial Terms & Legal Identification */}
            <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider pb-2 border-b border-border/40">
                <Building2 className="h-4 w-4" />
                <span>Commercial Terms & Tax</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Payment Terms</span>
                  <span className="font-semibold text-foreground">
                    {supplier.paymentTerms}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Product Category</span>
                  <span className="font-semibold text-foreground">
                    {supplier.category || 'General Supplies'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Tax Registration / VAT</span>
                  <span className="font-mono font-semibold text-foreground">
                    {supplier.taxNumber || 'Unregistered'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Account Status</span>
                  <StatusBadge status={supplier.status} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Purchase History */}
      {activeTab === 'purchases' && (
        <div className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft-island space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <h3 className="text-sm font-bold text-foreground">
              Purchase Orders for {supplier.companyName || supplier.name}
            </h3>
            <span className="text-xs text-muted-foreground">
              {supplierPurchases.length} total orders recorded
            </span>
          </div>

          {supplierPurchases.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Truck className="h-8 w-8 text-muted-foreground mx-auto opacity-50" />
              <p className="text-xs font-semibold text-foreground">No purchase orders found</p>
              <p className="text-[11px] text-muted-foreground">
                No inventory purchase orders have been issued to this vendor yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs" data-testid="supplier-purchases-table">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground font-semibold">
                    <th className="pb-2.5">PO #</th>
                    <th className="pb-2.5">Order Date</th>
                    <th className="pb-2.5">Items</th>
                    <th className="pb-2.5 text-right">Grand Total</th>
                    <th className="pb-2.5">Fulfillment</th>
                    <th className="pb-2.5">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {supplierPurchases.map((po) => (
                    <tr
                      key={po.id}
                      onClick={() => navigate(`/demo/purchases/${po.id}`)}
                      className="hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <td className="py-3 font-mono font-bold text-accent hover:underline">
                        {po.purchaseOrderNumber}
                      </td>
                      <td className="py-3 text-muted-foreground">{formatDate(po.orderDate)}</td>
                      <td className="py-3 text-muted-foreground">
                        {po.items.length} {po.items.length === 1 ? 'item' : 'items'}
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-foreground">
                        {formatCurrency(po.grandTotal)}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={po.status} />
                      </td>
                      <td className="py-3">
                        <StatusBadge status={po.paymentStatus} />
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
        title="Delete Supplier Account"
        message={`Are you sure you want to delete "${supplier.companyName || supplier.name}"? This action cannot be undone.`}
      />
    </div>
  );
};
