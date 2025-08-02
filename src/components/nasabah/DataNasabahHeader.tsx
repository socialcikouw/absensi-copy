import React from "react";
import { Text, View } from "react-native";
import { NASABAH_LIST_MESSAGES } from "../../constants/messages";
import { dataNasabahStyles } from "../../styles/dataNasabahStyles";

interface DataNasabahHeaderProps {
  totalData: number;
  totalBaru: number;
  totalLama: number;
}

/**
 * Komponen header untuk halaman Data Nasabah
 */
export const DataNasabahHeader: React.FC<DataNasabahHeaderProps> = ({
  totalData,
  totalBaru,
  totalLama,
}) => {
  const getSummaryText = () => {
    return `${NASABAH_LIST_MESSAGES.SUMMARY.TOTAL_DROP}: ${totalData} ${NASABAH_LIST_MESSAGES.SUMMARY.DATA} (${totalLama} Drop Lama, ${totalBaru} Drop Baru)`;
  };

  return (
    <View style={dataNasabahStyles.header}>
      <View style={dataNasabahStyles.headerContent}>
        <View style={{ flex: 1 }}>
          <Text style={dataNasabahStyles.headerTitle}>
            {NASABAH_LIST_MESSAGES.UI.TITLE}
          </Text>
          <Text style={dataNasabahStyles.headerSubtitle}>
            {getSummaryText()}
          </Text>
        </View>
      </View>
    </View>
  );
};
