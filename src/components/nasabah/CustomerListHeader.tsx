import React from "react";
import { Text, View } from "react-native";
import { NASABAH_LIST_MESSAGES } from "../../constants/messages";

import { customerListStyles } from "@/src/styles/customerListStyles";

interface CustomerListHeaderProps {
  totalData: number;
  totalBaru: number;
  totalLama: number;
}

/**
 * Komponen header untuk halaman Customer List
 */
export const CustomerListHeader: React.FC<CustomerListHeaderProps> = ({
  totalData,
  totalBaru,
  totalLama,
}) => {
  const getSummaryText = () => {
    return `${NASABAH_LIST_MESSAGES.SUMMARY.TOTAL_DROP}: ${totalData} ${NASABAH_LIST_MESSAGES.SUMMARY.DATA} (${totalLama} Drop Lama, ${totalBaru} Drop Baru)`;
  };

  return (
    <View style={customerListStyles.header}>
      <View style={customerListStyles.headerContent}>
        <View style={{ flex: 1 }}>
          <Text style={customerListStyles.headerTitle}>
            {NASABAH_LIST_MESSAGES.UI.TITLE}
          </Text>
          <Text style={customerListStyles.headerSubtitle}>
            {getSummaryText()}
          </Text>
        </View>
      </View>
    </View>
  );
};
