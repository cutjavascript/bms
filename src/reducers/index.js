import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import addToCart from './addToCart';

export default combineReducers({
  simpleReducer,
  addToCart,
});
