import * as userActions from "app:store/actions/profile";

const initialState = {
  user_workshops: []
};

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case userActions.USER_WORKSHOPS_FETCHED: {
      nextState = {
        ...state,
        user_workshops: action.payload
      };
      break;
    }
    default: {
      break;
    }
  }
  return nextState || state;
};
