import React, { Component } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar } from "react-native";
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
  }
});

class SessionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      data: undefined
    };

    this.onDateChange = this.onDateChange.bind(this);
    this._query = this._query.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date.format('MMMM Do YYYY'),
      data: date.format('MMMM Do YYYY')

    });


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
                <Text>Date: {startDate}</Text>
              </View>
            </View>

            {/* <Button
            onPress={() => this.props.navigation.navigate("SideBar")}
          >
            <Text style={styles.button}>Side Menu</Text>
          </Button> */}

            {/* <Button
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
            <Text >Data: {this.state.data}</Text>
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

  _query = () => { //you will have to build queries like this using the methods ive created
    const collection = db.loadCollection('SwellnessTest', 'Users')

    collection.find({}, { limit: 100 }).asArray() //find {} means find everything, limit 100 stops finding after 100, as array outputs everything to json
      .then(docs => {
        console.log("Found docs", docs)
        return docs
      }).catch(err => {
        console.error(err)
      });
  }
}

export default SessionHistory;
