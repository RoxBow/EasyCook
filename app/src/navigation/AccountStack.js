import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderAccount from '../components/Header/HeaderAccount/HeaderAccount';
import { styleTabBarIcon } from '../constants/global';
import Icon from '../components/Icon/Icon';
import ButtonIcon from '../components/ButtonIcon/ButtonIcon';
import TitleHeader from '../components/Header/TitleHeader/TitleHeader';
import { lightgrey } from '../constants/colors';
import ArrowBack from '../components/ArrowBack/ArrowBack';

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
    navigationOptions: ({ navigation }) => ({
      headerLeft: <ArrowBack navigation={navigation} />,
      headerTitle: <TitleHeader title="Paramètre" />,
      headerStyle: { borderBottomColor: lightgrey }
    })
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
        headerLeft: <ButtonIcon onPress={() => navigation.goBack()} icon="cross" size={30} />,
        headerTitle: <TitleHeader title="Modifier le profil" />,
        headerStyle: { borderBottomColor: lightgrey }
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
