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
import Rewards from '../Components/rewardList';
import { Stitch } from 'mongodb-stitch-react-native-sdk';
const db = require('../util/dbAPI')

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
  title: {
    fontSize: 40,
    textAlign: 'center'
  },
  subText: {
    fontSize: 25,
    textAlign: 'center'
  },
  headerStyle: {
    backgroundColor: "white",
    elevation: 0,
    shadowColor: "white",
    shadowOpacity: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 0
  },
}
);

export default class Start extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      points: undefined
    };

    this._getPoints = this._getPoints.bind(this)
  }


  _getPoints() {
    const collection = db.loadCollection('SwellnessTest', 'Points')
    var user = Stitch.defaultAppClient.auth.user.profile.email
    var data = 0
    collection.find({ email: user }, { limit: 10 }).asArray().then(result => {
      result.forEach(element => {
        data = element.points
        console.log("existing points:" + data)
        this.setState({ points: data })
      })

    })
  }

  componentDidMount() {
    this._getPoints()
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} translucent={true} />
        <Container>
          <Header style={styles.headerStyle}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon style={{ color: "black" }} name='menu' name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "black" }} name='menu' >Rewards</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={{ color: "black" }} name='menu' name='menu' />
              </Button>
            </Right>
          </Header>

          <Content>
            <Text style={styles.title}>Redeem Your Points!!</Text>
            <Text style={styles.subText}>You currently have {this.state.points} Points</Text>
            <Rewards />
            <Button style={{ alignSelf: "center", marginTop: 10, marginBottom: 10, width: 125, justifyContent: "center" }} transparent onPress={() => { this._getPoints() }}>
              <Text style={{ color: "#647bec" }}>Refresh</Text>
            </Button>

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