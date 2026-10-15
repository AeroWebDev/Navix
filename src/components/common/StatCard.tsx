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
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  trend,
  subtitle,
  className,
  onClick,
}) => {
  return (
    <Card
      className={cn(
        'transition-all hover:shadow-md border-border/60 bg-card rounded-3xl group',
        onClick && 'cursor-pointer hover:border-primary/50',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-2xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
              {icon}
            </div>
            <p className="text-xs font-bold text-muted-foreground truncate">
              {label}
            </p>
          </div>
          <div className="h-7 w-7 rounded-full bg-muted/60 group-hover:bg-accent group-hover:text-white text-muted-foreground flex items-center justify-center transition-colors">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {value}
            </p>
            {trend && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0',
                  trend.isPositive
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
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );
};
