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
  Image,
  Modal,
  TouchableHighlight,
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
const db = require('../util/dbAPI')
import { Stitch } from 'mongodb-stitch-react-native-sdk';

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    borderRadius: width,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#dddddd",
    paddingTop: 5,
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    width: screen.width / 2.2,
    height: screen.width / 2.2,
    marginHorizontal: 100,
    backgroundColor: "#647bec"
  },
  viewHorizontal: {
    flex: 1,
    flexDirection: "row"
  },
  color: {
    backgroundColor: "#647bec"
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    width: width / 4,
    textAlign: "center",
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
    fontSize: 18,
    marginTop: 10
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerStyle: {
    backgroundColor: "white",
    elevation: 0,
    shadowColor: "white",
    shadowOpacity: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 0
  },
  centerObj: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  numbersView: {
    justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: width / 8,
    paddingTop: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#dddddd",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: 18,
    textAlign: "center"
  },
  openButton: {
    backgroundColor: "#F194FF",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 2,
    width: 100,
    height: 50
  },
  finalButton: {
    backgroundColor: "#F194FF",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 2,
    width: 300,
    height: 50
  },
});

const formatNumber = number => `0${number}`.slice(-2);

const createArray = length => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }

  return arr;
};

const AVAILABLE_HOURS = createArray(24);
const AVAILABLE_MINUTES = createArray(60);


