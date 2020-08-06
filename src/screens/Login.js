import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity   } from 'react-native'
import { TextInput, Button } from 'react-native-paper';

const Login = () => {
    return (
        <View style={styles.container}>
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
                />

                <TextInput
                    label="Password"
                    style={styles.inputStyle}
                    theme={theme}
                    secureTextEntry={true}
                    mode="flat"
                />  
            </View>

            <Button
                mode="contained"
                onPress={() => console.log('Pressed')}
                style={styles.buttonStyle}
                labelStyle={{fontSize: 16}}
                theme={ButtonTheme}
            >
                Entrar
            </Button>

            <TouchableOpacity  style={styles.textView}>
                <Text style={styles.textStyle}>Não sou cadastrado</Text>
            </TouchableOpacity>
            
        </View>
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