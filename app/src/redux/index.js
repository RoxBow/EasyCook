// import all reducers here
import { combineReducers } from 'redux';
import recipe from './Recipe/reducer';
import user from './User/reducer';
import shoppingList from './ShoppingList/reducer';
import event from './Event/reducer';
import goodDeal from './GoodDeal/reducer';
import calendar from './Calendar/reducer';

export default combineReducers({
  user,
  recipe,
  shoppingList,
  event,
  goodDeal,
  calendar
});
