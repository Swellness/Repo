import React from "react";
import {
  StyleSheet,
  Dimensions, SafeAreaView, StatusBar
} from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Text,
} from "native-base";

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  TextBoxStyle: {
    height: 50,
    width: 300,
    borderColor: "gray",
    borderWidth: 1
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: width / 4,
    marginRight: width / 4
  }
});
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={true} translucent={true} />
      <Container>
        <Content>
          <Form>
            <Text style={{ fontSize: 32, }}> Reset Your Password</Text>
            <Text style={{ textAlign: "center", fontSize: 20, }}
            >If you are unable to gain access to your account,
        please enter your email to reset your password:</Text>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Button rounded style={styles.button}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    </SafeAreaView>
  );
}
