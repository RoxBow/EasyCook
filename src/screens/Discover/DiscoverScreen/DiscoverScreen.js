import styles from './discoverscreen.style';
import React from 'react';
import { Tabs, Tab, Text } from 'native-base';
import { Feather, FontAwesome } from '@expo/vector-icons';
import GoodDeal from '../../../components/GoodDeal/GoodDeal';
import Carousel from 'react-native-snap-carousel';
import MapView from 'react-native-maps';
import { Container, Header, Left, Right, Body } from 'native-base';
import { Item, Input } from 'native-base';
import Layout from '../../../constants/layout';
import { styleTab } from '../../../constants/global';
import { tabBar, pink } from '../../../constants/colors';
import { fetchEvents } from '../../../redux/Event/actions';
import { connect } from 'react-redux';
import EventTab from '../../../components/EventTab/EvenTab';

const { tabBarSelected } = tabBar;
const { window } = Layout;

class DiscoverScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getCurrentLocation = this.getCurrentLocation.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvents();
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

  render() {
    const { goodDeals, region } = this.state;

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
              onPress={() => this.props.navigation.navigate('CreateEvent')}
            />
          </Right>
        </Header>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: tabBarSelected }} locked={true}>
          <Tab heading="Événements culinaires" {...styleTab}>
            <EventTab />
          </Tab>
          <Tab heading="Bons plans" {...styleTab}>
            <MapView
              style={styles.map}
              initialRegion={region}
              followsUserLocation={true}
              showsUserLocation={true}
              maxZoomLevel={20}
              rotateEnabled={false}
            />
            {goodDeals && (
              <Carousel
                loop={true}
                containerCustomStyle={styles.carousel}
                itemWidth={this.getWidthItemCarousel()}
                sliderWidth={window.width}
                data={goodDeals}
                renderItem={this._renderItem}
              />
            )}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents())
})

export default connect(null, mapDispatchToProps)(DiscoverScreen);
