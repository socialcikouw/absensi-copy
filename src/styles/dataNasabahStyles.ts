import { StyleSheet } from "react-native";

// ========================================
// DATA NASABAH STYLES
// ========================================
// Style khusus untuk komponen DataNasabah
// Menggunakan design system yang modern dan konsisten
//
// Features:
// - Modern card design dengan shadow dan border radius
// - Color scheme yang konsisten (slate gray palette)
// - Responsive layout untuk berbagai ukuran layar
// - Typography hierarchy yang jelas
// - Interactive elements dengan proper feedback
// - Loading, error, dan empty states yang menarik
// ========================================

export const dataNasabahStyles = StyleSheet.create({
  // ========================================
  // CONTAINER STYLES
  // ========================================
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  // ========================================
  // HEADER STYLES
  // ========================================
  header: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },

  // ========================================
  // CARD STYLES
  // ========================================
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
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

  cardHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },

  cardLeftSection: {
    flex: 1,
    marginRight: 16,
  },

  cardName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 6,
  },

  cardAddress: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },

  cardImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f1f5f9",
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },

  // ========================================
  // TYPE LABEL STYLES
  // ========================================
  typeLabel: {
    position: "absolute",
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  typeLabelBaru: {
    backgroundColor: "#10b981",
  },

  typeLabelLama: {
    backgroundColor: "#f59e0b",
  },

  typeLabelText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // ========================================
  // INFO ROW STYLES
  // ========================================
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  infoRowLast: {
    borderBottomWidth: 0,
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    flex: 1,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e293b",
    flex: 2,
    textAlign: "right",
  },

  // ========================================
  // FINANCIAL DATA STYLES
  // ========================================
  financialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    marginVertical: 4,
  },

  financialLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },

  financialValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#059669",
  },

  // ========================================
  // ID SECTION STYLES
  // ========================================
  idSection: {
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },

  idRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  idLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#64748b",
  },

  idValue: {
    fontSize: 10,
    fontWeight: "500",
    color: "#475569",
    fontFamily: "monospace",
    textAlign: "right",
  },

  // ========================================
  // TIMESTAMP STYLES
  // ========================================
  timestampSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },

  timestampLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
  },

  timestampValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },

  // ========================================
  // FOOTER STYLES
  // ========================================
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },

  footerTimestamp: {
    fontSize: 12,
    color: "#94a3b8",
    fontStyle: "italic",
  },

  // ========================================
  // BUTTON STYLES
  // ========================================
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  deleteButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // ========================================
  // LIST STYLES
  // ========================================
  listContainer: {
    paddingVertical: 8,
  },

  // ========================================
  // LOADING & EMPTY STATES
  // ========================================
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 32,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#64748b",
    marginBottom: 8,
    textAlign: "center",
  },

  emptyMessage: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 24,
  },

  // ========================================
  // ERROR STATE STYLES
  // ========================================
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 32,
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
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  retryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },

  // ========================================
  // ANIMATION STYLES
  // ========================================
  cardAnimated: {
    transform: [{ scale: 1.02 }],
  },

  // ========================================
  // RESPONSIVE STYLES
  // ========================================
  responsiveCard: {
    minHeight: 200,
  },

  responsiveImage: {
    width: "100%",
    height: "100%",
  },
});
