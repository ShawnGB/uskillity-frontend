import { combineReducers } from "redux";
import session from "./reducers/session";
import skills from "./reducers/skill";
import profile from "./reducers/profile";

export const createReducers = () => {
  return combineReducers({
    session,
    skills,
    profile
  });
};

export default createReducers;
