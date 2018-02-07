import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createReducers from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["modal"]
};

const persistedReducer = persistReducer(persistConfig, createReducers());

export const createReduxStore = (initialState = {}) => {
  // ***************** Middleware Configuration ***************** //
  const middleware = [thunk, createLogger(), promiseMiddleware].filter(Boolean);

  // ***************** Store creation ***************** //
  const store = createStore(persistedReducer, applyMiddleware(...middleware));
  const persistor = persistStore(store);

  return { store, persistor };
};

export default createReduxStore;
