import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
const { cloudinaryURL, cloud_name } = require('../keys')

const Login = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [picture, setPicture] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [modal, setModal] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const pickFromGallery = async () => {
        const { granted } = await ImagePicker.requestCameraRollPermissionsAsync()
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newFile = { uri: data.uri, type: `test/${data.uri.split(".")[1]}`, name: `test.${data.uri.split(".")[1]}` }
                handleUpload(newFile)
            }
        } else {
            Alert.alert("You need to permit us to access the camera")
        }
    }

    const pickFromCamera = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newFile = { uri: data.uri, type: `test/${data.uri.split(".")[1]}`, name: `test.${data.uri.split(".")[1]}` }
                handleUpload(newFile)
            }
        } else {
            Alert.alert("You need to permit us to access the camera")
        }
    }

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'employeeApp')
        data.append("cloud_name", cloud_name)

        fetch(cloudinaryURL, {
            method: "post",
            body: data
        }).then(res => res.json()).then(data => {
            setPicture(data.url)
            setModal(false)
        }).catch(err => {
            Alert.alert("erro while uploading")
        })
    }

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
                    label="Nome"
                    theme={theme}
                    mode="flat"
                    value={name}
                    onChangeText={text => setName(text)}
                />

                <TextInput
                    label="Email"
                    style={styles.inputStyle}
                    theme={theme}
                    keyboardType="email-address"
                    mode="flat"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    label="Senha"
                    style={styles.inputStyle}
                    theme={theme}
                    secureTextEntry={true}
                    multiline={true}
                    mode="flat"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <TextInput
                    label="Endereço"
                    style={styles.inputStyle}
                    theme={theme}
                    mode="flat"
                    value={address}
                    onChangeText={text => setAddress(text)}
                />

                <Button mode="contained" style={styles.inputStyle} theme={ButtonTheme} onPress={showDatepicker} icon="calendar">Data de nascimento</Button>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                <Button icon={picture == "" ? "upload" : "check"} mode="contained" style={styles.inputStyle} theme={ButtonTheme} onPress={() => setModal(true)}>
                    Upload Image
                </Button>

            </View>

            <Button
                mode="contained"
                onPress={() => console.log('Pressed')}
                style={styles.buttonStyle}
                labelStyle={{ fontSize: 16 }}
                theme={ButtonTheme}
            >
                Cadastrar
            </Button>

            <TouchableOpacity style={styles.textView}>
                <Text style={styles.textStyle}>Já possuo cadastro</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => { setModal(false) }}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                        <Button icon="camera" mode="contained" theme={ButtonTheme} onPress={() => pickFromCamera()}>
                            Camera
                                </Button>

                        <Button icon="image-area" mode="contained" theme={ButtonTheme} onPress={() => pickFromGallery()}>
                            Gallery
                                </Button>
                    </View>

                    <Button theme={theme} onPress={() => setModal(false)}>
                        Cancel
                            </Button>
                </View>
            </Modal>

        </View>
    )

}

const theme = {
    roundness: 8,
    colors: {
        primary: "#595959",
        background: "white",
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
        marginTop: 16,
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
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 8
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})

export default Login