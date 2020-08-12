import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

const LoadingScreen = ({ navigation }) => {

    const detectLoading = async () => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            navigation.replace("Home")
        } else {
            navigation.replace("Login")
        }
    }

    useEffect(() => {
        detectLoading()
    }, [])

    return (
        <View style={styles.root}>
            <ActivityIndicator size="large" color="blue" />
        </View>
    )
}

const theme = {
    colors: {
        primary: "#006aff"
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center'
    },
})

export default LoadingScreen