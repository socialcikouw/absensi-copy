import { useMemo, useState } from "react";
import { FilterType } from "../../types/dashboard";
import { DashboardDataItem } from "./useDashboardData";

/**
 * Hook untuk mengelola filter logic dashboard
 */
export const useDashboardFilter = (data: DashboardDataItem[]) => {
  const [filter, setFilter] = useState<FilterType>("all");

  // Filter data berdasarkan type
  const filteredData = useMemo(() => {
    if (filter === "all") {
      return data;
    } else if (filter === "baru") {
      return data.filter((item) => item.type === "baru");
    } else if (filter === "lama") {
      return data.filter((item) => item.type === "lama");
    }
    return data;
  }, [data, filter]);

  // Handle filter change
  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  return {
    filter,
    filteredData,
    handleFilterChange,
  };
};
