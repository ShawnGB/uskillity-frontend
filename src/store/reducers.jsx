import { combineReducers } from "redux";
import session from "./reducers/session";
import skills from "./reducers/skill";
import profile from "./reducers/profile";
import modal from "./reducers/modal";
import notifier from "./reducers/notifier";
import * as sessionActions from "app:store/actions/session";

const appReducer = combineReducers({
  notifier,
  session,
  skills,
  profile,
  modal,
});

const rootReducer = (state, action) => {
  if (
    [
      sessionActions.LOGIN_PENDING,
      sessionActions.LOGOUT_PENDING,
      sessionActions.REGISTER_PENDING
    ].indexOf(action.type) > -1
  ) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
