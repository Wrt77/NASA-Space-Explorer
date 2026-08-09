import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";

import Header from "../components/Header";
import Loading from "../components/Loading";

import COLORS from "../constants/colors";

import { getAPOD } from "../services/nasaApi";

export default function HomeScreen({ navigation }) {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAPOD();
  }, []);

  const loadAPOD = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAPOD();

      setApod(data);
    } catch (err) {
      console.log(err);
      setError("ไม่สามารถโหลดข้อมูล NASA ได้");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView>
        {error !== "" ? (
          <Text style={styles.error}>
            {error}
          </Text>
        ) : (
          <>
            <Image
              source={{ uri: apod.url }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.content}>
              <Text style={styles.title}>
                {apod.title}
              </Text>

              <Text style={styles.date}>
                {apod.date}
              </Text>

              <Text style={styles.description}>
                {apod.explanation}
              </Text>

              <Pressable
                style={styles.button}
                onPress={() =>
                  navigation.navigate("Mars")
                }
              >
                <Text style={styles.buttonText}>
                  🔴 Explore Mars Rover
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  image: {
    width: "100%",
    height: 300,
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 8,
  },

  date: {
    color: COLORS.gray,
    marginBottom: 15,
  },

  description: {
    fontSize: 16,
    lineHeight: 25,
    color: COLORS.text,
  },

  button: {
    marginTop: 25,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },

  error: {
    textAlign: "center",
    marginTop: 30,
    color: COLORS.secondary,
  },
});