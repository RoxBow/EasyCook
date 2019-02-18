import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';
import HeaderAccount from '../components/Header/HeaderAccount/HeaderAccount';
import { Header, Left, Body, Right, Title } from 'native-base';
import { pink } from '../constants/colors';
import { styleTabBarIcon } from '../constants/global';
import Icon from '../components/Icon/Icon';

import AccountScreen from '../screens/Account/AccountScreen/AccountScreen';
import SettingsScreen from '../screens/Account/SettingsScreen/SettingsScreen';
import EditUserScreen from '../screens/Account/EditUserScreen/EditUserScreen';

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
        header: (
          <Header transparent>
            <Left>
              <AntDesign name="close" size={30} color={pink} onPress={() => navigation.goBack()} />
            </Left>
            <Body style={{ flex: 3 }}>
              <Title>Modifier le profil</Title>
            </Body>
            <Right />
          </Header>
        ),
        title: 'Modifier le profil',
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
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    focused ? 
      <Icon icon="account_tabBar--focus" {...styleTabBarIcon} /> : 
      <Icon icon="account_tabBar" {...styleTabBarIcon} />
  )
};

export default RootStack;
