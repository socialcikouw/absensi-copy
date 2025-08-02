import React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { DashboardDataItem } from "../../hooks/dashboard/useDashboardData";
import { dashboardStyles } from "../../styles/dashboardStyles";
import { DashboardCard } from "./DashboardCard";

interface DashboardListProps {
  data: DashboardDataItem[];
  isLoading: boolean;
  onRefresh: () => void;
  onCardPress?: (item: DashboardDataItem) => void;
}

/**
 * Komponen list untuk menampilkan data dashboard
 */
export const DashboardList: React.FC<DashboardListProps> = ({
  data,
  isLoading,
  onRefresh,
  onCardPress,
}) => {
  const renderItem = ({ item }: { item: DashboardDataItem }) => {
    const handlePress = () => {
      if (onCardPress) {
        onCardPress(item);
      }
    };

    return <DashboardCard item={item} onCardPress={handlePress} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
        contentContainerStyle={dashboardStyles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
