import * as userActions from "app:store/actions/profile";

const initialState = {
  user_workshops: [],
  provider: {}
};

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case userActions.UPLOAD_USER_PIC_FULFILLED: {
      // TODO: do something
      break;
    }

    case userActions.UPLOAD_USER_PIC_REJECTED: {
      // TODO: do something
      break;
    }

    case userActions.PROVIDER_FETCHED: {
      nextState = {
        ...state,
        provider: action.payload
      };
      break;
    }

    case userActions.PROVIDER_FETCH_PENDING: {
      nextState = {
        ...state,
        provider: {}
      };
      break;
    }

    case userActions.PROVIDER_FETCH_REJECTED: {
      nextState = {
        ...state,
        provider: {}
      };
      break;
    }

    default: {
      break;
    }
  }
  return nextState || state;
};
