import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { pink } from '../constants/colors'
import { styleTabBarIcon } from '../constants/global';
import RecipesScreen from '../screens/RecipesScreen/RecipesScreen';
import CalendarScreen from '../screens/CalendarScreen/CalendarScreen';
import Icon from '../components/Icon/Icon';

/* # STACK # */
import DiscoverStack from './DiscoverStack';
import ListShoppingListStack from './ListShoppingListStack';
import AccountStack from './AccountStack';

const RecipesStack = createStackNavigator({
  Recipes: RecipesScreen
});

RecipesStack.navigationOptions = {
  tabBarLabel: 'Recettes',
  tabBarIcon: ({ focused }) => (
    focused ? 
      <Icon icon="recipe_tabBar--focus" {...styleTabBarIcon} /> : 
      <Icon icon="recipe_tabBar" {...styleTabBarIcon} />
  )
};

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendrier',
  tabBarIcon: ({ focused }) => (
    focused ? 
      <Icon icon="agenda_tabBar--focus" {...styleTabBarIcon} /> : 
      <Icon icon="agenda_tabBar" {...styleTabBarIcon} />
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
      activeTintColor: pink,
      inactiveTintColor: '#888',
      labelStyle: { 
        fontFamily: 'Quicksand'
      }
    }
  }
);
