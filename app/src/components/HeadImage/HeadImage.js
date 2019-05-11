import React from 'react';
import { View, ImageBackground } from 'react-native';
import ArrowBack from '../ArrowBack/ArrowBack';
import { LinearGradient } from 'expo';

const HeadImage = ({ uri, navigation }) => (
  <View style={{ height: 300 }}>
    <ImageBackground source={{ uri }} style={{ width: '100%', height: '100%', paddingTop: 15 }}>
    <LinearGradient
      colors={['rgba(0,0,0,.3)', 'transparent']}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
      }}
    />
      <ArrowBack navigation={navigation} style={{ alignSelf: 'flex-start' }} isWhite/>
    </ImageBackground>
  </View>
);

export default HeadImage;
