import React from "react";
import { 
  StyleSheet, 
  View,
  TextInput,

} from "react-native";

const styles = StyleSheet.create({
  });

  import { 
    Container, 
    Header, 
    Content, 
    Form, 
    Item, 
    Input, 
    Button, 
    Text,
    Label, } from 'native-base';

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
    </Container>


    
  );
}