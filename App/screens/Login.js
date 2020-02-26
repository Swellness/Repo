import React from "react";
import {
  StyleSheet,
  Image,
  View,
} from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Item,
  Input,
  Text,
  Label,
} from "native-base";

const styles = StyleSheet.create({
  stretch: {
    width: 375,
    height: 195,
    resizeMode: "stretch"
  }
});

export default class Start extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={{ 
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 50,
            flex: 1}}>
            <Image style={styles.stretch} source={require('../Pictures/swellness_logo_outline.png')} />
          </View>
            
          <View style={{
          paddingHorizontal: 50,
          paddingBottom: 50,}}>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
            <Button rounded
              onPress={() => this.props.navigation.navigate("CreateUser")}
              style={{ marginTop: 25 }}>
              <Text>New User</Text>
            </Button>
            <Button rounded
              onPress={() => this.props.navigation.navigate("SessionCreation")}
              style={{ marginTop: 10 }}>
              <Text>Login</Text>
            </Button>
            <Button transparent
              onPress={() => this.props.navigation.navigate("ForgotPassUser")}
              style={styles.button}>
              <Text>Forgot Password</Text>
            </Button>
          </View>
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
