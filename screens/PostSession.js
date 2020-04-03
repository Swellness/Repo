import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from "react-native";
import {
  Container,
  Content,
  Header,
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
    justifyContent: "flex-start"
  },
  container2: {
    marginTop: 20,
    width: 150 * 2,
    height: 160,
    backgroundColor: "#C2C5CC"
  },
  headerText: {
    flex: 0,
    color: "#000000",
    fontSize: 56,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 25,
    textAlign: "center"
  },
  text: {
    flex: 0,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 40,
    alignContent: "flex-start"
  },
  text2: {
    flex: 0,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 40,
    marginBottom: 25
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
  text6: {
    fontWeight: "600",
    fontSize: 32,
    lineHeight: 40,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#C2C5CC",
    textAlign: "center",
    position: "absolute",
    width: 221,
    height: 55,
    left: 75,
    top: 474
  }
});
import { Stitch, UserPasswordAuthProviderClient, StitchUser, StitchUserProfile } from 'mongodb-stitch-react-native-sdk';
const db = require('../util/dbAPI')


class PostSession extends React.Component {

  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      id: undefined,
      email: undefined,
      steps: undefined,
      exercises: undefined,
      points: undefined,
      date: undefined
    };
  }
  componentDidMount() {
    var d = new Date().toLocaleDateString()
    var ID = Stitch.defaultAppClient.auth.user.id //gets STITCH/APPCLIENT/AUTHOBJECT/USER
    var user = Stitch.defaultAppClient.auth.user.profile.email
    this.setState({ date: d, id: ID, email: user }, () => {
      console.log("date = " + this.state.date) //CALLBACK REQUIRED, OTHERWISE CONSOLE LOG DOESNT SEE STATE UPDATE
      console.log("id = " + this.state.id)
      console.log("email = " + this.state.email)
      const input = {
        "userId": this.state.id, "email": this.state.email, "steps": this.state.steps,
        "exercises": this.state.exercises, "points": this.state.points, "date": this.state.date
      }
      db.addData("SwellnessTest", "Session", input)
    }
    )


  }
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
              <Title>Post-Session</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>
            <Text style={styles.headerText}>Good job today!!</Text>
            <Text style={styles.text}> Daily Challenge: </Text>
            <Text style={styles.text2}> 4/4 Activities </Text>
            <View style={styles.container2}>
              <Text style={styles.text3}> Steps Taken: 428 </Text>
              <Text style={styles.text4}> Exercises Completed: 4</Text>
              <Text style={styles.text5}> Points Earned: 78</Text>
              <Text style={styles.text5}> Date: </Text>

            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate("SessionCreation")}
            >
              <Text style={styles.text6}> New Session </Text>
            </TouchableOpacity>
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

export default PostSession;
