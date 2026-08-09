import React from "react";

import {
  Modal,
  View,
  Image,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

import COLORS from "../constants/colors";

export default function ImageModal({
  visible,
  image,
  onClose,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.closeText}>
            ✕
          </Text>
        </Pressable>

        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "95%",
    height: "80%",
  },

  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: COLORS.white,
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  closeText: {
    fontSize: 22,
    fontWeight: "bold",
  },
});