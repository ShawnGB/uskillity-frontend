import * as skillActions from "app:store/actions/skill";

const initialState = {
  levels: [],
  categories: [],
  workshops: []
};

// TODO: In case or rejected , set error message
export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case skillActions.LEVELS_PENDING: {
      break;
    }

    case skillActions.LEVELS_FETCHED: {
      nextState = {
        ...state,
        levels: action.payload
      };
      break;
    }

    case skillActions.LEVELS_REJECTED: {
      break;
    }

    case skillActions.CATEGORIES_FETCHED_PENDING: {
      break;
    }

    case skillActions.CATEGORIES_FETCHED: {
      nextState = {
        ...state,
        categories: action.payload
      };
      break;
    }

    case skillActions.CATEGORIES_FETCHED_REJECTED: {
      break;
    }

    case skillActions.WORKSHOPS_FETCHED_PENDING: {
      break;
    }

    case skillActions.WORKSHOPS_FETCHED: {
      nextState = {
        ...state,
        workshops: action.payload
      };
      break;
    }

    case skillActions.WORKSHOPS_FETCHED_REJECTED: {
      break;
    }

    case skillActions.WORKSHOP_SAVED: {
      nextState = {
        ...state,
        workshops: [...state.workshops, action.payload]
      };
      break;
    }
    case skillActions.WORKSHOP_SAVE_REJECTED: {
      break;
    }

    default: {
      break;
    }
  }
  return nextState || state;
};
