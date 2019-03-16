import styles from './RecipeRate.style';
import React from 'react';
import IconStar from '../Icons/IconStar';
import Text from '../Text/Text';
import { View } from 'react-native';

const RecipeRate = ({ rate, style }) => (
  <View style={[styles.wrapper, style]}>
    <IconStar isFill={true} size={13} style={styles.icon} />
    <Text style={styles.text}>{rate}</Text>
  </View>
);

export default RecipeRate;
