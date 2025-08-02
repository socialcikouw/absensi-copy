import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DashboardDataItem } from "../../hooks/dashboard/useDashboardData";
import { dashboardStyles } from "../../styles/dashboardStyles";
import { formatCurrency, formatDate } from "../../utils";
import { ImageWithFallback } from "../shared/ImageWithFallback";

interface DashboardCardProps {
  item: DashboardDataItem;
  onCardPress: (item: DashboardDataItem) => void;
}

/**
 * Komponen card khusus untuk dashboard
 * Menampilkan data nasabah dengan tampilan yang ringkas dan menarik
 */
export const DashboardCard: React.FC<DashboardCardProps> = ({
  item,
  onCardPress,
}) => {
  const data = item.data;

  return (
    <TouchableOpacity
      style={dashboardStyles.dashboardCard}
      onPress={() => onCardPress(item)}
      activeOpacity={0.7}
    >
      {/* Baris Pertama: Foto - Nama - Created_at */}
      <View style={dashboardStyles.cardRow}>
        <View style={dashboardStyles.cardImageContainer}>
          {data.foto ? (
            <ImageWithFallback
              imageUri={data.foto}
              style={dashboardStyles.cardImage}
            />
          ) : (
            <Text style={dashboardStyles.cardImagePlaceholder}>koplin</Text>
          )}
        </View>

        <View style={dashboardStyles.cardInfoSection}>
          <Text style={dashboardStyles.cardName}>{data.nama}</Text>
          <Text style={dashboardStyles.cardAddress} numberOfLines={2}>
            {data.alamat}
          </Text>
        </View>

        <View style={dashboardStyles.cardDateSection}>
          <Text style={dashboardStyles.cardDate}>
            {formatDate(data.created_at)}
          </Text>
          <Text style={dashboardStyles.cardAngsuranValue}>
            {formatCurrency(data.angsuran)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
