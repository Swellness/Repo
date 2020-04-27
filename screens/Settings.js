import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, StatusBar } from "react-native";
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Left, Body, Right, Title, TouchableOpacity } from "native-base";
import ReactNativeSettingsPage, { SectionRow, NavigateRow, CheckRow, SliderRow, SwitchRow } from 'react-native-settings-page';
import { Stitch, RemoteMongoClient } from 'mongodb-stitch-react-native-sdk';
const styles = StyleSheet.create({
  button: {
    backgroundColor: "grey",
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
    backgroundColor: "#647bec"
  },
  headerStyle: {
    backgroundColor: "white",
    elevation: 0,
    shadowColor: "white",
    shadowOpacity: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 0
  },
});
const db = require('../util/dbAPI')

export default class Start extends React.Component {
  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      updateName: "",
      sessionLength: 0,
      activityInterval: 0,
      tutorial: false,
      check: false,
      email: Stitch.defaultAppClient.auth.user.profile.email,
      usrObj: undefined

    };
    this._getInitialSettings = this._getInitialSettings.bind(this);
    this._updateSettings = this._updateSettings.bind(this);
    // this._queryBreakLength = this._queryBreakLength.bind(this);
    // this._queryTutorial = this._queryTutorial.bind(this);
  }
  componentDidMount() {
    this._getInitialSettings()
  }

  _navigateToScreen = () => {
    const { navigation } = this.props
    navigation.navigate('Leaderboard');
    // You can make a new page to have diff settings inside here^
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden={true} translucent={true} />
        <Container>
          <Header style={styles.headerStyle}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon style={{ color: "black" }} name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: "black" }} >Settings</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={{ color: "black" }} name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>
            {/* Params HERE https://reactnativeexample.com/a-react-native-library-for-a-beauty-settings-screen/ */}
            <ReactNativeSettingsPage>
              <SectionRow text='Settings'>
                <Text>Session Length</Text>
                <SliderRow
                  text={Math.round((this.state.sessionLength * 10 / 3600)) / 10 + " hours"}
                  //iconName='your-icon-name'
                  _color='#000'
                  _min={0}
                  _max={86399}
                  _value={this.state.sessionLength}
                  _onValueChange={sessionLength => { this.setState({ sessionLength }) }} />
                <Text>Activity Interval</Text>

                <SliderRow
                  text='Activity Interval'
                  //iconName='your-icon-name'
                  text={Math.round((this.state.activityInterval * 1 / 60)) / 1 + " minutes"}

                  _color='#000'
                  _min={0}
                  _max={3559}
                  _value={this.state.activityInterval}
                  _onValueChange={activityInterval => { this.setState({ activityInterval }) }} />
              </SectionRow>
              <SwitchRow
                text='Tutorial'
                _value={this.state.tutorial}
                _onValueChange={() => { this.setState({ tutorial: !this.state.tutorial }) }} />
              <CheckRow
                text='Finalize Settings'
                _color='#000'
                _value={this.state.check}
                _onValueChange={() => {
                  this._updateSettings()

                }} />
              {/* <CheckRow
                text='Check Data'
                //iconName='your-icon-name'
                _color='#000'
                _value={this.state.check}
                _onValueChange={() => { this._queryName() }} /> */}
            </ReactNativeSettingsPage>
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

  _getInitialSettings() {
    const collection = db.loadCollection('SwellnessTest', 'Users')
    var data = 0 //default session length
    var data2 = 0 //default activity interval 
    var tut = undefined //default tutorial
    collection.find({ email: this.state.email }, { limit: 1 }).asArray().then(result => {
      result.forEach(element => { //getting their information from database based on email
        data = element.defaultSessionLength
        data2 = element.defaultActivityInterval
        tut = element.tutorial
        //console.log(data+", "+data2)
        this.setState({ sessionLength: data, activityInterval: data2, tutorial: tut })
      })
    })
  }
  _updateSettings() { //finds usr obj, copies it, updates settings in copy, pushes copy to act as new usr profile thus "updating" the user
    const collection = db.loadCollection('SwellnessTest', 'Users')
    collection.find({ email: this.state.email }, { limit: 1 }).asArray().then(result => {
      this.setState({ usrObj: result[0] }, () => {
        var usrCopy = this.state.usrObj;
        delete usrCopy._id //removes the id key from object since we cant reuse the ID's
        //console.log(usrCopy)
        //console.log("usr length:"+usrCopy.defaultSessionLength)
        usrCopy.defaultSessionLength = this.state.sessionLength//sets new session length in copy, dividing by 600 inside math ceil then multiplying 600 rounds it to the nearest 10 minutes give or take 
        //console.log("new length:"+usrCopy.defaultSessionLength)
        //console.log("usr interval:"+usrCopy.defaultActivityInterval)
        usrCopy.defaultActivityInterval = this.state.activityInterval //sets new activity interval in copy
        // console.log("new interval:"+usrCopy.defaultActivityInterval)
        usrCopy.tutorial = this.state.tutorial
        const options = { "upsert": false }; //options for updateone function
        /////UPDATE ONE updates usr object with copy////////
        Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db("SwellnessTest").collection("Users").updateOne({ "email": this.state.email }, usrCopy, options).then(console.log("updated settings"))
        this.props.navigation.navigate("SessionCreation"); //navigates if user is found ()
      })
    })
  }
}