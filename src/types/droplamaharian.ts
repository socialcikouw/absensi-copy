import {
  BaseEntity,
  FinancialData,
  FormDataBase,
  PersonData,
  ValidationResult,
} from "./common";

/**
 * Drop Lama Harian Data Interface
 * Extends base entities with person and financial data
 * Note: drop lama harian does NOT have pinjaman column
 */
export interface DropLamaHarianData
  extends BaseEntity,
    PersonData,
    FinancialData {
  // No pinjaman field for drop lama harian
}

/**
 * Create Drop Lama Harian Data Interface
 * For creating new drop lama harian entries
 */
export interface CreateDropLamaHarianData extends PersonData, FinancialData {
  // No pinjaman field for drop lama harian
}

/**
 * Drop Lama Harian Form Data Interface
 * For form inputs with string values
 */
export interface DropLamaHarianFormData extends FormDataBase {
  saldo: string; // String for form input, will be converted to number
  angsuran: string; // String for form input, will be converted to number
  tabungan: string; // String for form input, will be converted to number
}

// Re-export ValidationResult from common for backward compatibility
export { ValidationResult };
