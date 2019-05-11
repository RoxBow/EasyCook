import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { styleTabBarIcon } from '../constants/global';
import { pink } from '../constants/colors';
import { View } from 'react-native';
import { Header, Left, Body, Right } from 'native-base';
import Icon from '../components/Icon/Icon';
import ArrowBack from '../components/ArrowBack/ArrowBack';
import Text from '../components/Text/Text';
import ButtonIcon from '../components/ButtonIcon/ButtonIcon';
import Button from '../components/Button/Button';
import TitleHeader from '../components/Header/TitleHeader/TitleHeader';

import ListShoppingListScreen from '../views/Liste/ListShoppingListScreen/ListShoppingListScreen';
import ShoppingListItemScreen from '../views/Liste/ShoppingListItemScreen/ShoppingListItemScreen';
import AddShoppingListScreen from '../views/Liste/AddShoppingListScreen/AddShoppingListScreen';
import SettingShoppingListItemScreen from '../views/Liste/SettingShoppingListItemScreen/SettingShoppingListItemScreen';
import SearchIngredientScreen from '../views/Liste/SearchIngredientScreen/SearchIngredientScreen';
import AddIngredientScreen from '../views/Liste/AddIngredientScreen/AddIngredientScreen';
import SearchUserScreen from '../views/Liste/SearchUserScreen/SearchUserScreen';

const ListShoppingListStack = createStackNavigator(
  {
    ListShoppingList: {
      screen: ListShoppingListScreen,
      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <ButtonIcon
            icon="plus"
            size={22}
            onPress={() => navigation.navigate('AddShoppingList')}
            style={{ alignSelf: 'flex-start', marginTop: 16, marginRight: 20 }}
          />
        ),
        headerLeft: (
          <Text style={{ fontSize: 23 }} bold>
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
        headerRight: (
          <Button
            text="Modifier"
            onPress={() =>
              navigation.navigate('SettingShoppingListItem', {
                idShoppingList: navigation.state.params.idShoppingList
              })
            }
            transparent
          />
        ),
        headerTitle: <TitleHeader title={navigation.state.params.name} />,
        headerLeft: <ArrowBack navigation={navigation} />,
        headerStyle: { height: 60 }
      })
    },
    AddShoppingList: {
      screen: AddShoppingListScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <TitleHeader title="Créer liste de course" />,
        headerLeft: <ArrowBack navigation={navigation} />,
        headerStyle: { borderBottomWidth: 0, height: 50 }
      })
    },
    SettingShoppingListItem: {
      screen: SettingShoppingListItemScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <TitleHeader title="Modifier la liste" />,
        headerLeft: <ArrowBack navigation={navigation} />,
        headerStyle: { height: 60 }
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
        headerLeft: <View />,
        headerTitle: <TitleHeader title="Ajoute un aliment" style={{ color: '#fff' }} />,
        headerRight: (
          <ButtonIcon icon="cross_rounded" size={30} onPress={() => navigation.goBack()} />
        ),
        headerStyle: { height: 100, backgroundColor: pink, borderBottomWidth: 0, elevation: 0 }
      })
    },
    AddIngredient: {
      screen: AddIngredientScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <View>
            <Icon icon={`${navigation.state.params.kind}--white`} size={30} />
            <Text style={{ color: '#fff', fontSize: 20, marginTop: 10 }} bold>
              {navigation.state.params.name}
            </Text>
          </View>
        ),
        headerRight: (
          <ButtonIcon icon="cross_rounded" size={30} onPress={() => navigation.goBack()} />
        ),
        headerStyle: {
          height: 150,
          backgroundColor: pink,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15
        },
        headerLeftContainerStyle: {
          marginLeft: 10
        }
      })
    },
    SearchUser: {
      screen: SearchUserScreen,
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
  tabBarLabel: 'Liste',
  tabBarIcon: ({ focused }) => (
    <Icon icon={focused ? 'list_tab--focus' : 'list_tab'} {...styleTabBarIcon} />
  ),
  tabBarOnPress: ({ navigation }) => {
    navigation.navigate('ListShoppingList');
  }
};

export default RootStack;
