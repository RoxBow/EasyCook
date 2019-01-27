import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { greenApp } from '../constants/colors';
import { getTabBarIcon } from '../constants/helpers';
import RecipesScreen from '../screens/RecipesScreen/RecipesScreen';
import CalendarScreen from '../screens/CalendarScreen/CalendarScreen';

/* # STACK # */
import DiscoverStack from './DiscoverStack';
import ListShoppingListStack from './ListShoppingListStack';

import AccountScreen from '../screens/AccountScreen/AccountScreen';

export const styleTabBarIcon = {
  flex: 1,
  width: 22,
  height: 22,
  resizeMode: 'contain',
  marginBottom: -3
};


const RecipesStack = createStackNavigator({
  Recipes: RecipesScreen
});

RecipesStack.navigationOptions = {
  tabBarLabel: 'Recettes',
  tabBarIcon: ({ focused }) => (
    <Image source={getTabBarIcon('recipes', focused)} style={styleTabBarIcon} />
  )
};

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendrier',
  tabBarIcon: ({ focused }) => (
    <Image source={getTabBarIcon('calendar', focused)} style={styleTabBarIcon} />
  )
};

const AccountStack = createStackNavigator({
  Account: AccountScreen
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Compte',
  tabBarIcon: ({ focused }) => (
    <Image source={getTabBarIcon('account', focused)} style={styleTabBarIcon} />
  )
};

export default createBottomTabNavigator(
  {
    DiscoverStack,
    RecipesStack,
    CalendarStack,
    ListShoppingListStack,
    AccountStack
  },
  {
    initialRouteName: 'DiscoverStack',
    tabBarOptions: {
      activeTintColor: greenApp,
      inactiveTintColor: '#888'
    }
  }
);
