import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  onPress,
  Text,
  Image
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
    alignItems: 'center',
  },
  color: {
    backgroundColor: "blue"
  },
  textDisplay: {
    fontSize: 30,
    textAlign: "center",
    color: "black"
  }
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
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Break</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>

            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
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
                digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#grey' }}
                digitTxtStyle={{ color: 'blue' }}
                timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                separatorStyle={{ color: 'black' }}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{ m: null, s: null }}
                showSeparator
              />

              <Text style={{ fontSize: 30 }}>Current Time: {this.state.time}</Text>
            </View>

            <Button
              onPress={() => this.props.navigation.navigate("ActiveSession")}
            >
              <Text style={styles.button}>End Break</Text>
            </Button>

            {/* <Button
            onPress={() => this.props.navigation.navigate("SideBar")}
          >
            <Text style={styles.button}>Side Menu</Text>
          </Button> */}

            {/* <Button
            onPress={() => this.props.navigation.navigate("SessionCreation")}
          >
            <Text style={styles.button}>Session</Text>
          </Button> */}
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={styles.textDisplay}>Daily Challenges</Text>
              <Text >2/4 Activities complted for today</Text>
              <Text >You still have 2 challenges remaining </Text>
              <Text style={styles.textDisplay}>Current Stats</Text>
              <Text>Steps Taken: 428</Text>
              <Text>Total Exercises Completed: 2</Text>
              <Text>Points Earned: 23</Text>

            </View>
            {/* <Button
            onPress={() => this.props.navigation.navigate("SessionHistory")}
          >
            <Text style={styles.button}>History</Text>
          </Button> */}

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
      </SafeAreaView>
    );
  }
}
