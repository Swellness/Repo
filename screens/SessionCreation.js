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
    backgroundColor: "blue"
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
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    width: width / 4,
    textAlign: "center",
  },
  buttonTextStop: {
    color: "#FF851B"
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
    marginTop: 5
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerStyle: {
    backgroundColor: "white",
    elevation: 0,
    shadowColor : "white",
    shadowOpacity: 0,
    shadowOffset: { height: 0 , width:0 },
    shadowRadius: 0
  },
  centerObj: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 10
  },
  quoteView: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 55,
    paddingBottom: 20
  },
  numbersView: {
    justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: width/8,
    paddingTop: 10
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
      tutorial: undefined
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
    Alert.alert(
      'Sample Tutorial Alert!',
      'Other stuff here.',
      [
        { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log("Still needs navigation") },
      ],
      // { cancelable: false }
    )
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} translucent={true} />

        <Container>
          <Header style={styles.headerStyle}>
            <Left />
            <View style={{ flex: 1, alignItems: "flex-end", justifyContent: 'center' }}>
              <Title style={{color: "black"}}>New Session</Title>
            </View>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={{color: "black"}} name='menu' />
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
            <View style={styles.quoteView}>
              <Text style={{fontSize: 15, fontStyle: "italic"}}>"When life gives you lemons, Don't make Lemonade..."</Text>
            </View>

            <View style={styles.numbersView}>
              <Text style={{ fontSize: 22, fontWeight: "Bold" }}>Hours Working</Text>
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
              

              <Text style={{ fontSize: 22, fontWeight: "Bold", textAlign: "right", margineTop: 0 }}>Activity Frequency</Text>
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
              <Button style={{ alignSelf: "center", marginTop: 10, marginBottom: 10, width: 125, justifyContent: "center" }} transparent onPress={() => { this.componentDidMount() }}>
                <Text style={{ color: "blue" }}>Reset to Default</Text>
              </Button>

            </View>

          </Content>




          <Footer>
            <FooterTab style={{backgroundColor: "#647bec"}}>
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