import {
  BaseEntity,
  FinancialData,
  FormDataBase,
  LoanData,
  PersonData,
  ValidationResult,
} from "./common";

/**
 * Drop Baru Harian Data Interface
 * Extends base entities with person, financial, and loan data
 */
export interface DropBaruHarianData
  extends BaseEntity,
    PersonData,
    FinancialData,
    LoanData {
  // saldo: number; // Auto-calculated: 120% dari pinjaman
  // angsuran: number; // Auto-calculated: 5% dari pinjaman
  // tabungan: number; // Auto-calculated: 5% dari pinjaman
}

/**
 * Create Drop Baru Harian Data Interface
 * For creating new drop baru harian entries
 */
export interface CreateDropBaruHarianData extends PersonData, LoanData {
  // saldo, angsuran, tabungan akan di-auto-calculate oleh database
}

/**
 * Drop Baru Harian Form Data Interface
 * For form inputs with string values
 */
export interface DropBaruHarianFormData extends FormDataBase {
  pinjaman: string; // String for form input, will be converted to number
}

/**
 * Drop Baru Harian Calculations Interface
 * For calculated financial values
 */
export interface DropBaruHarianCalculations {
  angsuran: number;
  tabungan: number;
  saldo: number;
}

// Re-export ValidationResult from common for backward compatibility
export { ValidationResult };
