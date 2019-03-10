import styles from './empty.style';
import React from 'react';
import { View } from 'react-native';
import Text from '../Text/Text';

const Empty = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default Empty;
