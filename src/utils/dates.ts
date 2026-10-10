import { format, parseISO } from 'date-fns';

export function formatDate(date: string | Date, pattern: string = 'MMM dd, yyyy'): string {
  if (!date) return '';
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, pattern);
  } catch {
    return String(date);
  }
}
