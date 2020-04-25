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
import { Stitch} from 'mongodb-stitch-react-native-sdk';

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: "hidden",
    padding: 5,
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    width: screen.width / 2,
    height: 75,
    marginHorizontal: 100
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
    fontSize: 24
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
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
constructor(props){
  super(props)

  this.state = {
    defaultSecondsS:0,
    defaultSecondsA:0,
    totalHours: 8,
    totalMins: 0,
    actFrequency: 30,
  };
  this._setDefaultSessionTime = this._setDefaultSessionTime.bind(this);
}
  

  componentDidMount(){ //insert pull logic here
this._setDefaultSessionTime()
  
  }

  _setDefaultSessionTime() {
    const collection = db.loadCollection('SwellnessTest', 'Users')
    var user = Stitch.defaultAppClient.auth.user.profile.email
    var data = 0
    var data2 =0
    collection.find({ email: user }, { limit: 1 }).asArray().then(result => {
      result.forEach(element => {
        data = element.defaultSessionLength
        data2 = element.defaultActivityInterval
        this.setState({defaultSecondsS:data, defaultSecondsA:data2})
        //console.log(data+", "+data2)
      })
      var totalSeconds = data
      var hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      var minutes = Math.floor(totalSeconds / 60);
      this.setState({totalHours:hours.toString(), totalMins: minutes.toString()})

      var totalSecondsA = data2
      var minutes2 = Math.floor(totalSecondsA/60)
      this.setState({actFrequency:minutes2.toString()})


      
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} translucent={true} />
       
        <Container>
          <Header>
            <Left />
            <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
              <Title>New Session</Title>
            </View>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>
          <Button style={{ alignSelf: "center", marginTop: 10, marginBottom: 10, width: 125, justifyContent: "center" }} onPress={() => { this.componentDidMount() }}>
              <Text style={{ color: "white" }}>Refresh</Text>
            </Button>
            <Image
              style={{ width: 400, height: 250 }}
              source={require('../Pictures/AppLogo.png')}
            />
            <Text style={{ fontSize: 30, textDecorationLine: 'underline' }}>Session Length:</Text>
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
              <Text style={styles.pickerItem}>Hours and</Text>


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

            <Text style={{ fontSize: 30, textDecorationLine: 'underline' }}>Activity Frequency:</Text>
            <View style={styles.viewHorizontal}>
              <Text style={styles.pickerItem}>Every</Text>
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
            <Button style={styles.button}
              onPress={() => this.start()}
            >
              <Text style={styles.buttonText}>Start Session</Text>
            </Button>
          </Content>
          <Footer>
            <FooterTab>
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