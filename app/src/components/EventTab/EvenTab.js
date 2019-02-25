import styles from './eventtab.style';
import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import EventItem from '../EventItem/EventItem';
import { compose } from 'recompose';
import { eventsSelector } from '../../redux/Event/selectors';
import { combineSelectors } from '../../constants/helpers';
import { DATE } from '../../constants/global';
import Text from '../Text/Text';

const compareDate = (d1, d2) => d1.getMonth() < d2.getMonth() && d1.getDate() < d2.getDate();
const equalDate = (d1, d2) => d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

const getDayMonth = date => `${DATE.shortMonth[date.getMonth()].toUpperCase()} ${date.getDate()}`;

const EventTab = ({ events }) => {
  const allResult = [];
  events.map(({ date, ...rest }, i) => {
    if (i === 0 || !equalDate(new Date(events[i - 1].date), new Date(date))) {
      allResult.push({
        date,
        events: [{ date, ...rest }]
      });
    } else {
      const index = allResult.findIndex(({ date: dateE }) =>
        equalDate(new Date(dateE), new Date(date))
      );
      allResult[index].events.push({ date, ...rest });
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {allResult.map(({ events }, i) =>
        events.map((event, i) => (
          <View style={{ flexDirection: 'row' }} key={i}>
            <Text
              style={{
                alignSelf: 'center',
                width: '15%',
                textAlign: 'center',
                fontSize: 16,
              }}
              bold
            >
              {i === 0 ? getDayMonth(new Date(event.date)) : ''}
            </Text>
            <EventItem {...event} style={{ flex: 1 }} />
          </View>
        ))
      )}
    </ScrollView>
  );
};

const mapStateToProps = combineSelectors(eventsSelector);

export default compose(connect(mapStateToProps))(EventTab);
