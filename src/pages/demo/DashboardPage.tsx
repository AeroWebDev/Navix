import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  Receipt,
  Boxes,
  AlertTriangle,
  ArrowUpRight,
  ShoppingCart,
  Users,
  Building2,
  CreditCard,
} from 'lucide-react';
import { useDemoData } from '@/context/DemoDataContext';
import { StatCard } from '@/components/common/StatCard';
import { RevenueChart, MonthlyFinancialData } from '@/components/charts/RevenueChart';
import { ExpensePieChart, ExpenseCategoryData } from '@/components/charts/ExpensePieChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/utils/formatters';

export const DashboardPage: React.FC = () => {
  const { sales, expenses, invoices, products, customers, suppliers } = useDemoData();

  // Financial aggregates
  const totalRevenue = useMemo(
    () => sales.reduce((acc, s) => acc + s.grandTotal, 0),
    [sales]
  );

  const totalExpenses = useMemo(
    () => expenses.reduce((acc, e) => acc + e.amount, 0),
    [expenses]
  );

  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  const outstandingInvoicesAmount = useMemo(
    () =>
      invoices
        .filter((i) => i.status === 'pending' || i.status === 'overdue')
        .reduce((acc, i) => acc + i.total, 0),
    [invoices]
  );

  const lowStockProducts = useMemo(
    () => products.filter((p) => p.stockQuantity <= p.minStockLevel),
    [products]
  );

  // Monthly Revenue vs Expenses Chart Data
  const monthlyData: MonthlyFinancialData[] = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar'];
    return months.map((m, idx) => {
      const monthPrefix = `2025-0${idx + 1}`;
      const rev = sales
        .filter((s) => s.date.startsWith(monthPrefix))
        .reduce((sum, s) => sum + s.grandTotal, 0);
      const exp = expenses
        .filter((e) => e.date.startsWith(monthPrefix))
        .reduce((sum, e) => sum + e.amount, 0);
      return {
        month: m,
        revenue: Math.round(rev),
        expenses: Math.round(exp),
        profit: Math.round(rev - exp),
      };
    });
  }, [sales, expenses]);

  // Expense by Category Breakdown Data
  const categoryData: ExpenseCategoryData[] = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    expenses.forEach((e) => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({
        name,
        value: Math.round(value),
      }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  // Recent 5 Sales
  const recentSales = useMemo(() => sales.slice(0, 5), [sales]);

  // Recent 5 Invoices
  const recentInvoices = useMemo(() => invoices.slice(0, 5), [invoices]);

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Executive Financial Overview
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Real-time balance sheet metrics, operating cash flow, and live inventory status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/demo/sales">
            <Button size="sm" className="gap-1.5 text-xs font-semibold shadow-xs">
              <ShoppingCart className="h-3.5 w-3.5" />
              New Sale POS
            </Button>
          </Link>
          <Link to="/demo/invoices">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
              <Receipt className="h-3.5 w-3.5" />
              Issue Invoice
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: '+14.2%', isPositive: true, period: 'vs last month' }}
          subtitle={`${sales.length} transactions completed`}
        />

        <StatCard
          label="Total Expenses"
          value={formatCurrency(totalExpenses)}
          icon={<CreditCard className="h-5 w-5" />}
          trend={{ value: '-3.1%', isPositive: true, period: 'budget variance' }}
          subtitle={`${expenses.length} expense entries`}
        />

        <StatCard
          label="Net Profit"
          value={formatCurrency(netProfit)}
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{
            value: `${profitMargin.toFixed(1)}%`,
            isPositive: netProfit >= 0,
            period: 'net margin',
          }}
          subtitle={netProfit >= 0 ? 'Healthy operating margin' : 'Cash outflow exceeded sales'}
        />

        <StatCard
          label="Outstanding Receivables"
          value={formatCurrency(outstandingInvoicesAmount)}
          icon={<Receipt className="h-5 w-5" />}
          trend={{ value: 'Net-30', isPositive: false, period: 'due soon' }}
          subtitle={`${invoices.filter((i) => i.status === 'pending' || i.status === 'overdue').length} open customer invoices`}
        />
      </div>

      {/* Secondary Quick Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-border bg-card flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
            <Boxes className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground font-medium">Catalog SKUs</p>
            <p className="text-base font-bold text-foreground">{products.length} Products</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-card flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground font-medium">Active Clients</p>
            <p className="text-base font-bold text-foreground">{customers.length} Customers</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-card flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground font-medium">Approved Suppliers</p>
            <p className="text-base font-bold text-foreground">{suppliers.length} Vendors</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-border bg-card flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground font-medium">Low Stock Alerts</p>
            <p className="text-base font-bold text-amber-600 dark:text-amber-400">
              {lowStockProducts.length} Items Below Min
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section: Revenue Bar Chart & Expense Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Revenue vs Expenses (Col 8) */}
        <Card className="lg:col-span-8 shadow-xs border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/70">
            <div>
              <CardTitle className="text-base font-bold text-foreground">
                Revenue vs. Operating Expenses (Q1 2025)
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Monthly gross billings compared to total commercial expenditures.
              </p>
            </div>
            <Badge variant="outline" className="text-[10px] uppercase font-semibold">
              Monthly
            </Badge>
          </CardHeader>
          <CardContent className="pt-4">
            <RevenueChart data={monthlyData} height={300} />
          </CardContent>
        </Card>

        {/* Expense Category Breakdown (Col 4) */}
        <Card className="lg:col-span-4 shadow-xs border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/70">
            <div>
              <CardTitle className="text-base font-bold text-foreground">
                Expense Distribution
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Breakdown by operating cost centers.
              </p>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <ExpensePieChart data={categoryData} height={300} />
          </CardContent>
        </Card>
      </div>

      {/* Tables Section: Recent Transactions & Invoices & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Sales Ledger (Col 6) */}
        <Card className="lg:col-span-6 shadow-xs border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/70">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-bold text-foreground">
                Recent Sales Transactions
              </CardTitle>
            </div>
            <Link
              to="/demo/sales"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              View All Sales
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border text-xs">
              {recentSales.map((sale) => (
                <div
                  key={sale.id}
                  className="p-3.5 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-foreground">{sale.invoiceNumber}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {sale.customerName} • {formatDate(sale.date)}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-bold text-foreground">{formatCurrency(sale.grandTotal)}</p>
                    <Badge
                      variant={
                        sale.paymentStatus === 'paid'
                          ? 'success'
                          : sale.paymentStatus === 'pending'
                          ? 'warning'
                          : 'destructive'
                      }
                      className="text-[9px] uppercase font-semibold"
                    >
                      {sale.paymentStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Invoices & Low Stock Column (Col 6) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Recent Invoices Mini Table */}
          <Card className="shadow-xs border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/70">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-bold text-foreground">
                  Recent Invoices
                </CardTitle>
              </div>
              <Link
                to="/demo/invoices"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Invoices Ledger
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border text-xs">
                {recentInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-3.5 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">{inv.invoiceNumber}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {inv.customerName} • Due {formatDate(inv.dueDate)}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-bold text-foreground">{formatCurrency(inv.total)}</p>
                      <Badge
                        variant={
                          inv.status === 'paid'
                            ? 'success'
                            : inv.status === 'pending'
                            ? 'warning'
                            : inv.status === 'overdue'
                            ? 'destructive'
                            : 'outline'
                        }
                        className="text-[9px] uppercase font-semibold"
                      >
                        {inv.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alerts List */}
          <Card className="shadow-xs border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/70">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <CardTitle className="text-sm font-bold text-foreground">
                  Reorder Threshold Alerts ({lowStockProducts.length})
                </CardTitle>
              </div>
              <Link
                to="/demo/inventory"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Inventory Control
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border text-xs">
                {lowStockProducts.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="p-3 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <p className="font-semibold text-foreground">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        SKU: {p.sku} • Supplier: {p.supplierName}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        {p.stockQuantity} / min {p.minStockLevel} {p.unit}s
                      </span>
                      <div>
                        <Badge
                          variant={p.stockQuantity === 0 ? 'destructive' : 'warning'}
                          className="text-[9px]"
                        >
                          {p.stockQuantity === 0 ? 'Out of Stock' : 'Low Stock'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
