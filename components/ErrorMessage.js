import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function ErrorMessage({
  message,
}) {
  if (!message) {
    return null;
  }

  return (
    <View style={styles.container}>

      <Text style={styles.icon}>
        ⚠️
      </Text>

      <Text style={styles.message}>
        {message}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderRadius: 12,

    backgroundColor: "#FFF3F3",

    alignItems: "center",
  },

  icon: {
    fontSize: 30,
    marginBottom: 8,
  },

  message: {
    textAlign: "center",
    color: "#D32F2F",
    fontSize: 16,
    lineHeight: 24,
  },

});