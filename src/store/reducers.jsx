import { combineReducers } from "redux";
import session from "./reducers/session";
import skills from "./reducers/skill";
import user from "./reducers/user";

export const createReducers = () => {
  return combineReducers({
    session,
    skills,
    user
  });
};

export default createReducers;
