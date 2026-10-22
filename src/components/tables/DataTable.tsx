import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export interface Column<T> {
  key: string;
  header: string | React.ReactNode;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  onRowClick?: (row: T) => void;
  rowClassName?: (row: T) => string | undefined;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  sortKey,
  sortDirection,
  onSort,
  isLoading = false,
  emptyState,
  onRowClick,
  rowClassName,
  className,
}: DataTableProps<T>) {
  const handleHeaderClick = (col: Column<T>) => {
    if (col.sortable && onSort) {
      onSort(col.key);
    }
  };

  return (
    <div className={cn('w-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft-island', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30 text-[11px] font-bold uppercase tracking-wider text-muted-foreground select-none">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'py-3.5 px-4 font-bold',
                    col.sortable && 'cursor-pointer hover:text-foreground transition-colors',
                    col.className
                  )}
                  onClick={() => handleHeaderClick(col)}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="shrink-0 text-muted-foreground">
                        {sortKey === col.key ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="h-3 w-3 text-accent" />
                          ) : (
                            <ArrowDown className="h-3 w-3 text-accent" />
                          )
                        ) : (
                          <ArrowUpDown className="h-3 w-3 opacity-40 hover:opacity-100" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border/40 text-xs text-foreground">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <LoadingSpinner size="md" />
                    <span className="text-xs text-muted-foreground">Loading records...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-muted-foreground">
                  {emptyState || 'No records found.'}
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => {
                const key = row.id || row._id || `row-${rowIdx}`;
                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={cn(
                      'transition-colors hover:bg-muted/40',
                      onRowClick && 'cursor-pointer',
                      rowClassName && rowClassName(row)
                    )}
                  >
                    {columns.map((col) => (
                      <td key={`${key}-${col.key}`} className={cn('py-3.5 px-4', col.className)}>
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
