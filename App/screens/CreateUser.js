import React from "react";
import {
  StyleSheet,
  Image
} from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Form,
  Item,
  Input,
  Label,
  Text,
} from "native-base";
import { Stitch, RemoteMongoClient, UserPasswordCredential, UserPasswordAuthProviderClient } from 'mongodb-stitch-react-native-sdk';


const styles = StyleSheet.create({
  stretch: {
    width: 375,
    height: 200,
    resizeMode: 'stretch',
    left: 20
  },
});

const db = require('../../util/dbAPI')


import {
} from 'native-base';

export default class Start extends React.Component {
  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      username: undefined,
      email: undefined,
      password: undefined,
      confirm: undefined
    };

    this._onCreateUser = this._onCreateUser.bind(this);

  }

  componentDidMount() {
    db.loadClient()
  }
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Image style={styles.stretch} source={require('../Pictures/Welcome_Pic.png')} />
            <Item stackedLabel onChangeText={(username) => this.setState({ username })}>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item stackedLabel onChangeText={(email) => this.setState({ email })}>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item stackedLabel last onChangeText={(password) => this.setState({ password })}>
              <Label>Password</Label>
              <Input />
            </Item>
            <Item stackedLabel onChangeText={(confirm) => this.setState({ confirm })}>
              <Label>Retype Password</Label>
              <Input />
            </Item>
            <Button rounded
              onPress={() => this._onCreateUser(this.state.username, this.state.password, this.state.confirm)}>
              <Text>Create User</Text>
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

  _onCreateUser(username, password, confirm) {
    if (password === confirm) {
      // if (password.length() < 5) {
      //   console.log("password too short")
      // }
      // else {
      console.log("attempting to create user  " + username + " and " + password)
      const emailClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory, "userpass") //creates email client
      emailClient.registerWithEmail(username, password).then(() => { //registers with username and password
        console.log("Successfully registered. Check your inbox for a confirmation email")
      }).catch(err => {
        console.error(err)
      });
      // }
    }
    else {
      console.log("passwords do not match")
    }
  }
}
