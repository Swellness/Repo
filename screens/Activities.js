import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text, SafeAreaView, StatusBar, Dimensions, Image
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
import ModalDropdown from 'react-native-modal-dropdown';

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

export default class Start extends React.Component {
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
          <ModalDropdown
            animated
            style={styles.dropbutton}
            textStyle={styles.text}
            dropdownStyle={styles.dropbox}
            dropdownTextStyle={styles.dropdown}
            options={['Wrist', 'Ankle', "Knee", "Neck", "Back"]} />
          <Content>
            <Row>
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
            </Row>
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
}
