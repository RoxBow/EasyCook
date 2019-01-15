import axios from 'axios';
import { serverUrl, STATUS } from '../../constants/global';
import { AsyncStorage } from 'react-native';

const { SUCCESS, FAILURE } = STATUS;

export const SET_MESSAGE_INFO = 'SET_MESSAGE_INFO';
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SET_ERROR = 'SET_ERROR';

export const requestValidityToken = (token, navigation) => {
  return dispatch => {
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
        dispatch(setError(err.response.data));
        navigation.navigate('Auth');
      });
  };
};

export const requestSignUp = (email, username, password) => {
  return dispatch => {
    axios
      .post(`${serverUrl}/api/auth/signUp`, {
        email,
        username,
        password
      })
      .then(({ data }) => {
        dispatch(setMessageInfo(data.messageInfo));

        // redirect to app
        navigation.navigate(data.status === STATUS.SUCCESS ? 'Auth' : 'Auth');
      })
      .catch(err => {
        dispatch(setError(err.response.data.err.message));
      });
  };
};

export const requestLogin = (email, password, navigation) => {
  return dispatch => {
    axios
      .post(`${serverUrl}/api/auth/login`, {
        username: email,
        password
      })
      .then(({ data }) => {
        AsyncStorage.setItem('userToken', data.token);
        dispatch(setUser(data.user));

        // redirect to app
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

export const setAuthentication = isAuthenticated => {
  return {
    type: SET_AUTHENTICATION,
    isAuthenticated
  };
};

export const logout = () => {
  axios.get(`${serverUrl}/api/auth/logout`).catch(err => {
    console.log(err.response.data);
  });

  return {
    type: LOGOUT
  };
};

export const setError = error => ({
  type: SET_ERROR,
  error
});
