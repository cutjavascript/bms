import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from "redux-thunk";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import reducers from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
persistStore(store);
export default store;

// const store = createStore(
//     reducers,
//     {},
//     compose(
//       autoRehydrate(),
//       applyMiddleware(thunk)
//     )
//   )

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }
