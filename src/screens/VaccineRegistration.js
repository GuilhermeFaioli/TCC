import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, Modal, Alert } from 'react-native'
import { TextInput, Button, Title } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-community/picker'

const VaccineRegistration = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [lote, setLote] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [vaccine, setVaccine] = useState('')
    const [dose, setDose] = useState('')

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

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/logo.png')}
                />
            </View>

            <View style={styles.inputView}>

                <Title>Vacina</Title>

                <Picker
                    selectedValue={vaccine}
                    style={styles.inputStyle,{ height: 50, width: 350 }}
                    onValueChange={(itemValue, itemIndex) =>
                        setVaccine(itemValue)
                    }>
                    <Picker.Item label="BCG (Bacilo Calmette-Guerin)" value="BCG (Bacilo Calmette-Guerin)" />
                    <Picker.Item label="Hepatite B" value="Hepatite B" />
                    <Picker.Item label="Pentavalente" value="Pentavalente" />
                    <Picker.Item label="Vacina Inativada Poliomielite (VIP)" value="VIP" />
                    <Picker.Item label="Pneumocócica 10 Valente" value="Pneumocócica 10 Valente" />
                    <Picker.Item label="Rotavírus" value="Rotavírus" />
                    <Picker.Item label="Meningocócica C" value="Meningocócica C" />
                    <Picker.Item label="Pentavalente" value="Pentavalente" />
                    <Picker.Item label="Febre Amarela" value="Febre Amarela" />
                    <Picker.Item label="Tríplice viral" value="Tríplice viral" />
                    <Picker.Item label="DTP(Difteria, tétano e coqueluche)" value="DTP(Difteria, tétano e coqueluche)" />
                    <Picker.Item label="Vacina Oral Poliomielite (VOP)" value="Vacina Oral Poliomielite (VOP)" />
                    <Picker.Item label="Hepatite A" value="Hepatite A" />
                    <Picker.Item label="Tríplice viral" value="Tríplice viral" />
                    <Picker.Item label="Varicela" value="Varicela" />
                    <Picker.Item label="HPV" value="HPV" />
                    <Picker.Item label="Hepatite B" value="Hepatite B" />
                    <Picker.Item label="Dupla Adulto" value="Dupla Adulto" />
                    <Picker.Item label="Pneumocócica 23 Valente" value="Pneumocócica 23 Valente" />
                </Picker>

                <Picker
                    selectedValue={dose}
                    style={styles.inputStyle,{ height: 50, width: 350 }}
                    onValueChange={(itemValue, itemIndex) =>
                        setDose(itemValue)
                    }>
                    <Picker.Item label="Dose unica" value="Dose unica" />
                    <Picker.Item label="2 Doses" value="2 Doses" />
                    <Picker.Item label="3 Doses" value="3 Doses" />
                    <Picker.Item label="4 Doses" value="4 Doses" />
                </Picker>

                <TextInput
                    label="Lote"
                    theme={theme}
                    style={styles.inputStyle}
                    mode="flat"
                    value={lote}
                    onChangeText={text => setLote(text)}
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

export default VaccineRegistration