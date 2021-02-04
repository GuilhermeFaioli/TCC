import React, { useReducer, createContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import Home from "./src/screens/Home";
import Vaccine from "./src/screens/Vaccine";
import VaccineRegistration from "./src/screens/VaccineRegistration";
import LoadingScreen from "./src/screens/LoadingScreen";
import CountDownTimer from "./src/screens/CountDownTimer";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { reducer, initState } from "./src/reducers/reducer";
import AsyncStorage from "@react-native-community/async-storage";

export const MyContext = createContext();

const Stack = createStackNavigator();

const myOptions = {
  title: "Home",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#0066FF",
  },
};

const myOptionsWithLogout = {
  title: "Home",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#0066FF",
  },
  headerRight: () => (
    <Button
      onPress={() => alert("This is a button!")}
      title="Info"
      color="#fff"
    />
  ),
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{ ...myOptions, title: "Loading" }}
          />
          <Stack.Screen name="Home" component={Home} options={myOptions} />
          <Stack.Screen
            name="Create"
            component={VaccineRegistration}
            options={{ ...myOptions, title: "Registro de Vacina" }}
          />
          <Stack.Screen
            name="Vaccine"
            component={Vaccine}
            options={{ ...myOptions, title: "Vacina" }}
          />
          <Stack.Screen
            name="CountDownTimer"
            component={CountDownTimer}
            options={{ ...myOptions, title: "Proximas Doses" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ ...myOptions, title: "Login" }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={SignUp}
            options={{ ...myOptions, title: "Sign up" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6EB4EF",
  },
});
