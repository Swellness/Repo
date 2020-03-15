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
  Text,
  Label,
} from "native-base";
import { Stitch, UserPasswordCredential } from 'mongodb-stitch-react-native-sdk';


var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  stretch: {
    width: width - 5,
    height: 180,
    resizeMode: "stretch",
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: width / 4,
    marginRight: width / 4
  }
});

const db = require('../util/dbAPI')

export default class Start extends React.Component {

  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
      isLoginGood: undefined
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
              <Image style={styles.stretch} source={require('../Pictures/swellness_logo_outline.png')} />
              <Item stackedLabel >
                <Label>Email</Label>
                <Input onChangeText={(email) => this.setState({ email })} />
              </Item>
              <Item stackedLabel last >
                <Label>Password</Label>
                <Input onChangeText={(password) => this.setState({ password })} />
              </Item>
              <Button rounded style={styles.button}
                onPress={() => this._handleLogin(this.state.email, this.state.password, 0)}>
                <Text>Login</Text>
              </Button>
              <Button transparent
                onPress={() => this.props.navigation.navigate("ForgotPassUser")}>
                <Text>Forgot Password</Text>
              </Button>
              <Button transparent
                onPress={() => this.props.navigation.navigate("CreateUser")}>
                <Text>New User</Text>
              </Button>
            </Form>
          </Content>
        </Container >
      </SafeAreaView>
    );
  }

  _handleLogin = (email, password, recursionCounter) => {////////first time button is pressed, isLoginGood stays as undefined, second press gives it correct value. I attempted looping through it again to just force two calls but that doesnt work the way i want it to

    console.log("attempting login using  " + email + " and " + password)
    Stitch.defaultAppClient.auth.loginWithCredential(new UserPasswordCredential(email, password)).then(this.setState({ isLoginGood: true })).catch(err => {this.setState({ isLoginGood: false })})

    console.log("isLoginGood: " + this.state.isLoginGood)

    if(recursionCounter == 0){
      console.log("looping")
      this._handleLogin(email,password, 1)
    }

    if (this.state.isLoginGood == true) {
        this.props.navigation.navigate("SessionCreation");
      
    }
    else {
      Alert.alert('Login Failed','Please try again',[{ text: 'OK' }]);
    }
  }

}