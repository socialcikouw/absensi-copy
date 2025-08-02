import { useState } from "react";
import { CombinedData, FilterType } from "../../types/dashboard";
import { useDropBaruHarianList } from "../dropbaru/useDropBaruHarianList";
import { useDropLamaHarianList } from "../droplama/useDropLamaHarianList";

/**
 * Hook untuk mengelola business logic dashboard
 */
export function useDashboardLogic() {
  const [filter, setFilter] = useState<FilterType>("all");

  // Data hooks
  const {
    dropLamaHarianList,
    loading: loadingLama,
    error: errorLama,
    refreshList: refreshLama,
    deleteDropLamaHarian,
  } = useDropLamaHarianList();

  const {
    dropBaruHarianList,
    loading: loadingBaru,
    error: errorBaru,
    refreshList: refreshBaru,
    deleteDropBaruHarian,
  } = useDropBaruHarianList();

  // Combine dan sort data
  const combinedData: CombinedData[] = [
    ...dropLamaHarianList.map((item) => ({
      id: `lama-${item.id}`,
      type: "lama" as const,
      data: item,
      timestamp: item.created_at || new Date().toISOString(),
    })),
    ...dropBaruHarianList.map((item) => ({
      id: `baru-${item.id}`,
      type: "baru" as const,
      data: item,
      timestamp: item.created_at || new Date().toISOString(),
    })),
  ].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Filter data berdasarkan filter yang dipilih
  const filteredData = combinedData.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  // Computed states
  const isLoading = loadingLama || loadingBaru;
  const hasError = errorLama || errorBaru;

  // Business logic functions
  const handleRefresh = async () => {
    await Promise.all([refreshLama(), refreshBaru()]);
  };

  const handleDeleteLama = async (id: string): Promise<boolean> => {
    return await deleteDropLamaHarian(id);
  };

  const handleDeleteBaru = async (id: string): Promise<boolean> => {
    return await deleteDropBaruHarian(id);
  };

  const handleCardPress = (item: CombinedData) => {
    console.log("Card pressed:", item);
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  return {
    // State
    filter,
    combinedData,
    filteredData,
    isLoading,
    hasError,
    dropLamaHarianList,
    dropBaruHarianList,
    errorLama,
    errorBaru,

    // Actions
    handleRefresh,
    handleDeleteLama,
    handleDeleteBaru,
    handleCardPress,
    handleFilterChange,
  };
}
