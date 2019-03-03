import axios from 'axios';
import { serverUrl, STATUS } from '../../constants/global';
import { getToken } from '../../constants/helpers';

const { SUCCESS, FAILURE } = STATUS;

export const SET_MESSAGE_INFO = 'SET_MESSAGE_INFO';
export const SET_ERROR = 'SET_ERROR';
export const UPDATE_SHOPPING_LIST = 'UPDATE_SHOPPING_LIST';
export const UPDATE_SHOPPING_LIST_ITEM = 'UPDATE_SHOPPING_LIST_ITEM';
export const SET_FETCH = 'SET_FETCH';
export const SET_USERS = 'SET_USERS';
export const SET_USERS_SELECTED = 'SET_USERS_SELECTED';

const axiosShoppingList = axios.create({
  baseURL: `${serverUrl}/api/shoppingList`
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
        dispatch(updateShoppingList(data.shoppingLists));
        dispatch(setFetch(false));
      })
      .catch(err => {});
  };
};

export const fetchUsers = () => {
  return dispatch => {
    dispatch(setFetch(true));

    axiosShoppingList
      .get('/users')
      .then(({ data }) => {
        dispatch(setUsers(data.users));
        dispatch(setFetch(false));
      })
      .catch(err => {});
  };
};

export const toggleValidAliment = (idShoppingList, refId) => async dispatch => {
  return axiosShoppingList
    .post('/toggleValidAliment', {
      idAliment: refId,
      idShoppingList
    })
    .then(({ data }) => {
      if (data.status === SUCCESS) {
        dispatch(updateShoppingListItem(data.currentShoppingList));
      }
    })
    .catch(err => {
      // console.log(err.response);
      // dispatch(setError(err.response.data));
    });
};

export const addShoppingList = (name, maxDate, users, navigation) => async dispatch => {
  return axiosShoppingList
    .post('/add', {
      name,
      maxDate,
      users
    })
    .then(({ data }) => {
      if (data.status === SUCCESS) {
        dispatch(updateShoppingList(data.shoppingLists));
        navigation.navigate('ShoppingListItem', {
          idShoppingList: data.shoppingListAdded._id,
          name: data.shoppingListAdded.name
        });
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
      idShoppingList
    })
    .then(({ data }) => {
      if (data.status === SUCCESS) {
        dispatch(updateShoppingList(data.shoppingLists));
      }
    })
    .catch(err => {
      // console.log(err);
      // dispatch(setError(err.response.data));
    });
};

export const addIngredientToShoppingListItem = (
  idIngredient,
  quantity,
  unity,
  idShoppingList,
  navigation
) => dispatch => {
  return axiosShoppingList
    .post('/shoppingListItem/add', {
      idIngredient,
      quantity,
      unity,
      idShoppingList
    })
    .then(({ data }) => {
      if (data.status === SUCCESS) {
        dispatch(updateShoppingListItem(data.currentShoppingList));
        navigation.pop(2);
      }
    })
    .catch(err => {
      // console.log(err);
      // dispatch(setError(err.response.data));
    });
};

export const saveNewUsers = (users, idShoppingList, navigation) => dispatch => {
  return axiosShoppingList
    .put('/shoppingListItem/editUsers', {
      users,
      idShoppingList
    })
    .then(({ data }) => {
      if (data.status === SUCCESS) {
        dispatch(updateShoppingListItem(data.currentShoppingList));
        navigation.goBack();
      }
    })
    .catch(err => {
      // console.log(err);
      // dispatch(setError(err.response.data));
    });
};

export const leaveShoppingList = (idShoppingList, navigation) => dispatch =>
  axiosShoppingList
    .post('/shoppingListItem/leave', {
      idShoppingList
    })
    .then(({ data }) => {
      if (data.status === SUCCESS) {
        dispatch(updateShoppingList(data.shoppingLists));
        navigation.navigate('ListShoppingList');
      }
    })
    .catch(err => {
      // console.log(err);
      // dispatch(setError(err.response.data));
    });

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

export const updateShoppingListItem = shoppingList => ({
  type: UPDATE_SHOPPING_LIST_ITEM,
  shoppingList
});

export const setUsers = users => ({
  type: SET_USERS,
  users
});

export const setUsersSelected = users => ({
  type: SET_USERS_SELECTED,
  users
});

export const setError = error => ({
  type: SET_ERROR,
  error
});
