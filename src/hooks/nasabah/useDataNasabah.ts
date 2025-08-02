import { useMemo } from "react";
import { useDropBaruHarianList } from "../dropbaru/useDropBaruHarianList";
import { useDropLamaHarianList } from "../droplama/useDropLamaHarianList";

export interface DataNasabahItem {
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

/**
 * Hook untuk mengelola data nasabah dengan separation of concern
 */
export const useDataNasabah = () => {
  // Data hooks
  const {
    dropBaruHarianList,
    loading: loadingBaru,
    error: errorBaru,
    refreshList: refreshBaru,
    deleteDropBaruHarian,
  } = useDropBaruHarianList();

  const {
    dropLamaHarianList,
    loading: loadingLama,
    error: errorLama,
    refreshList: refreshLama,
    deleteDropLamaHarian,
  } = useDropLamaHarianList();

  // Combine dan transform data
  const combinedData = useMemo(() => {
    const baruData: DataNasabahItem[] = dropBaruHarianList.map((item) => ({
      id: item.id,
      profile_id: item.profile_id,
      nama: item.nama,
      alamat: item.alamat,
      foto: item.foto,
      angsuran: item.angsuran,
      created_at: item.created_at,
      updated_at: item.updated_at,
      type: "baru" as const,
      // Data khusus Drop Baru
      pinjaman: item.pinjaman,
      saldo: item.saldo,
      tabungan: item.tabungan,
    }));

    const lamaData: DataNasabahItem[] = dropLamaHarianList.map((item) => ({
      id: item.id,
      profile_id: item.profile_id,
      nama: item.nama,
      alamat: item.alamat,
      foto: item.foto,
      angsuran: item.angsuran,
      created_at: item.created_at,
      updated_at: item.updated_at,
      type: "lama" as const,
      // Data khusus Drop Lama
      saldo: item.saldo,
      tabungan: item.tabungan,
    }));

    return [...baruData, ...lamaData].sort((a, b) => {
      const dateA = new Date(a.created_at || "").getTime();
      const dateB = new Date(b.created_at || "").getTime();
      return dateB - dateA; // Sorting berdasarkan terbaru
    });
  }, [dropBaruHarianList, dropLamaHarianList]);

  // Computed states
  const isLoading = loadingBaru || loadingLama;
  const hasError = errorBaru || errorLama;
  const totalData = combinedData.length;
  const totalBaru = dropBaruHarianList.length;
  const totalLama = dropLamaHarianList.length;

  // Business logic functions
  const handleRefresh = () => {
    refreshBaru();
    refreshLama();
  };

  const handleDeleteBaru = async (id: string): Promise<boolean> => {
    return await deleteDropBaruHarian(id);
  };

  const handleDeleteLama = async (id: string): Promise<boolean> => {
    return await deleteDropLamaHarian(id);
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
    // Data
    data: combinedData,
    totalData,
    totalBaru,
    totalLama,

    // States
    isLoading,
    hasError,
    errorBaru,
    errorLama,

    // Actions
    handleRefresh,
    handleDelete,
    handleDeleteBaru,
    handleDeleteLama,
  };
};
