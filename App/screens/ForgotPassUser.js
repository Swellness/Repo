import React from "react";
import { 
  StyleSheet,
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
  }
});
export default function App() {
  return (
    <Container>
      <Content>
        <Form>
        <Text style = {{fontSize: 32,}}> Reset Your Password</Text>
        <Text style = {{textAlign: "center", fontSize: 20,}}
        >If you are unable to gain access to your account, 
        please enter your email to reset your password:</Text>
        <Text style = {{textAlign: "center", fontSize: 20,}}>Email</Text>
          <Item stackedLabel>
            <Label>Email</Label>
            <Input />
          </Item>
          <Button rounded>
            <Text>Submit</Text>
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
          <Button onPress={() => this.props.navigation.navigate("Activities")}>
            <Icon name="heart" style={{ color: "#000" }} />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}
