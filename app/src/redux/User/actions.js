import axios from 'axios';
import { serverUrl, STATUS } from '../../constants/global';
import { AsyncStorage } from 'react-native';
import { getToken } from '../../constants/helpers';

const { SUCCESS, FAILURE } = STATUS;

export const USER = "USER";

export const SET_MESSAGE_INFO = `${USER}/SET_MESSAGE_INFO`;
export const LOGOUT = `${USER}/LOGOUT`;
export const SET_AUTHENTICATION = `${USER}/SET_AUTHENTICATION`;
export const SET_ERROR = `${USER}/SET_ERROR`;
export const SET_USER = `${USER}/SET_USER`;
export const UPDATE_FRIDGE = `${USER}/UPDATE_FRIDGE`;
export const SET_FETCH = `${USER}/SET_FETCH`;
export const REMOVE_USER = `${USER}/REMOVE_USER`;

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

export const toggleFavRecipe = idRecipe => dispatch => {
  axiosUser
    .put(`/favRecipe`, { idRecipe })
    .then(({ data }) => {
      dispatch(setMessageInfo(data.messageInfo));
      dispatch(setUser(data.user));
    })
    .catch(err => {
      // dispatch(setError(err.response.data.err));
    });
};

export const saveEditUser = (info, navigation) => dispatch => {
  const body = new FormData();

  if (info.image) {
    body.append('file', {
      uri: info.image.uri,
      type: info.image.type,
      name: info.image.name || 'test'
    });
  }

  body.append('data', JSON.stringify(info));

  axiosUser
    .put(`/edit`, body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(({ data }) => {
      dispatch(setMessageInfo(data.messageInfo));
      dispatch(setUser(data.user));
      navigation.goBack();
    })
    .catch(err => {
      // dispatch(setError(err.response.data.err));
    });
};

export const saveFridge = (fridge, navigation) => dispatch => {
  axiosUser
    .put('/fridge', { fridge })
    .then(({ data }) => {
      dispatch(updateFridge(data.fridge));
      navigation.goBack();
    })
    .catch(err => {
      // dispatch(setError(err.response.data.err));
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

export const setUser = user => ({
  type: SET_USER,
  info: user
});

export const updateFridge = fridge => ({
  type: UPDATE_FRIDGE,
  fridge
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
          AsyncStorage.removeItem('userToken');
          navigation.navigate('Auth');
        }
      })
      .catch(err => {
        // dispatch(setError(err.response.data.err.message));
      });
  };
};

export const requestDeleteAccount = navigation => {
  return dispatch => {
    axiosUser
      .delete(`/delete`)
      .then(({ data }) => {
        if (data.status === STATUS.SUCCESS) {
          navigation.navigate('Auth');
          dispatch(removeUser());
          AsyncStorage.removeItem('userToken');
        }
      })
      .catch(err => {
        // dispatch(setError(err.response.data.err.message));
      });
  };
};

export const removeUser = () => ({
  type: REMOVE_USER
});

export const setError = error => ({
  type: SET_ERROR,
  error
});
