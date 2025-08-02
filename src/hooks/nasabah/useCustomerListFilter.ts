import { useMemo, useState } from "react";
import { FilterType } from "../../types/dashboard";
import { CustomerItem } from "./useCustomerList";

/**
 * Hook untuk mengelola filter customer list
 */
export const useCustomerListFilter = (data: CustomerItem[]) => {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredData = useMemo(() => {
    switch (filter) {
      case "baru":
        return data.filter((item) => item.type === "baru");
      case "lama":
        return data.filter((item) => item.type === "lama");
      case "all":
      default:
        return data;
    }
  }, [data, filter]);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  return {
    filteredData,
    filter,
    handleFilterChange,
  };
};
