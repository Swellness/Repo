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
    onPress={() => this.props.navigation.navigate("ActiveSession")}>
      <Text style={styles.button}>Finish Break</Text>
    </TouchableOpacity>

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
        );
    }
}