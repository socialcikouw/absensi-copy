import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import {
  COMMON_MESSAGES,
  NASABAH_LIST_MESSAGES,
} from "../../constants/messages";
import { dashboardStyles } from "../../styles/dashboardStyles";
import { FilterType } from "../../types/dashboard";

// ========================================
// GENERIC STATE COMPONENTS
// ========================================

/**
 * Generic state component props
 */
interface BaseStateProps {
  title?: string;
  message?: string;
  onAction?: () => void;
  actionText?: string;
}

/**
 * Generic empty state component
 */
interface EmptyStateProps extends BaseStateProps {
  filter: FilterType;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  filter,
  title,
  message = NASABAH_LIST_MESSAGES.EMPTY.MESSAGE,
  onAction,
  actionText,
}) => {
  const getEmptyTitle = () => {
    if (title) return title;

    if (filter === "all") {
      return NASABAH_LIST_MESSAGES.EMPTY.TITLE;
    } else if (filter === "lama") {
      return NASABAH_LIST_MESSAGES.EMPTY.DROP_LAMA;
    } else {
      return NASABAH_LIST_MESSAGES.EMPTY.DROP_BARU;
    }
  };

  return (
    <View style={dashboardStyles.emptyContainer}>
      <Text style={dashboardStyles.emptyTitle}>{getEmptyTitle()}</Text>
      <Text style={dashboardStyles.emptyMessage}>{message}</Text>
      {onAction && actionText && (
        <TouchableOpacity
          style={dashboardStyles.retryButton}
          onPress={onAction}
        >
          <Text style={dashboardStyles.retryButtonText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

/**
 * Generic error state component
 */
interface ErrorStateProps extends BaseStateProps {
  errorLama?: string | null;
  errorBaru?: string | null;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  errorLama,
  errorBaru,
  onRetry,
  title = COMMON_MESSAGES.STATUS.ERROR,
  message,
  actionText = COMMON_MESSAGES.UI.RETRY,
}) => (
  <View style={dashboardStyles.errorContainer}>
    <Text style={dashboardStyles.errorTitle}>{title}</Text>
    <Text style={dashboardStyles.errorMessage}>
      {message || errorLama || errorBaru || COMMON_MESSAGES.ERROR.GENERIC}
    </Text>
    <TouchableOpacity style={dashboardStyles.retryButton} onPress={onRetry}>
      <Text style={dashboardStyles.retryButtonText}>{actionText}</Text>
    </TouchableOpacity>
  </View>
);

/**
 * Generic loading state component
 */
interface LoadingStateProps extends BaseStateProps {
  size?: "small" | "large";
  color?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = COMMON_MESSAGES.LOADING.GENERAL,
  size = "large",
  color = "#007AFF",
}) => (
  <View style={dashboardStyles.loadingContainer}>
    <ActivityIndicator size={size} color={color} />
    <Text style={dashboardStyles.loadingText}>{title}</Text>
  </View>
);
