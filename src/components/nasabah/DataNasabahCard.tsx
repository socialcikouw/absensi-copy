import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DataNasabahItem } from "../../hooks/nasabah/useDataNasabah";
import { useDeleteConfirmation } from "../../hooks/shared/useDeleteConfirmation";
import { dataNasabahStyles } from "../../styles/dataNasabahStyles";
import { formatCurrency } from "../../utils/dropBaruHarianCalculations";
import { ImageWithFallback } from "../shared/ImageWithFallback";

interface DataNasabahCardProps extends DataNasabahItem {
  onPress?: () => void;
  onDelete?: (id: string) => Promise<boolean>;
}

/**
 * Komponen card untuk menampilkan data nasabah dengan tampilan konsisten
 * Menampilkan semua data termasuk ID dan semua field dari database
 */
export const DataNasabahCard: React.FC<DataNasabahCardProps> = ({
  id,
  profile_id,
  nama,
  alamat,
  foto,
  angsuran,
  created_at,
  updated_at,
  type,
  pinjaman,
  saldo,
  tabungan,
  onPress,
  onDelete,
}) => {
  const { showDeleteConfirmation } = useDeleteConfirmation({
    message: `Apakah Anda yakin ingin menghapus data ${nama}?`,
    onConfirm: async () => {
      if (onDelete && id) {
        const success = await onDelete(id);
        if (!success) {
          throw new Error("Gagal menghapus data");
        }
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
      style={dataNasabahStyles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header dengan foto dan info utama */}
      <View style={dataNasabahStyles.cardHeader}>
        <View style={dataNasabahStyles.cardLeftSection}>
          <Text style={dataNasabahStyles.cardName}>{nama}</Text>
          <Text style={dataNasabahStyles.cardAddress} numberOfLines={2}>
            {alamat}
          </Text>
        </View>

        <View style={dataNasabahStyles.cardImageContainer}>
          <ImageWithFallback
            imageUri={foto || ""}
            style={dataNasabahStyles.responsiveImage}
          />
        </View>
      </View>

      {/* ID Section */}
      <View style={dataNasabahStyles.idSection}>
        <View style={dataNasabahStyles.idRow}>
          <Text style={dataNasabahStyles.idLabel}>ID:</Text>
          <Text style={dataNasabahStyles.idValue}>{id || "Tidak ada ID"}</Text>
        </View>
        <View style={dataNasabahStyles.idRow}>
          <Text style={dataNasabahStyles.idLabel}>Profile ID:</Text>
          <Text style={dataNasabahStyles.idValue}>
            {profile_id || "Tidak ada Profile ID"}
          </Text>
        </View>
      </View>

      {/* Financial Data Section */}
      <View style={dataNasabahStyles.financialRow}>
        <Text style={dataNasabahStyles.financialLabel}>Angsuran:</Text>
        <Text style={dataNasabahStyles.financialValue}>
          {formatCurrency(angsuran)}
        </Text>
      </View>

      <View style={dataNasabahStyles.financialRow}>
        <Text style={dataNasabahStyles.financialLabel}>Saldo:</Text>
        <Text style={dataNasabahStyles.financialValue}>
          {formatCurrency(saldo || 0)}
        </Text>
      </View>

      <View style={dataNasabahStyles.financialRow}>
        <Text style={dataNasabahStyles.financialLabel}>Tabungan:</Text>
        <Text style={dataNasabahStyles.financialValue}>
          {formatCurrency(tabungan || 0)}
        </Text>
      </View>

      {/* Pinjaman Information (hanya untuk Drop Baru) */}
      {type === "baru" && pinjaman !== undefined && (
        <View style={dataNasabahStyles.financialRow}>
          <Text style={dataNasabahStyles.financialLabel}>Pinjaman:</Text>
          <Text style={dataNasabahStyles.financialValue}>
            {formatCurrency(pinjaman)}
          </Text>
        </View>
      )}

      {/* Footer dengan delete button */}
      <View style={dataNasabahStyles.footer}>
        <Text style={dataNasabahStyles.footerTimestamp}>
          Dibuat: {formatDate(created_at)}
        </Text>

        {id && onDelete && (
          <TouchableOpacity
            style={dataNasabahStyles.deleteButton}
            onPress={showDeleteConfirmation}
          >
            <Text style={dataNasabahStyles.deleteButtonText}>Hapus</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};
