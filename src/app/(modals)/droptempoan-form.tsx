import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DropTempoAnForm() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitur ini belum tersedia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
});
