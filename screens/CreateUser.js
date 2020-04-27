import React from "react";
import {
  Alert,
  StyleSheet,
  Image,
  Dimensions, SafeAreaView, StatusBar
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
import { Stitch, UserPasswordAuthProviderClient, StitchUser, StitchUserProfile } from 'mongodb-stitch-react-native-sdk';
var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  stretch: {
    width: width - 5,
    height: 180,
    resizeMode: 'stretch',
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: width / 4,
    marginRight: width / 4
  }
});
const db = require('../util/dbAPI')
import {
} from 'native-base';
export default class Start extends React.Component {
  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      username: undefined,
      fname: undefined,
      lname: undefined,
      email: undefined,
      password: undefined,
      retype: undefined,
      passwordCheck: undefined,

    };
    this._onCreateUser = this._onCreateUser.bind(this);
    // this._checkPassword = this._checkPassword.bind(this);

  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} translucent={true} />
        <Container>
          <Content>
            <Form>
              <Image style={styles.stretch} source={require('../Pictures/Welcome_Pic.png')} />
              <Item stackedLabel>
                <Label>Username</Label>
                <Input onChangeText={(username) => this.setState({ username })} />
              </Item>
              <Item stackedLabel>
                <Label>First Name</Label>
                <Input onChangeText={(fname) => this.setState({ fname })} />
              </Item>
              <Item stackedLabel>
                <Label>Last Name</Label>
                <Input onChangeText={(lname) => this.setState({ lname })} />
              </Item>
              <Item stackedLabel>
                <Label>Email</Label>
                <Input onChangeText={(email) => this.setState({ email })} />
              </Item>
              <Item stackedLabel success={this.state.passwordCheck}>
                <Label>Password</Label>
                <Input onChangeText={(password) => this.setState({ password })}
                />
              </Item>
              <Item stackedLabel last >
                <Label>Retype Password</Label>
                <Input onChangeText={(retype) => this.setState({ retype })} />
              </Item>
              <Button rounded style={styles.button}
                onPress={() => this._onCreateUser(this.state.username, this.state.fname, this.state.lname, this.state.email, this.state.password, this.state.retype)}>
                <Text>Create New User</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }

  _onCreateUser(username, fname, lname, email, password, retype) {

    if (validateEmail(email)) {
      console.log("valid email")

      if (password === retype) {
        console.log("pw match ")
        if (password.length <= 5) {
          Alert.alert(
            'Could Not Create User',
            'Please ensure passwords are 6 characters or longer',
            [{ text: 'OK' }]
          );
        }
        else {
          console.log("attempting to create user  " + email + " and " + password)
          db.login("admin", "swellness") //logs in with admin so we can add their user to the DB
          const emailClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory, "userpass") //creates email client
          emailClient.registerWithEmail(email, password).then(() => { console.log("Successfully registered.") }).catch(err => { console.error(err) }); //registers with email and password

          const input = { "username": username, "fname": fname, "lname": lname, "email": email, defaultSessionLength: 28800, defaultActivityInterval: 1800, tutorial: true } //session length in seconds
          db.addData("SwellnessTest", "Users", input)
          const input2 = { "email": email, "points": 0, "fullname": fname + " " + lname }
          db.addData("SwellnessTest", "Points", input2)

          db.logout() //logs off admin
          db.login(email, password) //logs in as new user
          console.log("logged in as ", username)
          this.props.navigation.navigate("SessionCreation")

          // Alert.alert( //doesnt work when tutorial alert triggers at the same time
          //   'User Created Successfully',
          //   "You are now logged in",
          //   [{ text: 'OK' }]
          // );
        }
      }
      else {
        Alert.alert(
          'Could Not Create User',
          'Passwords Do Not Match',
          [{ text: 'OK' }]
        );
      }
    }
    else {
      Alert.alert(
        'Could Not Create User',
        'Invalid Email Address',
        [{ text: 'OK' }]
      );
    }
  }
}
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}