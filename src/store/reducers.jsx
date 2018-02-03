import { combineReducers } from "redux";
import session from "./reducers/session.reducer";
import skills from "./reducers/skill.reducer";

export const createReducers = () => {
  return combineReducers({
    session,
    skills,
  });
};

export default createReducers;
