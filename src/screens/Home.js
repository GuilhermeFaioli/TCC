import React from 'react'
import { View, StyleSheet, Image, FlatList, Text, Dimensions } from 'react-native'
import { Card, Title, Paragraph, FAB } from 'react-native-paper'

const Width = Dimensions.get('window').width
const data = [
    {
        _id: 1,
        nome: "Vacina 1",
        data: "01/01/2021",
        val: "01/01/2022",
        lote: "168VF00372"
    },
    {
        _id: 2,
        nome: "Vacina 2",
        data: "01/02/2021",
        val: "01/02/2022",
        lote: "169VF00373"
    },
    {
        _id: 3,
        nome: "Vacina 3",
        data: "01/02/2021",
        val: "01/02/2022",
        lote: "169VF00373"
    },
    {
        _id: 4,
        nome: "Vacina 4",
        data: "01/02/2021",
        val: "01/02/2022",
        lote: "169VF00373"
    },
    {
        _id: 5,
        nome: "Vacina 5",
        data: "01/02/2021",
        val: "01/02/2022",
        lote: "169VF00373"
    }
]

const Home = () => {

    const renderList = ((item) => {
        return (
            <View style={styles.cardView}>
                <Card style={styles.myCard}>
                <View>
                    <View style={{ marginVertical: 10, marginHorizontal: 10}}>
                        <Card.Content>
                            <Title style={styles.text}>{item.nome}</Title>
                            <Paragraph style={styles.text}>Data:</Paragraph>
                            <Paragraph style={styles.text}>{item.data}</Paragraph>
                            <Paragraph style={styles.text}>Validade:</Paragraph>
                            <Paragraph style={styles.text}>{item.val}</Paragraph>
                            <Paragraph style={styles.text}>Lote:</Paragraph>
                            <Paragraph style={styles.text}>{item.lote}</Paragraph>
                        </Card.Content>
                    </View>
                </View>
            </Card>
            </View>
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
            <View style={styles.statusView}>
                <Card style={styles.cardStyle}>
                    <Card.Title title="Data da proxima dose a ser tomada" />
                    <Card.Content>
                        <Title>Vacina 1</Title>
                        <Paragraph>Data: 01/01/2021</Paragraph>
                    </Card.Content>
                </Card>
            </View>
            <View style={styles.flatListView}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return renderList(item)
                    }}
                    keyExtractor={item => `${item._id}`}
                    numColumns={2}
                />
            </View>
            
            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{ colors: { accent: "#006aff" } }}
                //onPress={() => navigation.navigate("Create")}
            //props.navigation.navigate("Create") o navigation foi desestruturado das props
            />

        </View>
    )
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
    statusView: {
        marginTop: 8,
        flex: 1,
        flexDirection: "column"
    },
    cardStyle: {
        backgroundColor: "#C3E8B6"
    },
    myCard: {
        height: Width/2
    },
    cardView: {
        flex: 2,
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "center"
    },
    text: {
        fontSize: 20,
    },
    flatListView: {
        flex: 4
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 8,
    }
})

export default Home