import { combineReducers } from "redux";
import session from "./reducers/session";
import skills from "./reducers/skills";

export const createReducers = () => {
  return combineReducers({
    session,
    skills
  });
};

export default createReducers;
