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

export const formatDateShort = date =>
  new Date(date).toLocaleDateString('fr-fr', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  });

export const combineSelectors = (...selectors) => (state, props) =>
  selectors.reduce(
    (acc, selector) => ({
      ...acc,
      ...selector(state, props)
    }),
    {}
  );

export const addOrRemoveInArray = (array, value) => {
  var index = array.indexOf(value);

  if (index === -1) {
    array.push(value);
  } else {
    array.splice(index, 1);
  }
};

export const orderByDate = array => array.sort((a, b) => new Date(b.date) - new Date(a.date));

export const equalDate = (d1, d2) => d1.getDate() === d2.getDate();
