import styles from './gooddeal.style';
import React from 'react';
import { View, Text } from 'react-native';

const GoodDeal = ({ storeName, description, like }) => (
  <View style={styles.wrapper}>
    <View style={styles.header}>
      <Text style={styles.title}>{storeName}</Text>
      <Text style={styles.time}>Y aller</Text>
    </View>
    <Text style={styles.description}>{description}</Text>
    <View style={styles.footer}>
      <Text>{like}</Text>
      <Text>Fav</Text>
    </View>
  </View>
);

export default GoodDeal;
