import axios from 'axios';
import { serverUrl, STATUS } from '../../constants/global';
import { AsyncStorage } from 'react-native';
import { getToken } from '../../constants/helpers';

const { SUCCESS, FAILURE } = STATUS;

export const SET_MESSAGE_INFO = 'SET_MESSAGE_INFO';
export const LOGOUT = 'LOGOUT';
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SET_ERROR = 'SET_ERROR';
export const SET_USER = 'SET_USER';
export const UPDATE_SHOPPING_LIST = 'UPDATE_SHOPPING_LIST';
export const SET_FETCH = 'SET_FETCH';

const axiosUser = axios.create({
  baseURL: `${serverUrl}/api/user`
});

axiosUser.interceptors.request.use(
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

    axiosUser
      .get('/shoppingList')
      .then(({ data }) => {
        dispatch(updateShoppingList(data.shoppingList));
        dispatch(setFetch(false));
      })
      .catch(err => {});
  };
};

export const toggleValidAliment = (idShoppingList, idAliment, navigation) => async dispatch => {
  return axiosUser
    .post('/shoppingList/toggleValidAliment', {
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

export const addShoppingList = (name, ingredients, navigation) => async dispatch => {
  return axiosUser
    .post('/shoppingList/add', {
      name,
      ingredients
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

export const addIngredientToShoppingListItem = (idIngredient, idShoppingList, navigation) => dispatch => {
  return axiosUser
    .post('/shoppingList/shoppingListItem/add', {
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

export const requestValidityToken = (token, navigation) => dispatch => {
  axios
    .get(`${serverUrl}/api/auth/token`, {
      headers: { Authorization: 'bearer ' + token }
    })
    .then(({ data }) => {
      if (data.status === SUCCESS) {
        dispatch(setUser(data.user));

        // redirect to app
        navigation.navigate('App');
      } else {
        navigation.navigate('Auth');
      }
    })
    .catch(err => {
      // console.log('err', err.response);
      // dispatch(setError(err.response.data));
      navigation.navigate('Auth');
    });
};

export const requestSignUp = (email, username, password) => dispatch => {
  axios
    .post(`${serverUrl}/api/auth/signUp`, {
      email,
      username,
      password
    })
    .then(({ data }) => {
      dispatch(setMessageInfo(data.messageInfo));
    })
    .catch(err => {
      // dispatch(setError(err.response.data.err));
    });
};

export const requestLogin = (email, password, navigation) => {
  return dispatch => {
    axios
      .post(`${serverUrl}/api/auth/login`, {
        email,
        password
      })
      .then(({ data }) => {
        AsyncStorage.setItem('userToken', data.token);
        dispatch(setUser(data.user));
        navigation.navigate(data.status === STATUS.SUCCESS ? 'App' : 'Auth');
      })
      .catch(err => {
        // console.log('err', err);
        // dispatch(setError(err.response.data.message));
      });
  };
};

export const setMessageInfo = messageInfo => ({
  type: SET_MESSAGE_INFO,
  messageInfo
});

export const setFetch = fetch => ({
  type: SET_FETCH,
  isFetching: fetch
});

export const setUser = user => ({
  type: SET_USER,
  info: user
});

export const updateShoppingList = shoppingLists => ({
  type: UPDATE_SHOPPING_LIST,
  shoppingLists
});

export const setAuthentication = isAuthenticated => ({
  type: SET_AUTHENTICATION,
  isAuthenticated
});

export const requestLogout = navigation => {
  return dispatch => {
    axios
      .get(`${serverUrl}/api/auth/logout`)
      .then(({ data }) => {
        if (data.status === STATUS.SUCCESS) {
          dispatch(setMessageInfo(data.messageInfo));
          navigation.navigate('Auth');
        }
      })
      .catch(err => {
        // dispatch(setError(err.response.data.err.message));
      });
  };
};

export const setError = error => ({
  type: SET_ERROR,
  error
});
