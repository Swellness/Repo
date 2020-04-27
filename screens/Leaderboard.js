import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text, SafeAreaView, StatusBar
} from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Title,
} from "native-base";
import Leaderboard from '../Components/leaderBDetail';

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#647bec",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    overflow: "hidden",
    padding: 12,
    textAlign: "center"
  },
  color: {
    backgroundColor: "#647bec"
  },
  headerStyle: {
    backgroundColor: "white",
    elevation: 0,
    shadowColor: "white",
    shadowOpacity: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 0
  },
});

export default class Start extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} translucent={true} />
        <Container>
          <Header style={styles.headerStyle}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon style={{ color: "black" }} name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "black" }} >Leaderboard</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={{ color: "black" }} name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>

            <Leaderboard />

          </Content>
          <Footer>
            <FooterTab style={{ backgroundColor: "#647bec" }}>
              <Button
                onPress={() => this.props.navigation.navigate("SessionHistory")}
              >
                <Icon name="calendar" style={{ color: "#fff" }} />
              </Button>
              <Button
                onPress={() => this.props.navigation.navigate("ActiveSession")}
              >
                <Icon active name="stopwatch" style={{ color: "#fff" }} />
              </Button>
              <Button
                onPress={() => this.props.navigation.navigate("Activities")}
              >
                <Icon name="heart" style={{ color: "#fff" }} />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </SafeAreaView>
    );
  }
}