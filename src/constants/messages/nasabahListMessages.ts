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
