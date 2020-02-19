import React,{ Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
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
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
 
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
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
            <Button transparent onPress={() => this.props.navigation.navigate('SideBar')}>
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
          <Text>SELECTED DATE:{ startDate }</Text>
        </View>
      </View>

          {/* <Button
            onPress={() => this.props.navigation.navigate("SideBar")}
          >
            <Text style={styles.button}>Side Menu</Text>
          </Button> */}

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
          </Button>
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
    );
  }
}

export default SessionHistory;
