// ========================================
// COMMON MESSAGES
// ========================================

export const COMMON_MESSAGES = {
  // General UI
  UI: {
    OK: "OK",
    CANCEL: "Batal",
    DELETE: "Hapus",
    RETRY: "Coba Lagi",
    REFRESH: "Tarik ke bawah untuk refresh",
  },

  // Status
  STATUS: {
    ERROR: "Error",
    SUCCESS: "Berhasil",
  },

  // Loading
  LOADING: {
    GENERAL: "Memuat...",
    UPLOADING: "Mengupload...",
    SAVING: "Menyimpan...",
    DELETING: "Menghapus...",
  },

  // Error Messages
  ERROR: {
    GENERIC: "Terjadi kesalahan, coba lagi",
    NETWORK: "Tidak ada koneksi internet",
    TIMEOUT: "Permintaan timeout",
    SERVER_ERROR: "Kesalahan server",
  },
} as const;

// ========================================
// PROFILE MESSAGES
// ========================================

export const PROFILE_MESSAGES = {
  // UI Text
  UI: {
    WELCOME_TITLE: "Selamat Datang",
    WELCOME_SUBTITLE: "Sistem Absensi",
    EMAIL_FIELD: "Email:",
    USER_ID_FIELD: "User ID:",
    FULL_NAME_FIELD: "Nama Lengkap:",
    USERNAME_FIELD: "Username:",
    LOADING_PROFILE: "Memuat profil...",
  },

  // Greeting
  GREETING: {
    MORNING: "Selamat Pagi",
    AFTERNOON: "Selamat Siang",
    EVENING: "Selamat Sore",
    NIGHT: "Selamat Malam",
  },

  // Error Messages
  ERROR: {
    PROFILE_ERROR: "Gagal memuat profil",
  },
} as const;

// ========================================
// SETTINGS MESSAGES
// ========================================

export const SETTINGS_MESSAGES = {
  // Menu Items
  MENU: {
    TITLE: "Pengaturan",
    EDIT_PROFILE: "Edit Profil",
    CHANGE_PASSWORD: "Ubah Password",
    NOTIFICATION_SETTINGS: "Pengaturan Notifikasi",
    LOCATION_SETTINGS: "Pengaturan Lokasi",
    ATTENDANCE_HISTORY: "Riwayat Absensi",
    HELP_SUPPORT: "Bantuan & Dukungan",
    ABOUT_APP: "Tentang Aplikasi",
    PRIVACY_POLICY: "Kebijakan Privasi",
    TERMS_SERVICE: "Syarat & Ketentuan",
    LOGOUT: "Keluar",
  },
} as const;
