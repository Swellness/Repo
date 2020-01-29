import React from "react";
import { 
  View, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  StyleSheet, 
  onPress, 
  Text, 
  Button,
  TextInput,
  Image,
 } from "react-native";

const styles = StyleSheet.create({
  button: {
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
    textAlign: "center",
  },
  color: {
    backgroundColor: 'blue',
  },
  stretch: {
    width: 375,
    height: 200,
    resizeMode: 'stretch'
  },
  TextBoxStyle: { 
    height: 50, 
    borderColor: 'gray', 
    borderWidth: 1,
  },
});

export default class Start extends React.Component {
render(){

  return (
    <View>
    <Image
      style={styles.stretch}
      source={require('../Pictures/Welcome_Pic.png')}
    />
    <Text>Username</Text>
      <TextInput
        style={styles.TextBoxStyle}
        placeholder="John Madden"
        onChangeText={text => setImageLink(text)}
    />
    <Text>Email</Text>
      <TextInput
        style={styles.TextBoxStyle}
        placeholder="JohnMadden@gmail.com"
        onChangeText={text => setImageLink(text)}
    />
    <Text>Password</Text>
      <TextInput
        style={styles.TextBoxStyle}
        placeholder="**********"
        onChangeText={text => setImageLink(text)}
    />
    <Text>Retype Password</Text>
      <TextInput
        style={styles.TextBoxStyle}
        placeholder="**********"
        onChangeText={text => setImageLink(text)}
    />
    <TouchableOpacity 
    onPress={() => this.props.navigation.navigate("SessionCreation")}>
      <Text style={styles.button}>Login</Text>
    </TouchableOpacity>
    </View>
        );
    }
}