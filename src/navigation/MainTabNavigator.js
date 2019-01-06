import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon/TabBarIcon';
import DiscoverScreen from '../screens/Discover/DiscoverScreen';
import RecipesScreen from '../screens/RecipesScreen/RecipesScreen';
import CalendarScreen from '../screens/CalendarScreen/CalendarScreen';
import ListScreen from '../screens/ListScreen/ListScreen';
import AccountScreen from '../screens/AccountScreen/AccountScreen';

const tabTabDiscoverIcon = require('../assets/images/tabBar_discover.png');
const tabTabRecipesIcon = require('../assets/images/tabBar_recipes.png');
const tabTabCalendarIcon = require('../assets/images/tabBar_calendar.png');
const tabTabListIcon = require('../assets/images/tabBar_list.png');
const tabTabAccountIcon = require('../assets/images/tabBar_account.png');

const styleTabBarIcon = {
  flex: 1,
  width: 22,
  height: 22,
  resizeMode: 'contain',
  marginBottom: -3
};

const DiscoverStack = createStackNavigator({
  Discover: DiscoverScreen
});

DiscoverStack.navigationOptions = {
  tabBarLabel: 'Découvrir',
  tabBarIcon: ({ focused }) => <Image source={tabTabDiscoverIcon} style={styleTabBarIcon} />
};

const RecipesStack = createStackNavigator({
  Recipes: RecipesScreen
});

RecipesStack.navigationOptions = {
  tabBarLabel: 'Recettes',
  tabBarIcon: ({ focused }) => <Image source={tabTabRecipesIcon} style={styleTabBarIcon} />
};

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendrier',
  tabBarIcon: ({ focused }) => <Image source={tabTabCalendarIcon} style={styleTabBarIcon} />
};

const ListStack = createStackNavigator({
  List: ListScreen
});

ListStack.navigationOptions = {
  tabBarLabel: 'Liste',
  tabBarIcon: ({ focused }) => <Image source={tabTabListIcon} style={styleTabBarIcon} />
};

const AccountStack = createStackNavigator({
  Account: AccountScreen
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Compte',
  tabBarIcon: ({ focused }) => <Image source={tabTabAccountIcon} style={styleTabBarIcon} />
};


export default createBottomTabNavigator({
  DiscoverStack,
  RecipesStack,
  CalendarStack,
  ListStack,
  AccountStack
});
