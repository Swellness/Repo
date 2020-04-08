import React, {useState} from "react";
import {View, StyleSheet,Text,SafeAreaView,StatusBar} from "react-native";
import {Container,Header,Content,Footer,FooterTab,Button,Icon,Left,Body,Right,Title,TouchableOpacity} from "native-base";
import ReactNativeSettingsPage, { SectionRow, NavigateRow,CheckRow, SliderRow, SwitchRow} from 'react-native-settings-page';
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

export default class Start extends React.Component {

  state = {
		check: false,
		switch: false,
		value: 40
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
						iconName='your-icon-name'
						_color='#000'
						_min={0}
						_max={100}
						_value={this.state.value}
						_onValueChange={value => { this.setState({ value }) }} />
				</SectionRow>

					<NavigateRow
						text='Session Length'
						iconName='your-icon-name'
						onPressCallback={this._navigateToScreen} />

					<SwitchRow 
						text='Check Box' 
						iconName='your-icon-name'
						_value={this.state.switch}
						_onValueChange={() => { this.setState({ switch: !this.state.switch }) }} />

					<CheckRow 
						text='button'
						iconName='your-icon-name'
						_color='#000'
						_value={this.state.check}
						_onValueChange={() => { this.setState({ check: !this.state.check }) }} />	

			</ReactNativeSettingsPage>

        




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
      </SafeAreaView>
    );
  }
}
