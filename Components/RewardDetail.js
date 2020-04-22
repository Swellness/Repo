import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import { Stitch, RemoteMongoClient } from 'mongodb-stitch-react-native-sdk';
const db = require('../util/dbAPI')
const styles = StyleSheet.create({
    image: {
        //flex: 1,
        width: 70,
        height: 70,
        // resizeMode: 'contain'
    },
    rewardPieces: {
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

const RewardDetails = ({ imageSource, title, score }) => {

    const purchaseItem = () => {
        console.log("hi: " + score)
        //////////GETS USERS CURRENT POINTS////////////
        const collection = db.loadCollection('SwellnessTest', 'Points')
        var user = Stitch.defaultAppClient.auth.user.profile.email
        var data = 0
        var price = parseInt(score)
        collection.find({ email: user }, { limit: 10 }).asArray().then(result => {
            result.forEach(element => {
                data = element.points
                console.log("existing points:" + data)
            })
        }).then(() => {
            /////////////SUBTRACTS USERS POINTS//////////////////////
            data -= price;
            console.log("new points:" + data)
            var id = Stitch.defaultAppClient.auth.user.profile.email;
            const output = { "email": id, "points": data } //creates output object to update
            const options = { "upsert": false };
            Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db("SwellnessTest").collection("Points").updateOne({ "email": id }, output, options).then(console.log("subtracted points"))
        })



    }

    const [modalVisible, setModalVisible] = useState(false);
    return <View style={styles.rewardPieces}>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Success!!</Text>
                    <Text style={styles.modalText}>You will recieve an email shortly!</Text>

                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                            purchaseItem()

                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>


        <Text></Text>
        <Image source={imageSource}
            style={styles.image} />
        <Text></Text>
        <Text>{title}</Text>
        <TouchableHighlight
            style={styles.openButton}
            onPress={() => {
                setModalVisible(true);
            }}
        >
            <Text style={styles.textStyle}>Redeem for - {score} Points!</Text>
        </TouchableHighlight>

    </View>
};
export default RewardDetails;