// ========================================
// UTILS INDEX
// ========================================
// Centralized exports untuk semua utility functions

// Validation utilities
export {
  validateMinLength,
  validateMinValue,
  validateNonNegative,
  validatePositive,
  validateRequired,
  validateRequiredWithMinLength,
} from "./validation";

// Drop Baru Harian utilities
export {
  calculateDropBaruHarianValues,
  formatCurrency,
  parseCurrency,
} from "./dropBaruHarianCalculations";

// Validation utilities
export { validateDropBaruHarianForm } from "./dropBaruHarianValidation";

export { validateDropLamaHarianForm } from "./dropLamaHarianValidation";

// Date utilities
export {
  formatDate,
  formatDateDetailed,
  formatDateTime,
  getTimeBasedGreeting,
} from "./dateUtils";

// Animation utilities
export {
  createGreetingAnimation,
  greetingAnimationConfig,
  startGreetingAnimation,
} from "./animationUtils";

// Format Ribuan utilities
export {
  cleanRibuanString,
  formatNumberToRibuan,
  formatRibuan,
  getRibuanDisplayValue,
  handleRibuanInputChange,
  parseRibuan,
  validateRibuanFormat,
} from "./formatRibuan";
