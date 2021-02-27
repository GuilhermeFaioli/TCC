import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  Text,
  Alert,
} from "react-native";
import { Card, Paragraph, Appbar, Button } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

const Vaccine = (props) => {
  const [modal, setModal] = useState(false);
  const {
    _id,
    vacina,
    dose,
    lote,
    date,
    userID,
    date2,
    date3,
    date4,
  } = props.route.params.item;

  const formateTimer = (dateString) => {
    let aux = "";
    aux = dateString;
    let ano = aux[0] + aux[1] + aux[2] + aux[3];
    let mes = aux[5] + (parseInt(aux[6]) - 1);
    let dia = aux[8] + aux[9];
    return new Date(ano, mes, dia);
  };

  const [selectedStartDate, setSelectedStartDate] = useState(
    formateTimer(date)
  );

  const onDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const customDatesStyles = () => {
    let arrayAux = [];
    arrayAux.push({
      date: formateTimer(date),
      style: { backgroundColor: "#01A9DB" },
      textStyle: { color: "black" },
    });
    if (date2 !== undefined) {
      arrayAux.push({
        date: formateTimer(date2),
        style: { backgroundColor: "#01A9DB" },
        textStyle: { color: "black" },
      });
      console.log(arrayAux);
    }
    return arrayAux;
  };

  const formateDate = (dateString) => {
    let aux = "";
    let arrAux;
    aux = dateString.split("-");
    aux = aux.join("/");
    aux = aux.split("T")[0];
    return (
      aux.split("/")[2] + "/" + aux.split("/")[1] + "/" + aux.split("/")[0]
    );
  };

  const deleteVaccine = () => {
    fetch("http://10.0.2.2:3000/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then((res) => res.json())
      .then((deletedVac) => {
        Alert.alert(`Vacina ${deletedVac.vacina} foi apagada`);
        props.navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <Card style={styles.cardStyle}>
          <Card.Title title={vacina} />
          <Card.Content>
            <Paragraph style={styles.textBold}>Quantidade de doses:</Paragraph>
            <Paragraph style={styles.text}>{dose}</Paragraph>
            {dose == "2 Doses" ? (
              <View>
                <Paragraph style={styles.textBold}>Data:</Paragraph>
                <Paragraph style={styles.text}>{formateDate(date)}</Paragraph>
                <Paragraph style={styles.textBold}>Data 2° dose:</Paragraph>
                <Paragraph style={styles.text}>{formateDate(date2)}</Paragraph>
              </View>
            ) : dose == "3 Doses" ? (
              <View>
                <Paragraph style={styles.textBold}>Data:</Paragraph>
                <Paragraph style={styles.text}>{formateDate(date)}</Paragraph>
                <Paragraph style={styles.textBold}>Data 2° dose:</Paragraph>
                <Paragraph style={styles.text}>{formateDate(date2)}</Paragraph>
                <Paragraph style={styles.textBold}>Data 3° dose:</Paragraph>
                <Paragraph style={styles.text}>{formateDate(date3)}</Paragraph>
              </View>
            ) : dose == "4 Doses" ? (
              <View>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Paragraph style={styles.textBold}>Data:</Paragraph>
                    <Paragraph style={styles.text}>
                      {formateDate(date)}
                    </Paragraph>
                  </View>
                  <View>
                    <Paragraph style={styles.textBold}>
                      {"                "}
                      Data 2° dose:
                    </Paragraph>
                    <Paragraph style={styles.text}>
                      {"                "}
                      {formateDate(date2)}
                    </Paragraph>
                  </View>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Paragraph style={styles.textBold}>Data 3° dose:</Paragraph>
                    <Paragraph style={styles.text}>
                      {formateDate(date3)}
                    </Paragraph>
                  </View>
                  <View>
                    <Paragraph style={styles.textBold}>
                      {"              "}
                      Data 4° dose:
                    </Paragraph>
                    <Paragraph style={styles.text}>
                      {"              "}
                      {formateDate(date4)}
                    </Paragraph>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Paragraph style={styles.textBold}>Data:</Paragraph>
                <Paragraph style={styles.text}>{formateDate(date)}</Paragraph>
              </View>
            )}

            <Paragraph style={styles.textBold}>Lote:</Paragraph>
            <Paragraph style={styles.text}>{lote}</Paragraph>

            <CalendarPicker
              onDateChange={() => onDateChange}
              weekdays={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]}
              months={[
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro",
              ]}
              initialDate={selectedStartDate}
              nextTitle="Próximo"
              previousTitle="Anterior"
              customDatesStyles={
                dose == "Dose unica"
                  ? [
                      {
                        date: formateTimer(date),
                        style: { backgroundColor: "#01A9DB" },
                        textStyle: { color: "black" },
                      },
                    ]
                  : dose == "2 Doses"
                  ? [
                      {
                        date: formateTimer(date),
                        style: { backgroundColor: "#01A9DB" },
                        textStyle: { color: "black" },
                      },
                      {
                        date: formateTimer(date2),
                        style: { backgroundColor: "#01A9DB" },
                        textStyle: { color: "black" },
                      },
                    ]
                  : dose == "3 Doses"
                  ? [
                      {
                        date: formateTimer(date),
                        style: { backgroundColor: "#01A9DB" },
                        textStyle: { color: "black" },
                      },
                      {
                        date: formateTimer(date2),
                        style: { backgroundColor: "#01A9DB" },
                        textStyle: { color: "black" },
                      },
                      {
                        date: formateTimer(date3),
                        style: { backgroundColor: "#01A9DB" },
                        textStyle: { color: "black" },
                      },
                    ]
                  : [
                      {
                        date: formateTimer(date),
                        style: { backgroundColor: "#01A9DB" },
                        textStyle: { color: "black" },
                      },
                      {
                        date: formateTimer(date2),
                        style: { backgroundColor: "#01A9DB" },
                        textStyle: { color: "black" },
                      },
                      {
                        date: formateTimer(date3),
                        style: { backgroundColor: "#01A9DB" },
                        textStyle: { color: "black" },
                      },
                      {
                        date: formateTimer(date4),
                        style: { backgroundColor: "#01A9DB" },
                        textStyle: { color: "black" },
                      },
                    ]
              }
            />
          </Card.Content>
        </Card>
      </View>
      <Appbar style={styles.bottom} theme={theme}>
        <Appbar.Action
          icon="square-edit-outline"
          onPress={() => {
            props.navigation.navigate("Create", {
              _id,
              vacina,
              dose,
              lote,
              date,
              userID,
              date2,
              date3,
              date4,
            });
          }}
        />
        <Appbar.Action icon="delete" onPress={() => setModal(true)} />
      </Appbar>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textBold}>
              Tem certeza que deseja apagar a vacina {vacina}?
            </Text>
            <View style={styles.buttonView}>
              <Button
                style={styles.buttonStyle}
                mode="contained"
                theme={theme}
                onPress={() => deleteVaccine()}
              >
                Sim
              </Button>
              <Button
                style={styles.buttonStyle}
                mode="contained"
                theme={theme}
                onPress={() => setModal(false)}
              >
                Não
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#0066FF",
    background: "white",
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
  cardView: {
    marginTop: 16,
    alignItems: "center",
  },
  cardStyle: {
    width: Width * 0.9554,
    height: Height * 0.8,
  },
  text: {
    fontSize: 20,
  },
  textBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  buttonStyle: {
    margin: 8,
  },
});

export default Vaccine;
