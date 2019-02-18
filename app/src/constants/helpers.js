import { DATE } from './global';
import { AsyncStorage } from 'react-native';

export const getToken = () => AsyncStorage.getItem('userToken');

export const isArrayFill = array => array && array.length > 0;

export const getIngredientsFromId = (ingredients, refIngredients) =>
  ingredients.map(({ refId, ...rest }) => ({
    ...refIngredients.find(({ id: refIngredientId }) => refIngredientId === refId),
    refId,
    ...rest
  }));

export const getValidateIngredientsFromId = (ingredients, refIngredients, ingredientIsValidate) => {
  const filteredIngredients = getIngredientsFromId(ingredients, refIngredients);
  return filteredIngredients.filter(({ isValidate }) => isValidate === ingredientIsValidate);
};

export const getIngredientsFromKind = (ingredients, kind) =>
  ingredients.filter(ingredient => ingredient.kind === kind);

export const isUserInArray = (array, idUser) => array.some(element => element._id === idUser);

export const formatDate = date =>
  `${DATE.shortDay[date.getDay()]} ${date.getDate()} ${
    DATE.month[date.getMonth()]
  } ${date.getFullYear()}`;

export const combineSelectors = (...selectors) => (state, props) =>
  selectors.reduce(
    (acc, selector) => ({
      ...acc,
      ...selector(state, props)
    }),
    {}
  );
