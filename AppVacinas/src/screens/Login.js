import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, KeyboardAvoidingView, Alert  } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'

const Login = ({ navigation }) => {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [enableShift, setEnableShift] = useState(false)

    const sendCred = () => {
        fetch("http://10.0.2.2:3000/signin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(res => res.json()).then(async data => {
            try {
                await AsyncStorage.setItem('token', data.token)
                navigation.replace("Home")
            } catch (e) {
                console.log("Error: " + e)
                Alert.alert("Email ou senha incorreto")
            }
        })

    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="position" enabled={enableShift}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/logo.png')}
                />
            </View>
            
            <View style={styles.inputView}>
               <TextInput
                label="Email"
                theme={theme}
                keyboardType="email-address"
                mode="flat"
                value={email}
                onChangeText={(text) => setEmail(text)}
                onFocus={() => setEnableShift(false)}
                />

                <TextInput
                    label="Password"
                    style={styles.inputStyle}
                    theme={theme}
                    secureTextEntry={true}
                    mode="flat"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onFocus={() => setEnableShift(false)}
                />  
            </View>

            <Button
                mode="contained"
                onPress={() => sendCred()}
                style={styles.buttonStyle}
                labelStyle={{fontSize: 16}}
                theme={ButtonTheme}
            >
                Entrar
            </Button>

            <TouchableOpacity  style={styles.textView} onPress={() => navigation.replace("CreateAccount")}>
                <Text style={styles.textStyle}>Não sou cadastrado</Text>
            </TouchableOpacity>
            
        </KeyboardAvoidingView>
    )
    
}

const theme = {
    roundness : 8,
    colors: {
        primary: "#595959",
        background : "white",
    }
}

const ButtonTheme = {
    colors: {
        primary: "#0066FF",
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6EB4EF"
    },
    imageContainer: {
        alignItems: "center",
    },
    tinyLogo: {
        alignItems: "center",
        width: 64,
        height: 64,
        marginTop: 16
    },
    inputView: {
        marginTop: 144,
        marginHorizontal: 16,
    },
    inputStyle: {
        marginTop: 16,
    },
    buttonStyle: {
        marginTop: 16,
        marginHorizontal: 16,
    },
    textStyle: {
        fontSize: 16
    },
    textView: {
        marginTop: 24,
        alignItems: "center"
    }
})

export default Login