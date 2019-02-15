import axios from 'axios';
import { serverUrl, STATUS } from '../../constants/global';
import { getToken } from '../../constants/helpers';

const { SUCCESS, FAILURE } = STATUS;

export const SET_MESSAGE_INFO = 'SET_MESSAGE_INFO';
export const SET_ERROR = 'SET_ERROR';
export const UPDATE_GOOD_DEALS = 'UPDATE_GOOD_DEALS';
export const UPDATE_GOOD_DEAL = 'UPDATE_GOOD_DEAL';
export const ADD_GOOD_DEAL = 'ADD_GOOD_DEAL';
export const SET_FETCH = 'SET_FETCH';

const axiosGoodDeal = axios.create({
  baseURL: `${serverUrl}/api/goodDeal`
});

axiosGoodDeal.interceptors.request.use(
  async options => {
    options.headers['Authorization'] = 'bearer ' + (await getToken());
    return options;
  },
  error => {
    console.log('Request error: ', error);
    return Promise.reject(error);
  }
);

export const fetchGoodDeals = () => {
  return dispatch => {
    axiosGoodDeal
      .get('/')
      .then(({ data }) => {
        dispatch(updateGoodDeals(data.events));
      })
      .catch(err => {});
  };
};

export const createGoodDeal = (storeName, date, address, description, image, navigation) => {
  const body = new FormData();

  if (image) {
    body.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.name || 'test'
    });
  }

  body.append('storeName', storeName);
  body.append('address', address);
  body.append('description', description);
  body.append('date', date.toISOString());

  return dispatch =>
  axiosGoodDeal
      .put('/add', body, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(({ data }) => {
        if (data.status === SUCCESS) {
          dispatch(addGoodDeal(data.goodDeal));
          navigation.goBack();
        }
      })
      .catch(err => {
        // console.log(err);
        // dispatch(setError(err.response.data));
      });
};

export const toggleInterested = idGoodDeal => {
  return dispatch =>
  axiosGoodDeal
      .put('/toggleInterested', {
        idGoodDeal
      })
      .then(({ data }) => {
        if (data.status === SUCCESS) {
          dispatch(updateGoodDeal(data.goodDeal));
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

export const updateGoodDeals = goodDeals => ({
  type: UPDATE_GOOD_DEALS,
  goodDeals
});

export const updateGoodDeal = goodDeal => ({
  type: UPDATE_GOOD_DEAL,
  goodDeal
});

export const addGoodDeal = goodDeal => ({
  type: ADD_GOOD_DEAL,
  goodDeal
});

export const setError = error => ({
  type: SET_ERROR,
  error
});
