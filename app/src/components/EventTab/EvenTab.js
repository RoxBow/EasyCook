import styles from './eventtab.style';
import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text } from 'react-native';
import EventItem from '../EventItem/EventItem';
import { compose } from 'recompose';
import { eventsSelector } from '../../redux/Event/selectors';
import { combineSelectors, formatDate } from '../../constants/helpers';
import { DATE } from '../../constants/global';

const compareDate = (d1, d2) => d1.getMonth() < d2.getMonth() || d1.getDate() < d2.getDate();

const getDayMonth = date => `${DATE.shortMonth[date.getMonth()].toUpperCase()} ${date.getDate()}`;

const EventTab = ({ events }) => (
  <ScrollView contentContainerStyle={styles.container}>
    {events.map((event, i) => {
      if (i === 0) {
        return (
          <View style={{ flexDirection: 'row' }} key={i}>
            <Text
              style={{
                alignSelf: 'center',
                width: '15%',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold'
              }}
            >
              {getDayMonth(new Date(event.date))}
            </Text>
            <EventItem {...event} style={{ flex: 1 }} />
          </View>
        );
      } else if (compareDate(new Date(events[i - 1].date), new Date(event.date))) {
        return (
          <View style={{ flexDirection: 'row' }} key={i}>
            <Text
              style={{
                alignSelf: 'center',
                width: '15%',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold'
              }}
            >
              {getDayMonth(new Date(event.date))}
            </Text>
            <EventItem {...event} style={{ flex: 1 }} />
          </View>
        );
      }

      return (
        <View style={{ flexDirection: 'row' }} key={i}>
          <Text
            style={{
              alignSelf: 'center',
              width: '15%',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold'
            }}
          />
          <EventItem {...event} style={{ flex: 1 }} />
        </View>
      );
    })}
  </ScrollView>
);

const mapStateToProps = combineSelectors(eventsSelector);

export default compose(connect(mapStateToProps))(EventTab);
