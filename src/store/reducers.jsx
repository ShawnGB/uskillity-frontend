import { combineReducers } from "redux";
import session from "./reducers/session";
import skills from "app:routes/shareSkill/reducer";

export const createReducers = () => {
  return combineReducers({
    session,
    skills
  });
};

export default createReducers;
