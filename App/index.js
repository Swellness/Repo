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
});

export default createAppContainer(AppNavigator);