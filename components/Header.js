import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🚀 NASA Space Explorer
      </Text>

      <Text style={styles.subtitle}>
        Explore the Universe with NASA
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
  },

  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    color: COLORS.white,
    marginTop: 5,
    fontSize: 14,
  },
});