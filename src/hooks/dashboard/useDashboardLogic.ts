import { useCallback, useMemo } from "react";
import { DashboardDataItem } from "./useDashboardData";

/**
 * Hook untuk dashboard business logic dan computed values
 * Separation of concern untuk logic yang kompleks
 */
export const useDashboardLogic = (data: DashboardDataItem[]) => {
  // Memoized data calculations untuk header
  const { dropBaruHarianList, dropLamaHarianList } = useMemo(() => {
    const baruList = data.filter((item) => item.type === "baru");
    const lamaList = data.filter((item) => item.type === "lama");
    return { dropBaruHarianList: baruList, dropLamaHarianList: lamaList };
  }, [data]);

  // Memoized statistics
  const statistics = useMemo(() => {
    const totalBaru = dropBaruHarianList.length;
    const totalLama = dropLamaHarianList.length;
    const totalData = data.length;

    // Calculate total angsuran
    const totalAngsuranBaru = dropBaruHarianList.reduce((sum, item) => {
      return sum + (item.data.angsuran || 0);
    }, 0);

    const totalAngsuranLama = dropLamaHarianList.reduce((sum, item) => {
      return sum + (item.data.angsuran || 0);
    }, 0);

    const totalAngsuran = totalAngsuranBaru + totalAngsuranLama;

    return {
      totalBaru,
      totalLama,
      totalData,
      totalAngsuran,
      totalAngsuranBaru,
      totalAngsuranLama,
    };
  }, [dropBaruHarianList, dropLamaHarianList, data]);

  // Memoized card press handler
  const handleCardPress = useCallback((item: DashboardDataItem) => {
    console.log("Card pressed:", item);
    // TODO: Implementasi navigasi ke detail nasabah
  }, []);

  // Memoized state checks
  const stateChecks = useMemo(() => {
    const hasData = data.length > 0;
    const hasBaruData = dropBaruHarianList.length > 0;
    const hasLamaData = dropLamaHarianList.length > 0;

    return {
      hasData,
      hasBaruData,
      hasLamaData,
    };
  }, [data, dropBaruHarianList, dropLamaHarianList]);

  return {
    // Data
    dropBaruHarianList,
    dropLamaHarianList,

    // Statistics
    statistics,

    // State checks
    stateChecks,

    // Actions
    handleCardPress,
  };
};
