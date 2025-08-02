// ========================================
// IMAGE PICKER MESSAGES
// ========================================

export const IMAGE_PICKER_MESSAGES = {
  // Permissions
  PERMISSIONS: {
    REQUIRED: "Izin Diperlukan",
    GALLERY: "Izinkan akses ke galeri untuk memilih foto",
    CAMERA: "Izinkan akses ke kamera untuk mengambil foto",
  },

  // UI Text
  UI: {
    SELECT_PHOTO: "Pilih Foto",
    SELECT_PHOTO_SOURCE: "Pilih sumber foto untuk nasabah",
    GALLERY: "Galeri",
    CAMERA: "Kamera",
  },

  // Error Messages
  ERROR: {
    PICKER_ERROR: "Gagal memilih foto",
    PERMISSION_DENIED: "Izin ditolak",
    FILE_TOO_LARGE: "File terlalu besar",
    INVALID_FORMAT: "Format file tidak didukung",
  },
} as const;
