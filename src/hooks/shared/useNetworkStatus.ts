import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

// ========================================
// NETWORK STATUS TYPES & UTILITIES
// ========================================

export interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string | null;
  isWifi: boolean;
  isCellular: boolean;
}

/**
 * Network status utilities untuk menghindari duplikasi
 */
export const networkStatusUtils = {
  /**
   * Get status color berdasarkan connection type
   */
  getStatusColor: (status: NetworkStatus): string => {
    if (!status.isConnected) return "#F44336"; // Red for offline
    if (status.isWifi) return "#4CAF50"; // Green for WiFi
    if (status.isCellular) return "#2196F3"; // Blue for cellular
    return "#FF9800"; // Orange for unknown
  },

  /**
   * Get status text berdasarkan connection type
   */
  getStatusText: (status: NetworkStatus): string => {
    if (!status.isConnected) return "Offline";
    if (status.isWifi) return "WiFi";
    if (status.isCellular) return "Cellular";
    return "Online";
  },

  /**
   * Get status icon berdasarkan connection type
   */
  getStatusIcon: (status: NetworkStatus): string => {
    if (!status.isConnected) return "●";
    if (status.isWifi) return "📶";
    if (status.isCellular) return "📱";
    return "🌐";
  },

  /**
   * Transform NetInfo state ke NetworkStatus
   */
  transformNetInfoState: (state: any): NetworkStatus => ({
    isConnected: state.isConnected ?? false,
    isInternetReachable: state.isInternetReachable,
    type: state.type,
    isWifi: state.type === "wifi",
    isCellular: state.type === "cellular",
  }),
};

// ========================================
// NETWORK STATUS HOOK
// ========================================

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: null,
    type: null,
    isWifi: false,
    isCellular: false,
  });

  useEffect(() => {
    // Get initial network status
    const getInitialStatus = async () => {
      const state = await NetInfo.fetch();
      setNetworkStatus(networkStatusUtils.transformNetInfoState(state));
    };

    getInitialStatus();

    // Subscribe to network status changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkStatus(networkStatusUtils.transformNetInfoState(state));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkStatus;
};
