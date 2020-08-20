import React, { useEffect, useContext, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native'
import { Card, Title, Paragraph, FAB, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
import { MyContext } from '../../App'
import { color } from 'react-native-reanimated'

const Width = Dimensions.get('window').width

const Home = ({ navigation }) => {  

    const fetchID = async () => {
        const token = await AsyncStorage.getItem("token")
        fetch("http://10.0.2.2:3000/auth", {
            headers: new Headers({
                Authorization: "Bearer " + token
            })
        }).then(res => res.json()).then(async data => {
            try {
                await AsyncStorage.setItem('id', data.id)
            } catch (e) {
                console.log("Error: " + e)
                Alert.alert("Algo deu errado com id do usuario1")
            }
    
        }).catch(err => {
            Alert.alert("Algo deu errado com id do usuario2")
        })
    }

    navigation.setOptions({
        headerRight: () => (
          <Button icon="logout" theme={Buttonlogout} onPress={() => logout()}>Logout
          </Button>
        ),
      });

    const { state, dispatch } = useContext(MyContext)
    const { data, loading } = state

    const logout = () => {
        AsyncStorage.removeItem("id").then(() => {
            AsyncStorage.removeItem("token").then(() => {
                navigation.replace("Login")
            })
        })
    }

    const fetchData = async () => {
        const token = await AsyncStorage.getItem("token")
        const id = await AsyncStorage.getItem("id")
        fetch("http://10.0.2.2:3000/?id="+id,  {
            headers: new Headers({
                Authorization: "Bearer " + token,
            }),
        }).then(res => res.json()).then(results => {

            //forma de passar dados sem redux
            // setData(results)
            // setLoading(false)

            dispatch({ type: "ADD_DATA", payload: results })
            dispatch({ type: "SET_LOADING", payload: false })
        }).catch(err => {
            console.log(err)
            Alert.alert("someting went wrong")
        })
    }

    useEffect(() => {
        fetchID()
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData()
        });
        return unsubscribe
    }, [navigation])

    const formateDate = (dateString) => {
        let aux = ''
        let arrAux
        aux = dateString.split('-')
        aux = aux.join('/')
        aux = aux.split('T')[0]
        return aux.split('/')[2]+'/'+aux.split('/')[1]+'/'+aux.split('/')[0]
    }
    
    

    const renderList = ((item) => {
        return (
            <TouchableOpacity style={styles.myCard} onPress={() => navigation.navigate("Vaccine", { item })}>
                <View>
                    <View style={{ marginVertical: 10, marginHorizontal: 0 }}>
                        <Card.Content>
                            <Title style={styles.textSubtitle}>{item.vacina}</Title>
                            <Paragraph style={styles.textSubtitle}>Data:</Paragraph>
                            <Paragraph style={styles.text}>{formateDate(item.date)}</Paragraph>
                            <Paragraph style={styles.textSubtitle}>Dose:</Paragraph>
                            <Paragraph style={styles.text}>{item.dose}</Paragraph>
                        </Card.Content>
                    </View>
                </View>
            </TouchableOpacity>

        )
    })

    return (
        <View style={styles.container}>

            <View style={styles.flatListView}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return renderList(item)
                    }}
                    keyExtractor={item => `${item._id}`}
                    onRefresh={() => {fetchData(); fetchID();}}
                    numColumns={2}
                    refreshing={loading}
                />
            </View>

            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{ colors: { accent: "#006aff" } }}
                onPress={() => navigation.navigate("Create")}
            />

        </View>
    )
}

const ButtonTheme = {
    colors: {
        primary: "#0066FF",
    }
}

const Buttonlogout = {
    colors: {
        primary: "white",
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8
    },
    myCard: {
        backgroundColor: "white",
        height: Width/1.8,
        width: Width/2.2,
        margin: 4,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 8
    },
    textTitle: {
        fontSize: 20,
        padding: 4,
        fontWeight: "bold",
        color: "#000000"
    },
    textSubtitle: {
        fontSize: 20,
        padding: 4,
        color: "#000000"
    },
    text: {
        fontSize: 20,
        padding: 4,
        color: "#3D3D3D"
    },
    flatListView: {
        paddingVertical: 10,
        flexDirection: "row",
        flex: 4,
        marginTop: 16,
        marginLeft: "0.5%"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 30,
    },
})

export default Home