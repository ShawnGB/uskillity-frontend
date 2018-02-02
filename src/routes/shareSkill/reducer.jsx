import * as skillActions from "app:routes/shareSkill/actions";

const initialState = {
  levels: [],
  categories: []
};

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case skillActions.LEVELS_FETCHED:
      {
        nextState = {
          ...state,
          levels: action.payload
        };
        break;
      }
    case skillActions.CATEGORIES_FETCHED:
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
