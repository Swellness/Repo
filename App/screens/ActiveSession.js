import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Spacer,
  Image
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
  textDisplay: {
    fontSize:30,
    textAlign: "left",
    color: "black"
  },
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
  }
});

export default class Start extends React.Component {
  render() {
    return (
      <Container>
        <Content>
        <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
        <Image
        source={require('../Pictures/clockSess.png')}
        />
        <Text style={styles.textDisplay}>1:00:00</Text>
        </View>
          
          <Text style={styles.textDisplay}>Time till next Activity: 15 min</Text>
          <Text style={styles.textDisplay}>Time till next Break: 30 min</Text>

          <Button 
            onPress={() => this.props.navigation.navigate("Break")}
          >
            <Text style={styles.button}>Take a Break</Text>
          </Button>

          <Button 
            onPress={() => this.props.navigation.navigate("PostSession")}
          >
            <Text style={styles.button}>End Session</Text>
          </Button>

          {/* <Button 
            onPress={() => this.props.navigation.navigate("SideBar")}
          >
            <Text style={styles.button}>Side Menu</Text>
          </Button> */}

          <Button 
            onPress={() => this.props.navigation.navigate("SessionCreation")}
          >
            <Text style={styles.button}>Session</Text>
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
