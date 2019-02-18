import styles from './discoverscreen.style';
import React from 'react';
import { Tabs, Tab } from 'native-base';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Container, Header, Left, Right, Body } from 'native-base';
import { Item, Input } from 'native-base';
import Layout from '../../../constants/layout';
import { styleTab, styleTabs } from '../../../constants/global';
import { pink } from '../../../constants/colors';
import { fetchEvents } from '../../../redux/Event/actions';
import { fetchGoodDeals } from '../../../redux/GoodDeal/actions';
import { connect } from 'react-redux';
import EventTab from '../../../components/EventTab/EvenTab';
import GoodDealTab from '../../../components/GoodDealTab/GoodDealTab';
import Text from '../../../components/Text/Text';

const { window } = Layout;

class DiscoverScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "event"
    };

    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvents();
    this.props.fetchGoodDeals();
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
    });
  }

  _renderItem({ item, index }) {
    return <GoodDeal key={index} {...item} />;
  }

  getWidthItemCarousel() {
    return window.width * 0.7;
  }

  setActiveTab(){
    const { activeTab } = this.state;

    const currentTab = activeTab === "event" ? "goodDeal" : "event";

    this.setState({
      activeTab: currentTab,
    })
  }

  redirectTo(){
    const { activeTab } = this.state;

    if(activeTab === "event"){
      this.props.navigation.navigate("CreateEvent")
    } else {
      this.props.navigation.navigate("CreateGoodDeal")
    }
  }

  render() {
    return (
      <Container>
        <Header transparent style={{ height: 80 }}>
          <Left>
            <Text>À</Text>
            <Item>
              <Input
                placeholder="location"
                style={{ paddingHorizontal: 5, fontWeight: 'bold', fontSize: 20 }}
              />
              <FontAwesome
                name="location-arrow"
                size={20}
                color={pink}
                style={{ marginHorizontal: 5 }}
              />
            </Item>
          </Left>
          <Body />
          <Right>
            <Feather
              name="star"
              size={30}
              color="#000"
              style={{ marginHorizontal: 10 }}
              onPress={() => {}}
            />
            <Feather
              name="plus"
              size={30}
              color={pink}
              style={{ marginHorizontal: 10 }}
              onPress={() => this.redirectTo()}
            />
          </Right>
        </Header>
        <Tabs {...styleTabs} locked={true} onChangeTab={() => this.setActiveTab()}>
          <Tab heading="Événements culinaires" {...styleTab}>
            <EventTab />
          </Tab>
          <Tab heading="Bons plans" {...styleTab}>
            <GoodDealTab />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchGoodDeals: () => dispatch(fetchGoodDeals())
})

export default connect(null, mapDispatchToProps)(DiscoverScreen);
