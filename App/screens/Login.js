import React from "react";
import { 
  View,  
  TouchableOpacity, 
  StyleSheet,  
  Text, 
  Button,
  TextInput,
  Image,
 } from "react-native";

const styles = StyleSheet.create({
  Button1: {
    backgroundColor: "#C2C5CC",
    textAlign: "center",
    position: "absolute",
     width: 221,
     height: 55,
     left: 75,
     top: 10,
    lineHeight: 40,
    fontSize: 32,
    fontWeight: "600",
    padding: 5,
  },
  Button2: {
    backgroundColor: "#C2C5CC",
    textAlign: "center",
    position: "absolute",
    width: 221,
    height: 55,
    left: 75,
    top: 74,
    lineHeight: 40,
    fontSize: 32,
    fontWeight: "600",
    padding: 5,
  },
  Button3:{
    textAlign: "center",
    position: "absolute",
    left: 75,
    top: 130,
    fontSize: 30,
    textDecorationLine: 'underline',
    padding: 5,
  },
  TextBoxStyle: { 
    height: 50, 
    borderColor: 'gray', 
    borderWidth: 1,
  },
  stretch: {
    width: 375,
    height: 200,
    resizeMode: 'stretch'
  },
});

export default class Start extends React.Component {
render(){

  return (
    <View>
    <Image
      style={styles.stretch}
      source={require('../Pictures/swellness_logo_outline.png')}
    />
    <Text>UserName</Text>
      <TextInput
        style={styles.TextBoxStyle}
        placeholder="JohnMadden"
        onChangeText={text => setImageLink(text)}
    />
    <Text>Password</Text>
      <TextInput
        style={styles.TextBoxStyle}
        placeholder="**********"
        onChangeText={text => setImageLink(text)}
      />
    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate("CreateUser")}>
      <Text style={styles.Button1}>New User</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate("SessionCreation")}>
      <Text style={styles.Button2}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate("ForgotPassUser")}>
      <Text style={styles.Button3}>Forgot Password</Text>
    </TouchableOpacity>
    </View>
        );
    }
}