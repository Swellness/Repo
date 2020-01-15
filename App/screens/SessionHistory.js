import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 18,
        lineHeight: 24,
        justifyContent: "center",
        textAlign: "center",
        position: "absolute",
        width: 315,
        height: 77,
        left: 30,
        top: 56,
    }
});

class SessionHistory extends React.Component {
    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.text}>Tap on a Day to see its stats, or select the Month to view all your stats for that Month.</Text>
            </View>
        )
    }
}

export default SessionHistory;
