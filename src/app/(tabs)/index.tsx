import React, { useMemo } from "react";
import { View } from "react-native";
import { DashboardHeader, DashboardList } from "../../components/dashboard";
import { EmptyState, ErrorState, LoadingState } from "../../components/shared";
import { useAuth } from "../../contexts/AuthContext";
import {
  useDashboardData,
  useDashboardFilter,
  useDashboardLogic,
} from "../../hooks/dashboard";
import { dashboardStyles } from "../../styles/dashboardStyles";

/**
 * Halaman utama dashboard
 * Menggunakan separation of concern dengan komponen terpisah dan optimasi performance
 */
export default function Index() {
  // Auth context
  const { user } = useAuth();

  // Custom hooks untuk mengelola data dan filter
  const {
    data,
    totalData,
    isLoading,
    hasError,
    errorBaru,
    errorLama,
    handleRefresh,
  } = useDashboardData();

  const { filter, filteredData, handleFilterChange } = useDashboardFilter(data);

  // Dashboard logic hook
  const { dropBaruHarianList, dropLamaHarianList, handleCardPress } =
    useDashboardLogic(data);

  // Memoized user name - OPTIMIZED
  const userName = useMemo(() => {
    return user?.email?.split("@")[0] || user?.user_metadata?.full_name;
  }, [user?.email, user?.user_metadata?.full_name]);

  // Memoized loading state - OPTIMIZED
  const showLoading = useMemo(() => {
    return isLoading && totalData === 0;
  }, [isLoading, totalData]);

  // Memoized error state - OPTIMIZED
  const showError = useMemo(() => {
    return hasError && totalData === 0;
  }, [hasError, totalData]);

  // Memoized empty state - OPTIMIZED
  const showEmpty = useMemo(() => {
    return totalData === 0;
  }, [totalData]);

  // Loading state
  if (showLoading) {
    return (
      <View style={dashboardStyles.loadingContainer}>
        <LoadingState />
      </View>
    );
  }

  // Error state
  if (showError) {
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
  if (showEmpty) {
    return (
      <View style={dashboardStyles.emptyContainer}>
        <EmptyState filter={filter} />
      </View>
    );
  }

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
          userName={userName}
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
