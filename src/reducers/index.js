import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import addToCartReducer from './addToCartReducer';

export default combineReducers({
  simpleReducer,
  addToCartReducer,
});
