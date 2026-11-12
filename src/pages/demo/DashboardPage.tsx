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
import { useAuth } from '@/context/AuthContext';
import { StatCard } from '@/components/common/StatCard';
import { RevenueChart, MonthlyFinancialData } from '@/components/charts/RevenueChart';
import { ExpensePieChart, ExpenseCategoryData } from '@/components/charts/ExpensePieChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { BankLiquidityCard } from '@/components/dashboard/BankLiquidityCard';
import { ProductStatisticsCard } from '@/components/dashboard/ProductStatisticsCard';
import { ReceivablesAgingCard } from '@/components/dashboard/ReceivablesAgingCard';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
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
      {/* Top Welcome & Quick Actions Bar - matching reference aesthetic */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Executive Financial Overview
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              NAVIX Enterprise
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Welcome back, {user?.name || 'Alexander'} — Real-time balance sheet metrics, operating cash flow, and live inventory status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Date range capsule indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card border border-border/70 text-xs font-semibold text-foreground shadow-xs">
            <span>📅 01 Jan, 2025 – 31 Mar, 2025</span>
          </div>

          <Link to="/demo/sales">
            <Button size="sm" className="gap-1.5 text-xs font-bold bg-accent hover:bg-accent/90 text-white rounded-full px-4 shadow-sm">
              <ShoppingCart className="h-3.5 w-3.5" />
              + New Sale POS
            </Button>
          </Link>
          <Link to="/demo/invoices">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold rounded-full px-4">
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
          highlighted={true}
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

      {/* Main Multi-Column Section Inspired by Reference Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Monthly Revenue vs Expenses Chart */}
          <Card className="shadow-soft-island border-border/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50">
              <div>
                <CardTitle className="text-base font-bold text-foreground">
                  Revenue & Operating Cash Flow (Q1 2025)
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Monthly gross billings compared to total commercial expenditures.
                </p>
              </div>
              <Badge variant="outline" className="text-[10px] uppercase font-bold rounded-full">
                Q1 Financials
              </Badge>
            </CardHeader>
            <CardContent className="pt-4">
              <RevenueChart data={monthlyData} height={280} />
            </CardContent>
          </Card>

          {/* Quick Metrics Island */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl border border-border/60 bg-card flex items-center gap-3 shadow-soft-island">
              <div className="h-9 w-9 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                <Boxes className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-semibold">Catalog SKUs</p>
                <p className="text-base font-extrabold text-foreground">{products.length} Products</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-border/60 bg-card flex items-center gap-3 shadow-soft-island">
              <div className="h-9 w-9 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-semibold">Active Clients</p>
                <p className="text-base font-extrabold text-foreground">{customers.length} Customers</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-border/60 bg-card flex items-center gap-3 shadow-soft-island">
              <div className="h-9 w-9 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-semibold">Approved Suppliers</p>
                <p className="text-base font-extrabold text-foreground">{suppliers.length} Vendors</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-border/60 bg-card flex items-center gap-3 shadow-soft-island">
              <div className="h-9 w-9 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-semibold">Low Stock Alerts</p>
                <p className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                  {lowStockProducts.length} Below Min
                </p>
              </div>
            </div>
          </div>

          {/* Operating Cost Distribution & Expense Breakdown */}
          <Card className="shadow-soft-island border-border/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50">
              <div>
                <CardTitle className="text-base font-bold text-foreground">
                  Operating Cost Distribution & Expense Breakdown
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Breakdown across operating cost centers and vendor allocations.
                </p>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <ExpensePieChart data={categoryData} height={260} />
            </CardContent>
          </Card>

          {/* Recent Sales Ledger */}
          <Card className="rounded-3xl shadow-soft-island border-border/60 overflow-hidden">
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
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Real Commercial Bank & Cash Liquidity Card */}
          <BankLiquidityCard />

          {/* Real Product Inventory Valuation & Category Breakdown */}
          <ProductStatisticsCard />

          {/* Real A/R Aging & Customer Balances */}
          <ReceivablesAgingCard />

          {/* Recent Invoices Mini Table */}
          <Card className="rounded-3xl shadow-soft-island border-border/60 overflow-hidden">
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
          <Card className="rounded-3xl shadow-soft-island border-border/60 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/70">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <CardTitle className="text-sm font-bold text-foreground">
                  Reorder Threshold Alerts ({lowStockProducts.length})
                </CardTitle>
              </div>
              <Link
                to="/demo/products"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                Inventory Catalogue
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border text-xs">
                {lowStockProducts.slice(0, 4).map((p) => (
                  <Link
                    key={p.id}
                    to={`/demo/products/${p.id}`}
                    className="p-3 flex items-center justify-between hover:bg-muted/40 transition-colors group cursor-pointer block"
                  >
                    <div className="space-y-0.5">
                      <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{p.name}</p>
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
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
