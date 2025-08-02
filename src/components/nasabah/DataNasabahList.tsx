import React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { DataNasabahItem } from "../../hooks/nasabah/useDataNasabah";
import { dataNasabahStyles } from "../../styles/dataNasabahStyles";
import { DataNasabahCard } from "./DataNasabahCard";

interface DataNasabahListProps {
  data: DataNasabahItem[];
  isLoading: boolean;
  onRefresh: () => void;
  onDelete: (id: string, type: "baru" | "lama") => Promise<boolean>;
  onCardPress?: (item: DataNasabahItem) => void;
}

/**
 * Komponen list untuk menampilkan data nasabah
 */
export const DataNasabahList: React.FC<DataNasabahListProps> = ({
  data,
  isLoading,
  onRefresh,
  onDelete,
  onCardPress,
}) => {
  const renderItem = ({ item }: { item: DataNasabahItem }) => {
    const handleDelete = async (id: string) => {
      return await onDelete(id, item.type);
    };

    const handlePress = () => {
      if (onCardPress) {
        onCardPress(item);
      }
    };

    return (
      <DataNasabahCard
        {...item}
        onPress={handlePress}
        onDelete={handleDelete}
      />
    );
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
            colors={["#10b981"]}
            tintColor="#10b981"
          />
        }
        contentContainerStyle={dataNasabahStyles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
