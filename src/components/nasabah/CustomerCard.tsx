import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { CustomerItem } from "../../hooks/nasabah/useCustomerList";

import { customerListStyles } from "@/src/styles/customerListStyles";
import { formatCurrency, formatDate } from "../../utils";
import { ImageWithFallback } from "../shared/ImageWithFallback";

interface CustomerCardProps extends CustomerItem {
  onPress?: () => void;
  onDelete?: (id: string, type: "baru" | "lama") => Promise<boolean>;
  isDeleting?: boolean;
}

const cardUtils = {
  formatDate: (dateString?: string): string => formatDate(dateString),
  renderIdRow: (label: string, value?: string, fallback?: string) => (
    <View style={customerListStyles.cardRow}>
      <Text style={customerListStyles.cardLabel}>{label}:</Text>
      <Text style={customerListStyles.cardValue}>
        {value || fallback || "Tidak tersedia"}
      </Text>
    </View>
  ),
  renderFinancialRow: (label: string, value?: number, fallback: number = 0) => (
    <View style={customerListStyles.cardRow}>
      <Text style={customerListStyles.cardLabel}>{label}:</Text>
      <Text style={customerListStyles.cardValue}>
        {formatCurrency(value || fallback)}
      </Text>
    </View>
  ),
  renderConditionalFinancialRow: (
    label: string,
    value?: number,
    condition: boolean = true
  ) => {
    if (!condition) return null;
    return cardUtils.renderFinancialRow(label, value);
  },
};

/**
 * Komponen card untuk menampilkan data nasabah
 */
export const CustomerCard: React.FC<CustomerCardProps> = ({
  id,
  nama,
  alamat,
  foto,
  pinjaman,
  saldo,
  angsuran,
  tabungan,
  created_at,
  type,
  onPress,
  onDelete,
  isDeleting = false,
}) => {
  const handleDelete = async () => {
    if (!onDelete || !id) return;

    // Simple confirmation using Alert
    const confirmed = await new Promise<boolean>((resolve) => {
      Alert.alert(
        "Konfirmasi Hapus",
        `Apakah Anda yakin ingin menghapus data nasabah "${nama}"?`,
        [
          { text: "Batal", style: "cancel", onPress: () => resolve(false) },
          {
            text: "Hapus",
            style: "destructive",
            onPress: () => resolve(true),
          },
        ]
      );
    });

    if (confirmed) {
      await onDelete(id, type);
    }
  };

  const getTypeLabel = () => {
    return type === "baru" ? "Drop Baru" : "Drop Lama";
  };

  const getTypeColor = () => {
    return type === "baru" ? "#4CAF50" : "#FF9800";
  };

  return (
    <TouchableOpacity
      style={[
        customerListStyles.card,
        isDeleting && customerListStyles.cardDeleting,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isDeleting}
    >
      {/* Header dengan foto dan tipe */}
      <View style={customerListStyles.cardHeader}>
        <ImageWithFallback
          imageUri={foto || ""}
          style={customerListStyles.cardImage}
          fallbackText="👤"
        />
        <View style={customerListStyles.cardHeaderInfo}>
          <Text style={customerListStyles.cardTitle}>{nama}</Text>
          <View
            style={[
              customerListStyles.typeBadge,
              { backgroundColor: getTypeColor() },
            ]}
          >
            <Text style={customerListStyles.typeText}>{getTypeLabel()}</Text>
          </View>
        </View>
      </View>

      {/* Informasi dasar */}
      <View style={customerListStyles.cardSection}>
        {cardUtils.renderIdRow("ID", id)}
        {cardUtils.renderIdRow("Alamat", alamat)}
        {cardUtils.renderIdRow(
          "Tanggal",
          created_at,
          cardUtils.formatDate(created_at)
        )}
      </View>

      {/* Informasi keuangan */}
      <View style={customerListStyles.cardSection}>
        {/* Pinjaman hanya untuk Drop Baru */}
        {type === "baru" && cardUtils.renderFinancialRow("Pinjaman", pinjaman)}
        {cardUtils.renderFinancialRow("Saldo", saldo)}
        {cardUtils.renderFinancialRow("Angsuran", angsuran)}
        {cardUtils.renderFinancialRow("Tabungan", tabungan)}
      </View>

      {/* Action buttons */}
      <View style={customerListStyles.cardActions}>
        <TouchableOpacity
          style={[
            customerListStyles.deleteButton,
            isDeleting && customerListStyles.deleteButtonDisabled,
          ]}
          onPress={handleDelete}
          disabled={isDeleting}
          activeOpacity={0.7}
        >
          <Text
            style={[
              customerListStyles.deleteButtonText,
              isDeleting && customerListStyles.deleteButtonTextDisabled,
            ]}
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
