import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { styleTabBarIcon, ARROW } from '../constants/global';
import { pink } from '../constants/colors';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Header, Left, Body, Right, Title, Button } from 'native-base';
import IconArrow from '../components/Icons/IconArrow';
import Icon from '../components/Icon/Icon';
import ArrowBack from '../components/ArrowBack/ArrowBack';

import ListShoppingListScreen from '../screens/Liste/ListShoppingListScreen/ListShoppingListScreen';
import ShoppingListItemScreen from '../screens/Liste/ShoppingListItemScreen/ShoppingListItemScreen';
import AddShoppingListScreen from '../screens/Liste/AddShoppingListScreen/AddShoppingListScreen';
import SettingShoppingListItemScreen from '../screens/Liste/SettingShoppingListItemScreen/SettingShoppingListItemScreen';
import SearchIngredientScreen from '../screens/Liste/SearchIngredientScreen/SearchIngredientScreen';
import AddIngredientScreen from '../screens/Liste/AddIngredientScreen/AddIngredientScreen';
import SearchUserScreen from '../screens/Liste/SearchUserScreen/SearchUserScreen';

const ListShoppingListStack = createStackNavigator(
  {
    ListShoppingList: {
      screen: ListShoppingListScreen,
      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <TouchableOpacity
            onPress={() => navigation.navigate('AddShoppingList')}
            style={{ alignSelf: 'flex-start', marginTop: 10, marginRight: 10 }}
          >
            <Feather name="plus" size={30} color={pink} />
          </TouchableOpacity>
        ),
        headerLeft: (
          <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
            Mes listes de course
          </Text>
        ),
        headerLeftContainerStyle: { marginTop: 20, marginLeft: 15 },
        headerStyle: { height: 80 }
      })
    },
    ShoppingListItem: {
      screen: ShoppingListItemScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.name,
        headerRight: (
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingShoppingListItem')}
            style={{ paddingHorizontal: 20 }}
          >
            <Text style={{ color: pink }}>Modifier</Text>
          </TouchableOpacity>
        ),
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
        )
      })
    },
    SettingShoppingListItem: {
      screen: SettingShoppingListItemScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Modifier la liste',
        headerLeft: <ArrowBack navigation={navigation} />
      })
    }
  },
  {
    headerBackTitleVisible: false
  }
);

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
              height: 100,
              backgroundColor: pink
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
        header: (
          <Header
            transparent
            style={{
              height: 150,
              backgroundColor: pink,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15
            }}
          >
            <Left>
              <Icon icon={navigation.state.params.kind} size={30} />
              <Text style={{ color: '#fff', fontSize: 20, marginTop: 10 }}>
                {navigation.state.params.name}
              </Text>
            </Left>
            <Body />
            <Right style={{ alignSelf: 'flex-start' }}>
              <AntDesign name="close" size={30} color="#fff" onPress={() => navigation.goBack()} />
            </Right>
          </Header>
        )
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
  tabBarIcon: ({ focused }) =>
    focused ? (
      <Icon icon="list_tabBar--focus" {...styleTabBarIcon} />
    ) : (
      <Icon icon="list_tabBar" {...styleTabBarIcon} />
    )
};

export default RootStack;
