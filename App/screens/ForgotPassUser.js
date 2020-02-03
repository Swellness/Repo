import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from "native-base";

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
    borderColor: "gray",
    borderWidth: 1
  }
});

export default function App() {
  return (
    <Container>
      <Content>
        <Text style={{ fontSize: 32 }}> Reset Your Password</Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          If you are unable to gain access to your account, please enter your
          email to reset your password:
        </Text>
        <Text></Text>
        <Text></Text>
        <Text style={{ textAlign: "center", fontSize: 20 }}>Email</Text>
        <TextInput
          style={styles.TextBoxStyle}
          placeholder="JohnMadden@apu.edu"
          onChangeText={text => setImageLink(text)}
        />
      </Content>
      <Footer>
        <FooterTab style={{ backgroundColor: "#c2c5cc" }}>
          <Button
            onPress={() => this.props.navigation.navigate("SessionHistory")}
          >
            <Icon name="calendar" style={{ color: "#000" }} />
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("ActiveSession")}
          >
            <Icon active name="stopwatch" style={{ color: "#000" }} />
          </Button>
          <Button onPress={() => this.props.navigation.navigate("Activities")}>
            <Icon name="heart" style={{ color: "#000" }} />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
