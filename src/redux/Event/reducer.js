import { SET_MESSAGE_INFO, SET_ERROR, UPDATE_EVENTS, ADD_EVENT, SET_FETCH } from './actions';

const initialState = {
  events: [],
  error: ''
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE_INFO:
      return {
        ...state,
        messageInfo: action.messageInfo
      };
    case SET_FETCH:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case UPDATE_EVENTS:
      return {
        ...state,
        events: action.events
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [
          ...state.events,
          action.event
        ]
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default eventReducer;
