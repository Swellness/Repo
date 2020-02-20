import React from "react";
import {
  StyleSheet,
  Image,
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
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  stretch: {
    width: 375,
    height: 200,
    resizeMode: "stretch"
  }
});
const db = require('../../util/dbAPI')


export default class Start extends React.Component {


  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({ //this await is required by native base to load an external font
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    db.loadClient()
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Image style={styles.stretch} source={require('../Pictures/swellness_logo_outline.png')} />
            <Item stackedLabel >
              <Label>Username</Label>
              <Input onChangeText={(username) => this.setState({ username })} />
            </Item>
            <Item stackedLabel last >
              <Label>Password</Label>
              <Input onChangeText={(password) => this.setState({ password })} />
            </Item>
            <Button rounded
              onPress={() => db.login(this.state.username, this.state.password)}>
              <Text>Login</Text>
            </Button>
            <Button transparent
              onPress={() => this.props.navigation.navigate("ForgotPassUser")}>
              <Text>Forgot Password</Text>
            </Button>
            <Button rounded
              onPress={() => this.props.navigation.navigate("CreateUser")}>
              <Text>New User</Text>
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
      </Container >
    );
  }
}
