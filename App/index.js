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
      headerShown: false,
      headerTitle: "Main Menu",
    }
  },
  PostSession:
  {
    screen: PostSession,
    navigationOptions: {
      headerShown: false,
      headerTitle: "",
    }
  },
  SessionHistory:
  {
    screen: SessionHistory,
    navigationOptions: {
      headerShown: false,
    }
  },
  DailyHistory:
  {
    screen: DailyHistory,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Stats",
    }
  },
  Rewards:
  {
    screen: Rewards,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Redeem",
    }
  },
  Leaderboard:
  {
    screen: Leaderboard,
    navigationOptions: {
      headerShown: false,
    }
  },
  Activities:
  {
    screen: Activities,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Activites",
    }
  },
  Profile:
  {
    screen: Profile,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Profile",
    }
  },
  // Here are Levi's edits and additions to the screens
  ActiveSession:
  {
    screen: ActiveSession,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Active Session",
    }
  },
  Break:
  {
    screen: Break,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Break",
    }
  },
  CreateUser:
  {
    screen: CreateUser,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Create User",
    }
  },
  ForgotPassUser:
  {
    screen: ForgotPassUser,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Forgot User Password",
    }
  },
  Login:
  {
    screen: Login,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Login",
    }
  },
  OrgAdminSuiteSettings:
  {
    screen: OrgAdminSuiteSettings,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Admin Settings",
    }
  },
  SessionCreation:
  {
    screen: SessionCreation,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Session Creation",
    }
  },
  Settings:
  {
    screen: Settings,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Settings",
    }
  },
  SideBar:
  {
    screen: SideBar,
    navigationOptions: {
      headerShown: false,
      headerTitle: "Sidebar",
    }
  },
});

export default createAppContainer(AppNavigator);