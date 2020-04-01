import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';

const RewardDetails = ({imageSource,title,score,}) => {
    return <View style={styles.rewardPieces}>
        <Text></Text>
        <Image source={imageSource}
        style={styles.image}/>
        <Text></Text>
        <Text>{title}</Text>
        <TouchableOpacity>
        <Text>Redeem for - {score} Points!</Text>
        </TouchableOpacity>
    </View>
};

const styles = StyleSheet.create({
    image: {
        //flex: 1,
        width: 70,
        height: 70,
       // resizeMode: 'contain'
    },
    rewardPieces:{
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
});

export default RewardDetails;