import { DropBaruHarianCalculations } from "../types/dropbaruharian";

/**
 * Calculate drop baru harian values based on loan amount
 * Sesuai dengan trigger database:
 * - angsuran = 5% dari pinjaman
 * - tabungan = 5% dari pinjaman
 * - saldo = 120% dari pinjaman
 */
export const calculateDropBaruHarianValues = (
  pinjaman: number
): DropBaruHarianCalculations => {
  const angsuran = Math.round(pinjaman * 0.05); // 5% dari pinjaman
  const tabungan = Math.round(pinjaman * 0.05); // 5% dari pinjaman
  const saldo = Math.round(pinjaman * 1.2); // 120% dari pinjaman

  return {
    angsuran,
    tabungan,
    saldo,
  };
};

/**
 * Parse currency string to number
 * Contoh: "1.000.000" -> 1000000
 */
export const parseCurrency = (value: string): number => {
  if (!value) return 0;
  // Remove all non-digits
  const numbers = value.replace(/[^\d]/g, "");
  return parseInt(numbers, 10) || 0;
};

/**
 * Format number to Indonesian currency format
 * Contoh: 1000000 -> "1.000.000"
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("id-ID").format(value);
};
