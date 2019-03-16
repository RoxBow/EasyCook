import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { styleTabBarIcon } from '../constants/global';
import Icon from '../components/Icon/Icon';

import DiscoverScreen from '../views/Discover/DiscoverScreen/DiscoverScreen';
import EventItemScreen from '../views/Discover/EventItemScreen/EventItemScreen';
import GoodDealItemScreen from '../views/Discover/GoodDealItemScreen/GoodDealItemScreen';
import CreateEventScreen from '../views/Discover/CreateEventScreen/CreateEventScreen';
import CreateGoodDealScreen from '../views/Discover/CreateGoodDealScreen/CreateGoodDealScreen';
import ButtonIcon from '../components/ButtonIcon/ButtonIcon';
import TitleHeader from '../components/Header/TitleHeader/TitleHeader';

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
        headerLeft: null,
        headerRight: <ButtonIcon onPress={() => navigation.goBack()} icon="cross" size={30} />,
        headerTitle: <TitleHeader title="Créer un événement" />,
        headerStyle: { borderBottomWidth: 0 }
      })
    },
    CreateGoodDeal: {
      screen: CreateGoodDealScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
        headerRight: <ButtonIcon onPress={() => navigation.goBack()} icon="cross" size={30} />,
        headerTitle: <TitleHeader title="Créer un bon plan" />,
        headerStyle: { borderBottomWidth: 0 }
      })
    }
  },
  {
    mode: 'modal'
  }
);

RootStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Découvrir',
  tabBarVisible: navigation.state.routes[0].index === 0 && navigation.state.index === 0,
  tabBarIcon: ({ focused }) => (
    <Icon icon={focused ? 'discover_tab--focus' : 'discover_tab'} {...styleTabBarIcon} />
  ),
  tabBarOnPress: ({ navigation }) => {
    navigation.navigate('Discover');
  }
});

export default RootStack;
