import {
  SET_MESSAGE_INFO,
  SET_ERROR,
  UPDATE_SHOPPING_LIST,
  UPDATE_SHOPPING_LIST_ITEM,
  SET_FETCH,
  SET_USERS,
  SET_USERS_SELECTED,
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
    case UPDATE_SHOPPING_LIST_ITEM:
      const updatedShoppingLists = state.shoppingLists.map(shoppingListItem => {
        if (shoppingListItem._id === action.shoppingList._id) {
          return action.shoppingList;
        }

        return shoppingListItem;
      });

      return {
        ...state,
        shoppingLists: updatedShoppingLists
      };
    case SET_USERS: 
      return {
        ...state,
        users: action.users
      }
    case SET_USERS_SELECTED:
      return {
        ...state,
        usersSelected: action.users
      }
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
