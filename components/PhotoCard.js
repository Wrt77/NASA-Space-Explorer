import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

export default function PhotoCard({
  photo,
  onPress,
}) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress(photo)}
    >

      <Image
        source={{
          uri: photo.img_src,
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>

        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {photo.title}
        </Text>

        <Text style={styles.date}>
          📅 {photo.date}
        </Text>

      </View>

    </Pressable>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 14,
    overflow: "hidden",

    elevation: 4,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  image: {
    width: "100%",
    height: 230,
    backgroundColor: "#E5E7EB",
  },

  content: {
    padding: 14,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#163F7A",
  },

  date: {
    marginTop: 8,
    fontSize: 13,
    color: "#666666",
  },

});