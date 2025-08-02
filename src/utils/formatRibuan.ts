// ========================================
// FORMAT RIBUAN UTILITIES
// ========================================
// Utilities untuk format angka dengan pemisah ribuan

/**
 * Format string angka dengan pemisah ribuan
 * Contoh: "1000000" -> "1.000.000"
 */
export const formatRibuan = (value: string): string => {
  if (!value) return "";

  // Hapus semua karakter non-digit
  const numbers = value.replace(/[^\d]/g, "");

  // Jika kosong, return empty string
  if (!numbers) return "";

  // Format dengan pemisah ribuan
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * Parse string dengan format ribuan menjadi number
 * Contoh: "1.000.000" -> 1000000
 */
export const parseRibuan = (value: string): number => {
  if (!value) return 0;

  // Hapus semua karakter non-digit
  const numbers = value.replace(/[^\d]/g, "");

  return parseInt(numbers, 10) || 0;
};

/**
 * Format number menjadi string dengan pemisah ribuan
 * Contoh: 1000000 -> "1.000.000"
 */
export const formatNumberToRibuan = (value: number): string => {
  if (!value || value === 0) return "";

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

/**
 * Handle input change untuk field dengan format ribuan
 * Otomatis format input saat user mengetik
 */
export const handleRibuanInputChange = (
  value: string,
  onChangeText: (formattedValue: string) => void
): void => {
  const formattedValue = formatRibuan(value);
  onChangeText(formattedValue);
};

/**
 * Get display value untuk input field
 * Mengembalikan string kosong jika value 0 atau undefined
 */
export const getRibuanDisplayValue = (value: string | number): string => {
  if (!value || value === 0) return "";

  if (typeof value === "number") {
    return formatNumberToRibuan(value);
  }

  return formatRibuan(value);
};

/**
 * Validate ribuan format
 * Memastikan format sesuai dengan standar Indonesia
 */
export const validateRibuanFormat = (value: string): boolean => {
  if (!value) return true; // Empty value is valid

  // Pattern untuk format ribuan Indonesia (1.000.000)
  const ribuanPattern = /^(\d{1,3}(\.\d{3})*|\d+)$/;

  return ribuanPattern.test(value);
};

/**
 * Clean ribuan string untuk database
 * Menghapus semua pemisah dan mengembalikan string angka murni
 */
export const cleanRibuanString = (value: string): string => {
  if (!value) return "";

  return value.replace(/[^\d]/g, "");
};
