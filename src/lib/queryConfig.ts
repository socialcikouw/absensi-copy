// ========================================
// QUERY CONFIGURATION
// ========================================
// Centralized configuration untuk TanStack Query
// Menggabungkan default options dan custom configs

/**
 * Base configuration untuk semua queries
 */
export const BASE_QUERY_CONFIG = {
  // Retry failed requests 3 times
  retry: 3,
  // Retry delay increases exponentially
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
  // Refetch on window focus (useful for mobile)
  refetchOnWindowFocus: false,
  // Refetch on reconnect
  refetchOnReconnect: true,
} as const;

/**
 * Specific configurations untuk different query types
 */
export const QUERY_CONFIG = {
  // List queries (untuk data yang sering berubah)
  LIST: {
    ...BASE_QUERY_CONFIG,
    staleTime: 5 * 60 * 1000, // 5 menit
    gcTime: 10 * 60 * 1000, // 10 menit
    refetchOnMount: true, // Refetch saat mount untuk memastikan data terbaru
  },

  // Detail queries (untuk data yang jarang berubah)
  DETAIL: {
    ...BASE_QUERY_CONFIG,
    staleTime: 10 * 60 * 1000, // 10 menit
    gcTime: 15 * 60 * 1000, // 15 menit
    refetchOnMount: true,
  },

  // Sync status queries (untuk data yang perlu real-time)
  SYNC_STATUS: {
    ...BASE_QUERY_CONFIG,
    staleTime: 30 * 1000, // 30 detik
    gcTime: 2 * 60 * 1000, // 2 menit
    refetchInterval: 60 * 1000, // Auto refetch setiap 1 menit
  },

  // Mutation settings
  MUTATION: {
    retry: 1,
    retryDelay: 1000,
  },
} as const;

/**
 * Helper function untuk mendapatkan config berdasarkan tipe
 */
export const getQueryConfig = (type: keyof typeof QUERY_CONFIG) => {
  return QUERY_CONFIG[type];
};

/**
 * Helper function untuk merge configs
 */
export const mergeQueryConfig = (
  baseConfig: keyof typeof QUERY_CONFIG,
  customConfig: Partial<(typeof QUERY_CONFIG)[keyof typeof QUERY_CONFIG]>
) => {
  return {
    ...QUERY_CONFIG[baseConfig],
    ...customConfig,
  };
};
