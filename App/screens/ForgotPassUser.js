import React from "react";
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,

} from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    },
    TextBoxStyle: { 
      height: 50,
      width: 300, 
      borderColor: 'gray', 
      borderWidth: 1,
    },
  });

export default function App() {
  return (
    <View style={styles.container}>
      <Text
      style = {{fontSize: 32,}}
      > Reset Your Password</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text
      style = {{textAlign: "center", fontSize: 20,}}
      >If you are unable to gain access to your account, 
      please enter your email to reset your password:</Text>
      <Text></Text>
      <Text></Text>
      <Text
      style = {{textAlign: "center", fontSize: 20,}}
      >Email</Text>
      <TextInput
        style={styles.TextBoxStyle}
        placeholder="JohnMadden@apu.edu"
        onChangeText={text => setImageLink(text)}
    />
    </View>
  );
}