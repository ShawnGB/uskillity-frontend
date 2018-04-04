import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

const __DEV__ = process.env.NODE_ENV !== "production";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["modal"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createReduxStore = (initialState = {}) => {
  // ***************** Middleware Configuration ***************** //
  const middleware = [
    thunk,
    __DEV__ && createLogger(),
    promiseMiddleware
  ].filter(Boolean);

  // ***************** Store creation ***************** //
  const store = createStore(persistedReducer, applyMiddleware(...middleware));
  const persistor = persistStore(store);

  return { store, persistor };
};

export default createReduxStore;
