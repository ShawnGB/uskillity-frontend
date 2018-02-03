import * as skillActions from "app:store/actions/skill.actions";

const initialState = {
  levels: [],
  categories: [],
  workshops: [],
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
      case skillActions.WORKSHOPS_FETCHED:
        {
          nextState = {
            ...state,
            workshops: action.payload
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
