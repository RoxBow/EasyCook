import axios from 'axios';
import { serverUrl, STATUS } from '../../constants/global';
import { getToken } from '../../constants/helpers';

const { SUCCESS, FAILURE } = STATUS;

export const EVENT = "EVENT";

export const SET_MESSAGE_INFO = `${EVENT}/SET_MESSAGE_INFO`;
export const UPDATE_EVENTS = `${EVENT}/UPDATE_EVENTS`;
export const UPDATE_EVENT = `${EVENT}/UPDATE_EVENT`;
export const ADD_EVENT = `${EVENT}/ADD_EVENT`;
export const SET_FETCH = `${EVENT}/SET_FETCH`;

const axiosEvent = axios.create({
  baseURL: `${serverUrl}/api/event`
});

axiosEvent.interceptors.request.use(
  async options => {
    options.headers['Authorization'] = 'bearer ' + (await getToken());
    return options;
  },
  error => {
    console.log('Request error: ', error);
    return Promise.reject(error);
  }
);

export const fetchEvents = () => {
  return dispatch => {
    axiosEvent
      .get('/')
      .then(({ data }) => {
        dispatch(updateEvents(data.events));
      })
      .catch(err => {});
  };
};

export const createEvent = (name, date, address, description, price, image, navigation) => {
  const body = new FormData();

  if (image) {
    body.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.name || 'test'
    });
  }

  body.append('name', name);
  body.append('address', address);
  if(description) body.append('description', description);
  if(price) body.append('price', price);
  body.append('date', date.toISOString());

  return dispatch =>
    axiosEvent
      .put('/add', body, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(({ data }) => {
        if (data.status === SUCCESS) {
          dispatch(addEvent(data.event));
          navigation.goBack();
        }
      })
      .catch(err => {
        // console.log(err);
        // dispatch(setError(err.response.data));
      });
};

export const toggleParticipate = idEvent => {
  return dispatch =>
    axiosEvent
      .put('/toggleParticipate', {
        idEvent
      })
      .then(({ data }) => {
        if (data.status === SUCCESS) {
          dispatch(updateEvent(data.event));
        }
      })
      .catch(err => {
        // console.log(err);
        // dispatch(setError(err.response.data));
      });
};

export const toggleInterested = idEvent => {
  return dispatch =>
    axiosEvent
      .put('/toggleInterested', {
        idEvent
      })
      .then(({ data }) => {
        if (data.status === SUCCESS) {
          dispatch(updateEvent(data.event));
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

export const updateEvents = events => ({
  type: UPDATE_EVENTS,
  events
});

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  event
});

export const addEvent = event => ({
  type: ADD_EVENT,
  event
});

export const setError = error => ({
  type: SET_ERROR,
  error
});
