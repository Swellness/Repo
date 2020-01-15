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
    onPress={() => this.props.navigation.navigate("Login")} 
    >
      <Text style={styles.button}>Signout</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate("Rewards")} 
    >
      <Text style={styles.button}>Rewards</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate("OrganizationalLead")} 
    >
      <Text style={styles.button}>LeaderBoards</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate("Profile")} 
    >
      <Text style={styles.button}>Profile</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate("OrgAdminSuiteSettings")} 
    >
      <Text style={styles.button}>Org. Admin</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate("Settings")} 
    >
      <Text style={styles.button}>Settings</Text>
    </TouchableOpacity>
    </View>
        );
    }
}