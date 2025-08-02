import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COMMON_MESSAGES } from "../../constants/messages";
import { dashboardStyles } from "../../styles/dashboardStyles";

interface ErrorStateProps {
  errorLama: string | null;
  errorBaru: string | null;
  onRetry: () => void;
}

/**
 * Komponen untuk error state
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  errorLama,
  errorBaru,
  onRetry,
}) => (
  <View style={dashboardStyles.errorContainer}>
    <Text style={dashboardStyles.errorTitle}>
      {COMMON_MESSAGES.STATUS.ERROR}
    </Text>
    <Text style={dashboardStyles.errorMessage}>
      {errorLama || errorBaru || COMMON_MESSAGES.ERROR.GENERIC}
    </Text>
    <TouchableOpacity style={dashboardStyles.retryButton} onPress={onRetry}>
      <Text style={dashboardStyles.retryButtonText}>
        {COMMON_MESSAGES.UI.RETRY}
      </Text>
    </TouchableOpacity>
  </View>
);
