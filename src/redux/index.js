// import all reducers here
import { combineReducers } from 'redux';
import test from './Test/reducer';
import user from './User/reducer';

export default combineReducers({
  user,
});
