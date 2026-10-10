import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/utils/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';

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
        'transition-all hover:shadow-md border-border bg-card',
        onClick && 'cursor-pointer hover:border-primary/50',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground truncate">
            {label}
          </p>
          <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            {icon}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span
                className={cn(
                  'flex items-center gap-0.5',
                  trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {trend.value}
              </span>
              {trend.period && <span className="text-muted-foreground font-normal text-[11px]">{trend.period}</span>}
            </div>
          )}
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );
};
