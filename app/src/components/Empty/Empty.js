import styles from './empty.style';
import React from 'react';
import { View } from 'react-native';
import Text from '../Text/Text';

const Empty = ({ name }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Vous n'avez actuellement aucun {name}</Text>
  </View>
);

export default Empty;
