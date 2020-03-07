import React from "react";
import {
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
      username: undefined,
      password: undefined,
    };
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
                <Label>Username</Label>
                <Input onChangeText={(username) => this.setState({ username })} />
              </Item>
              <Item stackedLabel last >
                <Label>Password</Label>
                <Input onChangeText={(password) => this.setState({ password })} />
              </Item>
              <Button rounded style={styles.button}
                onPress={() => { db.login(this.state.username, this.state.password), this.props.navigation.navigate("SessionCreation") }}>
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
}