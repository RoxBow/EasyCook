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

export const addShoppingList = (name, aliments, navigation) => async dispatch => {
  return axios
    .post(
      `${serverUrl}/api/user/shoppingList/add`,
      {
        name,
        aliments
      },
      { headers: { Authorization: 'bearer ' + (await getToken()) } }
    )
    .then(({ data }) => {
      if (data.status === SUCCESS) {
        navigation.navigate('ListShoppingList');
      }
    })
    .catch(err => {
      dispatch(setError(err.response.data));
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
      dispatch(setError(err.response.data.err));
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
        dispatch(setError(err.response.data.message));
      });
  };
};

export const setMessageInfo = messageInfo => ({
  type: SET_MESSAGE_INFO,
  messageInfo
});

export const setUser = user => ({
  type: SET_USER,
  info: user
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
        dispatch(setError(err.response.data.err.message));
      });
  };
};

export const setError = error => ({
  type: SET_ERROR,
  error
});
