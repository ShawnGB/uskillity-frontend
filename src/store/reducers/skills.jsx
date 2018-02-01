import * as sessionActions from "app:store/actions/session";

const initialState = {
  workshops: null,
  categories: null
};

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case sessionActions.LEVELS_FETCHED:
      {
        nextState = {
          ...state,
          workshops: action.payload
        };
        break;
      }
    case sessionActions.FETCHED_CATEGORIES:
      {
        nextState = {
          ...state,
          categories: action.payload
        };
        break;
      }
    default:
      {
        break;
      }
  };
  return nextState || state;
}
