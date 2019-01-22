// import all reducers here
import { combineReducers } from 'redux';
import recipe from './Recipe/reducer';
import user from './User/reducer';

export default combineReducers({
  user,
  recipe,
});
