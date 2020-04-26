import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
const db = require('../util/dbAPI')

export default class Logout extends React.Component {
    constructor(props) { //state and method instantiation
        super(props);
    }
    componentDidMount() {
        this.props.navigation.closeDrawer();
        db.logout()
        this.props.navigation.navigate("Login")
    }

    render() {
        return (
            <View style={{ alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ marginVertical: 25 }}>Currently Logging You Off</Text>
                <ActivityIndicator />
            </View>
        )
    }
}