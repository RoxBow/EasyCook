import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { styleTabBarIcon } from '../constants/global';
import { pink } from '../constants/colors';
import { Header, Left, Body, Right, Title } from 'native-base';
import Icon from '../components/Icon/Icon';
import CloseModal from '../components/CloseModal/CloseModal';
import Text from '../components/Text/Text';
import ArrowBack from '../components/ArrowBack/ArrowBack';

import RecipesScreen from '../screens/Recipe/RecipesScreen/RecipesScreen';
import RecipeItemScreen from '../screens/Recipe/RecipeItemScreen/RecipeItemScreen';
import CreateRecipeScreen from '../screens/Recipe/CreateRecipeScreen/CreateRecipeScreen';
import FridgeIngredientScreen from '../screens/Recipe/FridgeIngredientScreen/FridgeIngredientScreen';

const RecipeStack = createStackNavigator({
  Recipes: {
    screen: RecipesScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddShoppingList')}
          style={{ alignSelf: 'flex-start', marginTop: 10, marginRight: 10 }}
        >
          <Icon icon="heart--fill" size={25} />
        </TouchableOpacity>
      ),
      headerLeft: (
        <Text style={{ fontSize: 25 }} bold>
          Recettes
        </Text>
      ),
      headerLeftContainerStyle: { marginLeft: 15 },
      headerRightContainerStyle: { marginRight: 15 },
      headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0, height: 50 }
    })
  },
  RecipeItem: {
    screen: RecipeItemScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  FridgeIngredient: {
    screen: FridgeIngredientScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <ArrowBack navigation={navigation} />,
      title: 'Mes aliments',
      headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0, height: 50 },
      headerTitleStyle: { fontFamily: 'Quicksand--bold' }
    })
  }
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: RecipeStack,
      navigationOptions: ({ navigation }) => ({
        header: null,
      })
    },
    CreateRecipe: {
      screen: CreateRecipeScreen,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header transparent>
            <Left>
              <CloseModal navigation={navigation} />
            </Left>
            <Body style={{ flex: 3 }}>
              <Title>Créer une recette</Title>
            </Body>
            <Right />
          </Header>
        ),
        title: 'Créer une recette',
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
  tabBarLabel: 'Recettes',
  tabBarIcon: ({ focused }) =>
    focused ? (
      <Icon icon="recipe_tab--focus" {...styleTabBarIcon} />
    ) : (
      <Icon icon="recipe_tab" {...styleTabBarIcon} />
    ),
  tabBarOnPress: ({ navigation }) => {
    navigation.navigate('Recipes');
  }
};

export default RootStack;
