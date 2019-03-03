import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { styleTabBarIcon } from '../constants/global';
import { pink } from '../constants/colors';
import { Header, Left, Body, Right, Title } from 'native-base';
import Icon from '../components/Icon/Icon';
import Text from '../components/Text/Text';

import DiscoverScreen from '../screens/Discover/DiscoverScreen/DiscoverScreen';
import EventItemScreen from '../screens/Discover/EventItemScreen/EventItemScreen';
import GoodDealItemScreen from '../screens/Discover/GoodDealItemScreen/GoodDealItemScreen';
import CreateEventScreen from '../screens/Discover/CreateEventScreen/CreateEventScreen';
import CreateGoodDealScreen from '../screens/Discover/CreateGoodDealScreen/CreateGoodDealScreen';
import CloseModal from '../components/CloseModal/CloseModal';

const DiscoverStack = createStackNavigator(
  {
    Discover: {
      screen: DiscoverScreen,
      navigationOptions: ({ navigation }) => ({})
    },
    EventItem: {
      screen: EventItemScreen,
      navigationOptions: ({ navigation }) => ({})
    },
    GoodDealItem: {
      screen: GoodDealItemScreen,
      navigationOptions: ({ navigation }) => ({})
    }
  },
  {
    headerMode: 'none'
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: DiscoverStack,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    CreateEvent: {
      screen: CreateEventScreen,
      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <CloseModal navigation={navigation} />
        ),
        headerLeft: null,
        title: 'Créer un événement',
        headerStyle: { borderBottomWidth: 0 },
        headerTitleStyle: { fontFamily: 'Quicksand--bold' }
      })
    },
    CreateGoodDeal: {
      screen: CreateGoodDealScreen,
      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <CloseModal navigation={navigation} />
        ),
        headerLeft: null,
        title: 'Créer un bon plan',
        headerStyle: { borderBottomWidth: 0 },
        headerTitleStyle: { fontFamily: 'Quicksand--bold' }
      })
    }
  },
  {
    mode: 'modal'
  }
);

RootStack.navigationOptions = {
  tabBarLabel: 'Découvrir',
  tabBarIcon: ({ focused }) => (
    focused ? 
      <Icon icon="discover_tab--focus" {...styleTabBarIcon} /> : 
      <Icon icon="discover_tab" {...styleTabBarIcon} />
  ),
  tabBarOnPress: ({ navigation }) => {
    navigation.navigate('Discover');
  }
};

export default RootStack;
