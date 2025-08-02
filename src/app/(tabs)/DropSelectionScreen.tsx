import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DropOption {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: string;
}

const dropOptions: DropOption[] = [
  {
    id: "drop-lama",
    title: "DROP LAMA",
    description: "Isi data nasabah lama dengan tenor 24 hari",
    route: "/CreateDropLamaHarianScreen",
    icon: "H",
  },
  {
    id: "drop-baru",
    title: "DROP BARU",
    description: "Isi data nasabah baru dengan tenor 24 hari",
    route: "/CreateDropBaruHarianScreen",
    icon: "H",
  },
];

export default function DropSelectionScreen() {
  const handleOptionPress = (route: string) => {
    try {
      router.push(route as any);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const renderDropCard = (option: DropOption) => (
    <TouchableOpacity
      key={option.id}
      onPress={() => handleOptionPress(option.route)}
      style={styles.card}
      activeOpacity={0.7}
    >
      <View style={styles.headerCard}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{option.icon}</Text>
        </View>
        <Text style={styles.titleText}>{option.title}</Text>
      </View>

      <Text style={styles.descriptionText}>{option.description}</Text>
      <Ionicons
        style={styles.arrowIcon}
        name="arrow-forward"
        size={18}
        color="#2196F3"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ketuk salah satu untuk memulai</Text>
      <View style={styles.cardContainer}>
        {dropOptions.map(renderDropCard)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
    textAlign: "center",
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: "row",
    gap: 10,
  },
  card: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#2196F3",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: "#fff",
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 50,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2196F3",
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#191919",
  },
  descriptionText: {
    fontSize: 13,
    color: "gray",
    marginBottom: 10,
    textAlign: "center",
  },
  arrowIcon: {
    position: "absolute",
    right: 5,
    top: 5,
  },
});
