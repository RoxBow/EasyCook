import { tabBarIcon } from './global';
import { AsyncStorage } from 'react-native';

export const getToken = () => {
  return AsyncStorage.getItem('userToken');
};

export const getTabBarIcon = (name, focus) =>
  !focus ? tabBarIcon[name].normal : tabBarIcon[name].focus;

export const isArrayFill = array => array && array.length > 0;

export const getIngredientsFromId = (ingredients, refIngredients) =>
  ingredients.map(({ id, ...rest }) => ({
    ...refIngredients.find(({ id: refIngredientId }) => refIngredientId === id),
    ...rest
  }));

export const getValidateIngredientsFromId = (ingredients, refIngredients, ingredientIsValidate) => {
  const filteredIngredients = getIngredientsFromId(ingredients, refIngredients);
  return filteredIngredients.filter(({ isValidate }) => isValidate === ingredientIsValidate);
};

export const getIngredientsFromKind = (ingredients, kind) =>
  ingredients.filter(ingredient => ingredient.kind === kind);

export const isUserInArray = (array, idUser) => array.some(element => element._id === idUser);
