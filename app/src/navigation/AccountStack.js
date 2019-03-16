import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderAccount from '../components/Header/HeaderAccount/HeaderAccount';
import { styleTabBarIcon } from '../constants/global';
import Icon from '../components/Icon/Icon';
import ArrowBack from '../components/ArrowBack/ArrowBack';
import TitleHeader from '../components/Header/TitleHeader/TitleHeader';

import AccountScreen from '../views/Account/AccountScreen/AccountScreen';
import SettingsScreen from '../views/Account/SettingsScreen/SettingsScreen';
import EditUserScreen from '../views/Account/EditUserScreen/EditUserScreen';

const AccountStack = createStackNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => ({
      header: <HeaderAccount />
    })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({})
  }
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: AccountStack,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    EditUser: {
      screen: EditUserScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <ArrowBack navigation={navigation} />,
        headerTitle: <TitleHeader title="Modifier le profil" />,
        headerStyle: { borderBottomWidth: 0 }
      })
    }
  },
  {
    mode: 'modal'
  }
);

RootStack.navigationOptions = {
  tabBarLabel: 'Compte',
  tabBarIcon: ({ focused }) => (
    <Icon icon={focused ? 'account_tab--focus' : 'account_tab'} {...styleTabBarIcon} />
  ),
  tabBarOnPress: ({ navigation }) => {
    navigation.navigate('Account');
  }
};

export default RootStack;
