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
  Label,
  Text,
} from "native-base";

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

import {
} from 'native-base';

export default class Start extends React.Component {
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
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Email</Label>
                <Input />
              </Item>
              <Item stackedLabel last>
                <Label>Password</Label>
                <Input />
              </Item>
              <Item stackedLabel>
                <Label>Retype Password</Label>
                <Input />
              </Item>
              <Button rounded style={styles.button}
                onPress={() => this.props.navigation.navigate("SessionCreation")}>
                <Text>Create New User</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}
