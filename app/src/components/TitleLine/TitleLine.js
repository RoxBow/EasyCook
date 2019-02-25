import styles from './TitleLine.style';
import React from 'react';
import { View } from 'react-native';
import Text from '../Text/Text';

const TitleLine = ({ title, styleWrapper, styleTitle }) => (
  <View style={[styles.wrapper, styleWrapper]}>
    <View style={styles.line} />
    <Text style={[styles.title, styleTitle]}>{title}</Text>
    <View style={styles.line} />
  </View>
);

export default TitleLine;
