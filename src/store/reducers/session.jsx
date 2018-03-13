import * as sessionActions from "app:store/actions/session";
import * as localStorageManager from "app:utils/localStorageManager";

const initialState = {
  isLoggedIn: false,
  user: []
};
// TODO: In case or rejected , set error message
export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case sessionActions.LOGIN_FULFILLED: {
      nextState = { ...state, isLoggedIn: true, user: action.payload };
      break;
    }

    case sessionActions.LOGIN_PENDING: {
      nextState = { ...state, isLoggedIn: false, user: [] };
      break;
    }

    case sessionActions.LOGIN_REJECTED: {
      nextState = { ...state, isLoggedIn: false, user: [] };
      break;
    }

    case sessionActions.LOGOUT_PENDING: {
      // TODO: push the browser back to home page
      localStorageManager.clearAuthParameters();
      nextState = { ...state, isLoggedIn: false, user: [] };
      break;
    }

    case sessionActions.REGISTER_PENDING: {
      nextState = { ...state, isLoggedIn: false, user: [] };
      break;
    }

    case sessionActions.REGISTER_FULFILLED: {
      nextState = { ...state, isLoggedIn: true, user: action.payload };
      break;
    }

    case sessionActions.USER_FETCHED: {
      nextState = { ...state, isLoggedIn: true, user: action.payload };
      break;
    }

    case sessionActions.USER_PAYMENT_METHOD_FETCHED: {
      nextState = { ...state, isLoggedIn: true, user: { ...state.user, paymentMethod: action.payload } };
      break;
    }

    default: {
      break;
    }
  }
  return nextState || state;
};
