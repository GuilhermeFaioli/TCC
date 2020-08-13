import React, { useEffect, useContext } from 'react'
import { View, StyleSheet, Image, FlatList, Dimensions } from 'react-native'
import { Card, Title, Paragraph, FAB, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
import { MyContext } from '../../App'

const Width = Dimensions.get('window').width

const Home = ({ navigation }) => {
    const { state, dispatch } = useContext(MyContext)
    const { data, loading } = state

    const logout = () => {
        AsyncStorage.removeItem("token").then(() => {
            navigation.replace("Login")
        })
    }

    const fetchData = async () => {
        const token = await AsyncStorage.getItem("token")
        fetch("http://10.0.2.2:3000/", {
            headers: new Headers({
                Authorization: "Bearer " + token
            })
        }).then(res => res.json()).then(results => {

            //forma de passar dados sem redux
            // setData(results)
            // setLoading(false)

            dispatch({ type: "ADD_DATA", payload: results })
            dispatch({ type: "SET_LOADING", payload: false })
        }).catch(err => {
            Alert.alert("someting went wrong")
        })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData()
        });
        return unsubscribe
    }, [navigation])

    const renderList = ((item) => {
        return (
            <Card style={styles.myCard} onPress={() => navigation.navigate("Vaccine", { item })}>
                <View>
                    <View style={{ marginVertical: 10, marginHorizontal: 0 }}>
                        <Card.Content>
                            <Title style={styles.text}>{item.nome}</Title>
                            <Paragraph style={styles.text}>Data: {item.date}</Paragraph>
                            <Paragraph style={styles.text}>Dose: {item.dose}</Paragraph>
                            <Paragraph style={styles.text}>Lote: {item.lote}</Paragraph>
                        </Card.Content>
                    </View>
                </View>
            </Card>

        )
    })

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/logo.png')}
                />
            </View>

            <View style={styles.flatListView}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return renderList(item)
                    }}
                    keyExtractor={item => `${item._id}`}
                    onRefresh={() => fetchData()}
                    numColumns={2}
                    refreshing={loading}
                />
            </View>

            <Button mode="contained" theme={ButtonTheme} onPress={() => logout()}>
                Sair
            </Button>

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
    myCard: {
        height: Width/2,
        width: Width/2.6,
        margin: 4,
    },
    text: {
        fontSize: 20,
    },
    flatListView: {
        paddingVertical: 10,
        flexDirection: "row",
        flex: 4,
        marginTop: 16,
        marginLeft: "9%"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 30,
    }
})

export default Home