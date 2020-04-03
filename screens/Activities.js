import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text, SafeAreaView, StatusBar, Dimensions, Image, Picker, Alert, View
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
  Row,
} from "native-base";

// Implement for when we get dimensions of screens rather than hard coding in values.
const screen = Dimensions.get("window");
const buttonWidth = screen.width;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
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
    backgroundColor: "blue"
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  dropdown: {
    fontSize: 24,
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
  },
  dropbutton: {
    alignItems: "center",
    justifyContent: "center",
  },
  dropbox: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  actionbutton: {
    backgroundColor: "grey",
    height: buttonWidth,
    marginLeft: 35,
    width: 150,
    height: 200,
    marginTop: 50,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 200,
  }
});

const db = require('../util/dbAPI')

export default class Start extends React.Component {

  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      EXname: [],
      EXinstructions: [],
      currentArray: [],
      PickerValue: "",
      setSelectedValue: "All"
    };
    this._queryName = this._queryName.bind(this);
    //this._queryInstructions = this._queryInstructions.bind(this);
  }

  async componentDidMount() {
    this._queryName();
  }

  updateValue = (value) => {
    this.setState({ setSelectedValue: value })
  }

  loop = (i) => {
    for (k = 0; k < this.state.EXinstructions[i].length; k++) {
      return (
        <Text>{this.state.EXinstructions[i][k]}</Text>
      )
    }
  }

  callPage = (value) => {

    switch (value) {

      case 'All':
        console.log("All")
        // for (i = 0; i < 2; i++) {
        //   this.setState({
        //     currentArray: this.state.EXinstructions[i]
        //   })
        //   console.log()
        return (
          <View>
            {this.state.EXname.map(item => {
              return <Text style={{ fontSize: 16, marginTop: 15 }}>{item}</Text>;
            })}
          </View>
        )
        break;

      case 'Wrist':
        console.log('Wrist')
        return (
          <Text>Wrist</Text>
        )
        break;

      case 'Ankle':
        console.log('Ankle')
        return (
          <Text>Ankle</Text>
        )
        break;

      case 'Knee':
        console.log('Knee')
        return (
          <Text>Knee</Text>
        )
        break;

      case 'Neck':
        console.log('Neck')
        return (
          <Text>Neck</Text>
        )
        break;

      case 'Back':
        console.log('Back')
        return (
          <Text>Back</Text>
        )
        break;

      default:
        Alert.alert("NUMBER NOT FOUND");
    }
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
              <Title>Activities</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>
            <Text></Text>
            <Picker
              style={styles.dropbutton}
              selectedValue={this.state.setSelectedValue}
              onValueChange={(itemValue, itemIndex) => this.updateValue(itemValue)}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Wrist" value="Wrist" />
              <Picker.Item label="Ankle" value="Ankle" />
              <Picker.Item label="Knee" value="Knee" />
              <Picker.Item label="Neck" value="Neck" />
              <Picker.Item label="Back" value="Back" />
            </Picker>
            {this.callPage(this.state.setSelectedValue)}

            {/* <Row>
              <TouchableOpacity style={styles.actionbutton} onPress={() => this.props.navigate}>
                <Image
                  source={require('../images/wriststretch1.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionbutton}>
                <Image
                  source={require('../images/wriststretch2.jpg')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </Row>
            <Row>
              <TouchableOpacity style={styles.actionbutton}>
                <Image
                  source={require('../images/wriststretch3.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionbutton}>
                <Image
                  source={require('../images/wriststretch4.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </Row> */}
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

  _queryName = () => { //you will have to build queries like this using the methods ive created
    const exerciesCollection = db.loadCollection("SwellnessTest", "Exercises");
    var EXname = []; // array to transport names to state
    var EXinstructions = [];// array to transport instructions to state
    exerciesCollection.find({}, { limit: 100 }).toArray().then(result => {
      result.map(x => {
        EXname.push(x.name) //pushing names to EXname array
        EXinstructions.push(x.instructions) //pushing instructions to EXinstructions array
      })
      console.log("EXname:", EXname); //shows EXname contains the names correctly
      console.log("EXinstructions:", EXinstructions); //shows EXname contains the names correctly
      this.setState({ EXinstructions: EXinstructions, EXname: EXname }, () => {
        console.log("state variable is set: ", this.state.EXname) //verifies state set correctly
        console.log("state variable  is set: ", this.state.EXinstructions) //^^^^
      });
    });
  }

}