import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AuthScreen } from "../components/auth/AuthScreen";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { initDatabase } from "../lib/database";
import { queryClient } from "../lib/queryClient";
import { syncService } from "../services/sync/SyncService";

function AppContent() {
  const { session, loading } = useAuth();

  // Initialize database and sync service
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize local database
        await initDatabase();

        // Initialize sync service
        await syncService.initialize();

        console.log("App initialized successfully");
      } catch (error) {
        console.error("Failed to initialize app:", error);
      }
    };

    initializeApp();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!session) {
    return <AuthScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
