import styles from './accountscreen.style';
import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, TabHeading } from 'native-base';
import EventTab from '../../../components/EventTab/EvenTab';
import GoodDealTab from '../../../components/GoodDealTab/GoodDealTab';
import { styleTab, styleTabs } from '../../../constants/global';
import { combineSelectors } from '../../../constants/helpers';
import { userEventsSelector } from '../../../redux/Event/selectors';
import { USER } from '../../../redux/User/actions';
import { userGoodDealsSelector } from '../../../redux/GoodDeal/selectors';
import Empty from '../../../components/Empty/Empty';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';

const AccountScreen = ({ userEvents, userGoodDeals }) => (
  <Tabs {...styleTabs} locked={true}>
    <Tab
      heading={
        <TabHeading style={{ backgroundColor: '#fff' }}>
          <Icon icon="date" style={{ marginRight: 5 }} />
          <Text>Événements à venir</Text>
        </TabHeading>
      }
      {...styleTab}
    >
      {userEvents.length ? <EventTab events={userEvents} /> : <Empty name="événements" />}
    </Tab>
    <Tab
      heading={
        <TabHeading style={{ backgroundColor: '#fff' }}>
          <Icon icon="publication" style={{ marginRight: 5 }} />
          <Text>Mes bons plans</Text>
        </TabHeading>
      }
      {...styleTab}
    >
      {userGoodDeals.length ? (
        <GoodDealTab goodDeals={userGoodDeals} />
      ) : (
        <Empty name="bons plans" />
      )}
    </Tab>
  </Tabs>
);

const mapStateToProps = combineSelectors(
  s => userEventsSelector(s[USER].info._id)(s),
  s => userGoodDealsSelector(s[USER].info._id)(s)
);

export default connect(mapStateToProps)(AccountScreen);
