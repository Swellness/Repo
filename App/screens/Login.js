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

const styles = StyleSheet.create({
  stretch: {
    width: 375,
    height: 200,
    resizeMode: "stretch"
  }
});

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
