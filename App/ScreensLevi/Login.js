import React from "react";
import { View, ScrollView, StatusBar, TouchableOpacity, StyleSheet, onPress, Text, Button } from "react-native";

const styles = StyleSheet.create({
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
  color: {
    backgroundColor: 'blue',
  },
});

export default class Start extends React.Component {
render(){

  return (

    <View>
    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate("CreateUser")} 
    >
      <Text style={styles.button}>New User</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate("SessionCreation")} 
    >
      <Text style={styles.button}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate("ForgotPassUser")} 
    >
      <Text style={styles.button}>Forgot Password</Text>
    </TouchableOpacity>
    </View>
        );
    }
}