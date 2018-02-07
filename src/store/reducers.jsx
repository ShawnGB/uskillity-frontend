import { combineReducers } from "redux";
import session from "./reducers/session.reducer";
import skills from "./reducers/skill.reducer";
import user from "./reducers/user.reducer";
import modal from "./reducers/modal";
import * as sessionActions from "app:store/actions/session.actions";

const appReducer = combineReducers({
  session,
  skills,
  user,
  modal
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
