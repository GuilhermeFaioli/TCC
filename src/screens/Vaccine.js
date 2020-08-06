import React from 'react'
import { View, StyleSheet, Image, FlatList, Text, Dimensions } from 'react-native'
import { Card, Title, Paragraph, FAB } from 'react-native-paper'

const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

const Vaccine = () => {


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <View style={styles.cardView}>
                <Card style={styles.cardStyle}>
                    <Card.Title title="Vacina 1" />
                    <Card.Content>
                        <Paragraph style={styles.text}>Data: 01/01/2021</Paragraph>
                        <Paragraph style={styles.text}>Val: 01/01/2021</Paragraph>
                        <Paragraph style={styles.text}>Lote: 168VF00372</Paragraph>
                        <Paragraph style={styles.text}>Descrição: Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Donec tincidunt eros libero, a aliquam justo
                            volutpat id. Praesent convallis aliquam purus sit amet
                            sollicitudin. Fusce mattis tortor a malesuada rhoncus.
                            Integer sagittis id urna quis tincidunt. Morbi ultrices
                            sagittis diam, a consequat mauris molestie vitae. Nunc
                            commodo porttitor ipsum et egestas. Sed feugiat sit
                            amet elit at dignissim. Phasellus erat erat, pharetra
                            quis dolor sit amet, gravida commodo mi. Nullam vitae
                            tristique enim.
                        </Paragraph>
                    </Card.Content>
                </Card>
            </View>

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
    cardView: {
        marginTop: 16,
        alignItems: "center"
    },
    cardStyle: {
        width: Width * 0.9554,
        height: Height * 0.85
    },
    text: {
        fontSize: 20,
    }
})

export default Vaccine