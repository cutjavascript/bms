import { combineReducers } from "redux";
import simpleReducer from "./simpleReducer";
import addSlotsReducer from "./addSlotsReducer";

export default combineReducers({
  simpleReducer,
  addSlotsReducer,
});
