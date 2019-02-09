import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { getTabBarIcon } from '../constants/helpers';
import { styleTabBarIcon, ARROW } from '../constants/global';
import { pink } from '../constants/colors';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Header, Left, Body, Right, Title, Button } from 'native-base';
import IconArrow from '../components/Icons/IconArrow';

import ListShoppingListScreen from '../screens/Liste/ListShoppingListScreen/ListShoppingListScreen';
import ShoppingListItemScreen from '../screens/Liste/ShoppingListItemScreen/ShoppingListItemScreen';
import AddShoppingListScreen from '../screens/Liste/AddShoppingListScreen/AddShoppingListScreen';
import SearchIngredientScreen from '../screens/Liste/SearchIngredientScreen/SearchIngredientScreen';
import AddIngredientScreen from '../screens/Liste/AddIngredientScreen/AddIngredientScreen';
import SearchUserScreen from '../screens/Liste/SearchUserScreen/SearchUserScreen';

const ListShoppingListStack = createStackNavigator(
  {
    ListShoppingList: {
      screen: ListShoppingListScreen,
      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate('AddShoppingList')}>
            <Feather name="plus" size={30} color={pink} style={{ paddingRight: 20 }} />
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
        headerTintColor: pink,
        headerTitleStyle: { color: '#000' }
      })
    },
    AddShoppingList: {
      screen: AddShoppingListScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header>
            <Left>
              <IconArrow name={ARROW.LEFT} size={30} onPress={() => navigation.goBack()} />
            </Left>
            <Body style={{ flex: 3 }}>
              <Title>Créer liste de course</Title>
            </Body>
            <Right />
          </Header>
        ),
        title: 'Créer liste de course',
        headerTintColor: pink,
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

const RootStack = createStackNavigator(
  {
    Main: {
      screen: ListShoppingListStack,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    SearchIngredient: {
      screen: SearchIngredientScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header
            transparent
            style={{
              height: 120,
              backgroundColor: pink,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15
            }}
          >
            <Left />
            <Body style={{ flex: 3 }}>
              <Title style={{ color: '#fff' }}>Ajoute un aliment</Title>
            </Body>
            <Right>
              <AntDesign name="close" size={30} color="#fff" onPress={() => navigation.goBack()} />
            </Right>
          </Header>
        ),
        headerBackTitle: 'Rechercher',
        headerTintColor: pink,
        headerTitleStyle: { color: '#000' }
      })
    },
    AddIngredient: {
      screen: AddIngredientScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Ajouter ingrédient',
        headerTintColor: pink,
        headerTitleStyle: { color: '#000' }
      })
    },
    SearchUser: {
      screen: SearchUserScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: null,
        headerBackTitle: 'Rechercher',
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
  tabBarLabel: 'Liste',
  tabBarIcon: ({ focused }) => (
    <Image source={getTabBarIcon('list', focused)} style={styleTabBarIcon} />
  )
};

export default RootStack;
