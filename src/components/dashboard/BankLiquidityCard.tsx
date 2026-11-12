import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Landmark, ArrowUpRight, ArrowDownLeft, Wallet, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface BankAccount {
  id: string;
  name: string;
  type: 'checking' | 'merchant' | 'cash';
  accountNumber: string;
  balance: number;
  status: string;
}

export const BankLiquidityCard: React.FC = () => {
  const accounts: BankAccount[] = [
    {
      id: 'acc-1',
      name: 'Primary Operating Account',
      type: 'checking',
      accountNumber: '•••• 4829',
      balance: 68450.0,
      status: 'Reconciled',
    },
    {
      id: 'acc-2',
      name: 'POS & Card Terminal Clearing',
      type: 'merchant',
      accountNumber: '•••• 1104',
      balance: 18200.0,
      status: 'Daily Auto-Settlement',
    },
    {
      id: 'acc-3',
      name: 'Store Vault & Petty Cash',
      type: 'cash',
      accountNumber: 'Drawer #01',
      balance: 8200.0,
      status: 'Counted Today',
    },
  ];

  const totalLiquid = accounts.reduce((acc, a) => acc + a.balance, 0);

  return (
    <Card className="rounded-3xl border-border/60 shadow-soft-island bg-card overflow-hidden">
      <div className="p-6 bg-gradient-to-br from-[#172A3A] via-[#1E394E] to-[#2E8B70] text-white relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-white/15 flex items-center justify-center">
              <Landmark className="h-4 w-4 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white/80">Cash & Bank Liquidity</p>
              <p className="text-[10px] text-emerald-300 font-medium">3 Commercial Accounts Active</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
            Treasury
          </span>
        </div>

        <div className="mt-4">
          <p className="text-[11px] text-white/70">Total Available Working Capital</p>
          <p className="text-3xl font-extrabold tracking-tight mt-0.5">
            {formatCurrency(totalLiquid)}
          </p>
        </div>
      </div>

      <CardContent className="p-5 space-y-3">
        <div className="divide-y divide-border/60">
          {accounts.map((acc) => (
            <div key={acc.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="font-bold text-foreground">{acc.name}</p>
                </div>
                <p className="text-[11px] text-muted-foreground font-mono">
                  {acc.accountNumber} • <span className="text-emerald-600 font-sans font-semibold inline-flex items-center gap-0.5"><CheckCircle2 className="h-3 w-3" /> {acc.status}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-foreground text-sm font-mono">
                  {formatCurrency(acc.balance)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center gap-2 border-t border-border/60 text-xs">
          <button className="flex-1 py-2 px-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold transition-colors flex items-center justify-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" />
            Transfer Funds
          </button>
          <button className="flex-1 py-2 px-3 rounded-full bg-accent/10 hover:bg-accent/20 text-accent font-bold transition-colors flex items-center justify-center gap-1">
            <ArrowDownLeft className="h-3.5 w-3.5" />
            Reconcile
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
