import {
  SET_MESSAGE_INFO,
  SET_USER,
  SET_AUTHENTICATION,
  LOGOUT,
  SET_ERROR,
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
        info: action.info
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
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

export default userReducer;
