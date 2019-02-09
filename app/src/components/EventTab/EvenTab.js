import styles from './eventtab.style';
import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import EventItem from '../EventItem/EventItem';

const EventTab = ({ events }) => (
  <ScrollView contentContainerStyle={styles.container}>
    {events.map((event, i) => (
      <EventItem key={i} {...event} />
    ))}
  </ScrollView>
);

const mapStateToProps = (state, { events }) => ({
  events: events || state.event.events
});

export default connect(mapStateToProps)(EventTab);
