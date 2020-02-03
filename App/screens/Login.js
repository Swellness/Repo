import React, { Component } from "react";
import {  
  StyleSheet,  
  Image,
 } from "react-native";

const styles = StyleSheet.create({
  stretch: {
    width: 375,
    height: 200,
    resizeMode: 'stretch'
  },
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
  Label } from 'native-base';

export default class Start extends React.Component {
render(){

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
    </Container>
        );
    }
}