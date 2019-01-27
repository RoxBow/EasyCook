import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { getTabBarIcon } from '../constants/helpers';
import { styleTabBarIcon } from './MainTabNavigator';
import DiscoverScreen from '../screens/Discover/DiscoverScreen/DiscoverScreen';
import CreateEvent from '../screens/Discover/CreateEventScreen/CreateEventScreen';
import { Header, Left, Body, Right, Title } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { greenApp } from '../constants/colors';

const DiscoverStack = createStackNavigator(
  {
    Discover: {
      screen: DiscoverScreen,
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
      screen: CreateEvent,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header transparent>
            <Left>
              <AntDesign
                name="close"
                size={30}
                color={greenApp}
                onPress={() => navigation.goBack()}
              />
            </Left>
            <Body style={{ flex: 3 }}>
              <Title>Créer un événement</Title>
            </Body>
            <Right />
          </Header>
        ),
        title: 'Créer un événement',
        headerTintColor: greenApp,
        headerTitleStyle: { color: '#000' }
      })
    }
  },
  {
    mode: 'modal'
  }
);

RootStack.navigationOptions = {
  tabBarLabel: 'Découvrir',
  tabBarIcon: ({ focused }) => (
    <Image source={getTabBarIcon('discover', focused)} style={styleTabBarIcon} />
  )
};

export default RootStack;
