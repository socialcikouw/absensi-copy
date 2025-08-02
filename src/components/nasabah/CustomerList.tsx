import React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useCustomerListFilter } from "../../hooks/nasabah";
import { CustomerItem } from "../../hooks/nasabah/useCustomerList";

import { customerListStyles } from "@/src/styles/customerListStyles";
import { FilterButtons } from "../shared/FilterButtons";
import { CustomerCard } from "./CustomerCard";

interface CustomerListProps {
  data: CustomerItem[];
  isLoading: boolean;
  isDeleting: boolean;
  onRefresh: () => void;
  onDelete: (id: string, type: "baru" | "lama") => Promise<boolean>;
  onCardPress?: (item: CustomerItem) => void;
}

/**
 * Komponen list untuk menampilkan daftar nasabah
 */
export const CustomerList: React.FC<CustomerListProps> = ({
  data,
  isLoading,
  isDeleting,
  onRefresh,
  onDelete,
  onCardPress,
}) => {
  const { filteredData, filter, handleFilterChange } =
    useCustomerListFilter(data);

  const renderCustomerCard = ({ item }: { item: CustomerItem }) => (
    <CustomerCard
      {...item}
      isDeleting={isDeleting}
      onPress={() => onCardPress?.(item)}
      onDelete={onDelete}
    />
  );

  return (
    <View style={customerListStyles.listContainer}>
      {/* Filter Buttons */}
      <FilterButtons filter={filter} onFilterChange={handleFilterChange} />

      {/* Customer List */}
      <FlatList
        data={filteredData}
        renderItem={renderCustomerCard}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        contentContainerStyle={customerListStyles.listContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
