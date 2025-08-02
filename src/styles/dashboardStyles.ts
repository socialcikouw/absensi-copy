import { StyleSheet } from "react-native";

export const dashboardStyles = StyleSheet.create({
  // ========================================
  // CONTAINER STYLES
  // ========================================
  container: {
    flex: 1,
    // backgroundColor: "#f8fafc",
  },

  // ========================================
  // HEADER STYLES
  // ========================================
  fixedHeader: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 1000,
  },

  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  headerContent: {
    marginBottom: 12,
  },

  headerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
    textAlign: "center",
  },

  headerSubtitle: {
    fontSize: 11,
    color: "#64748b",
  },

  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // ========================================
  // DASHBOARD CARD STYLES
  // ========================================
  dashboardCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginHorizontal: 10,
    marginVertical: 4,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },

  // Baris untuk layout baru
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30, // Circular shape
    overflow: "hidden",
    backgroundColor: "#1e293b", // Dark background for placeholder
    borderWidth: 2,
    borderColor: "#e2e8f0",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardImagePlaceholder: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },

  cardInfoSection: {
    flex: 1,
    marginRight: 5,
  },

  cardName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
  },

  cardDateSection: {
    alignItems: "flex-end",
  },

  cardDate: {
    fontSize: 10,
    color: "#94a3b8",
  },

  cardAddress: {
    fontSize: 13,
    color: "#64748b",
  },

  cardAngsuranValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748b",
    marginTop: 2,
  },

  // ========================================
  // LIST STYLES
  // ========================================
  listContainer: {
    paddingBottom: 20,
  },

  // ========================================
  // LOADING STYLES
  // ========================================
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },

  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#64748b",
  },

  // ========================================
  // EMPTY STYLES
  // ========================================
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 32,
  },

  // ========================================
  // ERROR STYLES
  // ========================================
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 32,
  },

  // ========================================
  // FILTER BUTTONS STYLES
  // ========================================
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    padding: 4,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },

  filterButtonActive: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  filterButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },

  filterButtonTextActive: {
    color: "#1e293b",
  },

  // ========================================
  // EMPTY STATE STYLES
  // ========================================
  emptyIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
    opacity: 0.5,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
    textAlign: "center",
  },

  emptyMessage: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
  },

  // ========================================
  // ERROR STATE STYLES
  // ========================================
  errorIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
    opacity: 0.5,
  },

  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#dc2626",
    marginBottom: 8,
    textAlign: "center",
  },

  errorMessage: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },

  retryButton: {
    backgroundColor: "#dc2626",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  retryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});
