import styles from './eventtab.style';
import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import EventItem from '../EventItem/EventItem';

class EventTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { events } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {events.map((event, i) => (
          <EventItem key={i} {...event} />
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps= state => ({
  events: state.event.events
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventTab);
