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
    //this._display = this._display.bind(this);
  }

  onDateChange(date) {

    this.setState({
      selectedStartDate: date.format('MM/DD/YY').toString()
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
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>History</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" />
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
                  Tap on a Day to see its stats, or select the Month to view all
                  your stats for that Month.
            </Text>
                <Text>{startDate}</Text>
                <Text>Steps: {this.state.data.map(x => (x.steps))}</Text>
                <Text>Exercises: {this.state.data.map(x => (x.exercises))}</Text>
                <Text>Points Earned: {this.state.data.map(x => (x.points))}</Text>


              </View>

            </View>
            {/* //////////////////BUTTONS/////////// */}
            {/* <Button
            onPress={() => this.props.navigation.navigate("SideBar")}
          >
            <Text style={styles.button}>Side Menu</Text>
          </Button>
            <Button
              onPress={() => this.props.navigation.navigate("SessionCreation")}
            >
              <Text style={styles.button}>Session</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate("Activities")}>
              <Text style={styles.button}>Activities</Text>
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate("DailyHistory")}
            >
              <Text style={styles.button}>Daily History</Text>
            </Button> */}
            {/* //////////////////BUTTONS/////////// */}
            {/* 
            <FlatList
          data={this.state.data}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        /> */}


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

  _query = () => { //you will have to build queries like this using the methods ive created
    const collection = db.loadCollection('SwellnessTest', 'Session')
    var dbData = []
    collection.find({ date: this.state.selectedStartDate }, { limit: 100 }).toArray().then(result => {
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