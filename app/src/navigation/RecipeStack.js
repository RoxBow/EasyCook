import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { TouchableOpacity, View } from 'react-native';
import { styleTabBarIcon } from '../constants/global';
import { pink } from '../constants/colors';
import { Header, Left, Body, Right, Title } from 'native-base';
import Icon from '../components/Icon/Icon';
import CloseModal from '../components/CloseModal/CloseModal';
import Text from '../components/Text/Text';
import ArrowBack from '../components/ArrowBack/ArrowBack';

import RecipesScreen from '../screens/Recipe/RecipesScreen/RecipesScreen';
import RecipeItemScreen from '../screens/Recipe/RecipeItemScreen/RecipeItemScreen';
import CategoryRecipesScreen from '../screens/Recipe/CategoryRecipesScreen/CategoryRecipesScreen';
import CreateRecipeScreen from '../screens/Recipe/CreateRecipeScreen/CreateRecipeScreen';
import FridgeIngredientScreen from '../screens/Recipe/FridgeIngredientScreen/FridgeIngredientScreen';

const RecipeStack = createStackNavigator({
  Recipes: {
    screen: RecipesScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <View style={{ marginTop: 10, marginRight: 10, flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddShoppingList')}
            style={{ marginRight: 15 }}
          >
            <Icon icon="heart--fill" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CreateRecipe')}>
            <Icon icon="plus" size={25} />
          </TouchableOpacity>
        </View>
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
  CategoryRecipes: {
    screen: CategoryRecipesScreen,
    navigationOptions: ({ navigation, name }) => ({
      headerLeft: <ArrowBack navigation={navigation} />,
      title: navigation.state.params.category,
      headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0, height: 50 },
      headerTitleStyle: { fontFamily: 'Quicksand--bold' }
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
    }
  },
  {
    mode: 'modal'
  }
);

RootStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Recettes',
  tabBarVisible: navigation.state.routes[0].index === 0 && navigation.state.index === 0,
  tabBarIcon: ({ focused }) =>
    focused ? (
      <Icon icon="recipe_tab--focus" {...styleTabBarIcon} />
    ) : (
      <Icon icon="recipe_tab" {...styleTabBarIcon} />
    ),
  tabBarOnPress: ({ navigation }) => {
    navigation.navigate('Recipes');
  }
});

export default RootStack;
