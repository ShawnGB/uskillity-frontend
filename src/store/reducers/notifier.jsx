import * as skill from "app:store/actions/skill";
import * as session from "app:store/actions/session";
import * as profile from "app:store/actions/profile";
import * as http from "app:store/actions/errors";
import * as utils from "app:utils/utils";

const initialState = {
  success: null,
  errors: null,
  warning: null,
  info: null
};

export default (state = initialState, action) => {
  let blankSlate = {
    success: null,
    errors: null,
    warning: null,
    info: null,
    showLoginModal: false
  };

  switch (action.type) {
    /*
       *case skill.CATEGORIES_FETCHED : { break; }
       *case skill.LEVELS_FETCHED : { break; }
       *case skill.USER_WORKSHOPS_FETCHED : { break; }
       *case skill.WORKSHOP_FETCHED : { break; }
       *case skill.WORKSHOPS_FETCHED : { break; }
       */

    /*
      *case session.LOGIN_FULFILLED : { break; }
      *case session.LOGOUT_FULFILLED : { break; }
      *case session.USER_FETCHED : { break; }
      */

    case session.REGISTER_FULFILLED: {
      blankSlate = { ...blankSlate, info: "Welcome to the portal" };
      break;
    }
    case skill.WORKSHOP_UPDATED: {
      blankSlate = { ...blankSlate, success: "Workshop updated" };
      break;
    }
    case skill.WORKSHOP_PUBLISHED: {
      blankSlate = { ...blankSlate, success: "Workshop is published" };
      break;
    }
    case skill.WORKSHOP_SESSION_UPDATED: {
      blankSlate = { ...blankSlate, success: "Session updated" };
      break;
    }
    case skill.WORKSHOP_IMG_UPLOAD_FULFILLED: {
      blankSlate = { ...blankSlate, success: "Image uploaded successfully" };
      break;
    }
    case skill.WORKSHOP_SESSION_SAVED: {
      blankSlate = { ...blankSlate, success: "Created new workshop session" };
      break;
    }
    case skill.WORKSHOP_SAVED: {
      blankSlate = { ...blankSlate, success: "Workshop created" };
      break;
    }

    /*
       *case skill.CATEGORIES_FETCHED_REJECTED : { break; }
       *case skill.WORKSHOPS_FETCHED_REJECTED : { break; }
       *case skill.USER_WORKSHOPS_FETCH_REJECTED : { break; }
       *case skill.WORKSHOP_FETCHED_REJECTED : { break; }
       *case skill.LEVELS_REJECTED : { break; }
       */

    case skill.WORKSHOP_IMG_UPLOAD_REJECTED: {
      blankSlate = {
        ...blankSlate,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }
    case skill.WORKSHOP_PUBLISH_REJECTED: {
      blankSlate = {
        ...blankSlate,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }
    case skill.WORKSHOP_SAVE_REJECTED: {
      blankSlate = {
        ...blankSlate,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }
    case skill.WORKSHOP_SESSION_SAVE_REJECTED: {
      blankSlate = {
        ...blankSlate,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }
    case skill.WORKSHOP_SESSION_UPDATE_REJECTED: {
      blankSlate = {
        ...blankSlate,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }
    case skill.WORKSHOP_UPDATE_REJECTED: {
      blankSlate = {
        ...blankSlate,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    /*
       *case session.USER_FETCH_REJECTED : { break; }
       *case session.LOGOUT_REJECTED : { break; }
       */

    case session.LOGIN_REJECTED: {
      blankSlate = {
        ...blankSlate,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    case session.REGISTER_REJECTED: {
      blankSlate = {
        ...blankSlate,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    /*
       *case skill.CATEGORIES_FETCHED_PENDING : { break; }
       *case skill.LEVELS_PENDING : { break; }
       *case skill.UPLOAD_IMG_PENDING : { break; }
       *case skill.USER_WORKSHOPS_FETCH_PENDING : { break; }
       *case skill.WORKSHOP_FETCHED_PENDING : { break; }
       *case skill.WORKSHOP_PUBLISH_PENDING : { break; }
       *case skill.WORKSHOP_SESSION_SAVE_PENDING : { break; }
       *case skill.WORKSHOP_SESSION_UPDATE_PENDING : { break; }
       *case skill.WORKSHOPS_FETCHED_PENDING : { break; }
       *case skill.WORKSHOP_UPDATE_PENDING : { break; }
       */

    /*
       *case session.USER_FETCHED_PENDING : { break; }
       *case session.LOGIN_PENDING : { break; }
       *case session.REGISTER_PENDING : { break; }
       *case session.LOGOUT_PENDING : { break; }
       */

    /*
       *case profile.PROVIDER_FETCHED : { break; }
       */

    case profile.UPLOAD_USER_PIC_FULFILLED: {
      blankSlate = { ...blankSlate, success: "Image uploaded successfully" };
      break;
    }
    case profile.UPDATE_USER_FULFILLED: {
      blankSlate = { ...blankSlate, success: "Profile updated successfully" };
      break;
    }

    case profile.UPLOAD_USER_PIC_REJECTED: {
      blankSlate = {
        ...blankSlate,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }
    case profile.PROVIDER_FETCH_REJECTED: {
      blankSlate = {
        ...blankSlate,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }
    case profile.UPDATE_USER_REJECTED: {
      blankSlate = {
        ...blankSlate,
        errors: utils.ErrorsToList(action.payload)
      };
      break;
    }

    /*
       *case profile.UPLOAD_USER_PIC_PENDING : { break; }
       *case profile.PROVIDER_FETCH_PENDING : { break; }
       *case profile.UPDATE_USER_PENDING : { break; }
       */

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
      blankSlate = {
        ...blankSlate,
        errors: ["You seem to be logged out, Try to login again?"],
        showLoginModal: true
      };
      break;
    }
    case http.STATUS_FORBIDDEN: {
      blankSlate = {
        ...blankSlate,
        errors: ["You don't have the access to do that"]
      };
      break;
    }
    case http.STATUS_NOTFOUND: {
      blankSlate = {
        ...blankSlate,
        errors: ["What you're looking for is missing"]
      };
      break;
    }
    case http.STATUS_INTERNALSERVERERROR: {
      blankSlate = {
        ...blankSlate,
        warning: "Oh, you've broken the server"
      };
      break;
    }
    case http.STATUS_BADGATEWAY: {
      blankSlate = {
        ...blankSlate,
        warning: "The network is facing some problems. Try later?"
      };
      break;
    }
    case http.STATUS_SERVICEUNAVAILABLE: {
      blankSlate = {
        ...blankSlate,
        warning: "The server seems to be momentarily down. Try later?"
      };
      break;
    }
    case http.STATUS_IHAVENOCLUE: {
      blankSlate = {
        ...blankSlate,
        warning: "Something is acting weird. Try later?"
      };
      break;
    }

    default: {
      break;
    }
  }

  const { success, warning, errors, info } = blankSlate;
  utils.NotifyUser(errors, warning, info, success);

  return Object.assign({}, state, blankSlate);
};
