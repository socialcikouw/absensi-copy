import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NASABAH_LIST_MESSAGES } from "../../constants/messages";
import { dashboardStyles } from "../../styles/dashboardStyles";
import { FilterType } from "../../types/dashboard";

interface FilterButtonsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

/**
 * Komponen untuk filter buttons yang clean dan simple
 */
export const FilterButtons: React.FC<FilterButtonsProps> = ({
  filter,
  onFilterChange,
}) => {
  const filterOptions = [
    { key: "all", label: NASABAH_LIST_MESSAGES.FILTER.ALL },
    { key: "lama", label: NASABAH_LIST_MESSAGES.FILTER.DROP_LAMA },
    { key: "baru", label: NASABAH_LIST_MESSAGES.FILTER.DROP_BARU },
  ] as const;

  return (
    <View style={dashboardStyles.filterContainer}>
      {filterOptions.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          style={[
            dashboardStyles.filterButton,
            filter === key && dashboardStyles.filterButtonActive,
          ]}
          onPress={() => onFilterChange(key)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              dashboardStyles.filterButtonText,
              filter === key && dashboardStyles.filterButtonTextActive,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
