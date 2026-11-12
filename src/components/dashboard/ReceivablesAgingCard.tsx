import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useDemoData } from '@/context/DemoDataContext';
import { formatCurrency } from '@/utils/formatters';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ReceivablesAgingCard: React.FC = () => {
  const { customers, invoices } = useDemoData();

  const { totalReceivable, currentDue, overdue30, overdue60, topDebtors } = useMemo(() => {
    let total = 0;
    let current = 0;
    let over30 = 0;
    let over60 = 0;

    invoices.forEach((inv) => {
      if (inv.status === 'pending' || inv.status === 'overdue') {
        const remaining = inv.total;
        total += remaining;

        const due = new Date(inv.dueDate).getTime();
        const now = new Date('2025-03-31').getTime(); // Q1 benchmark
        const diffDays = Math.floor((now - due) / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) {
          current += remaining;
        } else if (diffDays <= 30) {
          over30 += remaining;
        } else {
          over60 += remaining;
        }
      }
    });

    // Top customers with outstanding balance
    const debtors = customers
      .filter((c) => c.outstandingBalance > 0)
      .sort((a, b) => b.outstandingBalance - a.outstandingBalance)
      .slice(0, 3);

    return {
      totalReceivable: total,
      currentDue: current,
      overdue30: over30,
      overdue60: over60,
      topDebtors: debtors,
    };
  }, [customers, invoices]);

  return (
    <Card className="rounded-3xl border-border/60 shadow-soft-island bg-card flex flex-col justify-between">
      <CardHeader className="flex flex-row items-start justify-between pb-2 border-b border-border/40">
        <div>
          <CardTitle className="text-base font-bold text-foreground">
            A/R Aging & Customer Balances
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Pending customer collections & credit terms
          </p>
        </div>
        <Link
          to="/demo/customers"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
        >
          View All <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Aging Brackets Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-muted-foreground">Aging Distribution</span>
            <span className="font-extrabold text-foreground">{formatCurrency(totalReceivable)} Total</span>
          </div>

          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full"
              style={{ width: `${totalReceivable > 0 ? (currentDue / totalReceivable) * 100 : 70}%` }}
              title="Current (0-30 Days)"
            />
            <div
              className="bg-amber-500 h-full"
              style={{ width: `${totalReceivable > 0 ? (overdue30 / totalReceivable) * 100 : 20}%` }}
              title="1-30 Days Overdue"
            />
            <div
              className="bg-rose-500 h-full"
              style={{ width: `${totalReceivable > 0 ? (overdue60 / totalReceivable) * 100 : 10}%` }}
              title="31+ Days Overdue"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-0.5">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
              Current: {formatCurrency(currentDue)}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />
              1–30d: {formatCurrency(overdue30)}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-rose-500 inline-block" />
              31d+: {formatCurrency(overdue60)}
            </span>
          </div>
        </div>

        {/* Top Debtors List */}
        <div className="space-y-2 pt-2 border-t border-border/50 text-xs">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Highest Outstanding Accounts:
          </p>
          {topDebtors.map((debtor) => (
            <Link
              key={debtor.id}
              to={`/demo/customers/${debtor.id}`}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/40 transition-colors group block"
            >
              <div className="space-y-0.5">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {debtor.name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {debtor.companyName || 'Direct Client'} • {debtor.ordersCount} orders
                </p>
              </div>

              <div className="text-right">
                <span className="font-extrabold text-foreground font-mono">
                  {formatCurrency(debtor.outstandingBalance)}
                </span>
                <span className="block text-[10px] text-amber-600 font-semibold">
                  Payment Due
                </span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
