import styles from './ListEventItem.style';
import React from 'react';
import { ScrollView, View } from 'react-native';
import EventItem from '../EventItem/EventItem';
import { equalDate } from '../../constants/helpers';
import DateItem from '../DateItem/DateItem';

const ListEventItem = ({ events }) => (
  <ScrollView contentContainerStyle={styles.container}>
    {events.map((event, i) =>
      i === 0 || !equalDate(new Date(events[i - 1].date), new Date(event.date)) ? (
        <View style={{ flexDirection: 'row', flex: 1 }} key={i}>
          <DateItem date={new Date(event.date)} />
          <EventItem {...event} style={{ width: '80%', alignSelf: 'flex-end' }} />
        </View>
      ) : (
        <EventItem {...event} style={{ width: '80%', alignSelf: 'flex-end' }} key={i} />
      )
    )}
  </ScrollView>
);

export default ListEventItem;
