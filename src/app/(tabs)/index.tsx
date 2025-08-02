import React from "react";
import { View } from "react-native";
import { DashboardHeader, DashboardList } from "../../components/dashboard";
import { EmptyState, ErrorState, LoadingState } from "../../components/shared";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboardData, useDashboardFilter } from "../../hooks/dashboard";
import { dashboardStyles } from "../../styles/dashboardStyles";

/**
 * Halaman utama dashboard
 * Menggunakan separation of concern dengan komponen terpisah
 */
export default function Index() {
  // Auth context
  const { user } = useAuth();

  // Custom hooks untuk mengelola data dan filter
  const {
    data,
    totalData,
    totalBaru,
    totalLama,
    isLoading,
    hasError,
    errorBaru,
    errorLama,
    handleRefresh,
  } = useDashboardData();

  const { filter, filteredData, handleFilterChange } = useDashboardFilter(data);

  // Calculate data for header
  const dropBaruHarianList = data.filter((item) => item.type === "baru");
  const dropLamaHarianList = data.filter((item) => item.type === "lama");

  // Loading state
  if (isLoading && totalData === 0) {
    return (
      <View style={dashboardStyles.loadingContainer}>
        <LoadingState />
      </View>
    );
  }

  // Error state
  if (hasError && totalData === 0) {
    return (
      <View style={dashboardStyles.errorContainer}>
        <ErrorState
          errorLama={errorLama}
          errorBaru={errorBaru}
          onRetry={handleRefresh}
        />
      </View>
    );
  }

  // Empty state
  if (totalData === 0) {
    return (
      <View style={dashboardStyles.emptyContainer}>
        <EmptyState filter={filter} />
      </View>
    );
  }

  // Handle card press (bisa ditambahkan navigasi ke detail)
  const handleCardPress = (item: any) => {
    console.log("Card pressed:", item);
    // TODO: Implementasi navigasi ke detail nasabah
  };

  return (
    <View style={dashboardStyles.container}>
      {/* Fixed Header */}
      <View style={dashboardStyles.fixedHeader}>
        <DashboardHeader
          combinedData={data}
          filter={filter}
          dropLamaHarianList={dropLamaHarianList}
          dropBaruHarianList={dropBaruHarianList}
          onFilterChange={handleFilterChange}
          userName={
            user?.email?.split("@")[0] || user?.user_metadata?.full_name
          }
        />
      </View>

      {/* List Component */}
      <DashboardList
        data={filteredData}
        isLoading={isLoading}
        onRefresh={handleRefresh}
        onCardPress={handleCardPress}
      />
    </View>
  );
}
