export function calculateSubtotal(items: Array<{ quantity: number; unitPrice: number }>): number {
  const sum = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  return Number(sum.toFixed(2));
}

export function calculateTax(taxableAmount: number, taxRatePercentage: number = 5): number {
  const tax = (taxableAmount * taxRatePercentage) / 100;
  return Number(tax.toFixed(2));
}

export function calculateTotal(
  subtotal: number,
  discount: number = 0,
  tax: number = 0
): number {
  const total = subtotal - discount + tax;
  return Number(total.toFixed(2));
}

export function calculateProfit(revenue: number, expenses: number): number {
  return Number((revenue - expenses).toFixed(2));
}
