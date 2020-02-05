import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from "native-base";
export default class Navbar extends Component {
  render() {
    return (
      <FooterTab style={{ backgroundColor: "#c2c5cc" }}>
        <Button
          onPress={() => this.props.navigation.navigate("SessionHistory")}
        >
          <Icon name="calendar" style={{ color: "#000" }} />
        </Button>
        <Button onPress={() => this.props.navigation.navigate("ActiveSession")}>
          <Icon active name="stopwatch" style={{ color: "#000" }} />
        </Button>
        <Button onPress={() => this.props.navigation.navigate("Activities")}>
          <Icon name="heart" style={{ color: "#000" }} />
        </Button>
      </FooterTab>
    );
  }
}
