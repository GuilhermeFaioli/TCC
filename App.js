import React, { useReducer, createContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import Home from './src/screens/Home'
import Vaccine from './src/screens/Vaccine'
import VaccineRegistration from './src/screens/VaccineRegistration'
import LoadingScreen from './src/screens/LoadingScreen'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { reducer, initState } from './src/reducers/reducer'
import AsyncStorage from '@react-native-community/async-storage'

export const MyContext = createContext()

const Stack = createStackNavigator()

const myOptions = {
  title: "Home",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#0066FF"
  }
}

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(null)

  const [state, dispatch] = useReducer(reducer, initState)

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    detectLogin()
  }, [])

  return (
    <MyContext.Provider value={
      { state, dispatch }
    }>

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ ...myOptions, title: "Loading" }} />
            <Stack.Screen name="Home" component={Home} options={myOptions} />
            <Stack.Screen name="Create" component={VaccineRegistration} options={{ ...myOptions, title: "Registro de Vacina" }} />
            <Stack.Screen name="Vaccine" component={Vaccine} options={{ ...myOptions, title: "Vacina" }} />
            <Stack.Screen name="Login" component={Login} options={{ ...myOptions, title: "Login" }} />
            <Stack.Screen name="CreateAccount" component={SignUp} options={{ ...myOptions, title: "Sign up" }} />
          </Stack.Navigator>
        </NavigationContainer>

    </MyContext.Provider>

  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6EB4EF",
  },
});
