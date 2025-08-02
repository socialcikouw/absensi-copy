// ========================================
// MODAL CONFIGURATION
// ========================================
// Centralized configuration untuk modal screens

/**
 * Common header style untuk semua modal screens
 */
export const modalHeaderStyle = {
  fontSize: 22,
  fontWeight: "bold" as const,
  color: "#2196F3",
};

/**
 * Common screen options untuk modal screens
 */
export const createModalScreenOptions = (title: string) => ({
  presentation: "modal" as const,
  title,
  headerTitleStyle: modalHeaderStyle,
});

/**
 * Modal screen configurations
 */
export const modalScreens = {
  createDropBaruHarian: {
    name: "CreateDropBaruHarianScreen",
    title: "Tambah Drop Baru Harian",
  },
  createDropLamaHarian: {
    name: "CreateDropLamaHarianScreen",
    title: "Tambah Drop Lama Harian",
  },
  dataNasabah: {
    name: "DataNasabah",
    title: "Data Nasabah",
  },
} as const;