export default class Start extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      defaultSecondsS: 0,
      defaultSecondsA: 0,
      totalHours: 8,
      totalMins: 0,
      actFrequency: 30,
      tutorial: undefined,
      modalVisible1: false,
      modalVisible2: false,
      modalVisible3: false,
      modalVisible4: false,
      modalVisible5: false,
      modalVisible6: false,
    };
    this._setDefaultSessionTime = this._setDefaultSessionTime.bind(this);
  }


  componentDidMount() { //insert pull logic here
    this._setDefaultSessionTime()

  }

  _setDefaultSessionTime() {
    const collection = db.loadCollection('SwellnessTest', 'Users')
    var user = Stitch.defaultAppClient.auth.user.profile.email
    var data = 0
    var data2 = 0
    var tut = undefined;
    collection.find({ email: user }, { limit: 1 }).asArray().then(result => {
      result.forEach(element => {
        data = element.defaultSessionLength
        data2 = element.defaultActivityInterval
        tut = element.tutorial
        this.setState({ defaultSecondsS: data, defaultSecondsA: data2 })
        //console.log(data+", "+data2)
      })
      this.setState({ tutorial: tut }, () => {
        if (this.state.tutorial) {
          console.log("showing tutorial")
          this.showTutorial()
        }
      })
      var totalSeconds = data
      var hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      var minutes = Math.floor(totalSeconds / 60);
      this.setState({ totalHours: hours.toString(), totalMins: minutes.toString() })

      var totalSecondsA = data2
      var minutes2 = Math.floor((totalSecondsA / 60))
      this.setState({ actFrequency: minutes2.toString() })



    })
  }

  _pullSettings() { //sets default session times and looks for tutorial
    const collection = db.loadCollection('SwellnessTest', 'Users')
    var user = Stitch.defaultAppClient.auth.user.profile.email
    var data = 0
    var data2 = 0
    var tut = undefined;
    collection.find({ email: user }, { limit: 1 }).asArray().then(result => {
      result.forEach(element => {
        data = element.defaultSessionLength
        data2 = element.defaultActivityInterval
        tut = element.tutorial
        this.setState({ defaultSecondsS: data, defaultSecondsA: data2 })
        //console.log(data+", "+data2)
      })
      this.setState({ tutorial: tut }, () => {
        if (this.state.tutorial) {
          console.log("showing tutorial")
          this.showTutorial()
        }
      })
      var totalSeconds = data
      var hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      var minutes = Math.floor(totalSeconds / 60);
      this.setState({ totalHours: hours.toString(), totalMins: minutes.toString() })

      var totalSecondsA = data2
      var minutes2 = Math.floor(totalSecondsA / 60)
      this.setState({ actFrequency: minutes2.toString() })



    })
  }

  start = () => {
    console.log(this.state.totalHours)
    console.log(this.state.totalMins)
    console.log(this.state.actFrequency)


    this.props.navigation.navigate("ActiveSession", {
      hours: this.state.totalHours,
      minutes: this.state.totalMins,
      actFreq: this.state.actFrequency
    })
  };

  showTutorial = () => {
    this.setState({
      modalVisible1: true
    })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} translucent={true} />

        <Container>
          <Header style={styles.headerStyle}>
            <Left />
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={{ color: "black" }} name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>

            <View style={styles.centerObj}>
              <Image
                style={{ width: width / 1.1, height: width / 2.12 }}
                source={require('../Pictures/swellness_logo_outline.png')}
              />
            </View>
            <View style={styles.numbersView}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>Hours Working</Text>
              <View style={styles.viewHorizontal}>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={this.state.totalHours}
                  onValueChange={itemValue => {
                    this.setState({ totalHours: itemValue });
                  }}
                  mode="dropdown"
                >
                  {AVAILABLE_HOURS.map(value => (
                    <Picker.Item key={value} label={value} value={value} />
                  ))}
                </Picker>
                <Text style={styles.pickerItem}>Hours</Text>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={this.state.totalMins}
                  onValueChange={itemValue => {
                    this.setState({ totalMins: itemValue });
                  }}
                  mode="dropdown"
                >
                  {AVAILABLE_MINUTES.map(value => (
                    <Picker.Item key={value} label={value} value={value} />
                  ))}
                </Picker>
                <Text style={styles.pickerItem}>Minutes</Text>
              </View>


              <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "right", marginTop: 0 }}>Activity Frequency</Text>
              <View style={styles.viewHorizontal}>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={this.state.actFrequency}
                  onValueChange={itemValue => {
                    this.setState({ actFrequency: itemValue });
                  }}
                  mode="dropdown"
                >
                  {AVAILABLE_MINUTES.map(value => (
                    <Picker.Item key={value} label={value} value={value} />
                  ))}
                </Picker>
                <Text style={styles.pickerItem}>Minutes</Text>
              </View>

            </View>
            <View style={styles.centerObj}>
              <Button style={styles.button}
                onPress={() => this.start()}
              >
                <Text style={styles.buttonText}>Start Session</Text>
              </Button>
            </View>
            <View style={{ flex: 1, flexDirection: "row", marginTop: 30, width: screen.width }}>
              <Button style={{ textAlign: "left", marginLeft: 20 }} transparent onPress={() => { this.componentDidMount() }}>
                <Text style={{ color: "#647bec" }}>Reset to Default</Text>
              </Button>
              <Button style={{ textAlign: "right", marginLeft: screen.width - 205 }} transparent onPress={() => { this.setState({ modalVisible1: true }) }}>
                <Text style={{ color: "#647bec" }}>Tutorial</Text>
              </Button>
            </View>


            {/*Modal Starts Here*/}
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible1}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                      Welcome to the Swellness App!  Here is a quick run down on what to do.{"\n"}
                    </Text>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#647bec" }}
                      onPress={() => {
                        this.setState({
                          modalVisible1: false,
                          modalVisible2: true
                        })
                      }}
                    >
                      <Text style={styles.textStyle}>Next</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ marginTop: 5 }}
                      onPress={() => {
                        this.setState({
                          modalVisible1: false,
                        })
                      }}
                    >
                      <Text style={{ color: "#647bec" }}>Skip</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible2}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>1/5</Text>
                    <Text style={styles.modalText}>
                      You are currently on the Create Session page where you will pick how long you will be working for and how often you want to recieve activity reminders.{"\n"}

                    </Text>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#647bec" }}
                      onPress={() => {
                        this.setState({
                          modalVisible2: false,
                          modalVisible3: true
                        })
                      }}
                    >
                      <Text style={styles.textStyle}>Next</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ marginTop: 5 }}
                      onPress={() => {
                        this.setState({
                          modalVisible2: false,
                        })
                      }}
                    >
                      <Text style={{ color: "#647bec" }}>Skip</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible3}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>2/5</Text>
                    <Text style={styles.modalText}>
                      Once you start the session, you go to the Active Session screen.
                      Here your time is tracked as you do your work. There are options to take a break or end the session early.{"\n"}
                    </Text>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#647bec" }}
                      onPress={() => {
                        this.setState({
                          modalVisible3: false,
                          modalVisible4: true
                        })
                      }}
                    >
                      <Text style={styles.textStyle}>Next</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ marginTop: 5 }}
                      onPress={() => {
                        this.setState({
                          modalVisible3: false,
                        })
                      }}
                    >
                      <Text style={{ color: "#647bec" }}>Skip</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible4}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>3/5</Text>
                    <Text style={styles.modalText}>
                      Once you have completed your session, you will be shown your stats, which can now be viewed in the Session History Calander in the bottom left.{"\n"}
                    </Text>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#647bec" }}
                      onPress={() => {
                        this.setState({
                          modalVisible4: false,
                          modalVisible5: true
                        })
                      }}
                    >
                      <Text style={styles.textStyle}>Next</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ marginTop: 5 }}
                      onPress={() => {
                        this.setState({
                          modalVisible4: false,
                        })
                      }}
                    >
                      <Text style={{ color: "#647bec" }}>Skip</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible5}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>4/5</Text>
                    <Text style={styles.modalText}>
                      By doing sessions and completing activities, you earn points. These points dictate your ranking on the leader board. They can also be spent for giftcards or movie tickets.
                      Both of these pages can be found by using the menu on the top right of your screen.{"\n"}
                    </Text>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#647bec" }}
                      onPress={() => {
                        this.setState({
                          modalVisible5: false,
                          modalVisible6: true
                        })
                      }}
                    >
                      <Text style={styles.textStyle}>Next</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ marginTop: 5 }}
                      onPress={() => {
                        this.setState({
                          modalVisible5: false,
                        })
                      }}
                    >
                      <Text style={{ color: "#647bec" }}>Skip</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible6}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>5/5</Text>
                    <Text style={styles.modalText}>
                      At any time, you can navigate to our large selection of healthy stretches and activities by clicking on the heart on the bottom right of your screen.
                      If you would like to not see this tutorial again, you can turn it off, as well as set your default session times on the settings screen.{"\n"}
                    </Text>
                    <TouchableHighlight
                      style={{ ...styles.finalButton, backgroundColor: "#647bec" }}
                      onPress={() => {
                        this.setState({
                          modalVisible6: false,
                        })
                      }}
                    >
                      <Text style={styles.textStyle}>Let's Get Started!</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ marginTop: 5 }}
                      onPress={() => {
                        this.setState({
                          modalVisible6: false,
                        });
                        this.props.navigation.navigate("Settings")
                      }}
                    >
                      <Text style={{ color: "#647bec" }}>Go To settings</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>

            </View>

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