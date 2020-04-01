import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import RewardDetails from './RewardDetail';

const Rewards = () => {

  return (
  <View>
      <Text></Text>
      <RewardDetails  title="Reward #1" 
        imageSource={require('../Pictures/foodReward.png')}
        score={200}
        />

        <RewardDetails title="Reward #2"
        imageSource={require('../Pictures/giftReward.png')}
        score={3000}
        />

        <RewardDetails title="Reward #3"
        imageSource={require('../Pictures/ticketsReward.png')}
        score={850}
        />
  </View>

);
};

const styles = StyleSheet.create({
    input: {
        margin: 15,
        borderColor: 'black',
        borderWidth: 1
    }
});

export default Rewards;