import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

export type EntityStatus =
  | 'completed'
  | 'paid'
  | 'received'
  | 'in_stock'
  | 'pending'
  | 'ordered'
  | 'draft'
  | 'low_stock'
  | 'overdue'
  | 'cancelled'
  | 'out_of_stock'
  | 'refunded'
  | string;

interface StatusBadgeProps {
  status: EntityStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const normalized = status.toLowerCase().replace(/[\s-]/g, '_');

  const getVariantStyles = () => {
    switch (normalized) {
      case 'completed':
      case 'paid':
      case 'received':
      case 'in_stock':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20';
      case 'pending':
      case 'ordered':
      case 'draft':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20';
      case 'low_stock':
        return 'bg-amber-500/15 text-amber-800 dark:text-amber-200 border-amber-500/30 font-bold';
      case 'overdue':
      case 'cancelled':
      case 'out_of_stock':
      case 'refunded':
        return 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20';
      default:
        return 'bg-muted/80 text-muted-foreground border-border';
    }
  };

  const formatStatusLabel = (text: string) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        'px-2.5 py-0.5 text-[11px] font-semibold rounded-full border shadow-2xs capitalize inline-flex items-center gap-1.5',
        getVariantStyles(),
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {formatStatusLabel(status)}
    </Badge>
  );
};
