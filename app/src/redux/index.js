import { combineReducers } from 'redux';
import userReducer from './User/reducer';
import shoppingListReducer from './ShoppingList/reducer';
import recipeReducer from './Recipe/reducer';
import goodDealReducer from './GoodDeal/reducer';
import eventReducer from './Event/reducer';
import calendarReducer from './Calendar/reducer';

import { USER } from './User/actions';
import { SHOPPING_LIST } from './ShoppingList/actions';
import { RECIPE } from './Recipe/actions';
import { GOOD_DEAL } from './GoodDeal/actions';
import { EVENT } from './Event/actions';
import { CALENDAR } from './Calendar/actions';

export default combineReducers({
  [USER]: userReducer,
  [RECIPE]: recipeReducer,
  [SHOPPING_LIST]: shoppingListReducer,
  [EVENT]: eventReducer,
  [GOOD_DEAL]: goodDealReducer,
  [CALENDAR]: calendarReducer
});
