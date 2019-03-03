import {
  SET_MESSAGE_INFO,
  SET_USER,
  SET_AUTHENTICATION,
  LOGOUT,
  SET_ERROR,
  SET_FETCH,
  REMOVE_USER,
  UPDATE_FRIDGE
} from './actions';

const initialState = {
  isAuthenticated: false,
  error: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE_INFO:
      return {
        ...state,
        messageInfo: action.messageInfo
      };
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        info: {
          ...state.info,
          ...action.info
        }
      };
    case UPDATE_FRIDGE:
      return {
        ...state,
        info: {
          ...state.info,
          fridge: action.fridge
        }
      };
    case SET_FETCH:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false
      };
    case SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    case REMOVE_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default userReducer;
