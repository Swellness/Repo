import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity, SafeAreaView, StatusBar
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  container2: {
    backgroundColor: "#C2C5CC",
    position: "absolute",
    width: 316,
    height: 305,
    left: 28,
    top: 151
  },
  text1: {
    flex: 1,
    fontSize: 24,
    lineHeight: 32,
    textAlign: "left"
  },
  text2: {
    flex: 0,
    fontSize: 24,
    lineHeight: 32,
    textAlign: "left"
  },
  text3: {
    flex: 0,
    fontSize: 24,
    lineHeight: 32,
    textAlign: "left"
  },
  text4: {
    flex: 0,
    fontSize: 24,
    lineHeight: 32,
    textAlign: "left"
  },
  text5: {
    flex: 1,
    fontSize: 24,
    lineHeight: 32,
    textAlign: "left"
  },
  button: {
    backgroundColor: "blue",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    overflow: "hidden",
    padding: 12,
    textAlign: "center"
  }
});

class DailyHistory extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} translucent={true} />
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Daily History</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>
            <Text style={styles.text1}>TBWO</Text>
            <View style={styles.container2}>
              <Text style={styles.text2}>Session Length: 6:30 </Text>
              <Text style={styles.text3}>Exercises Completed: 2 </Text>
              <Text style={styles.text4}>Points Earned: 428 </Text>
              <Text style={styles.text5}>Steps Taken: 6,120 </Text>
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
      </SafeAreaView>
    );
  }
}

export default DailyHistory;
