import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDeleteConfirmation } from "../../hooks/shared/useDeleteConfirmation";
import { cardStyles } from "../../styles/cardStyles";
import { CombinedData } from "../../types/dashboard";
import { DropBaruHarianData } from "../../types/dropbaruharian";
import { DropLamaHarianData } from "../../types/droplamaharian";
import { formatCurrency } from "../../utils/dropBaruHarianCalculations";
import { ImageWithFallback } from "../shared/ImageWithFallback";

interface DashboardItemProps {
  item: CombinedData;
  onCardPress: (item: CombinedData) => void;
  onDeleteLama: (id: string) => Promise<boolean>;
  onDeleteBaru: (id: string) => Promise<boolean>;
}

/**
 * Komponen untuk render item dalam FlatList dengan tampilan sederhana
 */
export const DashboardItem: React.FC<DashboardItemProps> = ({
  item,
  onCardPress,
  onDeleteLama,
  onDeleteBaru,
}) => {
  const data = item.data as DropBaruHarianData | DropLamaHarianData;
  const isBaru = item.type === "baru";

  const { showDeleteConfirmation } = useDeleteConfirmation({
    message: `Apakah Anda yakin ingin menghapus data ${data.nama}?`,
    onConfirm: async () => {
      const success = isBaru
        ? await onDeleteBaru(data.id || "")
        : await onDeleteLama(data.id || "");

      if (!success) {
        throw new Error("Gagal menghapus data");
      }
    },
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Tidak diketahui";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <TouchableOpacity
      style={cardStyles.card}
      onPress={() => onCardPress(item)}
      activeOpacity={0.7}
    >
      <View style={cardStyles.header}>
        <View style={cardStyles.leftSection}>
          <Text style={cardStyles.name}>{data.nama}</Text>
          <Text style={cardStyles.address} numberOfLines={2}>
            {data.alamat}
          </Text>
        </View>

        <View style={cardStyles.imageContainer}>
          <ImageWithFallback
            imageUri={data.foto || ""}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>

      <View
        style={[
          cardStyles.typeLabel,
          isBaru ? cardStyles.typeLabelBaru : cardStyles.typeLabelLama,
        ]}
      >
        <Text style={cardStyles.typeLabelText}>{isBaru ? "Baru" : "Lama"}</Text>
      </View>

      <View style={cardStyles.infoRow}>
        <Text style={cardStyles.infoLabel}>Angsuran:</Text>
        <Text style={cardStyles.infoValue}>
          {formatCurrency(data.angsuran)}
        </Text>
      </View>

      <View style={cardStyles.footer}>
        <Text style={cardStyles.timestamp}>{formatDate(data.created_at)}</Text>

        {data.id && (
          <TouchableOpacity
            style={cardStyles.deleteButton}
            onPress={showDeleteConfirmation}
          >
            <Text style={cardStyles.deleteButtonText}>Hapus</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};
