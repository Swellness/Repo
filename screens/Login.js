import React from "react";
import {
  Alert,
  StyleSheet,
  Image,
  View,
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
  Text,
  Label,
} from "native-base";
import { Stitch, UserPasswordCredential, StitchUser } from 'mongodb-stitch-react-native-sdk';

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  stretch: {
    width: width / 1.1,
    height: width / 2.12,
    resizeMode: "stretch",
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: width / 4,
    marginRight: width / 4,
    backgroundColor: "#5976ff"
  },
  centerObj: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 50
  }
});
const db = require('../util/dbAPI')
export default class Start extends React.Component {

  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      email: "admin",
      password: "swellness",
    };
    this._handleLogin = this._handleLogin.bind(this);
  }

  async componentDidMount() {
    db.loadClient()
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} translucent={true} />
        <Container>
          <Content>
            <Form>

              <View style={styles.centerObj}>
                <Image style={styles.stretch} source={require('../Pictures/swellness_logo_outline.png')} />

              </View>
              <Item stackedLabel >
                <Label>Email</Label>
                <Input onChangeText={(email) => this.setState({ email })} />
              </Item>

              <Item stackedLabel last >
                <Label>Password</Label>
                <Input secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
              </Item>

              <Button rounded style={styles.button}
                onPress={() => this._handleLogin(this.state.email, this.state.password, 0)}>
                <Text>Login</Text>
              </Button>

              <Button transparent
                onPress={() => this.props.navigation.navigate("ForgotPassUser")}>
                <Text style={{ color: "#647bec" }}>Forgot Password</Text>
              </Button>

              <Button transparent
                onPress={() => this.props.navigation.navigate("CreateUser")}>
                <Text style={{ color: "#647bec" }}>New User</Text>
              </Button>

            </Form>
          </Content>
        </Container >
      </SafeAreaView>
    );
  }

  _handleLogin = (email, password) => {
    //db.logout()//fail safe since screens arent operating exactly as planned and its possible to get back to login screen without logging out
    console.log("attempting login using  " + email + " and " + password)

    Stitch.defaultAppClient.auth.loginWithCredential(new UserPasswordCredential(email, password))
      .then(user => {
        if (user) {
          console.log(`Successfully logged in as user ${user.profile.email}`);
          this.props.navigation.navigate("SessionCreation"); //navigates if user is found ()
        }
      })
      .catch(err => {
        Alert.alert('Login Failed', 'Username and/or Password Incorrect', [{ text: 'OK' }])
        console.log(err)
      })
  }
}