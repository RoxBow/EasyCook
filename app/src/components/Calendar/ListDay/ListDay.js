import styles from './ListDay.style';
import React from 'react';
import Day from '../Day/Day';
import { ScrollView, View } from 'react-native';
import Arrow from '../../Icons/IconArrow';

const ListDay = ({ listDays }) => (
  <View style={styles.wrapper}>
    <Arrow name="ios-arrow-back" size={20} />
    <View style={{ paddingHorizontal: 10 }}>
      <ScrollView horizontal>
        {listDays.map((day, i) => (
          <Day date={day} key={i} />
        ))}
      </ScrollView>
    </View>
    <Arrow name="ios-arrow-forward" size={20} />
  </View>
);

export default ListDay;
