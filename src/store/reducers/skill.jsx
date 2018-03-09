import * as skillActions from "app:store/actions/skill";
const _ = require("lodash");

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

    case skillActions.WORKSHOP_PUBLISH_PENDING: {
      break;
    }

    case skillActions.WORKSHOP_PUBLISHED: {
      let workshops = state.workshops;

      let index = _.findIndex(workshops, workshop => {
        return workshop.id === action.id;
      });

      if (index > -1) {
        workshops[index].terms_accepted = true;
      }

      nextState = {
        ...state,
        workshops: workshops
      };
      break;
    }

    case skillActions.WORKSHOP_PUBLISH_REJECTED: {
      break;
    }

    case skillActions.WORKSHOP_FETCHED_PENDING: {
      break;
    }

    case skillActions.WORKSHOP_FETCHED: {
      let workshops = state.workshops;

      let index = _.findIndex(workshops, workshop => {
        return workshop.id === action.payload.id;
      });

      if (index > -1) {
        workshops[index] = action.payload;
      } else {
        workshops.push(action.payload);
      }

      nextState = {
        ...state,
        workshops: workshops
      };
      break;
    }

    case skillActions.WORKSHOP_FETCHED_REJECTED: {
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

    case skillActions.WORKSHOP_SESSION_DELETE_REJECTED: {
      break;
    }

    case skillActions.WORKSHOP_SESSION_DELETE_PENDING: {
      break;
    }

    case skillActions.WORKSHOP_SESSION_DELETED: {
      const { workshopId, sessionId } = action;
      let workshops = state.workshops;

      let index = _.findIndex(workshops, workshop => {
        return workshop.id === +workshopId;
      });

      if (index > -1) {
        _.remove(workshops[index].sessions, session => {
          return session.id === +sessionId;
        });
      }

      nextState = {
        ...state,
        workshops: workshops
      };

      break;
    }

    case skillActions.WORKSHOP_SESSION_SAVED: {
      const { workshopId, session } = action;
      let workshops = state.workshops;

      let index = _.findIndex(workshops, workshop => {
        return workshop.id === +workshopId;
      });

      if (index > -1) {
        workshops[index].sessions.push(session);
        nextState = {
          ...state,
          workshops: workshops
        };
      }
      break;
    }
    case skillActions.CREATE_PARTICIPATION_SUCCESS: {
      const { wid, sid, ps } = action;
      let workshops = state.workshops;

      let index = _.findIndex(workshops, workshop => {
        return workshop.id === +wid;
      });

      if (index < 0) {
        break;
      }

      let index2 = _.findIndex(workshops[index].sessions, ws => {
        return ws.id === +sid;
      });

      if (index2 < 0) {
        break;
      }

      if (!workshops[index].sessions[index2].participations) {
        workshops[index].sessions[index2].participations = [];
      }
      workshops[index].sessions[index2].participations.concat(ps);

      nextState = {
        ...state,
        workshops: workshops
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

    case skillActions.USER_WORKSHOPS_FETCHED: {
      // TODO: there is a better way to do this
      let stateWorkshops = state.workshops;
      let userWorkshops = action.payload;

      userWorkshops.forEach(uWorkshop => {
        let workshopToOverwrite = stateWorkshops.find(
          sW => sW.id === uWorkshop.id
        );
        if (workshopToOverwrite) {
          workshopToOverwrite = uWorkshop;
        } else {
          stateWorkshops.push(uWorkshop);
        }
      });

      nextState = {
        ...state,
        workshops: stateWorkshops
      };

      break;
    }

    case skillActions.WORKSHOP_IMG_UPLOAD_PENDING: {
      nextState = {
        ...state,
        loading: true
      };
      break;
    }

    case skillActions.WORKSHOP_IMG_UPLOAD_REJECTED: {
      nextState = {
        ...state,
        loading: false
      };
      break;
    }

    case skillActions.WORKSHOP_IMG_UPLOAD_FULFILLED: {
      nextState = {
        ...state,
        loading: false
      };
      break;
    }

    case skillActions.USER_WORKSHOPS_FETCH_PENDING: {
      break;
    }

    case skillActions.USER_WORKSHOPS_FETCH_REJECTED: {
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
