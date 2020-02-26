import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Header,
  Container,
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
  
});

export default class PostSession extends React.Component {
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
            <Title>Header</Title>
          </Body>

          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
          
        </Header>






        <View>
          <Text styles={{ fontSize: 48 }}>Good Job Today!!</Text>
          <Text styles={{ fontSize: 30 }}>Daily Challenge:</Text>
          <Text styles={{ fontSize: 30 }}>4/4 Activities completed</Text>
        </View>

        <View style={{  }}>
          <Text>Hours worked: 8</Text>
          <Text>Excercsises completed: 428</Text>
          <Text>Points Earned 428</Text>
        </View>
        
        <View>
          <Text styles={{ fontSize: 24 }}>Good Job Today!!</Text>
          <Text styles={{ fontSize: 24 }}>Daily Challenge:</Text>
          <Text styles={{ fontSize: 24 }}>4/4 Activities completed</Text>
        </View>





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