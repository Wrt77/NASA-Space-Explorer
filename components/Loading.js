import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>

      <ActivityIndicator
        size="large"
        color="#1976D2"
      />

      <Text style={styles.text}>
        กำลังค้นหาข้อมูลจาก NASA...
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },

  text: {
    marginTop: 12,
    fontSize: 15,
    color: "#555",
  },

});