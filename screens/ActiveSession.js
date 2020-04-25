import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  Picker,
  Platform,
  Spacer,
  SafeAreaView,
  Alert,
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
import * as Progress from 'react-native-progress';
import moment from 'moment';
const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  button: {
    borderColor: "black",
    //borderWidth: 1,
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
  container: {
    flex: 1,
    //backgroundColor: "#07121B",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 45,
    color: "blue"
  },
  progress: {
    marginVertical: 50
  },
  centerObj: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  }
});
const formatNumber = number => `0${number}`.slice(-2);
const getRemaining = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};
const showAlert = () => {
  Alert.alert(
    'Activity Time!',
    'Time to get up and do an activity.',
    [
      { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log("Still needs navigation") },
    ],
    // { cancelable: false }
  )
}
const createArray = length => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }

  return arr;
};
const AVAILABLE_MINUTES = createArray(31);
const AVAILABLE_SECONDS = createArray(60);
let inc = 0
export default class Start extends React.Component {

  state = {
    remainingTime: 1,
    remainingHours: this.props.navigation.getParam("hours"),
    remainingMins: this.props.navigation.getParam("minutes"),
    totalTime: 1,
    isRunning: false,
    selectedH: this.props.navigation.getParam("hours"),
    selectedM: this.props.navigation.getParam("minutes"),
    selectedF: this.props.navigation.getParam("actFreq"),
    initial: 0,
    inc: 0
  };

  interval = null;

  componentDidMount() {
    this.start()
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.remainingTime === 0 && prevState.remainingTime !== 0) {
      this.stop();
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  start = () => {
    this.setState(state => ({
      remainingTime:
        parseInt(state.selectedH, 10) * 60 +
        parseInt(state.selectedM, 10),
      totalTime:
        parseInt(state.selectedH, 10) * 60 +
        parseInt(state.selectedM, 10),
      isRunning: true,
    }));

    this.interval = setInterval(() => {
      this.setState(state => ({
        remainingTime: state.remainingTime - 1,
        remainingHours: Math.floor(state.remainingTime / 60),
        remainingMins: this.state.remainingTime % 60
      }));
      if (this.state.initial == 1) {
        if (this.state.remainingMins % this.state.selectedF === 0) {
          showAlert()
        }
      } else {
        this.setState({
          initial: 1
        })
      }
    }, 1000); // 1000 for seconds, 60000 for minutes

    console.log(this.state.remainingMins)
  };

  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      isRunning: false

    })
  };

  inc = () => {
    this.setState({
      inc: this.state.inc + 1
    })
  }

  formatTime = () => {
    let formatStr1 = this.state.remainingHours
    let formatStr2 = ""
    if (this.state.remainingMins < 10) {
      if (this.state.remainingMins < 0) {
        if (this.state.remainingHours == this.state.selectedH) {
          formatStr1 = this.state.selectedH - 1
        }
        formatStr2 = 60 + this.state.remainingMins
      } else {
        formatStr2 = "0" + this.state.remainingMins
      }
    } else {
      formatStr2 = this.state.remainingMins
    }
    let str = `${formatStr1}:${formatStr2}`
    return str
  }

  render() {
    const progress = (this.state.totalTime - this.state.remainingTime) / this.state.totalTime
    //console.log(progress)

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
              <Title>Session</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>
            <View style={styles.centerObj}>
              <Progress.Circle
                size={200}
                progress={progress}
                style={styles.progress}
                thickness={10}
                animated
                showsText
                formatText={() => {
                  return this.formatTime()
                }}
              />
            </View>
            <View style={styles.container}>
              <Button rounded
                onPress={() => this.props.navigation.navigate("Break")}
              >
                <Text style={styles.button}>Take a Break</Text>
              </Button>

              <Button rounded
                onPress={() => {
                  // console.log("active sesh mins:"+this.state.selectedMinutes)
                  // console.log("active sesh sec:"+this.state.selectedSeconds)
                  this.props.navigation.navigate("PostSession", {time:this.state.remainingTime, startMin:this.state.remainingMins, startSec: this.state.remainingHours})
                }
                 
                }
              >
                <Text style={styles.button}>End Session</Text>
              </Button>

              <Button rounded
                onPress={() => this.props.navigation.navigate("SessionCreation")}
              >
                <Text style={styles.button}>Session</Text>
              </Button>
            </View>
          </Content>
          <Footer>
            <FooterTab style={{}}>
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