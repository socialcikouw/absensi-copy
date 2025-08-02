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

// ========================================
// NASABAH LIST MESSAGES
// ========================================

export const NASABAH_LIST_MESSAGES = {
  // UI Text
  UI: {
    TITLE: "Data Nasabah",
    LOADING: "Memuat data nasabah...",
  },

  // Empty State
  EMPTY: {
    TITLE: "Belum Ada Data Nasabah",
    MESSAGE:
      "Tambahkan nasabah pertama Anda dengan menekan tombol tambah di bawah",
    DROP_LAMA: "Belum ada data drop lama harian",
    DROP_BARU: "Belum ada data drop baru harian",
  },

  // Delete Confirmation
  DELETE: {
    CONFIRMATION_TITLE: "Konfirmasi Hapus",
    CONFIRMATION_MESSAGE: "Apakah Anda yakin ingin menghapus data nasabah",
    SUCCESS: "Data nasabah berhasil dihapus",
    ERROR: "Gagal menghapus data nasabah",
  },

  // Summary
  SUMMARY: {
    TOTAL_DROP: "Total Drop",
    TOTAL_DROP_LAMA: "Total Drop Lama",
    TOTAL_DROP_BARU: "Total Drop Baru",
    TOTAL_PINJAMAN: "Total Pinjaman",
    TOTAL_TABUNGAN: "Total Tabungan",
    TOTAL_SALDO: "Total Saldo (Rp)",
    DATA: "Nasabah",
  },

  // Filter
  FILTER: {
    ALL: "Semua",
    DROP_LAMA: "Drop Lama",
    DROP_BARU: "Drop Baru",
  },
} as const;
