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
import { Stitch, RemoteMongoClient} from 'mongodb-stitch-react-native-sdk';
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
    fontWeight: "normal"

  }
});
export default class Start extends React.Component {
  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      username:"",
      fName: " ",
      lName: " ",
      DOB: " ",
      email: "",
      password: "",
      idNumber: " ",
      edit: false,
      nFname: "",
      nLname: "",
      usrObj: ""
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
    );
  }
  _query = () => { //you will have to build queries like this using the methods ive created
    const collection = db.loadCollection('SwellnessTest', 'Users')

    var id = Stitch.defaultAppClient.auth.user.profile.email;

    // var dbData = []
    collection.find({ email: id }, { limit: 100 }).toArray().then(result => {
      result.map(x => {
        this.setState({ username: x.username, fname: x.fname, lname: x.lname, email: x.email, usrObj: x._id })
      })
    });
  }

  _update = (fname, lname) => {
    const output = { "username":this.state.username, "fname": fname, "lname": lname, "email":this.state.email }
    const options = { "upsert": false };
    Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db("SwellnessTest").collection("Users").updateOne({"email":this.state.email}, output, options).then(    this._query()    )
}
  _nonEditable = () => {

    return (
      <View
        style={{
          paddingHorizontal: 50,
          paddingBottom: 50,
        }}>
        <Item stackedLabel >
          <Label>First Name</Label>
          <Input style={styles.nonEditText} disabled placeholder={this.state.fname} />

        </Item>
        <Item stackedLabel >
          <Label>Last Name</Label>
          <Input style={styles.nonEditText} disabled placeholder={this.state.lname} />
        </Item>

        <Item stackedLabel last>
          <Label>Email:</Label>
          <Input style={styles.nonEditText} disabled placeholder={this.state.email} />
        </Item>

        {/* button can be removed below */}
        <Button
          iconLeft style={{ width: 50 }}
          onPress={() => {

            this.setState({ edit: !this.state.edit })

          }}
        >
          <Icon name='settings' />
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
        <Input style={styles.editText} placeholder={this.state.fname} onChangeText={(nFname) => this.setState({ nFname})} />

      </Item>
      <Item stackedLabel >
        <Label>Last Name</Label>
        <Input style={styles.editText} placeholder={this.state.lname} onChangeText={(nLname) => this.setState({ nLname})} />
      </Item>

      <Item stackedLabel last>
        <Label>Email:</Label>
        <Input disabled style={styles.editText} placeholder={this.state.email} />
      </Item>

      {/* button can be removed below */}
      <Button
        iconLeft style={{ width: 50 }}
        onPress={() => {
          this.setState({ edit: !this.state.edit })
          this.setState({fname:this.state.nFname, lname:this.state.nLname}) //sets old f/l name to new first and last name so it immediately reads it correctly rather than waiting for next reload to show correct data
          console.log("saved")
          this._update(this.state.nFname, this.state.nLname)
        }}
      >
        <Icon name='save' />
      </Button>
    </View>)
  }

 
}