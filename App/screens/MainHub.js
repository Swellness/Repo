import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
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

//import Icon from "react-native-vector-icons/FontAwesome";

// Constants that help define the shape of our screen/buttons
const screen = Dimensions.get("window");
const buttonWidth = screen.width / 2;
const buttonLength = screen.height / 5;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#36B1F0",
    flex: 0.5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    color: "#000000",
    fontSize: 35,
    fontWeight: "400",
    justifyContent: "center"
  }
});

class MainHub extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Activities")}
          >
            <Text style={styles.text}> Activities </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("DailyHistory")}
          >
            <Text style={styles.text}> Daily History </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Leaderboard")}
          >
            <Text style={styles.text}> Leaderboard </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("PostSession")}
          >
            <Text style={styles.text}> Post Session </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Text style={styles.text}> Profile </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Rewards")}
          >
            <Text style={styles.text}> Rewards </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("SessionHistory")}
          >
            <Text style={styles.text}> Session History </Text>
          </TouchableOpacity>

          {/* Levi Edits to the file lists. */}

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("ActiveSession")}
          >
            <Text style={styles.text}> ActiveSession </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.text}> Login </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Break")}
          >
            <Text style={styles.text}> Break </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("CreateUser")}
          >
            <Text style={styles.text}> CreateUser </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("ForgotPassUser")}
          >
            <Text style={styles.text}> ForgotPassUser </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate("OrgAdminSuiteSettings")
            }
          >
            <Text style={styles.text}> OrgAdminSuiteSettings </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("SessionCreation")}
          >
            <Text style={styles.text}> SessionCreation </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Settings")}
          >
            <Text style={styles.text}> Settings </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("SideBar")}
          >
            <Text style={styles.text}> SideBar </Text>
          </TouchableOpacity>
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

export default MainHub;
