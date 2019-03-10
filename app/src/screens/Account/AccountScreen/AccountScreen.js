import styles from './accountscreen.style';
import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'native-base';
import EventTab from '../../../components/EventTab/EvenTab';
import GoodDealTab from '../../../components/GoodDealTab/GoodDealTab';
import { styleTab, styleTabs } from '../../../constants/global';
import { userEventsSelector } from '../../../redux/Event/selectors';
import { userGoodDealsSelector } from '../../../redux/GoodDeal/selectors';
import Empty from '../../../components/Empty/Empty';

class AccountScreen extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { events, goodDeals } = this.props;

    return (
      <Tabs {...styleTabs} locked={true}>
        <Tab heading="Événements à venir" {...styleTab}>
          {events.length ? <EventTab events={events} /> : <Empty name="événements" />}
        </Tab>
        <Tab heading="Mes bons plans" {...styleTab}>
          {goodDeals.length ? <GoodDealTab goodDeals={goodDeals} /> : <Empty name="bons plans" />}
        </Tab>
      </Tabs>
    );
  }
}

const mapStateToProps = state => ({
  events: userEventsSelector(state.event.events, state.user.info._id),
  goodDeals: userGoodDealsSelector(state.goodDeal.goodDeals, state.user.info._id)
});

export default connect(mapStateToProps)(AccountScreen);
