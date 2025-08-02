import { useMemo } from "react";
import { useDropBaruHarianListHybrid } from "../dropbaru/useDropBaruHarianHybrid";
import { useDropLamaHarianListHybrid } from "../droplama";

export interface DashboardDataItem {
  id: string;
  type: "baru" | "lama";
  data: {
    id?: string;
    nama: string;
    alamat: string;
    foto?: string;
    angsuran: number;
    created_at?: string;
    updated_at?: string;
    // Data khusus Drop Baru
    pinjaman?: number;
    saldo?: number;
    tabungan?: number;
  };
}

/**
 * Hook untuk transform data dari raw format ke dashboard format
 */
const useDataTransformation = (
  dropBaruHarianList: any[],
  dropLamaHarianList: any[]
) => {
  return useMemo(() => {
    const baruData: DashboardDataItem[] = dropBaruHarianList.map(
      (item: any) => ({
        id: item.id || "",
        type: "baru" as const,
        data: {
          id: item.id,
          nama: item.nama,
          alamat: item.alamat,
          foto: item.foto,
          angsuran: item.angsuran,
          created_at: item.created_at,
          updated_at: item.updated_at,
          // Data khusus Drop Baru
          pinjaman: item.pinjaman,
          saldo: item.saldo,
          tabungan: item.tabungan,
        },
      })
    );

    const lamaData: DashboardDataItem[] = dropLamaHarianList.map(
      (item: any) => ({
        id: item.id || "",
        type: "lama" as const,
        data: {
          id: item.id,
          nama: item.nama,
          alamat: item.alamat,
          foto: item.foto,
          angsuran: item.angsuran,
          created_at: item.created_at,
          updated_at: item.updated_at,
          // Data khusus Drop Lama (tidak ada pinjaman)
          saldo: item.saldo,
          tabungan: item.tabungan,
        },
      })
    );

    return [...baruData, ...lamaData].sort((a, b) => {
      const dateA = new Date(a.data.created_at || "").getTime();
      const dateB = new Date(b.data.created_at || "").getTime();
      return dateB - dateA; // Sorting berdasarkan terbaru
    });
  }, [dropBaruHarianList, dropLamaHarianList]);
};

/**
 * Hook untuk computed states dashboard
 */
const useDashboardStates = (
  loadingBaru: boolean,
  loadingLama: boolean,
  errorBaru: any,
  errorLama: any,
  combinedData: DashboardDataItem[],
  dropBaruHarianList: any[],
  dropLamaHarianList: any[]
) => {
  return useMemo(() => {
    const isLoading = loadingBaru || loadingLama;
    const hasError = errorBaru || errorLama;
    const totalData = combinedData.length;
    const totalBaru = dropBaruHarianList.length;
    const totalLama = dropLamaHarianList.length;

    // Convert Error objects to strings for compatibility
    const errorBaruString = errorBaru?.message || null;
    const errorLamaString = errorLama?.message || null;

    return {
      isLoading,
      hasError,
      totalData,
      totalBaru,
      totalLama,
      errorBaru: errorBaruString,
      errorLama: errorLamaString,
    };
  }, [
    loadingBaru,
    loadingLama,
    errorBaru,
    errorLama,
    combinedData,
    dropBaruHarianList,
    dropLamaHarianList,
  ]);
};

/**
 * Hook untuk business logic actions dashboard
 */
const useDashboardActions = (
  refreshBaru: () => void,
  refreshLama: () => void
) => {
  const handleRefresh = () => {
    refreshBaru();
    refreshLama();
  };

  const handleDeleteBaru = async (id: string): Promise<boolean> => {
    // Delete akan otomatis invalidate cache karena menggunakan TanStack Query
    return true; // TanStack Query akan handle cache invalidation
  };

  const handleDeleteLama = async (id: string): Promise<boolean> => {
    // Delete akan otomatis invalidate cache karena menggunakan TanStack Query
    return true; // TanStack Query akan handle cache invalidation
  };

  const handleDelete = async (
    id: string,
    type: "baru" | "lama"
  ): Promise<boolean> => {
    if (type === "baru") {
      return await handleDeleteBaru(id);
    } else {
      return await handleDeleteLama(id);
    }
  };

  return {
    handleRefresh,
    handleDelete,
    handleDeleteBaru,
    handleDeleteLama,
  };
};

/**
 * Hook utama untuk mengelola data dashboard dengan TanStack Query untuk real-time updates
 * Menggunakan separation of concern yang lebih baik
 */
export const useDashboardData = () => {
  // Data hooks menggunakan TanStack Query untuk real-time updates
  const {
    data: dropBaruHarianList = [],
    isLoading: loadingBaru,
    error: errorBaru,
    refetch: refreshBaru,
  } = useDropBaruHarianListHybrid();

  const {
    data: dropLamaHarianList = [],
    isLoading: loadingLama,
    error: errorLama,
    refetch: refreshLama,
  } = useDropLamaHarianListHybrid();

  // Transform data menggunakan custom hook
  const combinedData = useDataTransformation(
    dropBaruHarianList,
    dropLamaHarianList
  );

  // Compute states menggunakan custom hook
  const states = useDashboardStates(
    loadingBaru,
    loadingLama,
    errorBaru,
    errorLama,
    combinedData,
    dropBaruHarianList,
    dropLamaHarianList
  );

  // Business logic actions menggunakan custom hook
  const actions = useDashboardActions(refreshBaru, refreshLama);

  return {
    // Data
    data: combinedData,
    totalData: states.totalData,
    totalBaru: states.totalBaru,
    totalLama: states.totalLama,

    // States
    isLoading: states.isLoading,
    hasError: states.hasError,
    errorBaru: states.errorBaru,
    errorLama: states.errorLama,

    // Actions
    ...actions,
  };
};
