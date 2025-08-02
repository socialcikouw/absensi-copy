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
