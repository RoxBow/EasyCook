import styles from './Tag.style';
import React from 'react';
import { View } from 'react-native';
import Text from '../Text/Text';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

const Tag = ({ style, tag, removeTag }) => (
  <View
    style={[styles.wrapper, style]}
  >
    <Text style={styles.textTag} medium>{tag}</Text>
    <ButtonIcon icon="cross" size={15} onPress={removeTag} />
  </View>
);

export default Tag;
