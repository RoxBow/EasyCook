import styles from './accountscreen.style';
import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'native-base';
import { tabBar } from '../../../constants/colors';
import EventTab from '../../../components/EventTab/EvenTab';
import { styleTab } from '../../../constants/global';
import { userEventsSelector } from '../../../redux/Event/selectors';

const { tabBarSelected } = tabBar;

class AccountScreen extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { events } = this.props;

    return (
      <Tabs tabBarUnderlineStyle={{ backgroundColor: tabBarSelected }} locked={true}>
        <Tab heading="Événements à venir" {...styleTab}>
          {events && <EventTab events={events} />}
        </Tab>
        <Tab heading="Mes publications" {...styleTab} />
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({
  events: userEventsSelector(state.event.events, state.user.info._id)
});

export default connect(mapStateToProps)(AccountScreen);
