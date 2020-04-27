import React, { Component } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from "react-native";
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
  Title
} from "native-base";
import CalendarPicker from 'react-native-calendar-picker';
const db = require('../util/dbAPI')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center"
    //marginTop: 10

  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
    width: 315,
    height: 77,
    left: 30,
    top: 56
  },
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
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  subText: {
    fontSize: 13,
    justifyContent: "center",
    textAlign: "center"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  headerStyle: {
    backgroundColor: "white",
    elevation: 0,
    shadowColor: "white",
    shadowOpacity: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 0
  },
  bottomText: {
    fontSize: 32,
    marginLeft: 10
  },
  view: {
    marginHorizontal: 20,
    backgroundColor: "#dddddd",
    paddingBottom: 20,
    borderRadius: 10,
  },
});
class SessionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: undefined,
      data: []
    };

    this.onDateChange = this.onDateChange.bind(this);
    this._query = this._query.bind(this);
  }

  onDateChange(date) {
    var formattedDate = date.format('MM/DD/YY').toString()
    console.log(formattedDate, "selected")


    this.setState({
      selectedStartDate: formattedDate
    }, () => {
      this._query()
    })
  }

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} translucent={true} />
        <Container>
          <Header style={styles.headerStyle}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon style={{ color: "black" }} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "black" }} >History</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={{ color: "black" }} name="menu" />
              </Button>
            </Right>
          </Header>
          <Content>
            <View style={styles.container}>
              <CalendarPicker
                onDateChange={this.onDateChange}
              />
              <View>
                <Text style={styles.subText}>
                  Tap on a Day to see its stats
            </Text>
                <View style={styles.view}>
                  <Text style={{ marginLeft: 5, marginTop: 5 }}>{startDate}</Text>
                  <Text style={styles.bottomText}>Steps: {this.state.data.map(x => (x.steps))}</Text>
                  <Text style={styles.bottomText}>Exercises: {this.state.data.map(x => (x.exercises))}</Text>
                  <Text style={styles.bottomText}>Points Earned: {this.state.data.map(x => (x.points))}</Text>
                </View>
              </View>

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

  _query = () => {
    const collection = db.loadCollection('SwellnessTest', 'Session')
    var dbData = []
    collection.find({ date: this.state.selectedStartDate }, { limit: 1 }).toArray().then(result => {
      result.map(x => console.log(x.date))
      result.forEach(element => {
        dbData.push(element)
        console.log("element pushed: ", element)
        this.setState({ data: dbData }, () => {
          console.log(this.state.data)
        })
      });
    });
  }


}
export default SessionHistory;