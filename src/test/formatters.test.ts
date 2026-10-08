import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, calculateTotals, generateId } from '../utils/formatters';

describe('Formatters & Utility Functions', () => {
  it('UTIL-001: formats positive currency correctly', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50');
  });

  it('UTIL-002: formats zero currency correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('UTIL-003: formats negative currency correctly', () => {
    const formatted = formatCurrency(-50);
    expect(formatted).toMatch(/-\$50\.00|\(\$50\.00\)/);
  });

  it('UTIL-004: formats ISO date strings correctly', () => {
    expect(formatDate('2026-10-08')).toBe('Oct 08, 2026');
  });

  it('UTIL-005: calculateTotals computes subtotal, tax, discount, and grand total', () => {
    const items = [
      { quantity: 2, unitPrice: 100, discount: 10, taxRate: 15 }, // sub: 200, disc: 20, taxable: 180, tax: 27, line: 207
      { quantity: 1, unitPrice: 50, discount: 0, taxRate: 15 },   // sub: 50, disc: 0, taxable: 50, tax: 7.5, line: 57.5
    ];
    const totals = calculateTotals(items);
    expect(totals.subtotal).toBe(250);
    expect(totals.discountTotal).toBe(20);
    expect(totals.taxTotal).toBe(34.5);
    expect(totals.grandTotal).toBe(264.5);
  });

  it('UTIL-007: generateId returns unique prefixed IDs', () => {
    const id1 = generateId('sale');
    const id2 = generateId('sale');
    expect(id1).toMatch(/^sale-/);
    expect(id2).toMatch(/^sale-/);
    expect(id1).not.toBe(id2);
  });
});
