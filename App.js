import React from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import Home from './src/screens/Home'
import Vaccine from './src/screens/Vaccine'
import VaccineRegistration from './src/screens/VaccineRegistration'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

export default function App() {
  return (
    <View style={styles.container}>
      <VaccineRegistration />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6EB4EF",
  },
});
