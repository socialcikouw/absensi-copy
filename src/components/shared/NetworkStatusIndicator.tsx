import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  networkStatusUtils,
  useNetworkStatus,
} from "../../hooks/shared/useNetworkStatus";

interface NetworkStatusIndicatorProps {
  showDetails?: boolean;
}

export const NetworkStatusIndicator: React.FC<NetworkStatusIndicatorProps> = ({
  showDetails = false,
}) => {
  const networkStatus = useNetworkStatus();

  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <View
          style={[
            styles.indicator,
            {
              backgroundColor: networkStatusUtils.getStatusColor(networkStatus),
            },
          ]}
        />
        <Text style={styles.statusText}>
          {networkStatusUtils.getStatusText(networkStatus)}
        </Text>
        <Text style={styles.icon}>
          {networkStatusUtils.getStatusIcon(networkStatus)}
        </Text>
      </View>

      {showDetails && (
        <Text style={styles.detailsText}>
          Connection type: {networkStatus.type || "Unknown"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 16,
    marginVertical: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    flex: 1,
  },

  icon: {
    fontSize: 12,
  },

  detailsText: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
    marginLeft: 12,
  },
});
