//import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, ScrollView, Text, View, ActivityIndicator, Image, StatusBar } from 'react-native';
import { createDrawerNavigator, DrawerItem } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import * as Font from 'expo-font'

//Stack Screens
import Logout from "./screens/Logout";
import PostSession from "./screens/PostSession";
import Activities from "./screens/Activities";
import DailyHistory from "./screens/DailyHistory";
import Profile from "./screens/Profile";
import SessionHistory from "./screens/SessionHistory";
import ActiveSession from "./screens/ActiveSession";
import Break from "./screens/Break";
import CreateUser from "./screens/CreateUser";
import ForgotPassUser from "./screens/ForgotPassUser";
import Login from "./screens/Login";
import SessionCreation from "./screens/SessionCreation";
import Settings from "./screens/Settings";
import OrgAdminSuiteSettings from "./screens/OrgAdminSuiteSettings";
import Rewards from "./screens/Rewards";
import Leaderboard from "./screens/Leaderboard";

console.disableYellowBox = true;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
    this.state = { loading: true };
  }

  UNSAFE_componentWillMount = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });

  }

  render() {

    const customDrawerComponent = props => (
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignContent: 'center'
          }}
        >
          <Image
            style={{ width: 150, height: 150 }}
            source={require('./Pictures/swellness_logo_outline.png')}
          />
        </View>

        <View>
          <Text style={{ textAlign: 'center', marginTop: 10 }}>
            MENU
          </Text>
          <DrawerItem {...props} />
        </View>
      </ScrollView>
    );

    // const LoginStack = createStackNavigator({

    // }, {
    //   initialRouteName: 'login',
    //   headerMode: 'none'
    // });

    const SessionStack = createStackNavigator({
      SessionCreation: { screen: SessionCreation },
      ActiveSession: { screen: ActiveSession },
      Break: { screen: Break },
      PostSession: { screen: PostSession }
    }, {
      initialRouteName: 'SessionCreation',
      headerMode: 'none'
    });

    const MainNavigation = createDrawerNavigator({
      Rewards: { screen: Rewards },
      Leaderboard: { screen: Leaderboard },
      Profile: { screen: Profile },
      Settings: { screen: Settings },
      Activities: { screen: Activities, navigationOptions: { drawerLabel: () => null } },
      DailyHistory: { screen: DailyHistory, navigationOptions: { drawerLabel: () => null } },
      Login: { screen: Login, navigationOptions: { drawerLabel: () => null } },
      CreateUser: { screen: CreateUser, navigationOptions: { drawerLabel: () => null } },
      Logout: { screen: Logout },
      ForgotPassUser: { screen: ForgotPassUser, navigationOptions: { drawerLabel: () => null } },
      SessionStack: { screen: SessionStack, navigationOptions: { drawerLabel: () => null } },
      SessionHistory: { screen: SessionHistory, navigationOptions: { drawerLabel: () => null } },
    }, {
      initialRouteName: 'Login',
      drawerPosition: "right"
    });

    const AppContainer = createAppContainer(MainNavigation);

    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <AppContainer style={styles.container} />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 25
    marginTop: Platform.OS === 'android' ? 24 : 0
  }
});