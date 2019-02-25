import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { styleTabBarIcon } from '../constants/global';
import { pink } from '../constants/colors';
import { Header, Left, Body, Right, Title } from 'native-base';
import Icon from '../components/Icon/Icon';
import CloseModal from '../components/CloseModal/CloseModal';

import RecipesScreen from '../screens/Recipe/RecipesScreen/RecipesScreen';
import RecipeItemScreen from '../screens/Recipe/RecipeItemScreen/RecipeItemScreen';
import CreateRecipeScreen from '../screens/Recipe/CreateRecipeScreen/CreateRecipeScreen';

const RecipeStack = createStackNavigator(
  {
    Recipes: {
      screen: RecipesScreen,
      navigationOptions: ({ navigation }) => ({})
    },
    RecipeItem: {
      screen: RecipeItemScreen,
      navigationOptions: ({ navigation }) => ({})
    },
  },
  {
    headerMode: 'none'
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: RecipeStack,
      navigationOptions: ({ navigation }) => ({
        header: null
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
    },
  },
  {
    mode: 'modal'
  }
);

RootStack.navigationOptions = {
  tabBarLabel: 'Recettes',
  tabBarIcon: ({ focused }) => (
    focused ? 
      <Icon icon="recipe_tab--focus" {...styleTabBarIcon} /> : 
      <Icon icon="recipe_tab" {...styleTabBarIcon} />
  )
};

export default RootStack;
