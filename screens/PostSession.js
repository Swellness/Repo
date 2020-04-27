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
    fontSize: 32,
    lineHeight: 32,
    textAlign: "left",
    marginTop: 20
  },
  text4: {
    flex: 0,
    fontSize: 30,
    lineHeight: 32,
    textAlign: "left",
    marginTop: 10
  },
  text5: {
    flex: 1,
    fontSize: 30,
    lineHeight: 32,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 20
  },
  text6: {
    fontWeight: "600",
    fontSize: 30,
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
  },
  view: {
    marginHorizontal: 20,
    backgroundColor: "#dddddd",
    borderRadius: 10,

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
import { Stitch, RemoteMongoClient, UserPasswordCredential, UserPasswordAuthProviderClient } from 'mongodb-stitch-react-native-sdk';
import ThreeAxisSensor from "expo-sensors/build/ThreeAxisSensor";
const db = require('../util/dbAPI')


class PostSession extends React.Component {

  constructor(props) { //state and method instantiation

    super(props);
    //////////this is a bunch of BS we wouldnt need if we had decided to use time objects rather than f#cking strings for keeping track of time///
    var startHour = props.navigation.state.params.startHour;
    var startMin = props.navigation.state.params.startMin;
    var timeLeft = props.navigation.state.params.time;
    var startMinTotal = parseInt(startHour) * 60 + parseInt(startMin);
    var elapsedTime = startMinTotal - timeLeft;
    //var hours = Math.floor(elapsedTime / 60 / 60);
    var hours = Math.floor(elapsedTime / 60);
    var minutes = (elapsedTime % 60) - 1;
    // if (minutes == -1) {
    //   minutes = 0;
    // }
    const formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    console.log(formatted);
    var pointsAwarded = Math.round(elapsedTime / 6);

    //////////////////////////Regular People: This is taking a lot of mental energy, i should take a break Me: hAhA bRaiN go b00m////////////////////////////////////////////////    

    this.state = {
      id: undefined,
      email: undefined,
      steps: 20, //in the demo, take 10 steps
      exercises: undefined,
      points: pointsAwarded,
      date: undefined,
      timeElapsed: formatted
    };
  }
  componentDidMount() {
    // method to nuke session collection
    // Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db("SwellnessTest").collection("Session").deleteMany({steps:null})
    // .then(result => console.log(`nuked`)) //db.collection selects a collection and insertOne inserts the document and logs if successful or failure
    // .catch(err => console.error(`Failed to delete`))

    var d = new Date().toLocaleDateString()
    var ID = Stitch.defaultAppClient.auth.user.id //gets STITCH/APPCLIENT/AUTHOBJECT/USER
    var user = Stitch.defaultAppClient.auth.user.profile.email
    this.setState({ date: d, id: ID, email: user }, () => {
      //CALLBACK REQUIRED, OTHERWISE CONSOLE LOG DOESNT SEE STATE UPDATE
      const input = {
        "userId": this.state.id, "email": this.state.email, "steps": this.state.steps,
        "exercises": this.state.exercises, "points": this.state.points, "date": this.state.date, "sessionLength": this.state.timeElapsed
      }
      db.addData("SwellnessTest", "Session", input)

      ///////updating points collections///////////////
      const collection = db.loadCollection('SwellnessTest', 'Points')
      var dbData = 0;
      var newPoints = 0
      var id = Stitch.defaultAppClient.auth.user.profile.email;
      var fullname = ""

      ////////GETS CURRENT POINTS///////
      collection.find({ email: id }, { limit: 10 }).asArray().then(result => {
        result.forEach(element => {
          fullname = element.fullname
          console.log(fullname)
          dbData = element.points
          console.log("existing points:" + dbData)
        })
        console.log("fullname:"+fullname)
        ////////////////ADDS CURRENT POINTS + EARNED POINTS TO GET NEW TOTAL///////////////////
        newPoints = dbData + this.state.points;
        console.log("new points:" + newPoints)
      }).then(() => {
        ////////////PUSHES NEW TOTAL////////////////
        const output = { "email": id, "points": newPoints, "fullname":fullname } //creates output object to update
        const options = { "upsert": false };
        Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db("SwellnessTest").collection("Points").updateOne({ "email": this.state.email }, output, options).then(console.log("updated points"))
      })
    })
  }

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
              <Title style={{ color: "black" }} >Post-Session</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={{ color: "black" }} name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>
            <Text style={styles.headerText}>Good job today!!</Text>
            <Text style={styles.text}> Session Length: {this.state.timeElapsed}</Text>
            <Text style={styles.text}> Daily Challenge: </Text>
            <Text style={styles.text2}> 2/4 Activities </Text>
            <View style={styles.view}>
              <Text style={styles.text3}> Steps Taken: {this.state.steps} </Text>
              <Text style={styles.text4}> Exercises Completed: 2</Text>
              <Text style={styles.text5}> Points Earned: {this.state.points}</Text>

            </View>
            <Button style={{ alignSelf: "center", marginTop: 10, marginBottom: 10, justifyContent: "center" }} transparent onPress={() => this.props.navigation.navigate("SessionCreation")}>
              <Text style={{ color: "#647bec" }}>Create a new Session</Text>
            </Button>
            {/* <TouchableOpacity //seems unncessary plus its formatted poorly
              style={styles.button}
              onPress={() => this.props.navigation.navigate("SessionCreation")}
            >
              <Text style={styles.text6}> New Session </Text>
            </TouchableOpacity> */}
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

export default PostSession;