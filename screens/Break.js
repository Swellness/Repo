import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  onPress,
  Text,
  Image,
  Dimensions
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
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#647bec",
    borderRadius: 12,
    overflow: "hidden",
    padding: 5,
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    width: screen.width / 2,
    height: 55,
    marginVertical: 10
  },
  color: {
    backgroundColor: "blue"
  },
  textDisplay: {
    fontSize: 30,
    textAlign: "center",
    color: "black",
    marginTop: 5
  },
  time: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
    marginTop: 5
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  centerObj: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  view: {
    marginHorizontal: 20,
    backgroundColor: "#cfcac8",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    borderRadius: 10,
  },
  headerStyle: {
    backgroundColor: "white",
    elevation: 0,
    shadowColor : "white",
    shadowOpacity: 0,
    shadowOffset: { height: 0 , width:0 },
    shadowRadius: 0
  },
});



export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the time
      time: '',
    };
  }
  componentDidMount() {
    var that = this;

    //Getting the current date-time with required format and UTC   
    var date = moment()
      // .utcOffset('+05:30')
      .format(' hh:mm a');

    that.setState({ time: date });
    //Settign up time to show
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
              <Title style={{ color: "black" }} >Break</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={{ color: "black" }} name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>

            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 15,
              borderRadius: 25
            }}>
              <Image
                source={require('../Pictures/breakPic.png')}
              />
            </View>


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 30 }}>Time remaining: </Text>
              <CountDown
                size={30}
                until={900}
                onFinish={() => alert('Finished')}
                digitStyle={{ backgroundColor: '#FFF', borderWidth: 0, borderColor: '#grey' }}
                digitTxtStyle={{ color: 'black' }}
                timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                separatorStyle={{ color: 'black' }}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{ m: null, s: null }}
                showSeparator
              />

              <Text style={{ fontSize: 18, paddingBottom: 20 }}>Break started at:{this.state.time}</Text>
            </View>

            <View style={styles.view}>
              <Text style={styles.textDisplay}>Daily Challenges</Text>
              <Text >2/4 Activities complted for today</Text>
              <Text >You still have 2 challenges remaining </Text>
              <Text style={styles.textDisplay}>Current Stats</Text>
              <Text>Steps Taken: 10</Text>
              <Text>Total Exercises Completed: 2</Text>
              <Text>Points Earned: 15</Text>
            </View>
            <View style={styles.centerObj}>
              <Button style={styles.button}
                onPress={() => this.props.navigation.navigate("ActiveSession")}
              >
                <Text style={styles.buttonText}>End Break</Text>
              </Button>
            </View>
          </Content>
          <Footer>
            <FooterTab style={{backgroundColor: "#647bec" }}>
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
