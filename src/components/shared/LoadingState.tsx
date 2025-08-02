import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { COMMON_MESSAGES } from "../../constants/messages";
import { dashboardStyles } from "../../styles/dashboardStyles";

/**
 * Komponen untuk loading state
 */
export const LoadingState: React.FC = () => (
  <View style={dashboardStyles.loadingContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={dashboardStyles.loadingText}>
      {COMMON_MESSAGES.LOADING.GENERAL}
    </Text>
  </View>
);
