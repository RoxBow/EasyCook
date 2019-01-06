import styles from './discoverscreen.style';
import React from 'react';
import axios from 'axios';
import { Text, View } from 'react-native';
import { Tabs, Tab } from 'native-base';
import { tabBar } from '../../constants/Colors';
import Layout from '../../constants/Layout';
import GoodDeal from '../../components/GoodDeal/GoodDeal';
import Carousel from 'react-native-snap-carousel';
import MapView from 'react-native-maps';

const { tabBarSelected, textDefault, backgroundTab } = tabBar;
const { window } = Layout;

const styleTab = {
  textStyle: { color: textDefault },
  activeTextStyle: { backgroundColor: backgroundTab, color: tabBarSelected },
  tabStyle: { backgroundColor: backgroundTab },
  activeTabStyle: { backgroundColor: backgroundTab }
};

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
      .get('http://localhost:3333/goodDeals')
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
      <Tabs tabBarUnderlineStyle={{ backgroundColor: tabBarSelected }} page={1}>
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
              containerCustomStyle={{ position: 'absolute', bottom: 10 }}
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
