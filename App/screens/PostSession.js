import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    container2: {
        marginTop: 20,
        width: 150 * 2,
        height: 160,
        backgroundColor: '#C2C5CC'
    },
    headerText: {
        flex: 0,
        color: "#000000",
        fontSize: 56,
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 25,
        textAlign: "center"
    },
    text: {
        flex: 0,
        textAlign: "center",
        fontSize: 30,
        lineHeight: 40,
        alignContent: "flex-start",
    },
    text2: {
        flex: 0,
        textAlign: "center",
        fontSize: 30,
        lineHeight: 40,
        marginBottom: 25,
    },
    text3: {
        flex: 0,
        fontSize: 24,
        lineHeight: 32,
        textAlign: "left",
    },
    text4: {
        flex: 0,
        fontSize: 24,
        lineHeight: 32,
        textAlign: "left",
    },
    text5: {
        flex: 1,
        fontSize: 24,
        lineHeight: 32,
        textAlign: "left",
    },
    text6: {
        fontWeight: "600",
        fontSize: 32,
        lineHeight: 40,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#C2C5CC",
        textAlign: "center",
        position: "absolute",
        width: 221,
        height: 55,
        left: 75,
        top: 474,
    }
});

class PostSession extends React.Component {
    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.headerText}>Good job today!!</Text>
                <Text style={styles.text}> Daily Challenge: </Text>
                <Text style={styles.text2}> 4/4  Activities </Text>
                <View style={styles.container2}>
                    <Text style={styles.text3}> Steps Taken: 428 </Text>
                    <Text style={styles.text4}> Exercises Completed: 4</Text>
                    <Text style={styles.text5}> Points Earned: 78</Text>
                </View>
                <TouchableOpacity style={styles.button}
                /*onPress={() => this.props.navigation.navigate("SessionCreation")}*/>
                    <Text style={styles.text6}> New Session </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default PostSession;
