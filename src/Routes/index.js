import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Welcome from "../pages/Welcome";
import HomeScreen from "../pages/HomeScreen";
import ChatScreen from "../pages/ChatScreen";
import LoginScreen from "../pages/LoginScreen";
import ModalScreen from "../pages/ModalScreen";
import useAuth from "../../hooks/useAuth";
import MatchScreen from "../pages/MatchScreen";
import MessageScreen from "../pages/MessageScreen";

const Stack = createStackNavigator();

const Routes = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Message" component={MessageScreen} />

          <Stack.Group
            screenOptions={{
              presentation: "modal",
              ...TransitionPresets.ModalPresentationIOS,
            }}
          >
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "transparentModal",
              ...TransitionPresets.ModalPresentationIOS,
            }}
          >
            <Stack.Screen name="Match" component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name='Welcome' component={Welcome} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Routes;