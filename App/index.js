import React from "react";
import { Button } from "react-native";

import MainHub from "./screens/MainHub";
import PostSession from "./screens/PostSession";
import Activities from "./screens/Activities";
import DailyHistory from "./screens/DailyHistory";
import Leaderboard from "./screens/Leaderboard";
import Profile from "./screens/Profile";
import Rewards from "./screens/Rewards";
import SessionHistory from "./screens/SessionHistory";

import ActiveSession from "./screens/ActiveSession";
import Break from "./screens/Break";
import CreateUser from "./screens/CreateUser";
import ForgotPassUser from "./screens/ForgotPassUser";
import Login from "./screens/Login";
import OrgAdminSuiteSettings from "./screens/OrgAdminSuiteSettings";
import SessionCreation from "./screens/SessionCreation";
import Settings from "./screens/Settings";
import SideBar from "./screens/SideBar";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"

const AppNavigator = createStackNavigator({
  MainHub:
  {
    screen: MainHub,
    navigationOptions: {
      headerTitle: "Main Menu",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      }
    }
  },
  PostSession:
  {
    screen: PostSession,
    navigationOptions: {
      headerTitle: "",
      headerBackTitle: "",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      },
      headerRight: () =>
        <Button
          onPress={() => alert('TBWO')}
          title="Info"
          color="#000000"
        />,
    }
  },
  SessionHistory:
  {
    screen: SessionHistory,
    navigationOptions: {
      headerTitle: "Your Stats",
      headerBackTitle: "",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      },
      headerRight: () =>
        <Button
          onPress={() => alert('TBWO')}
          title="Info"
          color="#000000"
        />,
    }
  },
  DailyHistory:
  {
    screen: DailyHistory,
    navigationOptions: {
      headerTitle: "Stats",
      headerBackTitle: "",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      },
      headerRight: () =>
        <Button
          onPress={() => alert('TBWO')}
          title="Info"
          color="#000000"
        />,
    }
  },
  Rewards:
  {
    screen: Rewards,
    navigationOptions: {
      headerTitle: "Redeem",
      headerBackTitle: "",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      },
      headerRight: () =>
        <Button
          onPress={() => alert('TBWO')}
          title="Info"
          color="#000000"
        />,
    }
  },
  Leaderboard:
  {
    screen: Leaderboard,
    navigationOptions: {
      headerTitle: "Leaderboard",
      headerBackTitle: "",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      },
      headerRight: () =>
        <Button
          onPress={() => alert('TBWO')}
          title="Info"
          color="#000000"
        />,
    }
  },
  Activities:
  {
    screen: Activities,
    navigationOptions: {
      headerTitle: "Activites",
      headerBackTitle: "",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      },
      headerRight: () =>
        <Button
          onPress={() => alert('TBWO')}
          title="Info"
          color="#000000"
        />,
    }
  },
  Profile:
  {
    screen: Profile,
    navigationOptions: {
      headerTitle: "Profile",
      headerBackTitle: "",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      },
      headerRight: () =>
        <Button
          onPress={() => alert('TBWO')}
          title="Info"
          color="#000000"
        />,
    }
  },
  // Here are Levi's edits and additions to the screens
  ActiveSession:
  {
    screen: ActiveSession,
    navigationOptions: {
      headerTitle: "Active Session",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      }
    }
  },
  Break:
  {
    screen: Break,
    navigationOptions: {
      headerTitle: "Break",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      }
    }
  },
  CreateUser:
  {
    screen: CreateUser,
    navigationOptions: {
      headerTitle: "Create User",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      }
    }
  },
  ForgotPassUser:
  {
    screen: ForgotPassUser,
    navigationOptions: {
      headerTitle: "Forgot User Password",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      }
    }
  },
  Login:
  {
    screen: Login,
    navigationOptions: {
      headerTitle: "Login",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      }
    }
  },
  OrgAdminSuiteSettings:
  {
    screen: OrgAdminSuiteSettings,
    navigationOptions: {
      headerTitle: "Admin Settings",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      }
    }
  },
  SessionCreation:
  {
    screen: SessionCreation,
    navigationOptions: {
      headerTitle: "Session Creation",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      }
    }
  },
  Settings:
  {
    screen: Settings,
    navigationOptions: {
      headerTitle: "Settings",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      }
    }
  },
  SideBar:
  {
    screen: SideBar,
    navigationOptions: {
      headerTitle: "Sidebar",
      headerStyle:
      {
        backgroundColor: "#c2c5cc",
      }
    }
  },
});

export default createAppContainer(AppNavigator);