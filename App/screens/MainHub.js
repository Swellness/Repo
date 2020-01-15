import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar, SafeAreaView, ImageBackground } from 'react-native';

// Constants that help define the shape of our screen/buttons
const screen = Dimensions.get('window');
const buttonWidth = screen.width / 2
const buttonLength = screen.height / 5

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        backgroundColor: "#36B1F0",
        flex: 0.5,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    text: {
        color: "#000000",
        fontSize: 35,
        fontWeight: "400",
        justifyContent: "center"
    },
});

class MainHub extends React.Component {
    render() {
        return (
            <View style={styles.container} >
                <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate("Activities")}>
                    <Text style={styles.text}> Activities </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate("DailyHistory")}>
                    <Text style={styles.text}> Daily History </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate("Leaderboard")}>
                    <Text style={styles.text}> Leaderboard </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate("PostSession")}>
                    <Text style={styles.text}> Post Session </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate("Profile")}>
                    <Text style={styles.text}> Profile </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate("Rewards")}>
                    <Text style={styles.text}> Rewards </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate("SessionHistory")}>
                    <Text style={styles.text}> Session History </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MainHub;
