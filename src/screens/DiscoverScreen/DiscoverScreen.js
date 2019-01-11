import styles from './discoverscreen.style';
import React from 'react';
import axios from 'axios';
import { Tabs, Tab } from 'native-base';
import { tabBar } from '../../constants/colors';
import Layout from '../../constants/layout';
import { serverUrl, styleTab } from '../../constants/global';
import GoodDeal from '../../components/GoodDeal/GoodDeal';
import Carousel from 'react-native-snap-carousel';
import MapView from 'react-native-maps';

const { tabBarSelected } = tabBar;
const { window } = Layout;

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

class DiscoverScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    axios
      .get(`${serverUrl}/goodDeals`)
      .then(({ data }) => {
        this.setState({
          goodDeals: data
        });
      })
      .catch(err => {
        console.log(err);
      });

      return getCurrentLocation().then(position => {
        if (position) {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            },
          });
        }
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
      <Tabs tabBarUnderlineStyle={{ backgroundColor: tabBarSelected }} page={1} locked={true}>
        <Tab heading="Événements culinaires" {...styleTab} />
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
              containerCustomStyle={{ position: 'absolute', bottom: 10, zIndex: 999 }}
              itemWidth={this.getWidthItemCarousel()}
              sliderWidth={window.width}
              data={goodDeals}
              renderItem={this._renderItem}
            />
          )}
        </Tab>
      </Tabs>
    );
  }
}

export default DiscoverScreen;
