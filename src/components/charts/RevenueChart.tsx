import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/utils/cn';

export interface MonthlyFinancialData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface RevenueChartProps {
  data: MonthlyFinancialData[];
  height?: number;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data, height = 300 }) => {
  const [chartType, setChartType] = useState<'bar' | 'area'>('bar');

  const formatYAxis = (val: number) => {
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  return (
    <div className="w-full space-y-3">
      {/* Top chart mode switchers inspired by reference design */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            +17.8% Peak
          </span>
        </div>

        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full border border-border/60">
          <button
            onClick={() => setChartType('bar')}
            className={cn(
              'px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer',
              chartType === 'bar'
                ? 'bg-accent text-white shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Pill Bars
          </button>
          <button
            onClick={() => setChartType('area')}
            className={cn(
              'px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer',
              chartType === 'area'
                ? 'bg-accent text-white shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Smooth Curve
          </button>
        </div>
      </div>

      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart
              data={data}
              margin={{ top: 12, right: 12, left: -10, bottom: 0 }}
              barGap={8}
            >
              <defs>
                <linearGradient id="navixEmerald" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2E8B70" stopOpacity={1} />
                  <stop offset="100%" stopColor="#1B5E4A" stopOpacity={0.85} />
                </linearGradient>
                <linearGradient id="navixNavy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#263E52" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#172A3A" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={formatYAxis}
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '1rem',
                  fontSize: '12px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="url(#navixEmerald)"
                radius={[12, 12, 12, 12]}
                barSize={24}
              />
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="url(#navixNavy)"
                radius={[12, 12, 12, 12]}
                barSize={24}
              />
            </BarChart>
          ) : (
            <AreaChart
              data={data}
              margin={{ top: 12, right: 12, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="emeraldWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2E8B70" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#2E8B70" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.4} />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={formatYAxis}
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '1rem',
                  fontSize: '12px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#2E8B70"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#emeraldWave)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
