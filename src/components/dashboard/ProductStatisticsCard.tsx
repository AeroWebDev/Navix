import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Laptop, Gamepad2, Armchair, ChevronDown } from 'lucide-react';

interface CategoryStat {
  name: string;
  count: number;
  change: string;
  isPositive: boolean;
  color: string;
  icon: React.ReactNode;
}

export const ProductStatisticsCard: React.FC = () => {
  const categories: CategoryStat[] = [
    {
      name: 'Electronic',
      count: 2487,
      change: '+1.8%',
      isPositive: true,
      color: '#3B82F6', // Blue
      icon: <Laptop className="h-4 w-4" />,
    },
    {
      name: 'Games',
      count: 1828,
      change: '+2.3%',
      isPositive: true,
      color: '#10B981', // Emerald
      icon: <Gamepad2 className="h-4 w-4" />,
    },
    {
      name: 'Furniture',
      count: 1463,
      change: '-1.04%',
      isPositive: false,
      color: '#EF4444', // Red
      icon: <Armchair className="h-4 w-4" />,
    },
  ];

  return (
    <Card className="rounded-3xl border-border/60 shadow-soft-island bg-card flex flex-col justify-between">
      <CardHeader className="flex flex-row items-start justify-between pb-2 border-b border-border/40">
        <div>
          <CardTitle className="text-base font-bold text-foreground">
            Product Statistic
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">Track your product sales</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
          Today
          <ChevronDown className="h-3 w-3" />
        </button>
      </CardHeader>

      <CardContent className="pt-4 space-y-5">
        {/* Circular Concentric Rings Gauge Inspired by Reference Asset */}
        <div className="flex items-center justify-center gap-6 py-2">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {/* Outer Blue Track & Ring */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                className="text-muted/30"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="7"
                strokeDasharray="314"
                strokeDashoffset="85"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />

              {/* Middle Emerald Track & Ring */}
              <circle
                cx="60"
                cy="60"
                r="38"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                className="text-muted/30"
              />
              <circle
                cx="60"
                cy="60"
                r="38"
                fill="none"
                stroke="#10B981"
                strokeWidth="7"
                strokeDasharray="238"
                strokeDashoffset="90"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />

              {/* Inner Coral Track & Ring */}
              <circle
                cx="60"
                cy="60"
                r="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                className="text-muted/30"
              />
              <circle
                cx="60"
                cy="60"
                r="26"
                fill="none"
                stroke="#EF4444"
                strokeWidth="7"
                strokeDasharray="163"
                strokeDashoffset="70"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Central KPI Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-foreground tracking-tight">9.829</span>
              <span className="text-[10px] text-muted-foreground font-semibold">Products Sales</span>
              <span className="mt-0.5 px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 text-[9px] font-bold">
                +5.34%
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Items List */}
        <div className="space-y-3 pt-2 border-t border-border/50">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div
                  className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  {cat.icon}
                </div>
                <span className="font-semibold text-foreground">{cat.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-foreground font-mono">
                  {cat.count.toLocaleString()}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    cat.isPositive
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-rose-500/10 text-rose-600'
                  }`}
                >
                  {cat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
