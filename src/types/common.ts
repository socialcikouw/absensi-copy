// ========================================
// COMMON TYPES
// ========================================
// Shared types used across the application
// Reduces duplication and improves maintainability

/**
 * Base interface for all database entities
 */
export interface BaseEntity {
  id?: string; // UUID in Supabase
  profile_id: string; // UUID reference to profiles
  created_at?: string;
  updated_at?: string;
  synced?: number; // 0 = not synced, 1 = synced (for offline-first strategy)
}

/**
 * Base interface for person data
 */
export interface PersonData {
  foto?: string;
  nama: string;
  alamat: string;
}

/**
 * Base interface for financial data
 */
export interface FinancialData {
  saldo: number;
  angsuran: number;
  tabungan: number;
}

/**
 * Base interface for loan data
 */
export interface LoanData {
  pinjaman: number;
}

/**
 * Base interface for form data with string inputs
 */
export interface FormDataBase {
  foto?: string;
  nama: string;
  alamat: string;
}

/**
 * Validation result interface
 * Used across all validation functions
 */
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Common form field types
 */
export type FormFieldType = "text" | "number" | "email" | "password" | "file";

/**
 * Common status types
 */
export type StatusType = "idle" | "loading" | "success" | "error";

/**
 * Common filter types
 */
export type FilterType = "all" | "lama" | "baru";

/**
 * Common data types
 */
export type DataType = "lama" | "baru";
