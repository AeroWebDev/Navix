import { format, parseISO } from 'date-fns';

/**
 * Format currency with symbol and decimal precision
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback if locale or currency code is unsupported
    return `$${amount.toFixed(2)}`;
  }
}

/**
 * Format an ISO date or Date object into human-readable format
 */
export function formatDate(date: string | Date, pattern: string = 'MMM dd, yyyy'): string {
  if (!date) return '';
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, pattern);
  } catch {
    return String(date);
  }
}

/**
 * Calculate totals for items
 */
export function calculateTotals(
  items: Array<{ quantity: number; unitPrice: number; discount?: number; taxRate?: number }>
) {
  let subtotal = 0;
  let discountTotal = 0;
  let taxTotal = 0;

  for (const item of items) {
    const itemSub = item.quantity * item.unitPrice;
    const discount = item.discount ? (itemSub * item.discount) / 100 : 0;
    const taxable = itemSub - discount;
    const tax = item.taxRate ? (taxable * item.taxRate) / 100 : 0;

    subtotal += itemSub;
    discountTotal += discount;
    taxTotal += tax;
  }

  const grandTotal = subtotal - discountTotal + taxTotal;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discountTotal: Number(discountTotal.toFixed(2)),
    taxTotal: Number(taxTotal.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
  };
}

/**
 * Generate a random UUID or unique ID string
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}-${Date.now().toString(36)}`;
}
