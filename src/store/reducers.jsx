import { combineReducers } from "redux";
import session from "./reducers/session.reducer";
import skills from "./reducers/skill.reducer";
import workshops from "./reducers/workshop.reducer";

export const createReducers = () => {
  return combineReducers({
    session,
    skills,
    workshops
  });
};

export default createReducers;
