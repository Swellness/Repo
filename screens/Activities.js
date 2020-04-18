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
  List,
  ListItem,
  Accordion
} from "native-base";

// Import Images cause react Native is big dumb

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

let g = 0

let arrAll = [];
let arrHW = [];
let arrAS = [];

export default class Start extends React.Component {

  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      EXname: [],
      EXinstructions: [],
      EXpicture: [],
      EXtype: [],
      setSelectedValue: "All",
      imagePath: ""
    };
    this._queryData = this._queryData.bind(this);
    //this._queryInstructions = this._queryInstructions.bind(this);
  }

  async componentDidMount() {
    await this._queryData();
  }

  acc = (value) => {
    switch (value) {

      case 'All':
        return (
          <Accordion
            dataArray={arrAll}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        )
        break;

      case 'Hand and Wrist':
        return (
          <Accordion
            dataArray={arrHW}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        )
        break;

      case 'Arm and Shoulder':
        return (
          <Accordion
            dataArray={arrAS}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        )
        break;
      default:
        Alert.alert("NUMBER NOT FOUND");
    }
  }

  updateValue = (value) => {
    this.setState({ setSelectedValue: value })
  }

  buildArrays = () => {
    if (this.state.EXname.length > 0) {
      if (arrAll.length < 1) {
        for (let i = 0; i < this.state.EXname.length; i++) {
          arrAll.push({ title: this.state.EXname[i], instructions: this.state.EXinstructions[i], picture: this.state.EXpicture[i], index: i })
          if (this.state.EXtype[i] == "Hand and Wrist") {
            arrHW.push({ title: this.state.EXname[i], instructions: this.state.EXinstructions[i], picture: this.state.EXpicture[i], index: i })
          }
          if (this.state.EXtype[i] == "Arm and Shoulder") {
            arrAS.push({ title: this.state.EXname[i], instructions: this.state.EXinstructions[i], picture: this.state.EXpicture[i], index: i })
          }
        }
      }
      //console.log(arrHW)
    }
  }


  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Text style={{ fontWeight: "600" }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }
  _renderContent(item) {
    g = 0
    return (
      <View>
        {/* {this.requireImages(item.index)} */}
        {item.instructions.map((inst) => {
          g = g + 1
          return (
            <View>
              <Text
                style={{
                  backgroundColor: "#e3f1f1",
                  padding: 10,
                  fontStyle: "italic",
                }}
              >
                {g}. {inst}
              </Text>
            </View>
          )
        })}
      </View>
    );
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

            <Picker
              style={styles.dropbutton}
              selectedValue={this.state.setSelectedValue}
              onValueChange={(itemValue, itemIndex) => this.updateValue(itemValue)}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Hand and Wrist" value="Hand and Wrist" />
              <Picker.Item label="Arm and Shoulder" value="Arm and Shoulder" />
              {/* <Picker.Item label="Leg" value="Leg" />
              <Picker.Item label="Neck" value="Neck" />
              <Picker.Item label="Back" value="Back" /> */}
            </Picker>

            {this.buildArrays()}
            {this.acc(this.state.setSelectedValue)}

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

  _queryData = () => { //you will have to build queries like this using the methods ive created
    const exerciesCollection = db.loadCollection("SwellnessTest", "Exercises");
    var EXname = []; // array to transport names to state
    var EXinstructions = [];// array to transport instructions to state
    var EXpicture = []; // array to transport names to state
    var EXtype = [];// array to transport instructions to state
    exerciesCollection.find({}, { limit: 100 }).toArray().then(result => {
      result.map(x => {
        EXname.push(x.name) //pushing names to EXname array
        EXinstructions.push(x.instructions) //pushing instructions to EXinstructions array
        EXpicture.push(x.picture) //pushing instructions to EXpicture array
        EXtype.push(x.type) //pushing instructions to EXpicture array
      })
      // console.log("EXname:", EXname); //shows EXname contains the names correctly
      // console.log("EXinstructions:", EXinstructions); //shows EXname contains the names correctly
      // console.log("EXpicture:", EXpicture); //shows EXpicture contains the names correctly
      // console.log("EXtype:", EXtype); //shows EXtype contains the names correctly
      this.setState({ EXinstructions: EXinstructions, EXname: EXname, EXpicture: EXpicture, EXtype: EXtype }, () => {
        // console.log("state variable is set: ", this.state.EXname) //verifies state set correctly
        // console.log("state variable  is set: ", this.state.EXinstructions) //^^^^
        // console.log("state variable  is set: ", this.state.EXpicture) //^^^^
        // console.log("state variable  is set: ", this.state.EXtype) //^^^^
      });
    });
  }

  requireImages = (index) => {
    switch (index) {
      case 1:
        return (
          // <Image source={{ isStatic: true, uri: '../Pictures/Exercises/arm_exercise_1_and_2.png' }} style={styles.image} />
          <Image source={require('../Pictures/Exercises/arm_exercise_1_and_2.png')} style={styles.image} />
        )
      case 2:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_3.png')} style={styles.image} />
        )
      case 3:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_4.png')} style={styles.image} />
        )
      case 4:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_5.png')} style={styles.image} />
        )
      case 5:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_6a.png')} style={styles.image} />
        )
      case 6:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_7.png')} style={styles.image} />
        )
      case 7:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_8.png')} style={styles.image} />
        )
      case 8:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_9a.png')} style={styles.image} />
        )
      case 9:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_10.png')} style={styles.image} />
        )
      case 10:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_11a.png')} style={styles.image} />
        )
      case 11:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_12_and_13.png')} style={styles.image} />
        )
      case 12:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_14_and_15.png')} style={styles.image} />
        )
      case 13:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_16.png')} style={styles.image} />
        )
      case 14:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_17.png')} style={styles.image} />
        )
      case 15:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_18.png')} style={styles.image} />
        )
      case 16:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_19.png')} style={styles.image} />
        )
      case 17:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_20.png')} style={styles.image} />
        )
      case 18:
        return (
          <Image source={require('../Pictures/Exercises/arm_exercise_21a.png')} style={styles.image} />
        )
    }
  }

}