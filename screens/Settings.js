import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, StatusBar } from "react-native";
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Left, Body, Right, Title, TouchableOpacity } from "native-base";
import ReactNativeSettingsPage, { SectionRow, NavigateRow, CheckRow, SliderRow, SwitchRow } from 'react-native-settings-page';
import { Stitch, RemoteMongoClient, UserPasswordCredential, UserPasswordAuthProviderClient } from 'mongodb-stitch-react-native-sdk';
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
    backgroundColor: "blue"
  }
});
const db = require('../util/dbAPI')
export default class Start extends React.Component {
  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      updateName: "",
      qSessionBoolean: 0,
      qBreakBoolean: 0,
      qTutorialBoolean: false,
      check: false,
      switch: false,
      valueS: 0,
      valueB: 0,
      email: "Lcostello17@apu.edu",
      //email: Stitch.defaultAppClient.auth.user.profile.email,
      EXname: [],
    };
    this._querySessionLength = this._querySessionLength.bind(this);
    this._queryName = this._queryName.bind(this);
    // this._queryBreakLength = this._queryBreakLength.bind(this);
    // this._queryTutorial = this._queryTutorial.bind(this);
  }
  async componentDidMount() {
  }
  // state = {
  //   check: false,
  //   switch: false,
  //   value: 40
  // }
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
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Settings</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Right>
          </Header>
          <Content>
            {/* Params HERE https://reactnativeexample.com/a-react-native-library-for-a-beauty-settings-screen/ */}
            <ReactNativeSettingsPage>
              <SectionRow text='Settings'>
                <SliderRow
                  text='Session Length'
                  //iconName='your-icon-name'
                  _color='#000'
                  _min={0}
                  _max={1440}
                  _value={this.state.qSessionBoolean}
                  _onValueChange={qSessionBoolean => {this.setState({ qSessionBoolean })}} />
                <SliderRow
                  text='Break Length'
                  //iconName='your-icon-name'
                  _color='#000'
                  _min={0}
                  _max={1440}
                  _value={this.state.qBreakBoolean}
                  _onValueChange={qBreakBoolean => { this.setState({ qBreakBoolean }) }} />
              </SectionRow>
              {/* <NavigateRow
            text='Session Length'
            iconName='your-icon-name'
            onPressCallback={this._navigateToScreen} /> */}
              <SwitchRow
                text='Tutorial'
                //iconName='your-icon-name'
                _value={this.state.qTutorialBoolean}
                _onValueChange={() => { this.setState({ qTutorialBoolean: !this.state.qTutorialBoolean }) }} />
              <CheckRow
                text='Finalize Settings'
                //iconName='your-icon-name'
                _color='#000'
                _value={this.state.check}
                _onValueChange={() => {
                  this._querySessionLength(this.state.qSessionBoolean,
                    this.state.qBreakBoolean, this.state.qTutorialBoolean)
                }} />
              <CheckRow
                text='Check Data'
                //iconName='your-icon-name'
                _color='#000'
                _value={this.state.check}
                _onValueChange={() => { this._queryName() }} />
            </ReactNativeSettingsPage>
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
  _querySessionLength = (qSessionBoolean, qBreakBoolean, qTutorialBoolean) => {
    const output = {
      "breakLength": qSessionBoolean, "sessionLength": qBreakBoolean,
      "tuturial": qTutorialBoolean, "email": this.state.email
    }
    const options = { "upsert": false };
    Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory,
      'mongodb-atlas').db("SwellnessTest").collection("Session").updateOne({ "email": this.state.email },
        output, options).then(this._querySessionLength())
  }
  _queryName = () => { //you will have to build queries like this using the methods ive created
    const exerciesCollection = db.loadCollection("SwellnessTest", "Session");
    var EXname = []; // array to transport names to state
    //var EXinstructions = [];// array to transport instructions to state
    exerciesCollection.find({}, { limit: 100 }).toArray().then(result => {
      result.map(x => {
        EXname.push(x.breakLength) //pushing names to EXname array
        EXname.push(x.sessionLength) //pushing names to EXname array
        EXname.push(x.tuturial) //pushing names to EXname array
        //EXinstructions.push(x.instructions) //pushing instructions to EXinstructions array
      })
      console.log("EXname:", EXname); //shows EXname contains the names correctly
      //console.log("EXinstructions:", EXinstructions); //shows EXname contains the names correctly
      this.setState({ EXinstructions: EXinstructions, EXname: EXname }, () => {
        console.log("state variable is set: ", this.state.EXname) //verifies state set correctly
        //console.log("state variable  is set: ", this.state.EXinstructions) //^^^^
      });
    });
  }
}