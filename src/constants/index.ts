// ========================================
// CONSTANTS INDEX - Export all messages
// ========================================

// Import all message modules
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
