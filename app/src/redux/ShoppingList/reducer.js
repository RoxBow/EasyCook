import {
  SET_MESSAGE_INFO,
  SET_ERROR,
  UPDATE_SHOPPING_LIST,
  SET_FETCH
} from './actions';

const initialState = {
  error: '',
};

const shoppingListReducer = (state = initialState, action) => {
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
    case UPDATE_SHOPPING_LIST:
      return {
        ...state,
        shoppingLists: action.shoppingLists
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

export default shoppingListReducer;
