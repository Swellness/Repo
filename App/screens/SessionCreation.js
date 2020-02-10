import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View
} from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
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
      <Container>
        <Content>
        <View style={{
                marginStart:30
              }}>
        <Image
        source={require('../Pictures/AppLogo.png')}
        />
        <Text style={{fontStyle:'italic'}}>“When life gives you lemons? Don't make lemonade...”</Text>
        </View>

        <View>
        <Text style={{fontSize:30}}>Activity Frequency: 30 mins</Text>
        <Text style={{fontSize:30}}>Hours Working: 8 hrs</Text>
          </View>      
          <Button
            onPress={() => this.props.navigation.navigate("ActiveSession")}
          >
            <Text style={styles.button}>Start Session</Text>
          </Button>

          {/* <Button
            onPress={() => this.props.navigation.navigate("SideBar")}
          >
            <Text style={styles.button}>Side Menu</Text>
          </Button> */}

          <Button
            onPress={() => this.props.navigation.navigate("SessionHistory")}
          >
            <Text style={styles.button}>History</Text>
          </Button>

          <Button
            onPress={() => this.props.navigation.navigate("Activities")}
          >
            <Text style={styles.button}>Activities</Text>
          </Button>
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
