# Constants Structure - Separation of Concern

## 📁 **File Structure**

```
src/constants/
├── index.ts              # Main export file
├── messages.ts           # Legacy compatibility
├── authMessages.ts       # Authentication messages
├── nasabahMessages.ts    # Customer/Nasabah messages
├── imagePickerMessages.ts # Image picker messages
├── commonMessages.ts     # Common, Profile, Settings messages
└── README.md            # This documentation
```

## 🎯 **Separation of Concern**

### **1. Authentication Messages** (`authMessages.ts`)

- Login/Register forms
- Password validation
- Authentication errors
- Logout confirmation

### **2. Nasabah Messages** (`nasabahMessages.ts`)

- Customer form labels
- Validation messages
- Success/Error messages
- List view messages
- Summary statistics

### **3. Image Picker Messages** (`imagePickerMessages.ts`)

- Permission requests
- UI text for photo selection
- Error handling for image picker

### **4. Common Messages** (`commonMessages.ts`)

- General UI elements
- Loading states
- Error messages
- Profile information
- Settings menu items

## 🚀 **Usage Examples**

### **New Way (Recommended)**

```typescript
// Import specific message modules
import {
  AUTH_MESSAGES,
  NASABAH_MESSAGES,
  IMAGE_PICKER_MESSAGES,
} from "@/constants";

// Authentication
console.log(AUTH_MESSAGES.ERROR.LOGIN_FAILED);
console.log(AUTH_MESSAGES.UI.LOGIN_TITLE);
console.log(AUTH_MESSAGES.SUCCESS.REGISTER_SUCCESS);

// Nasabah
console.log(NASABAH_MESSAGES.FORM.ADD_NASABAH);
console.log(NASABAH_MESSAGES.VALIDATION.FORM_ERROR);
console.log(NASABAH_MESSAGES.SUCCESS.SAVE);

// Dashboard
console.log(NASABAH_LIST_MESSAGES.UI.TITLE);
console.log(NASABAH_LIST_MESSAGES.FILTER.ALL);
console.log(NASABAH_LIST_MESSAGES.EMPTY.TITLE);

// Image Picker
console.log(IMAGE_PICKER_MESSAGES.PERMISSIONS.GALLERY);
console.log(IMAGE_PICKER_MESSAGES.ERROR.FILE_TOO_LARGE);

// Common
console.log(COMMON_MESSAGES.UI.OK);
console.log(COMMON_MESSAGES.LOADING.SAVING);
```

### **Legacy Way (Still Works)**

```typescript
// Import legacy exports
import { UI_TEXT, ERROR_MESSAGES } from "@/constants";

console.log(UI_TEXT.LOGIN_TITLE);
console.log(ERROR_MESSAGES.LOGIN_FAILED);
```

## 📋 **Message Categories**

### **Authentication Messages**

```typescript
AUTH_MESSAGES.ERROR.*      // Error messages
AUTH_MESSAGES.SUCCESS.*    // Success messages
AUTH_MESSAGES.UI.*         // UI text
AUTH_MESSAGES.LOGOUT.*     // Logout related
```

### **Nasabah Messages**

```typescript
NASABAH_MESSAGES.FORM.*        // Form labels
NASABAH_MESSAGES.PLACEHOLDERS.* // Input placeholders
NASABAH_MESSAGES.BUTTONS.*     // Button text
NASABAH_MESSAGES.VALIDATION.*  // Validation messages
NASABAH_MESSAGES.SUCCESS.*     // Success messages
NASABAH_MESSAGES.ERROR.*       // Error messages

NASABAH_LIST_MESSAGES.UI.*     // List view UI
NASABAH_LIST_MESSAGES.EMPTY.*  // Empty state
NASABAH_LIST_MESSAGES.DELETE.* // Delete confirmation
NASABAH_LIST_MESSAGES.SUMMARY.* // Summary statistics
NASABAH_LIST_MESSAGES.FILTER.* // Filter buttons
```

### **Image Picker Messages**

```typescript
IMAGE_PICKER_MESSAGES.PERMISSIONS.* // Permission requests
IMAGE_PICKER_MESSAGES.UI.*          // UI text
IMAGE_PICKER_MESSAGES.ERROR.*       // Error messages
```

### **Common Messages**

```typescript
COMMON_MESSAGES.UI.*        // General UI
COMMON_MESSAGES.STATUS.*    // Status messages
COMMON_MESSAGES.LOADING.*   // Loading states
COMMON_MESSAGES.ERROR.*     // Common errors

PROFILE_MESSAGES.UI.*       // Profile UI
PROFILE_MESSAGES.ERROR.*    // Profile errors

SETTINGS_MESSAGES.MENU.*    // Settings menu items
```

## 🔄 **Migration Guide**

### **From Old Structure**

```typescript
// Old way
import { UI_TEXT } from "@/constants";
console.log(UI_TEXT.LOGIN_TITLE);
console.log(UI_TEXT.ADD_NASABAH);
```

### **To New Structure**

```typescript
// New way
import { AUTH_MESSAGES, NASABAH_MESSAGES } from "@/constants";
console.log(AUTH_MESSAGES.UI.LOGIN_TITLE);
console.log(NASABAH_MESSAGES.FORM.ADD_NASABAH);
```

## ✅ **Benefits**

### **1. Better Organization**

- Messages grouped by domain
- Easier to find specific messages
- Clear separation of concerns

### **2. Type Safety**

- Better TypeScript support
- Autocomplete for specific domains
- Reduced chance of typos

### **3. Maintainability**

- Easier to update specific domains
- Less chance of conflicts
- Better code reviews

### **4. Scalability**

- Easy to add new message domains
- Modular structure
- Reusable across components

### **5. Backward Compatibility**

- Legacy imports still work
- Gradual migration possible
- No breaking changes

## 🛠️ **Adding New Messages**

### **1. Add to Existing Domain**

```typescript
// In authMessages.ts
export const AUTH_MESSAGES = {
  ERROR: {
    // ... existing messages
    NEW_ERROR: "New error message",
  },
  // ... rest of structure
} as const;
```

### **2. Create New Domain**

```typescript
// Create new file: notificationMessages.ts
export const NOTIFICATION_MESSAGES = {
  SUCCESS: {
    SENT: "Notification sent successfully",
  },
  ERROR: {
    FAILED: "Failed to send notification",
  },
} as const;

// Add to index.ts
export { NOTIFICATION_MESSAGES } from "./notificationMessages";
```

## 📝 **Best Practices**

### **1. Use Descriptive Names**

```typescript
// Good
AUTH_MESSAGES.ERROR.PASSWORD_TOO_SHORT;

// Bad
AUTH_MESSAGES.ERROR.PWD_SHORT;
```

### **2. Group Related Messages**

```typescript
// Group by functionality
NASABAH_MESSAGES.FORM.*      // Form related
NASABAH_MESSAGES.VALIDATION.* // Validation related
```

### **3. Use Consistent Structure**

```typescript
// All domains follow same pattern
DOMAIN_MESSAGES.ERROR.*
DOMAIN_MESSAGES.SUCCESS.*
DOMAIN_MESSAGES.UI.*
```

### **4. Keep Messages Concise**

```typescript
// Good
"Login berhasil";

// Bad
"Selamat! Anda telah berhasil masuk ke dalam sistem aplikasi";
```

---

**Status**: ✅ **COMPLETE** - Separation of concern implemented with backward compatibility
