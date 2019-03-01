import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { styleTabBarIcon } from '../constants/global';
import { pink } from '../constants/colors';
import { Header, Left, Body, Right, Title } from 'native-base';
import Icon from '../components/Icon/Icon';

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
        header: (
          <Header transparent>
            <Left>
              <CloseModal navigation={navigation} />
            </Left>
            <Body style={{ flex: 3 }}>
              <Title>Créer un événement</Title>
            </Body>
            <Right />
          </Header>
        ),
        title: 'Créer un événement',
        headerTintColor: pink,
        headerTitleStyle: { color: '#000' }
      })
    },
    CreateGoodDeal: {
      screen: CreateGoodDealScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header transparent>
            <Left>
              <CloseModal navigation={navigation} />
            </Left>
            <Body style={{ flex: 3 }}>
              <Title>Créer un bon plan</Title>
            </Body>
            <Right />
          </Header>
        ),
        title: 'Créer un bon plan',
        headerTintColor: pink,
        headerTitleStyle: { color: '#000' }
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
