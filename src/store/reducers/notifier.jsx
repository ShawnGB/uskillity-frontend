import * as skill from "app:store/actions/skill";
import * as session from "app:store/actions/session";
import * as profile from "app:store/actions/profile";
import * as http from "app:store/actions/errors";
import * as utils from "app:utils/utils";

const initialState = {
  successes: null,
  errors: null,
  warnings: null,
  infos: null,
  loginRequired: false
};

export default (state = initialState, action) => {
  let nextState = initialState;

  switch (action.type) {
    //TODO: revert that
    case session.LOGIN_FULFILLED: {
      //case session.REGISTER_FULFILLED: {
      nextState = {
        ...nextState,
        infos: [
          { message: "Welcome to the portal" },
          {
            message:
              "We have send you a verification email. Please verify your email before you proceed. If you don't see the email please check your spam folder."
          }
        ]
      };
      break;
    }

    case skill.WORKSHOP_UPDATED: {
      nextState = {
        ...nextState,
        successes: [{ message: "Workshop updated" }]
      };
      break;
    }

    case skill.WORKSHOP_PUBLISHED: {
      nextState = {
        ...nextState,
        successes: [{ message: "Workshop is published" }]
      };
      break;
    }

    case skill.CREATE_PARTICIPATION_SUCCESS: {
      nextState = {
        ...nextState,
        successes: [{ message: "Ticket reservation completed" }]
      };
      break;
    }

    case skill.WORKSHOP_SESSION_UPDATED: {
      nextState = {
        ...nextState,
        successes: [{ message: "Session updated" }]
      };
      break;
    }

    case skill.WORKSHOP_IMG_UPLOAD_FULFILLED: {
      nextState = {
        ...nextState,
        successes: [{ message: "Image uploaded successfully" }]
      };
      break;
    }

    case skill.WORKSHOP_SESSION_SAVED: {
      nextState = {
        ...nextState,
        successes: [{ message: "Created new workshop session" }]
      };
      break;
    }

    case skill.WORKSHOP_SAVED: {
      nextState = {
        ...nextState,
        successes: [{ message: "Workshop created" }],
        infos: [
          {
            message:
              "Your workshop has been submitted for approval. It might take couple of hours for us to process it. We will inform you once it has been published. Thank you.",
            autoClose: false
          }
        ]
      };
      break;
    }

    case skill.WORKSHOP_IMG_UPLOAD_REJECTED: {
      nextState = {
        ...nextState,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case skill.WORKSHOP_PUBLISH_REJECTED: {
      nextState = {
        ...nextState,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case skill.CREATE_PARTICIPATION_REJECTED: {
      nextState = {
        ...nextState,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case skill.WORKSHOP_SAVE_REJECTED: {
      nextState = {
        ...nextState,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case skill.WORKSHOP_SESSION_SAVE_REJECTED: {
      nextState = {
        ...nextState,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case skill.WORKSHOP_SESSION_UPDATE_REJECTED: {
      nextState = {
        ...nextState,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case skill.WORKSHOP_UPDATE_REJECTED: {
      nextState = {
        ...nextState,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case session.LOGIN_REJECTED: {
      nextState = {
        ...nextState,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case session.REGISTER_REJECTED: {
      nextState = {
        ...nextState,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case profile.UPLOAD_USER_PIC_FULFILLED: {
      nextState = {
        ...nextState,
        successes: [{ message: "Image uploaded successfully" }]
      };
      break;
    }

    case profile.UPDATE_USER_FULFILLED: {
      nextState = {
        ...nextState,
        successes: [{ message: "Profile updated successfully" }]
      };
      break;
    }

    case profile.UPLOAD_USER_PIC_REJECTED: {
      nextState = {
        ...nextState,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case profile.PROVIDER_FETCH_REJECTED: {
      nextState = {
        ...nextState,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case profile.UPDATE_USER_REJECTED: {
      nextState = {
        ...nextState,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case "LOGIN_REQUIRED": {
      nextState = {
        ...nextState,
        loginRequired: { onHide: action.onHide }
      };
      break;
    }

    case http.STATUS_OK: {
      break;
    }

    case http.STATUS_CREATED: {
      break;
    }

    case http.STATUS_ACCEPTED: {
      break;
    }

    case http.STATUS_NOCONTENT: {
      break;
    }

    case http.STATUS_BADREQUEST: {
      break;
    }

    case http.STATUS_UNAUTHORIZED: {
      nextState = {
        ...nextState,
        errors: [{ message: "You seem to be logged out, Try to login again?" }],
        loginRequired: true
      };
      break;
    }

    case http.STATUS_FORBIDDEN: {
      nextState = {
        ...nextState,
        errors: [{ message: "You don't have the access to do that" }]
      };
      break;
    }

    case http.STATUS_NOTFOUND: {
      nextState = {
        ...nextState,
        errors: [{ message: "What you're looking for is missing" }]
      };
      break;
    }

    case http.STATUS_INTERNALSERVERERROR: {
      nextState = {
        ...nextState,
        warnings: [{ message: "Oh, you've broken the server" }]
      };
      break;
    }

    case http.STATUS_BADGATEWAY: {
      nextState = {
        ...nextState,
        warnings: [
          { message: "The network is facing some problems. Try later?" }
        ]
      };
      break;
    }

    case http.STATUS_SERVICEUNAVAILABLE: {
      nextState = {
        ...nextState,
        warnings: [
          { message: "The server seems to be momentarily down. Try later?" }
        ]
      };
      break;
    }

    case http.STATUS_IHAVENOCLUE: {
      nextState = {
        ...nextState,
        warnings: [{ message: "Something is acting weird. Try later?" }]
      };
      break;
    }

    default: {
      break;
    }
  }

  const { successes, warnings, errors, infos } = nextState;
  utils.NotifyUser(errors, warnings, infos, successes);

  return Object.assign({}, state, nextState);
};
