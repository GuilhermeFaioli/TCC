import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import Home from './src/screens/Home'
import Vaccine from './src/screens/Vaccine'
import VaccineRegistration from './src/screens/VaccineRegistration'

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
