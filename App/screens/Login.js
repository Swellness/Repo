
import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Image
} from "react-native";
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
    padding: 5
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
    padding: 5
  },
  Button3: {
    textAlign: "center",
    position: "absolute",
    left: 75,
    top: 130,
    fontSize: 30,
    textDecorationLine: "underline",
    padding: 5
  },
  TextBoxStyle: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1
  },

  stretch: {
    width: 375,
    height: 200,
    resizeMode: "stretch"
  }
});

import { 
  Container, 
  Header, 
  Content, 
  Form, 
  Item, 
  Input, 
  Button, 
  Text,
  Label } from 'native-base';

export default class Start extends React.Component {
  render() {
    return (
      <Container>
        <Content>
        <Form>
        <Image style={styles.stretch} source={require('../Pictures/swellness_logo_outline.png')}/>
          <Item stackedLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
          <Button rounded
          onPress={() => this.props.navigation.navigate("CreateUser")}>
            <Text>New User</Text>
          </Button>
          <Button rounded
          onPress={() => this.props.navigation.navigate("SessionCreation")}>
            <Text>Login</Text>
          </Button>
          <Button transparent
          onPress={() => this.props.navigation.navigate("ForgotPassUser")}>
            <Text>Forgot Password</Text>
          </Button>
        </Form>
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
            <Button
              onPress={() => this.props.navigation.navigate("Activities")}
            >
              <Icon name="heart" style={{ color: "#000" }} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
