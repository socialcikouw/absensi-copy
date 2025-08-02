import React from "react";
import { View } from "react-native";
import { DataNasabahHeader, DataNasabahList } from "../../components/nasabah";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { LoadingState } from "../../components/shared/LoadingState";
import { useDataNasabah } from "../../hooks/nasabah";
import { dataNasabahStyles } from "../../styles/dataNasabahStyles";

/**
 * Halaman utama untuk menampilkan data nasabah
 * Menggunakan separation of concern dengan komponen terpisah
 */
export default function DataNasabah() {
  // Custom hook untuk mengelola data nasabah
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
    handleDelete,
  } = useDataNasabah();

  // Loading state
  if (isLoading) {
    return (
      <View style={dataNasabahStyles.loadingContainer}>
        <LoadingState />
      </View>
    );
  }

  // Error state
  if (hasError) {
    return (
      <View style={dataNasabahStyles.errorContainer}>
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
      <View style={dataNasabahStyles.emptyContainer}>
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
    <View style={dataNasabahStyles.container}>
      {/* Header Component */}
      <DataNasabahHeader
        totalData={totalData}
        totalBaru={totalBaru}
        totalLama={totalLama}
      />

      {/* List Component */}
      <DataNasabahList
        data={data}
        isLoading={isLoading}
        onRefresh={handleRefresh}
        onDelete={handleDelete}
        onCardPress={handleCardPress}
      />
    </View>
  );
}
