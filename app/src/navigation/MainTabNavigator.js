import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { pink } from '../constants/colors'
import { styleTabBarIcon } from '../constants/global';
import CalendarScreen from '../screens/CalendarScreen/CalendarScreen';
import Icon from '../components/Icon/Icon';

/* # STACK # */
import RecipesStack from './RecipeStack';
import DiscoverStack from './DiscoverStack';
import ListShoppingListStack from './ListShoppingListStack';
import AccountStack from './AccountStack';

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendrier',
  tabBarIcon: ({ focused }) => (
    focused ? 
      <Icon icon="agenda_tab--focus" {...styleTabBarIcon} /> : 
      <Icon icon="agenda_tab" {...styleTabBarIcon} />
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
    initialRouteName: 'RecipesStack',
    tabBarOptions: {
      activeTintColor: pink,
      inactiveTintColor: '#888',
      labelStyle: { 
        fontFamily: 'Quicksand'
      }
    }
  }
);
