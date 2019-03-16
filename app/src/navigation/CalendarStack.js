import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { styleTabBarIcon } from '../constants/global';
import Icon from '../components/Icon/Icon';

import CalendarScreen from '../views/Calendar/CalendarScreen/CalendarScreen';

const CalendarStack = createStackNavigator({
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: ({ navigation }) => ({})
  }
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: CalendarStack,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    mode: 'modal'
  }
);

RootStack.navigationOptions = {
  tabBarLabel: 'Calendrier',
  tabBarIcon: ({ focused }) => (
    <Icon icon={focused ? 'agenda_tab--focus' : 'agenda_tab'} {...styleTabBarIcon} />
  ),
  tabBarOnPress: ({ navigation }) => {
    navigation.navigate('Calendar');
  }
};

export default RootStack;
