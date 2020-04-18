import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View, SafeAreaView, StatusBar
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

const styles = StyleSheet.create({
  button: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    overflow: "hidden",
    padding: 5,
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  color: {
    backgroundColor: "blue"
  }
});

export default class Start extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} translucent={true} />
        <Container>
          <Header>
            <Left />
            <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
              <Title>New Session</Title>
            </View>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>
            <View style={{
              marginStart: 30
            }}>
              <Image
                source={require('../Pictures/AppLogo.png')}
              />
              <Text style={{ fontStyle: 'italic' }}>“When life gives you lemons? Don't make lemonade...”</Text>
            </View>

            <View>
              <Text style={{ fontSize: 30 }}>Activity Frequency: 30 mins</Text>
              <Text style={{ fontSize: 30 }}>Hours Working: 8 hrs</Text>
            </View>
            <Button style={styles.button}
              onPress={() => this.props.navigation.navigate("ActiveSession")}
            >
              <Text>Start Session</Text>
            </Button>
          </Content>
          <Footer>
            <FooterTab>
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
      </SafeAreaView>
    );
  }
}
