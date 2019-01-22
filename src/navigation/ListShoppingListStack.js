import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { getTabBarIcon } from '../constants/helpers';
import { greenApp } from '../constants/colors';
import { styleTabBarIcon } from './MainTabNavigator';

import ListShoppingListScreen from '../screens/Liste/ListShoppingListScreen/ListShoppingListScreen';
import ShoppingListItemScreen from '../screens/Liste/ShoppingListItemScreen/ShoppingListItemScreen';
import AddShoppingListScreen from '../screens/Liste/AddShoppingListScreen/AddShoppingListScreen';
import SearchIngredientScreen from '../screens/Liste/SearchIngredientScreen/SearchIngredientScreen';
import AddIngredientScreen from '../screens/Liste/AddIngredientScreen/AddIngredientScreen';

import { Feather } from '@expo/vector-icons';

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
        headerStyle: { height: 80 },
        headerTitleStyle: { fontSize: 23 }
      })
    },
    ShoppingListItem: {
      screen: ShoppingListItemScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.name,
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
    },
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

const RootStack = createStackNavigator(
  {
    Main: {
      screen: ListShoppingListStack,
    },
    SearchIngredient: {
      screen: SearchIngredientScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Rechercher',
        headerTintColor: greenApp,
        headerTitleStyle: { color: '#000' }
      })
    },
    AddIngredient: {
      screen: AddIngredientScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Ajouter ingrédient',
        headerTintColor: greenApp,
        headerTitleStyle: { color: '#000' }
      })
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

RootStack.navigationOptions = {
  tabBarLabel: 'Liste',
  tabBarIcon: ({ focused }) => (
    <Image source={getTabBarIcon('list', focused)} style={styleTabBarIcon} />
  )
};

export default RootStack;