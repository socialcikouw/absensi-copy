import { ERROR_MESSAGES } from "../constants/messages";
import { AuthFormData, ValidationResult } from "../types/auth";

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: ERROR_MESSAGES.FIELDS_REQUIRED };
  }

  if (password.length < 6) {
    return { isValid: false, message: ERROR_MESSAGES.PASSWORD_TOO_SHORT };
  }

  return { isValid: true };
};

export const validateLoginForm = (data: AuthFormData): ValidationResult => {
  if (!data.email || !data.password) {
    return { isValid: false, message: ERROR_MESSAGES.EMAIL_PASSWORD_REQUIRED };
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
    return { isValid: false, message: ERROR_MESSAGES.FIELDS_REQUIRED };
  }

  if (!validateEmail(data.email)) {
    return { isValid: false, message: "Format email tidak valid" };
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  if (data.password !== data.confirmPassword) {
    return { isValid: false, message: ERROR_MESSAGES.PASSWORD_MISMATCH };
  }

  return { isValid: true };
};
