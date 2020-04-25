import React from "react";
import {
  StyleSheet,
  Image,
  View,
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
  Form,
  Item,
  Text,
  Input,
  Label
} from "native-base";

import { Stitch, RemoteMongoClient } from 'mongodb-stitch-react-native-sdk';

const db = require('../util/dbAPI')
const styles = StyleSheet.create({
  textBox: {
    backgroundColor: "#EBEBEB",
    borderRadius: 5,
    fontSize: 24,
  },
  nonEditText: {
    fontWeight: "bold"
  },
  editText: {
    fontWeight: "100"

  }
});
export default class Start extends React.Component {
  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      username: "",
      fName: " ",
      lName: " ",
      DOB: " ",
      email: "",
      password: "",
      idNumber: " ",
      edit: false,
      nFname: "",
      nLname: "",
      usrObj: "",
      sLength:"",
      actInterval:""
    };
    this._query = this._query.bind(this);
    this._editable = this._editable.bind(this);
    this._nonEditable = this._nonEditable.bind(this);
  }
  componentDidMount() {
    this._query()
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 50,
            flex: 1
          }}>
            <Image
              style={{ paddingBottom: 5, height: 200, width: 200 }}
              source={require('../Pictures/profile_default.png')}
            />
            <Button transparent >
              <Text style={{ color: '#1A53FF' }}>change picture</Text>
            </Button>
          </View>

          {this.state.edit ? this._editable() : this._nonEditable()}


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
    );
  }
  _query = () => { //queries DB for user information
    const collection = db.loadCollection('SwellnessTest', 'Users')

    var id = Stitch.defaultAppClient.auth.user.profile.email;
    // var dbData = []
    collection.find({ email: id }, { limit: 100 }).toArray().then(result => {
      result.map(x => {
        this.setState({ username: x.username, fName: x.fName, lName: x.lName, email: x.email,sLength:x.defaultSessionLength, actInterval:x.defaultActivityInterval, usrObj: x._id })
      })
    });
  }

  _update = (fName, lName) => {
    const output = { "username": this.state.username, "fName": fName, "lName": lName, "email": this.state.email, "defaultSessionLength":this.state.sLength, "defaultActivityInterval":this.state.actInterval}
    const options = { "upsert": false };
    Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db("SwellnessTest").collection("Users").updateOne({ "email": this.state.email }, output, options).then(this._query())
  }

  _nonEditable = () => {
    this._query()
    return (
      <View
        style={{
          paddingHorizontal: 50,
          paddingBottom: 50,
        }}>
        <Item stackedLabel >
          <Label>First Name</Label>
          <Input style={styles.nonEditText} disabled placeholder={this.state.fName} />

        </Item>
        <Item stackedLabel >
          <Label>Last Name</Label>
          <Input style={styles.nonEditText} disabled placeholder={this.state.lName} />
        </Item>

        <Item stackedLabel last>
          <Label>Email:</Label>
          <Input style={styles.nonEditText} disabled placeholder={this.state.email} />
        </Item>

        {/* button can be removed below */}
        <Button
          style={{ marginTop: 15, alignContent: "center" }}
          onPress={() => {

            this.setState({ edit: !this.state.edit })

          }}
        >
          <Text>Edit</Text>

        </Button>
      </View>
    )
  }
  _editable = () => { //code to render when user presses edit button
    return (<View
      style={{
        paddingHorizontal: 50,
        paddingBottom: 50,
      }}>
      <Item stackedLabel >
        <Label>First Name</Label>
        <Input style={styles.editText} placeholder={this.state.fName} onChangeText={(nFname) => this.setState({ nFname })} />

      </Item>
      <Item stackedLabel >
        <Label>Last Name</Label>
        <Input style={styles.editText} placeholder={this.state.lName} onChangeText={(nLname) => this.setState({ nLname })} />
      </Item>

      <Item stackedLabel last>
        <Label>Email:</Label>
        <Input disabled  placeholder={this.state.email} />
      </Item>

      {/* button can be removed below */}
      <Button
        style={{ marginTop: 15, alignContent: "center" }}
        onPress={() => {
          this.setState({ fName: this.state.nFname, lName: this.state.nLname }) //sets old f/l name to new first and last name so it immediately reads it correctly rather than waiting for next reload to show correct data
          console.log("saved")
          this._update(this.state.nFname, this.state.nLname)
          this.setState({ edit: !this.state.edit })

        }}
      >
        <Text>Save</Text>

      </Button>
    </View>)
  }
}