import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    container2: {
        backgroundColor: "#C2C5CC",
        position: "absolute",
        width: 316,
        height: 305,
        left: 28,
        top: 151,
    },
    text1: {
        flex: 1,
        fontSize: 24,
        lineHeight: 32,
        textAlign: "left",
    },
    text2: {
        flex: 0,
        fontSize: 24,
        lineHeight: 32,
        textAlign: "left",
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
    button: {
        backgroundColor: 'blue',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
      },
});

class DailyHistory extends React.Component {
    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.text1}>TBWO</Text>
                <View style={styles.container2}>
                    <Text style={styles.text2}>Session Length: 6:30 </Text>
                    <Text style={styles.text3}>Exercises Completed: 2 </Text>
                    <Text style={styles.text4}>Points Earned: 428 </Text>
                    <Text style={styles.text5}>Steps Taken: 6,120 </Text>
                </View>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate("SideBar")}>
                    <Text style={styles.button}>Side Menu</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate("SessionCreation")}>
                    <Text style={styles.button}>Session</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate("SessionHistory")}>
                    <Text style={styles.button}>History</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate("Activities")}>
                    <Text style={styles.button}>Activities</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default DailyHistory;
