import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/utils/cn';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

export interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
    period?: string;
  };
  subtitle?: string;
  className?: string;
  highlighted?: boolean;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  trend,
  subtitle,
  className,
  highlighted = false,
  onClick,
}) => {
  return (
    <Card
      className={cn(
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-3xl group relative overflow-hidden',
        highlighted
          ? 'bg-gradient-to-br from-[#172A3A] via-[#1E394E] to-[#2E8B70] text-white border-transparent shadow-lg shadow-emerald-950/15'
          : 'bg-card border-border/60 hover:border-accent/40 shadow-soft-island',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {highlighted && (
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 blur-xl pointer-events-none" />
      )}
      <CardContent className="p-5 sm:p-6 space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={cn(
                'h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs',
                highlighted ? 'bg-white/15 text-white' : 'bg-accent/15 text-accent'
              )}
            >
              {icon}
            </div>
            <p
              className={cn(
                'text-xs font-bold truncate',
                highlighted ? 'text-white/85' : 'text-muted-foreground'
              )}
            >
              {label}
            </p>
          </div>
          <div
            className={cn(
              'h-7 w-7 rounded-full flex items-center justify-center transition-colors',
              highlighted
                ? 'bg-white/10 text-white/80 group-hover:bg-white group-hover:text-[#172A3A]'
                : 'bg-muted/60 group-hover:bg-accent group-hover:text-white text-muted-foreground'
            )}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex items-baseline justify-between gap-2">
            <p
              className={cn(
                'text-2xl sm:text-3xl font-extrabold tracking-tight',
                highlighted ? 'text-white' : 'text-foreground'
              )}
            >
              {value}
            </p>
            {trend && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0',
                  highlighted
                    ? 'bg-emerald-400 text-emerald-950 shadow-xs'
                    : trend.isPositive
                    ? 'bg-emerald-600 text-white dark:bg-emerald-500/20 dark:text-emerald-300'
                    : 'bg-rose-600 text-white dark:bg-rose-500/20 dark:text-rose-300'
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p
              className={cn(
                'text-xs',
                highlighted ? 'text-white/70' : 'text-muted-foreground'
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
