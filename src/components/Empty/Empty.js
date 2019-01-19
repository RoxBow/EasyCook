import styles from './empty.style';
import React from 'react';
import { View, Text } from 'react-native';

const Empty = ({ name }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Vous n'avez actuellement aucun {name}</Text>
  </View>
);

export default Empty;
