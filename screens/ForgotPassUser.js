import React from "react";
import {
  StyleSheet,
  Dimensions, SafeAreaView, StatusBar
} from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Text,
  Picker
} from "native-base";
import { Stitch, UserPasswordAuthProviderClient, } from 'mongodb-stitch-react-native-sdk';
const db = require('../util/dbAPI')


var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  TextBoxStyle: {
    height: 50,
    width: 300,
    borderColor: "gray",
    borderWidth: 1
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: width / 4,
    marginRight: width / 4
  }
});
export default class ForgotPassUser extends React.Component {

  constructor(props) { //state and method instantiation
    super(props);
    this.state = {
      email: "",
      question:"",
      answer:"",
      selected2: undefined


    };
    this._handleReset = this._handleReset.bind(this);
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  } 

render(){
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={true} translucent={true} />
      <Container>
        <Content>
          <Form>
            <Text style={{ fontSize: 32, }}> Reset Your Password</Text>
            <Text style={{ textAlign: "center", fontSize: 20, }}he
            >If you are unable to gain access to your account,
        please enter your email to reset your password:</Text>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input onChangeText={(email) => this.setState({ email })} />
            </Item>
            <Label>Security Question</Label>

            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Question"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="In what town or city was your first full time job?" value="key0" />
                <Picker.Item label="What primary school did you attend?" value="key1" />
                <Picker.Item label="In what city does your nearest sibling live?" value="key2" />
              </Picker>
            </Item>
            <Item stackedLabel>
              <Label>Answer</Label>
              <Input onChangeText={(answer) => this.setState({ answer })} />
            </Item>
            <Button rounded style={styles.button} onPress = {()=>{this._handleReset(this.state.email)}}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    </SafeAreaView>
  );
}

//none of this works
// _handleReset= (email) =>{


// const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory) //creates email client
// const stitchClient = Stitch.defaultAppClient;
 
// emailPassClient.callResetPasswordFunction("J@j.com", "234567", ["yes", "yes"])

// //resetFunc({username, password, token, tokenId}, securityAnswer1, securityAnswer2, securitySMSCode)

// //authClient.resetPassword("q1", "q2", "234567")
// // authClient.confirmUser(("q1","q1"),()=>{})

//   // const collection = db.loadCollection('SwellnessTest', 'Session')
//   //   var token = ""
//   //   var tokenID = ""
//   //   collection.find({email:email}, { limit: 100 }).toArray().then( result => {
//   //     result.map(x => console.log(x.date))
//   //     result.forEach(element => {
//   //       dbData.push(element)
//   //       console.log("element pushed: ", element)
//   //       this.setState({data:dbData}, ()=>{
//   //         console.log(this.state.data)
//   //       })
//   //     });
//   //   });
// }  
}
  

