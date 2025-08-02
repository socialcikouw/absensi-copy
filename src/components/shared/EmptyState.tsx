import React from "react";
import { Text, View } from "react-native";
import { NASABAH_LIST_MESSAGES } from "../../constants/messages";
import { dashboardStyles } from "../../styles/dashboardStyles";
import { FilterType } from "../../types/dashboard";

interface EmptyStateProps {
  filter: FilterType;
}

/**
 * Komponen untuk empty state
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ filter }) => {
  const getEmptyTitle = () => {
    if (filter === "all") {
      return NASABAH_LIST_MESSAGES.EMPTY.TITLE;
    } else if (filter === "lama") {
      return NASABAH_LIST_MESSAGES.EMPTY.DROP_LAMA;
    } else {
      return NASABAH_LIST_MESSAGES.EMPTY.DROP_BARU;
    }
  };

  return (
    <View style={dashboardStyles.emptyContainer}>
      <Text style={dashboardStyles.emptyTitle}>{getEmptyTitle()}</Text>
      <Text style={dashboardStyles.emptyMessage}>
        {NASABAH_LIST_MESSAGES.EMPTY.MESSAGE}
      </Text>
    </View>
  );
};
