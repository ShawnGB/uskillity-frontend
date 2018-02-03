import * as workshopActions from "app:store/actions/workshop.actions";

const initialState = {
  workshops: [],
  categories: []
};

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case workshopActions.WORKSHOPS_FETCHED:
      {
        nextState = {
          ...state,
          workshops: action.payload
        };
        break;
      }
    case workshopActions.CATEGORIES_FETCHED:
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
