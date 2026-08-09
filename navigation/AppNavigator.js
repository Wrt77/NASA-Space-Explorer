import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import MarsScreen from "../screens/MarsScreen";

import COLORS from "../constants/colors";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },

          headerTintColor: COLORS.white,

          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "NASA Space Explorer",
          }}
        />

        <Stack.Screen
          name="Mars"
          component={MarsScreen}
          options={{
            title: "Mars Rover",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}