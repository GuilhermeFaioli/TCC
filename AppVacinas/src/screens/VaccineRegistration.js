import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, Alert, Platform } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-community/picker";
import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const VaccineRegistration = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case "date":
          return route.params.date;
          break;
        case "date2":
          return route.params.date2;
          break;
        case "date3":
          return route.params.date3;
          break;
        case "date4":
          return route.params.date4;
          break;
        case "lote":
          return route.params.lote;
          break;
        case "vaccine":
          return route.params.vacina;
          break;
        case "dose":
          return route.params.dose;
          break;
      }
    }
    if (type == "vaccine") {
      return "BCG (Bacilo Calmette-Guerin)";
    } else if (type == "dose") {
      return "Dose unica";
    } else {
      return "";
    }
  };

  const fetchID = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch("http://10.0.2.2:3000/auth", {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setID(data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dateAux = new Date();
  const [id, setID] = useState(fetchID);
  const [date, setDate] = useState(getDetails("date"));
  const [date2, setDate2] = useState(getDetails("date2"));
  const [date3, setDate3] = useState(getDetails("date3"));
  const [date4, setDate4] = useState(getDetails("date4"));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [lote, setLote] = useState(getDetails("lote"));
  const [vaccine, setVaccine] = useState(getDetails("vaccine"));
  const [dose, setDose] = useState(getDetails("dose"));
  const [doseNumber, setDoseNumber] = useState(1);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    fetchID();
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    switch (doseNumber) {
      case 1:
        setDate(currentDate);
        break;
      case 2:
        setDate2(currentDate);
        break;
      case 3:
        setDate3(currentDate);
        break;
      case 4:
        setDate4(currentDate);
        break;
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const submitData = () => {
    fetch("http://10.0.2.2:3000/send-data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vacina: vaccine,
        dose: dose,
        lote: lote,
        date: date,
        userID: id,
        date2: date2,
        date3: date3,
        date4: date4,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.vacina} is saved successful!`);
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Certifique se que todos os dados foram preenchidos");
        console.log(err);
      });
  };

  const updateDetails = () => {
    fetch("http://10.0.2.2:3000/update", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: route.params._id,
        vacina: vaccine,
        dose: dose,
        lote: lote,
        date: date,
        userID: id,
        date2: date2,
        date3: date3,
        date4: date4,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.vacina} is updated!`);
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("something went wrong");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/logo.png")}
        />
      </View>

      <View style={styles.inputView}>
        <Title>Vacina</Title>

        <Picker
          selectedValue={vaccine}
          style={(styles.inputStyle, { height: 50, width: 350 })}
          onValueChange={(itemValue, itemIndex) => setVaccine(itemValue)}
        >
          <Picker.Item
            label="BCG (Bacilo Calmette-Guerin)"
            value="BCG (Bacilo Calmette-Guerin)"
          />
          <Picker.Item label="Hepatite B" value="Hepatite B" />
          <Picker.Item label="Pentavalente" value="Pentavalente" />
          <Picker.Item
            label="Vacina Inativada Poliomielite (VIP)"
            value="VIP"
          />
          <Picker.Item
            label="Pneumocócica 10 Valente"
            value="Pneumocócica 10 Valente"
          />
          <Picker.Item label="Rotavírus" value="Rotavírus" />
          <Picker.Item label="Meningocócica C" value="Meningocócica C" />
          <Picker.Item label="Pentavalente" value="Pentavalente" />
          <Picker.Item label="Febre Amarela" value="Febre Amarela" />
          <Picker.Item label="Tríplice viral" value="Tríplice viral" />
          <Picker.Item
            label="DTP(Difteria, tétano e coqueluche)"
            value="DTP(Difteria, tétano e coqueluche)"
          />
          <Picker.Item
            label="Vacina Oral Poliomielite (VOP)"
            value="Vacina Oral Poliomielite (VOP)"
          />
          <Picker.Item label="Hepatite A" value="Hepatite A" />
          <Picker.Item label="Tríplice viral" value="Tríplice viral" />
          <Picker.Item label="Varicela" value="Varicela" />
          <Picker.Item label="HPV" value="HPV" />
          <Picker.Item label="Hepatite B" value="Hepatite B" />
          <Picker.Item label="Dupla Adulto" value="Dupla Adulto" />
          <Picker.Item
            label="Pneumocócica 23 Valente"
            value="Pneumocócica 23 Valente"
          />
        </Picker>

        <Picker
          selectedValue={dose}
          style={(styles.inputStyle, { height: 50, width: 350 })}
          onValueChange={(itemValue, itemIndex) => setDose(itemValue)}
        >
          <Picker.Item label="Dose unica" value="Dose unica" />
          <Picker.Item label="2 Doses" value="2 Doses" />
          <Picker.Item label="3 Doses" value="3 Doses" />
          <Picker.Item label="4 Doses" value="4 Doses" />
        </Picker>

        <TextInput
          label="Lote"
          theme={theme}
          maxLength={20}
          style={styles.inputStyle}
          mode="flat"
          value={lote}
          onChangeText={(text) => setLote(text)}
        />

        {dose == "2 Doses" ? (
          <View>
            <Button
              mode="contained"
              style={styles.inputStyle}
              theme={ButtonTheme}
              onPress={() => {
                setDoseNumber(1);
                showDatepicker();
              }}
              icon="calendar"
            >
              Data da Vacina
            </Button>
            <Button
              mode="contained"
              style={styles.inputStyle}
              theme={ButtonTheme}
              onPress={() => {
                setDoseNumber(2);
                showDatepicker();
              }}
              icon="calendar"
            >
              Data da Segunda Dose
            </Button>
          </View>
        ) : dose == "3 Doses" ? (
          <View>
            <Button
              mode="contained"
              style={styles.inputStyle}
              theme={ButtonTheme}
              onPress={() => {
                setDoseNumber(1);
                showDatepicker();
              }}
              icon="calendar"
            >
              Data da Vacina
            </Button>
            <Button
              mode="contained"
              style={styles.inputStyle}
              theme={ButtonTheme}
              onPress={() => {
                setDoseNumber(2);
                showDatepicker();
              }}
              icon="calendar"
            >
              Data da Segunda Dose
            </Button>
            <Button
              mode="contained"
              style={styles.inputStyle}
              theme={ButtonTheme}
              onPress={() => {
                setDoseNumber(3);
                showDatepicker();
              }}
              icon="calendar"
            >
              Data da Terceira Dose
            </Button>
          </View>
        ) : dose == "4 Doses" ? (
          <View>
            <Button
              mode="contained"
              style={styles.inputStyle}
              theme={ButtonTheme}
              onPress={() => {
                setDoseNumber(1);
                showDatepicker();
              }}
              icon="calendar"
            >
              Data da Vacina
            </Button>
            <Button
              mode="contained"
              style={styles.inputStyle}
              theme={ButtonTheme}
              onPress={() => {
                setDoseNumber(2);
                showDatepicker();
              }}
              icon="calendar"
            >
              Data da Segunda Dose
            </Button>
            <Button
              mode="contained"
              style={styles.inputStyle}
              theme={ButtonTheme}
              onPress={() => {
                setDoseNumber(3);
                showDatepicker();
              }}
              icon="calendar"
            >
              Data da Terceira Dose
            </Button>
            <Button
              mode="contained"
              style={styles.inputStyle}
              theme={ButtonTheme}
              onPress={() => {
                setDoseNumber(4);
                showDatepicker();
              }}
              icon="calendar"
            >
              Data da Quarta Dose
            </Button>
          </View>
        ) : (
          <Button
            mode="contained"
            style={styles.inputStyle}
            theme={ButtonTheme}
            onPress={() => {
              setDoseNumber(1);
              showDatepicker();
            }}
            icon="calendar"
          >
            Data da Vacina
          </Button>
        )}

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateAux}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      {route.params ? (
        <Button
          labelStyle={{ fontSize: 16 }}
          icon="content-save"
          mode="contained"
          style={styles.buttonStyle}
          theme={ButtonTheme}
          onPress={() => updateDetails()}
        >
          Update
        </Button>
      ) : (
        <Button
          labelStyle={{ fontSize: 16 }}
          icon="content-save"
          mode="contained"
          style={styles.buttonStyle}
          theme={ButtonTheme}
          onPress={() => {
            schedulePushNotification(dose, vaccine, date2, date3, date4);
            submitData();
          }}
        >
          Registrar vacina
        </Button>
      )}
    </View>
  );
};

async function schedulePushNotification(dose, vaccine, date2, date3, date4) {
  if (dose == "2 Doses") {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nova dose da vacina " + vaccine + " pendente",
        body: "Chegou o dia de tomar a segunda dose da vacina " + vaccine,
      },
      trigger: date2,
    });
  } else if (dose == "3 Doses") {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nova dose da vacina " + vaccine + " pendente",
        body: "Chegou o dia de tomar a segunda dose da vacina " + vaccine,
      },
      trigger: date2,
    });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nova dose da vacina " + vaccine + " pendente",
        body: "Chegou o dia de tomar a terceira dose da vacina " + vaccine,
      },
      trigger: date3,
    });
    console.log("3 notificacoes cadastradas");
  } else if (dose == "4 Doses") {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nova dose da vacina " + vaccine + " pendente",
        body: "Chegou o dia de tomar a segunda dose da vacina " + vaccine,
      },
      trigger: date2,
    });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nova dose da vacina " + vaccine + " pendente",
        body: "Chegou o dia de tomar a terceira dose da vacina " + vaccine,
      },
      trigger: date3,
    });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nova dose da vacina " + vaccine + " pendente",
        body: "Chegou o dia de tomar a quarta dose da vacina " + vaccine,
      },
      trigger: date4,
    });
    console.log("4 notificacoes cadastradas");
  }
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const theme = {
  roundness: 8,
  colors: {
    primary: "#595959",
    background: "white",
  },
};

const ButtonTheme = {
  colors: {
    primary: "#0066FF",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6EB4EF",
  },
  imageContainer: {
    alignItems: "center",
  },
  tinyLogo: {
    alignItems: "center",
    width: 64,
    height: 64,
    marginTop: 16,
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
    fontSize: 16,
  },
  textView: {
    marginTop: 24,
    alignItems: "center",
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default VaccineRegistration;
