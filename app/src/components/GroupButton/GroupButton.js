import React from 'react';
import { View } from 'react-native';
import Text from '../Text/Text';
import s from './GroupButton.style';

const GroupButton = ({ title, children }) => (
  <View style={s.wrapper}>
    <Text style={s.title}>{title}</Text>
    <View style={s.wrapperContent}>
      {children}
    </View>
  </View>
);

export default GroupButton;
