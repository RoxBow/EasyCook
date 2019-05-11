import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { View } from 'react-native';
import { styleTabBarIcon } from '../constants/global';
import { pink } from '../constants/colors';
import Icon from '../components/Icon/Icon';
import Text from '../components/Text/Text';
import ArrowBack from '../components/ArrowBack/ArrowBack';

import RecipesScreen from '../views/Recipe/RecipesScreen/RecipesScreen';
import RecipeItemScreen from '../views/Recipe/RecipeItemScreen/RecipeItemScreen';
import CategoryRecipesScreen from '../views/Recipe/CategoryRecipesScreen/CategoryRecipesScreen';
import CreateRecipeScreen from '../views/Recipe/CreateRecipeScreen/CreateRecipeScreen';
import FridgeIngredientScreen from '../views/Recipe/FridgeIngredientScreen/FridgeIngredientScreen';
import TitleHeader from '../components/Header/TitleHeader/TitleHeader';
import ButtonIcon from '../components/ButtonIcon/ButtonIcon';

const RecipeStack = createStackNavigator({
  Recipes: {
    screen: RecipesScreen,
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <View style={{ marginTop: 10, flexDirection: 'row' }}>
          <ButtonIcon
            icon="heart--fill"
            size={25}
            onPress={() => {}}
            style={{ marginRight: 15 }}
          />
          <ButtonIcon icon="plus" size={25} onPress={() => navigation.navigate('CreateRecipe')} />
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
      headerTitle: <TitleHeader title={navigation.state.params.category} />,
      headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0, height: 50 }
    })
  },
  FridgeIngredient: {
    screen: FridgeIngredientScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <ArrowBack navigation={navigation} />,
      headerTitle: <TitleHeader title="Mes aliments" />,
      headerStyle: { backgroundColor: '#fff', elevation: 0, borderBottomWidth: 0, height: 50 }
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
        headerLeft: <ButtonIcon onPress={() => navigation.goBack()} icon="cross" size={30} />,
        headerTitle: <TitleHeader title="Créer une recette" />,
        headerStyle: { borderBottomWidth: 0 }
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
  tabBarIcon: ({ focused }) => (
    <Icon icon={focused ? 'recipe_tab--focus' : 'recipe_tab'} {...styleTabBarIcon} />
  ),
  tabBarOnPress: ({ navigation }) => {
    navigation.navigate('Recipes');
  }
});

export default RootStack;
