import { combineReducers } from "redux";
import session from "./reducers/session";

export const createReducers = () => {
  return combineReducers({
    session
  });
};

export default createReducers;
