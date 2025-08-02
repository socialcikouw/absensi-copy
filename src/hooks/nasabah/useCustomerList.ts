import { useMemo } from "react";
import {
  useDeleteDropBaruHarianHybrid,
  useDropBaruHarianListHybrid,
} from "../dropbaru/useDropBaruHarianHybrid";
import {
  useDeleteDropLamaHarianHybrid,
  useDropLamaHarianListHybrid,
} from "../droplama";

// ========================================
// TYPES & INTERFACES
// ========================================

export interface CustomerItem {
  id?: string;
  profile_id?: string;
  nama: string;
  alamat: string;
  foto?: string;
  angsuran: number;
  created_at?: string;
  updated_at?: string;
  type: "baru" | "lama";
  // Data khusus Drop Baru
  pinjaman?: number;
  saldo?: number;
  tabungan?: number;
}

// ========================================
// DATA TRANSFORMATION UTILITIES
// ========================================

/**
 * Generic data transformation utilities untuk menghindari duplikasi
 */
const dataTransformationUtils = {
  /**
   * Transform common fields untuk semua data types
   */
  transformCommonFields: (
    item: any,
    type: "baru" | "lama"
  ): Partial<CustomerItem> => ({
    id: item.id,
    profile_id: item.profile_id,
    nama: item.nama,
    alamat: item.alamat,
    foto: item.foto,
    angsuran: item.angsuran,
    created_at: item.created_at,
    updated_at: item.updated_at,
    type,
  }),

  /**
   * Transform Drop Baru specific fields
   */
  transformBaruFields: (item: any): Partial<CustomerItem> => ({
    pinjaman: item.pinjaman,
    saldo: item.saldo,
    tabungan: item.tabungan,
  }),

  /**
   * Transform Drop Lama specific fields (tidak ada pinjaman)
   */
  transformLamaFields: (item: any): Partial<CustomerItem> => ({
    saldo: item.saldo,
    tabungan: item.tabungan,
  }),

  /**
   * Sort data berdasarkan created_at (terbaru dulu)
   */
  sortByCreatedAt: (data: CustomerItem[]): CustomerItem[] => {
    return data.sort((a, b) => {
      const dateA = new Date(a.created_at || "").getTime();
      const dateB = new Date(b.created_at || "").getTime();
      return dateB - dateA; // Sorting berdasarkan terbaru
    });
  },

  /**
   * Generic delete handler dengan error handling
   */
  createDeleteHandler:
    (mutation: any) =>
    async (id: string): Promise<boolean> => {
      try {
        await mutation.mutateAsync(id);
        return true;
      } catch (error) {
        console.error("Error deleting item:", error);
        return false;
      }
    },
};

// ========================================
// CUSTOMER LIST HOOK
// ========================================

/**
 * Hook untuk mengelola data customer list dengan separation of concern
 * Menggunakan hybrid hooks yang sudah dioptimasi
 */
export const useCustomerList = () => {
  // Data hooks menggunakan hybrid hooks yang sudah dioptimasi
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

  // Mutation hooks untuk delete operations
  const deleteBaruMutation = useDeleteDropBaruHarianHybrid();
  const deleteLamaMutation = useDeleteDropLamaHarianHybrid();

  // Combine dan transform data menggunakan utilities
  const combinedData = useMemo(() => {
    const baruData: CustomerItem[] = dropBaruHarianList.map(
      (item) =>
        ({
          ...dataTransformationUtils.transformCommonFields(item, "baru"),
          ...dataTransformationUtils.transformBaruFields(item),
        } as CustomerItem)
    );

    const lamaData: CustomerItem[] = dropLamaHarianList.map(
      (item) =>
        ({
          ...dataTransformationUtils.transformCommonFields(item, "lama"),
          ...dataTransformationUtils.transformLamaFields(item),
        } as CustomerItem)
    );

    return dataTransformationUtils.sortByCreatedAt([...baruData, ...lamaData]);
  }, [dropBaruHarianList, dropLamaHarianList]);

  // Computed states
  const isLoading = loadingBaru || loadingLama;
  const isDeleting =
    deleteBaruMutation.isPending || deleteLamaMutation.isPending;
  const hasError = errorBaru || errorLama;
  const totalData = combinedData.length;
  const totalBaru = dropBaruHarianList.length;
  const totalLama = dropLamaHarianList.length;

  // Convert Error objects to strings for compatibility
  const errorBaruString = errorBaru?.message || null;
  const errorLamaString = errorLama?.message || null;

  // Business logic functions menggunakan utilities
  const handleRefresh = () => {
    refreshBaru();
    refreshLama();
  };

  const handleDeleteBaru =
    dataTransformationUtils.createDeleteHandler(deleteBaruMutation);
  const handleDeleteLama =
    dataTransformationUtils.createDeleteHandler(deleteLamaMutation);

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
    // Data
    data: combinedData,
    totalData,
    totalBaru,
    totalLama,

    // States
    isLoading,
    isDeleting,
    hasError,
    errorBaru: errorBaruString,
    errorLama: errorLamaString,

    // Actions
    handleRefresh,
    handleDelete,
    handleDeleteBaru,
    handleDeleteLama,
  };
};
