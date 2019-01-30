import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { pink } from '../constants/colors'
import { getTabBarIcon } from '../constants/helpers';
import RecipesScreen from '../screens/RecipesScreen/RecipesScreen';
import CalendarScreen from '../screens/CalendarScreen/CalendarScreen';

/* # STACK # */
import DiscoverStack from './DiscoverStack';
import ListShoppingListStack from './ListShoppingListStack';
import AccountStack from './AccountStack';

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

export default createBottomTabNavigator(
  {
    DiscoverStack,
    RecipesStack,
    CalendarStack,
    ListShoppingListStack,
    AccountStack
  },
  {
    initialRouteName: 'AccountStack',
    tabBarOptions: {
      activeTintColor: pink,
      inactiveTintColor: '#888'
    }
  }
);
