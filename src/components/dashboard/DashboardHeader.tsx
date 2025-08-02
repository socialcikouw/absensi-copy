import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { DashboardDataItem } from "../../hooks/dashboard/useDashboardData";
import { dashboardStyles } from "../../styles/dashboardStyles";
import { FilterType } from "../../types/dashboard";
import {
  formatCurrency,
  getTimeBasedGreeting,
  startGreetingAnimation,
} from "../../utils";
import { FilterButtons } from "../shared/FilterButtons";

interface DashboardHeaderProps {
  combinedData: DashboardDataItem[];
  filter: FilterType;
  dropLamaHarianList: DashboardDataItem[];
  dropBaruHarianList: DashboardDataItem[];
  onFilterChange: (filter: FilterType) => void;
  userName?: string;
}

/**
 * Komponen untuk header dashboard yang tetap fixed
 */
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  combinedData,
  filter,
  dropLamaHarianList,
  dropBaruHarianList,
  onFilterChange,
  userName,
}) => {
  // Animation refs untuk greeting
  const greetingScale = useRef(new Animated.Value(1)).current;
  const greetingOpacity = useRef(new Animated.Value(1)).current;
  const greetingSlide = useRef(new Animated.Value(0)).current;

  // Start animation on mount
  useEffect(() => {
    startGreetingAnimation(greetingScale, greetingSlide, greetingOpacity);
  }, []);

  // Calculate total angsuran
  const getTotalAngsuran = () => {
    const totalAngsuranBaru = dropBaruHarianList.reduce((sum, item) => {
      return sum + (item.data.angsuran || 0);
    }, 0);

    const totalAngsuranLama = dropLamaHarianList.reduce((sum, item) => {
      return sum + (item.data.angsuran || 0);
    }, 0);

    return totalAngsuranBaru + totalAngsuranLama;
  };

  // Format total data dengan lebih informatif
  const getTotalText = () => {
    const totalAngsuran = getTotalAngsuran();
    return `Target: ${formatCurrency(totalAngsuran)}`;
  };

  return (
    <View style={dashboardStyles.header}>
      <View style={dashboardStyles.headerContent}>
        <Animated.Text
          style={[
            dashboardStyles.headerTitle,
            {
              opacity: greetingOpacity,
              transform: [
                { scale: greetingScale },
                { translateY: greetingSlide },
              ],
            },
          ]}
        >
          {getTimeBasedGreeting(userName)}
        </Animated.Text>
        <Text style={dashboardStyles.headerSubtitle}>{getTotalText()}</Text>
      </View>

      <View style={dashboardStyles.headerActions}>
        <FilterButtons filter={filter} onFilterChange={onFilterChange} />
      </View>
    </View>
  );
};
