import styles from './DiscoverScreen.style';
import React from 'react';
import { Tabs, Tab } from 'native-base';
import { styleTab, styleTabs } from '../../../constants/global';
import { fetchEvents } from '../../../redux/Event/actions';
import { fetchGoodDeals } from '../../../redux/GoodDeal/actions';
import EventTab from '../../../components/EventTab/EvenTabContainer';
import GoodDealTab from '../../../components/GoodDealTab/GoodDealTab';
import Text from '../../../components/Text/Text';
import { Location, Permissions } from 'expo';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from '../../../components/Icon/Icon';
import ButtonIcon from '../../../components/ButtonIcon/ButtonIcon';

class DiscoverScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'event'
    };

    this.setActiveTab = this.setActiveTab.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
  }

  componentDidMount() {
    this._getLocationAsync();
    this.props.fetchEvents();
    this.props.fetchGoodDeals();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });

      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const address = await Location.reverseGeocodeAsync({ latitude, longitude });

    this.setState({
      address
    });
  };

  setActiveTab() {
    const { activeTab } = this.state;

    const currentTab = activeTab === 'event' ? 'goodDeal' : 'event';

    this.setState({
      activeTab: currentTab
    });
  }

  redirectTo() {
    if (this.state.activeTab === 'event') {
      this.props.navigation.navigate('CreateEvent');
    } else {
      this.props.navigation.navigate('CreateGoodDeal');
    }
  }

  render() {
    const { address } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingVertical: 10,
            marginTop: 30,
            marginHorizontal: 10,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={{ fontSize: 18 }} medium>
              À
            </Text>
            <View style={styles.wrapperGeolocation}>
              <TextInput value={address ? address[0].city : 'ici'} style={styles.textGeolocation} />
              <Icon icon="geolocation" size={14} />
            </View>
          </View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <ButtonIcon icon="favorite" size={28} onPress={() => {}} />
            <ButtonIcon icon="plus" size={25} onPress={() => this.redirectTo()} />
          </View>
        </View>
        <Tabs {...styleTabs} locked={true} onChangeTab={() => this.setActiveTab()}>
          <Tab heading="Événements culinaires" {...styleTab}>
            <EventTab />
          </Tab>
          <Tab heading="Bons plans" {...styleTab}>
            <GoodDealTab />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchGoodDeals: () => dispatch(fetchGoodDeals())
});

export default connect(
  null,
  mapDispatchToProps
)(DiscoverScreen);
