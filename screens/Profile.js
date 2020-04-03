import React from "react";
import {
  StyleSheet,
  Text,
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
} from "native-base";

const styles = StyleSheet.create({
  textBox: {
    backgroundColor: "#EBEBEB",
    borderRadius: 5,
    fontSize: 24,
  }
});

export default class Start extends React.Component {
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
              <Text style={{ color: '#1a53ff' }}>change picture</Text>
            </Button>

          </View>

          <View
            style={{
              paddingHorizontal: 50,
              paddingBottom: 50,
            }}>

            <Text style={{ color: "#868686", fontSize: 18 }}>First Name</Text>
            <Text style={styles.textBox}> John</Text>
            <Text style={{ color: "#868686", fontSize: 18 }}>Last Name</Text>
            <Text style={styles.textBox}> Madden</Text>
            <Text style={{ color: "#868686", fontSize: 18 }}>Date of Birth</Text>
            <Text style={styles.textBox}> 4/10/1936</Text>
            <Text style={{ color: "#868686", fontSize: 18 }}>Email</Text>
            <Text style={styles.textBox}> JohnMadden@apu.edu</Text>
            <Button iconLeft style={{ width: 50 }}>
              <Icon name='settings' />
            </Button>
            <Text style={{ color: "#868686", fontSize: 18 }}>Id Number</Text>
            <Text style={styles.textBox}> 19691978</Text>
            <Text style={{ color: "#868686", fontSize: 18 }}>Password</Text>
            <Text style={styles.textBox}> ***********</Text>
            <Button iconLeft style={{ width: 50 }}>
              <Icon name='settings' />
            </Button>

          </View>
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
}