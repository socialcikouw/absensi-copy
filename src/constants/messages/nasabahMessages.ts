// ========================================
// NASABAH (CUSTOMER) MESSAGES
// ========================================

export const NASABAH_MESSAGES = {
  // Form Labels
  FORM: {
    ADD_NASABAH: "Tambah Nasabah",
    NASABAH_PHOTO: "Foto Nasabah",
    NASABAH_NAME: "Nama Lengkap",
    NASABAH_ADDRESS: "Alamat",
    LOAN_AMOUNT: "Jumlah Pinjaman",
    INSTALLMENT: "Angsuran",
    SAVINGS: "Tabungan",
    BALANCE: "Saldo",
    SALDO: "Saldo",
    ANGSURAN: "Angsuran",
    TABUNGAN: "Tabungan",
  },

  // Placeholders
  PLACEHOLDERS: {
    PHOTO: "Ketuk untuk tambah foto",
    NAME: "Masukkan nama lengkap",
    ADDRESS: "Masukkan alamat lengkap",
    LOAN: "Masukkan jumlah pinjaman",
    SALDO: "Masukkan saldo",
    ANGSURAN: "Masukkan angsuran",
    TABUNGAN: "Masukkan tabungan",
  },

  // Buttons
  BUTTONS: {
    SAVE_NASABAH: "Simpan Data Nasabah",
    SAVE_DROP_LAMA: "Simpan Drop Lama Harian",
    CALCULATIONS: "Perhitungan Otomatis",
  },

  // Validation Messages
  VALIDATION: {
    FORM_ERROR: "Mohon isi semua field yang diperlukan",
    INVALID_LOAN_AMOUNT: "Jumlah pinjaman harus berupa angka valid",
    NAMA_TOO_SHORT: "Nama nasabah minimal 2 karakter",
    ALAMAT_TOO_SHORT: "Alamat nasabah minimal 3 karakter",
  },

  // Success Messages
  SUCCESS: {
    SAVE: "Data nasabah berhasil disimpan",
  },

  // Error Messages
  ERROR: {
    SAVE: "Gagal menyimpan data nasabah",
    VALIDATION: "Data tidak valid. Periksa kembali input Anda.",
    NETWORK: "Tidak ada koneksi internet. Periksa koneksi Anda.",
    PHOTO_UPLOAD: "Gagal upload foto. Data akan disimpan tanpa foto.",
    UNEXPECTED: "Terjadi kesalahan tidak terduga. Coba lagi.",
  },
} as const;
