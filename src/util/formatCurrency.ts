// utils/formatCurrency.ts

export function formatKz(value: number): string {
    if (!value || value === 0) {
    return "Preço sob consulta";
  }

  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}