import { customerListStyles } from "@/src/styles/customerListStyles";
import React from "react";
import { View } from "react-native";
import { CustomerList, CustomerListHeader } from "../../components/nasabah";
import { EmptyState, ErrorState, LoadingState } from "../../components/shared";
import { useCustomerList } from "../../hooks/nasabah";

/**
 * Halaman utama untuk menampilkan daftar nasabah
 * Menggunakan separation of concern dengan komponen terpisah
 */
export default function CustomerListScreen() {
  // Custom hook untuk mengelola data nasabah
  const {
    data,
    totalData,
    totalBaru,
    totalLama,
    isLoading,
    isDeleting,
    hasError,
    errorBaru,
    errorLama,
    handleRefresh,
    handleDelete,
  } = useCustomerList();

  // Loading state
  if (isLoading) {
    return (
      <View style={customerListStyles.loadingContainer}>
        <LoadingState />
      </View>
    );
  }

  // Error state
  if (hasError) {
    return (
      <View style={customerListStyles.errorContainer}>
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
      <View style={customerListStyles.emptyContainer}>
        <EmptyState filter="all" />
      </View>
    );
  }

  // Handle card press (bisa ditambahkan navigasi ke detail)
  const handleCardPress = (item: any) => {
    console.log("Card pressed:", item);
    // TODO: Implementasi navigasi ke detail nasabah
  };

  return (
    <View style={customerListStyles.container}>
      {/* Header Component */}
      <CustomerListHeader
        totalData={totalData}
        totalBaru={totalBaru}
        totalLama={totalLama}
      />

      {/* List Component */}
      <CustomerList
        data={data}
        isLoading={isLoading}
        isDeleting={isDeleting}
        onRefresh={handleRefresh}
        onDelete={handleDelete}
        onCardPress={handleCardPress}
      />
    </View>
  );
}
