import { combineReducers } from "redux";
import session from "./reducers/session.reducer";
import skills from "./reducers/skill.reducer";
import user from "./reducers/user.reducer";
import modal from "./reducers/modal";

export const createReducers = () => {
  return combineReducers({
    session,
    skills,
    user,
    modal
  });
};

export default createReducers;
