import axios from 'axios';
import { serverUrl, STATUS } from '../../constants/global';
import { getToken } from '../../constants/helpers';

const { SUCCESS, FAILURE } = STATUS;

export const SET_MESSAGE_INFO = 'SET_MESSAGE_INFO';
export const SET_ERROR = 'SET_ERROR';
export const UPDATE_SHOPPING_LIST = 'UPDATE_SHOPPING_LIST';
export const SET_FETCH = 'SET_FETCH';

const axiosShoppingList = axios.create({
  baseURL: `${serverUrl}/api/user/shoppingList`
});

axiosShoppingList.interceptors.request.use(
  async options => {
    options.headers['Authorization'] = 'bearer ' + (await getToken());
    return options;
  },
  error => {
    console.log('Request error: ', error);
    return Promise.reject(error);
  }
);

export const fetchShoppingList = () => {
  return dispatch => {
    dispatch(setFetch(true));

    axiosShoppingList
      .get('/')
      .then(({ data }) => {
        dispatch(updateShoppingList(data.shoppingList));
        dispatch(setFetch(false));
      })
      .catch(err => {});
  };
};

export const toggleValidAliment = (idShoppingList, idAliment, navigation) => async dispatch => {
  return axiosShoppingList
    .post('/toggleValidAliment', {
      idAliment,
      idShoppingList
    })
    .then(({ data }) => {
      if (data.status === SUCCESS) {
        navigation.setParams({ ...data.currentShoppingList });
        dispatch(updateShoppingList(data.shoppingList));
      }
    })
    .catch(err => {
      console.log(err.response);
      // dispatch(setError(err.response.data));
    });
};

export const addShoppingList = (name, maxDate, navigation) => async dispatch => {
  return axiosShoppingList
    .post('/add', {
      name,
      maxDate,
    })
    .then(({ data }) => {
      if (data.status === SUCCESS) {
        dispatch(updateShoppingList(data.shoppingList));
        navigation.goBack();
      }
    })
    .catch(err => {
      // console.log(err);
      // dispatch(setError(err.response.data));
    });
};

export const togglePin = idShoppingList => dispatch => {
  return axiosShoppingList
    .post('/shoppingListItem/togglePin', {
      idShoppingList,
    })
    .then(({ data }) => {
      if (data.status === SUCCESS) {
        dispatch(updateShoppingList(data.shoppingList));
      }
    })
    .catch(err => {
      // console.log(err);
      // dispatch(setError(err.response.data));
    });
};

export const addIngredientToShoppingListItem = (idIngredient, idShoppingList, navigation) => dispatch => {
  return axiosShoppingList
    .post('/shoppingListItem/add', {
      idIngredient,
      idShoppingList
    })
    .then(({ data }) => {
      if (data.status === SUCCESS) {
        dispatch(updateShoppingList(data.shoppingList));
        navigation.pop(2);
      }
    })
    .catch(err => {
      // console.log(err);
      // dispatch(setError(err.response.data));
    });
};

export const setMessageInfo = messageInfo => ({
  type: SET_MESSAGE_INFO,
  messageInfo
});

export const setFetch = fetch => ({
  type: SET_FETCH,
  isFetching: fetch
});

export const updateShoppingList = shoppingLists => ({
  type: UPDATE_SHOPPING_LIST,
  shoppingLists
});

export const setError = error => ({
  type: SET_ERROR,
  error
});
