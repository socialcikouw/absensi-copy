import { AUTH_MESSAGES } from "../constants/messages/authMessages";
import { AuthFormData, ValidationResult } from "../types/auth";

// ========================================
// COMMON VALIDATION UTILITIES
// ========================================

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate required field
 */
export const validateRequired = (
  value: string,
  fieldName: string
): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, message: `${fieldName} harus diisi` };
  }
  return { isValid: true };
};

/**
 * Validate minimum length
 */
export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName: string
): ValidationResult => {
  if (value.trim().length < minLength) {
    return {
      isValid: false,
      message: `${fieldName} minimal ${minLength} karakter`,
    };
  }
  return { isValid: true };
};

/**
 * Validate required field with minimum length
 */
export const validateRequiredWithMinLength = (
  value: string,
  minLength: number,
  fieldName: string
): ValidationResult => {
  const requiredValidation = validateRequired(value, fieldName);
  if (!requiredValidation.isValid) {
    return requiredValidation;
  }

  return validateMinLength(value, minLength, fieldName);
};

/**
 * Validate non-negative number
 */
export const validateNonNegative = (
  value: number,
  fieldName: string
): ValidationResult => {
  if (value < 0) {
    return { isValid: false, message: `${fieldName} tidak boleh negatif` };
  }
  return { isValid: true };
};

/**
 * Validate positive number
 */
export const validatePositive = (
  value: number,
  fieldName: string
): ValidationResult => {
  if (value <= 0) {
    return { isValid: false, message: `${fieldName} harus lebih besar dari 0` };
  }
  return { isValid: true };
};

/**
 * Validate minimum value
 */
export const validateMinValue = (
  value: number,
  minValue: number,
  fieldName: string
): ValidationResult => {
  if (value < minValue) {
    return {
      isValid: false,
      message: `${fieldName} minimal Rp ${minValue.toLocaleString("id-ID")}`,
    };
  }
  return { isValid: true };
};

// ========================================
// AUTH VALIDATION
// ========================================

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: AUTH_MESSAGES.ERROR.FIELDS_REQUIRED };
  }

  if (password.length < 6) {
    return { isValid: false, message: AUTH_MESSAGES.ERROR.PASSWORD_TOO_SHORT };
  }

  return { isValid: true };
};

export const validateLoginForm = (data: AuthFormData): ValidationResult => {
  if (!data.email || !data.password) {
    return {
      isValid: false,
      message: AUTH_MESSAGES.ERROR.EMAIL_PASSWORD_REQUIRED,
    };
  }

  if (!validateEmail(data.email)) {
    return { isValid: false, message: "Format email tidak valid" };
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  return { isValid: true };
};

export const validateRegisterForm = (data: AuthFormData): ValidationResult => {
  if (!data.email || !data.password || !data.confirmPassword) {
    return { isValid: false, message: AUTH_MESSAGES.ERROR.FIELDS_REQUIRED };
  }

  if (!validateEmail(data.email)) {
    return { isValid: false, message: "Format email tidak valid" };
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  if (data.password !== data.confirmPassword) {
    return { isValid: false, message: AUTH_MESSAGES.ERROR.PASSWORD_MISMATCH };
  }

  return { isValid: true };
};
