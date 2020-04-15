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
const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  // textDisplay: {
  //   fontSize:30,
  //   textAlign: "left",
  //   color: "black"
  // },
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
  button1: {
    borderWidth: 10,
    borderColor: "#89AAFF",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  buttonStop: {
    borderColor: "red"
  },
  buttonText: {
    fontSize: 45,
    color: "blue"
  },
  buttonTextStop: {
    color: "#FF851B"
  },
  timerText: {
    color: "black",
    fontSize: 40,
    textAlign: 'center'
  },
  picker: {
    width: 50,
    ...Platform.select({
      android: {
        color: "grey",
        backgroundColor: "white",
        marginLeft: 10,
      }
    })
  },
  pickerItem: {
    color: "black",
    fontSize: 30
  },
  pickerContainer: {
    flexDirection: "row",
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
    { cancelable: false }
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
export default class Start extends React.Component {

  state = {
    remainingSeconds: 1,
    isRunning: false,
    selectedMinutes: "30",
    selectedSeconds: "0",
  };

  interval = null;


  componentDidUpdate(prevProp, prevState) {
    if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
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
      remainingSeconds:
        parseInt(state.selectedMinutes, 10) * 60 +
        parseInt(state.selectedSeconds, 10),
      isRunning: true,
    }));

    this.interval = setInterval(() => {
      this.setState(state => ({
        remainingSeconds: state.remainingSeconds - 1
      }));
    }, 1000);
  };

  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      remainingSeconds: 5, // temporary
      isRunning: false

    });
  };

  renderPickers = () => (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedMinutes}
        onValueChange={itemValue => {
          this.setState({ selectedMinutes: itemValue });
        }}
        mode="dropdown"
      >
        {AVAILABLE_MINUTES.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>minutes</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedSeconds}
        onValueChange={itemValue => {
          this.setState({ selectedSeconds: itemValue });
        }}
        mode="dropdown"
      >
        {AVAILABLE_SECONDS.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>seconds</Text>
    </View>
  );

  render() {
    const { minutes, seconds } = getRemaining(this.state.remainingSeconds);
    //  Currently infinite loops, working on it later.
    //    for (let i = 15; i <= 30; i + 5) {
    //      showAlert();
    //   }

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
            <View style={styles.container}>
              <StatusBar barStyle="light-content" />
              {this.state.isRunning ? (
                <Text style={styles.timerText}> Time remaining: {`${minutes}:${seconds}`} </Text>
              ) : (
                  this.renderPickers()
                )}
              {this.state.isRunning ? (
                <TouchableOpacity
                  onPress={this.stop}
                  style={[styles.button1, styles.buttonStop]}
                >
                  <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity onPress={this.start} style={styles.button1}>
                    <Text style={styles.buttonText}>Start</Text>
                  </TouchableOpacity>
                )}
              <Text></Text>
              <Button rounded
                onPress={() => this.props.navigation.navigate("Break")}
              >
                <Text style={styles.button}>Take a Break</Text>
              </Button>
              <Text></Text>

              <Button rounded
                onPress={() => this.props.navigation.navigate("PostSession")}
              >
                <Text style={styles.button}>End Session</Text>
              </Button>
              <Text></Text>

              <Button rounded
                onPress={() => this.props.navigation.navigate("SessionCreation")}
              >
                <Text style={styles.button}>Session</Text>
              </Button>


              {/* <Text style={styles.textDisplay}>Time till next Activity: 15 min</Text>
          <Text style={styles.textDisplay}>Time till next Break: 30 min</Text> */}


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