// ========================================
// TYPES INDEX
// ========================================
// Centralized exports untuk semua type definitions
// Memudahkan import dan maintenance

// Common types
export {
  BaseEntity,
  DataType,
  FilterType,
  FinancialData,
  FormDataBase,
  FormFieldType,
  LoanData,
  PersonData,
  StatusType,
  ValidationResult,
} from "./common";

// Auth types
export {
  AuthContextType,
  AuthFormData,
  LoginScreenProps,
  ProfileData,
  RegisterScreenProps,
} from "./auth";

// Dashboard types
export { CombinedData } from "./dashboard";

// Drop Baru Harian types
export {
  CreateDropBaruHarianData,
  DropBaruHarianCalculations,
  DropBaruHarianData,
  DropBaruHarianFormData,
} from "./dropbaruharian";

// Drop Lama Harian types
export {
  CreateDropLamaHarianData,
  DropLamaHarianData,
  DropLamaHarianFormData,
} from "./droplamaharian";
