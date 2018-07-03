import { combineReducers } from "redux";
import simpleReducer from "./simpleReducer";
import addSlotsReducer from "./addSlotsReducer";
import studioServicesReducer from "./studioServicesReducer";
import loadCartReducer from "./loadCartReducer";

export default combineReducers({
  simpleReducer,
  addSlotsReducer,
  studioServicesReducer,
  loadCartReducer,
});
