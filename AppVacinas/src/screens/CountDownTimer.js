import React, { useEffect, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { MyContext } from "../../App";
import CountDown from "react-native-countdown-component";

const Width = Dimensions.get("window").width;

const CountDownTimer = ({ navigation }) => {
  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("id");
    fetch("http://10.0.2.2:3000/?id=" + id, {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        //forma de passar dados sem redux
        // setData(results)
        // setLoading(false)

        dispatch({ type: "ADD_DATA", payload: results });
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("someting went wrong");
      });
  };

  const { state, dispatch } = useContext(MyContext);
  const { data, loading } = state;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const formateTimer = (dateString) => {
    let aux = "";
    aux = dateString;
    let ano = aux[0] + aux[1] + aux[2] + aux[3];
    let mes = aux[5] + (parseInt(aux[6]) - 1);
    let dia = aux[8] + aux[9];
    return new Date(ano, mes, dia);
  };

  const renderList = (item) => {
    let date;
    let date2;
    let date3;

    if (item.dose == "2 Doses") {
      date = formateTimer(item.date2);
      date2 = -1;
      date3 = -1;
    } else if (item.dose == "3 Doses") {
      date = formateTimer(item.date2);
      date2 = formateTimer(item.date3);
      date3 = -1;
    } else if (item.dose == "4 Doses") {
      date = formateTimer(item.date2);
      date2 = formateTimer(item.date3);
      date3 = formateTimer(item.date4);
    } else {
      date = -1;
      date2 = -1;
      date3 = -1;
    }

    if (
      date - new Date() < 0 &&
      date2 - new Date() < 0 &&
      date3 - new Date() < 0
    ) {
      return;
    } else {
      return (
        <TouchableOpacity
          style={styles.myCard}
          onPress={() => navigation.navigate("Vaccine", { item })}
        >
          <View>
            <View style={{ marginVertical: 10, marginHorizontal: 0 }}>
              <Card.Content>
                <Paragraph style={styles.textSubtitle}>{item.vacina}</Paragraph>
                {date >= 0 && (
                  <View>
                    <Paragraph style={styles.textSubtitle}>
                      Segunda dose:
                    </Paragraph>
                    <CountDown
                      until={(date - new Date()) / 1000}
                      onFinish={() =>
                        alert(
                          "Chegou o dia de tomar a nova dose da vacina " +
                            item.vacina
                        )
                      }
                      digitStyle={{
                        backgroundColor: "#FFF",
                      }}
                      digitTxtStyle={{ color: "#0066FF" }}
                      timeLabels={{
                        d: "Dias",
                        h: "Horas",
                        m: "Minutos",
                        s: "Segundos",
                      }}
                      size={17}
                    />
                  </View>
                )}

                {date2 >= 0 && (
                  <View>
                    <Paragraph style={styles.textSubtitle}>
                      Terceira dose:
                    </Paragraph>
                    <CountDown
                      until={(date2 - new Date()) / 1000}
                      onFinish={() =>
                        alert(
                          "Chegou o dia de tomar a nova dose da vacina " +
                            item.vacina
                        )
                      }
                      digitStyle={{
                        backgroundColor: "#FFF",
                      }}
                      timeLabels={{
                        d: "Dias",
                        h: "Horas",
                        m: "Minutos",
                        s: "Segundos",
                      }}
                      digitTxtStyle={{ color: "#0066FF" }}
                      size={17}
                    />
                  </View>
                )}

                {date3 >= 0 && (
                  <View>
                    <Paragraph style={styles.textSubtitle}>
                      Quarta dose:
                    </Paragraph>
                    <CountDown
                      until={(date3 - new Date()) / 1000}
                      onFinish={() =>
                        alert(
                          "Chegou o dia de tomar a nova dose da vacina " +
                            item.vacina
                        )
                      }
                      digitStyle={{
                        backgroundColor: "#FFF",
                      }}
                      timeLabels={{
                        d: "Dias",
                        h: "Horas",
                        m: "Minutos",
                        s: "Segundos",
                      }}
                      digitTxtStyle={{ color: "#0066FF" }}
                      size={17}
                    />
                  </View>
                )}
              </Card.Content>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flatListView}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return renderList(item);
          }}
          keyExtractor={(item) => `${item._id}`}
          onRefresh={() => {
            fetchData();
          }}
          numColumns={2}
          refreshing={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  myCard: {
    backgroundColor: "white",
    height: Width / 1.2,
    width: Width / 2.2,
    margin: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },
  textTitle: {
    fontSize: 20,
    padding: 4,
    fontWeight: "bold",
    color: "#000000",
  },
  textSubtitle: {
    fontSize: 16,
    padding: 4,
    color: "#000000",
  },
  text: {
    fontSize: 20,
    padding: 4,
    color: "#3D3D3D",
  },
  flatListView: {
    paddingVertical: 10,
    flexDirection: "row",
    flex: 4,
    marginTop: 16,
    marginLeft: "0.5%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 30,
  },
});

export default CountDownTimer;
