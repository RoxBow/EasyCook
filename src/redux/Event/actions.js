import axios from 'axios';
import { serverUrl, STATUS } from '../../constants/global';
import { getToken } from '../../constants/helpers';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

const { SUCCESS, FAILURE } = STATUS;

export const SET_MESSAGE_INFO = 'SET_MESSAGE_INFO';
export const SET_ERROR = 'SET_ERROR';
export const UPDATE_EVENTS = 'UPDATE_EVENTS';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const ADD_EVENT = 'ADD_EVENT';
export const SET_FETCH = 'SET_FETCH';

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

export const createEvent = (name, date, address, description, image, navigation) => {
  // const data = new FormData();
  // data.append('name', 'avatar');
  // data.append('fileData', {
  //   uri: image.uri.replace("file://", ""),
  //   type: 'image/jpg',
  //   name: 'F551B25F-FA67-48C6-89B9-75FFD2D62BDE'
  // });

  return dispatch =>
    axiosEvent
      .put('/add', {
        name,
        date,
        address,
        description
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
