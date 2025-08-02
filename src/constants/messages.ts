// ========================================
// MESSAGES - Main export file
// ========================================
// This file now serves as a re-export for backward compatibility
// All messages are now organized in separate files following separation of concern

// Re-export all message modules
export { AUTH_MESSAGES } from "./authMessages";
export {
  COMMON_MESSAGES,
  PROFILE_MESSAGES,
  SETTINGS_MESSAGES,
} from "./commonMessages";
export { IMAGE_PICKER_MESSAGES } from "./imagePickerMessages";
export { NASABAH_LIST_MESSAGES, NASABAH_MESSAGES } from "./nasabahMessages";

// Legacy exports for backward compatibility
export {
  AUTH_MESSAGES as ERROR_MESSAGES,
  AUTH_MESSAGES as SUCCESS_MESSAGES,
} from "./authMessages";

// Combined UI_TEXT for backward compatibility
import { AUTH_MESSAGES } from "./authMessages";
import {
  COMMON_MESSAGES,
  PROFILE_MESSAGES,
  SETTINGS_MESSAGES,
} from "./commonMessages";
import { IMAGE_PICKER_MESSAGES } from "./imagePickerMessages";
import { NASABAH_LIST_MESSAGES, NASABAH_MESSAGES } from "./nasabahMessages";

export const UI_TEXT = {
  // Auth Messages
  ...AUTH_MESSAGES.UI,
  ...AUTH_MESSAGES.LOGOUT,

  // Profile & Settings
  ...PROFILE_MESSAGES.UI,
  ...SETTINGS_MESSAGES.MENU,

  // Nasabah Messages
  ...NASABAH_MESSAGES.FORM,
  ...NASABAH_MESSAGES.PLACEHOLDERS,
  ...NASABAH_MESSAGES.BUTTONS,
  ...NASABAH_MESSAGES.VALIDATION,
  ...NASABAH_MESSAGES.SUCCESS,
  ...NASABAH_MESSAGES.ERROR,

  // Image Picker Messages
  ...IMAGE_PICKER_MESSAGES.PERMISSIONS,
  ...IMAGE_PICKER_MESSAGES.UI,
  ...IMAGE_PICKER_MESSAGES.ERROR,

  // Nasabah List Messages
  ...NASABAH_LIST_MESSAGES.UI,
  ...NASABAH_LIST_MESSAGES.EMPTY,
  ...NASABAH_LIST_MESSAGES.DELETE,
  ...NASABAH_LIST_MESSAGES.SUMMARY,
  ...NASABAH_LIST_MESSAGES.FILTER,

  // Common Messages
  ...COMMON_MESSAGES.UI,
  ...COMMON_MESSAGES.STATUS,
  ...COMMON_MESSAGES.LOADING,
  ...COMMON_MESSAGES.ERROR,
} as const;

// ========================================
// USAGE EXAMPLES
// ========================================

/*
// New way (recommended):
import { AUTH_MESSAGES, NASABAH_MESSAGES } from '@/constants';

// Authentication
console.log(AUTH_MESSAGES.ERROR.LOGIN_FAILED);
console.log(AUTH_MESSAGES.UI.LOGIN_TITLE);
console.log(AUTH_MESSAGES.SUCCESS.REGISTER_SUCCESS);

// Nasabah
console.log(NASABAH_MESSAGES.FORM.ADD_NASABAH);
console.log(NASABAH_MESSAGES.VALIDATION.FORM_ERROR);
console.log(NASABAH_MESSAGES.SUCCESS.SAVE);

// Image Picker
console.log(IMAGE_PICKER_MESSAGES.PERMISSIONS.GALLERY);
console.log(IMAGE_PICKER_MESSAGES.ERROR.FILE_TOO_LARGE);

// Common
console.log(COMMON_MESSAGES.UI.OK);
console.log(COMMON_MESSAGES.LOADING.SAVING);

// Legacy way (still works):
import { UI_TEXT, ERROR_MESSAGES } from '@/constants';
console.log(UI_TEXT.LOGIN_TITLE);
console.log(ERROR_MESSAGES.LOGIN_FAILED);
*/
