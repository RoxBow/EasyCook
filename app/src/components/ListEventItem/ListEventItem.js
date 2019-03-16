import styles from './ListEventItem.style';
import React from 'react';
import { View, FlatList } from 'react-native';
import EventItem from '../EventItem/EventItem';
import { equalDate } from '../../constants/helpers';
import DateItem from '../DateItem/DateItem';
import Empty from '../Empty/Empty';

class ListEventItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _keyExtractor = item => item._id;

  _onRefresh = () => {
    this.props.fetchEvents();
  }

  _renderEmptyList(){
    return <Empty text="Aucun événement de prévu ce mois-ci" />;
  }

  _renderItem({ item: event, index: i }) {
    // !equalDate(new Date(events[i - 1].date), new Date(event.date))
    if (i === 0) {
      return (
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <DateItem date={new Date(event.date)} />
          <EventItem {...event} style={{ width: '80%', alignSelf: 'flex-end' }} />
        </View>
      );
    }

    return <EventItem {...event} style={{ width: '80%', alignSelf: 'flex-end' }} />;
  }

  render() {
    const { events } = this.props;

    return (
      <FlatList
        contentContainerStyle={{ minHeight: '100%' }}
        data={events}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        onRefresh={this._onRefresh}
        refreshing={false}
        ListEmptyComponent={this._renderEmptyList}
      />
    );
  }
}

export default ListEventItem;
