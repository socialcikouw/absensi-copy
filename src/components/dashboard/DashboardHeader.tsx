import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { DashboardDataItem } from "../../hooks/dashboard/useDashboardData";
import { dashboardStyles } from "../../styles/dashboardStyles";
import { FilterType } from "../../types/dashboard";
import { formatCurrency } from "../../utils/dropBaruHarianCalculations";
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

  // Animation sequence yang berulang setiap 5 detik
  const startGreetingAnimation = () => {
    Animated.sequence([
      // Animasi pertama: Scale up dan slide up
      Animated.parallel([
        Animated.timing(greetingScale, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(greetingSlide, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(greetingOpacity, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      // Animasi kedua: Kembali ke normal
      Animated.parallel([
        Animated.timing(greetingScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(greetingSlide, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(greetingOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      // Delay sebelum animasi berikutnya
      Animated.delay(2000),
    ]).start(() => {
      // Restart animasi setelah selesai
      startGreetingAnimation();
    });
  };

  // Start animation on mount
  useEffect(() => {
    startGreetingAnimation();
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

  // Generate greeting based on user name and time
  const getGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting: string;

    if (hour >= 5 && hour < 12) {
      timeGreeting = "Masih Pagi Semangat Dong";
    } else if (hour >= 12 && hour < 15) {
      timeGreeting = "Selamat Siang";
    } else if (hour >= 15 && hour < 18) {
      timeGreeting = "Selamat Sore";
    } else {
      timeGreeting = "Selamat Malam";
    }

    if (userName) {
      return `${timeGreeting}, ${userName}!`;
    }
    return timeGreeting;
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
          {getGreeting()}
        </Animated.Text>
        <Text style={dashboardStyles.headerSubtitle}>{getTotalText()}</Text>
      </View>

      <View style={dashboardStyles.headerActions}>
        <FilterButtons filter={filter} onFilterChange={onFilterChange} />
      </View>
    </View>
  );
};
