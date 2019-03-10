import styles from './DateItem.style';
import React from 'react';
import Text from '../Text/Text';
import { DATE } from '../../constants/global';
import { View } from 'react-native';

const DateItem = ({ date }) => (
  <View style={styles.wrapper}>
    <Text style={styles.dateText}>
      {DATE.shortMonth[date.getMonth()].toUpperCase()}
    </Text>
    <Text style={styles.dateText} bold>
      {date.getDate()}
    </Text>
  </View>
);

export default DateItem;
