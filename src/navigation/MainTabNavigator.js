import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { greenApp } from '../constants/colors';
import { tabBarIcon } from '../constants/global';
import DiscoverScreen from '../screens/DiscoverScreen/DiscoverScreen';
import RecipesScreen from '../screens/RecipesScreen/RecipesScreen';
import CalendarScreen from '../screens/CalendarScreen/CalendarScreen';

import ListShoppingListScreen from '../screens/ListShoppingListScreen/ListShoppingListScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen/ShoppingListScreen';
import AddShoppingListScreen from '../screens/AddShoppingListScreen/AddShoppingListScreen';

import AccountScreen from '../screens/AccountScreen/AccountScreen';
import { Feather } from '@expo/vector-icons';

const getTabBarIcon = (name, focus) => (!focus ? tabBarIcon[name].normal : tabBarIcon[name].focus);

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
  tabBarIcon: ({ focused }) => (
    <Image source={getTabBarIcon('discover', focused)} style={styleTabBarIcon} />
  )
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

const ListShoppingListStack = createStackNavigator(
  {
    ListShoppingList: {
      screen: ListShoppingListScreen,
      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate('AddShoppingList')}>
            <Feather name="plus" size={30} color={greenApp} style={{ paddingRight: 20 }} />
          </TouchableOpacity>
        ),
        title: 'Mes listes de course',
        headerStyle: {
          height: 80
        },
        headerTitleStyle: {
          fontSize: 23
        }
      })
    },
    ShoppingList: {
      screen: ShoppingListScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Petit repas',
        headerTintColor: greenApp,
        headerTitleStyle: { color: '#000' }
      })
    },
    AddShoppingList: {
      screen: AddShoppingListScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Créer liste de course',
        headerTintColor: greenApp,
        headerTitleStyle: { color: '#000' }
      })
    }
  },
  {
    headerBackTitleVisible: false,
    headerLayoutPreset: 'left'
  }
);

ListShoppingListStack.navigationOptions = {
  tabBarLabel: 'Liste',
  tabBarIcon: ({ focused }) => (
    <Image source={getTabBarIcon('list', focused)} style={styleTabBarIcon} />
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
    initialRouteName: 'ListShoppingListStack',
    tabBarOptions: {
      activeTintColor: greenApp,
      inactiveTintColor: '#888'
    }
  }
);
