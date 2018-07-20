import { combineReducers } from "redux";
import addSlotsReducer from "./addSlotsReducer";
import removeSlotsReducer from "./removeSlotsReducer";
import studioServicesReducer from "./studioServicesReducer";
import loadCartReducer from "./loadCartReducer";

export default combineReducers({
  addSlotsReducer,
  removeSlotsReducer,
  studioServicesReducer,
  loadCartReducer,
});
