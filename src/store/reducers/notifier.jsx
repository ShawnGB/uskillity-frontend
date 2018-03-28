import * as skill from "app:store/actions/skill";
import * as session from "app:store/actions/session";
import * as profile from "app:store/actions/profile";
import * as http from "app:store/actions/errors";

const toastType = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error"
};

const initialState = {
  toasts: null,
  loginRequired: false
};

const createToast = (
  type,
  stringKey = null,
  message = "",
  autoClose = null
) => ({
  message,
  type,
  stringKey,
  autoClose
});

const ErrorsToList = errors => {
  const fullMessages = errors.errors ? errors.errors.full_messages : null;
  const { ERROR } = toastType;
  if (fullMessages) {
    return fullMessages.map(message => {
      return createToast(ERROR, null, message);
    });
  }

  return Object.keys(errors).map(key => {
    return createToast(
      ERROR,
      null,
      key.charAt(0).toUpperCase() + key.slice(1) + " " + errors[key]
    );
  });
};

export default (state = initialState, action) => {
  // eslint-disable-next-line
  const { INFO, SUCCESS, WARNING, ERROR } = toastType;
  let nextState = initialState;

  switch (action.type) {
    case session.REGISTER_FULFILLED: {
      nextState = {
        ...nextState,
        toasts: [
          createToast(INFO, "info.welcome_to_portal"),
          createToast(INFO, "info.email_verification")
        ]
      };
      break;
    }

    case skill.WORKSHOP_UPDATED: {
      nextState = {
        ...nextState,
        toasts: [createToast(SUCCESS, "success.workshop_updated")]
      };
      break;
    }

    case skill.WORKSHOP_PUBLISHED: {
      nextState = {
        ...nextState,
        toasts: [createToast(SUCCESS, "success.workshop_published")]
      };
      break;
    }

    case skill.CREATE_PARTICIPATION_SUCCESS: {
      nextState = {
        ...nextState,
        toasts: [createToast(SUCCESS, "success.create_participation")]
      };
      break;
    }

    case skill.WORKSHOP_SESSION_UPDATED: {
      nextState = {
        ...nextState,
        toasts: [createToast(SUCCESS, "success.workshop_session_updated")]
      };
      break;
    }

    case skill.WORKSHOP_IMG_UPLOAD_FULFILLED: {
      nextState = {
        ...nextState,
        toasts: [createToast(SUCCESS, "success.workshop_img_uploaded")]
      };
      break;
    }

    case skill.WORKSHOP_SESSION_SAVED: {
      nextState = {
        ...nextState,
        toasts: [createToast(SUCCESS, "success.workshop_session_added")]
      };
      break;
    }

    case skill.WORKSHOP_SAVED: {
      nextState = {
        ...nextState,
        toasts: [
          createToast(SUCCESS, "success.workshop_created"),
          createToast(INFO, "success.workshop_created_msg")
        ]
      };
      break;
    }

    case skill.WORKSHOP_IMG_UPLOAD_REJECTED: {
      nextState = {
        ...nextState,
        toasts: ErrorsToList(action.payload)
      };
      break;
    }

    case skill.WORKSHOP_PUBLISH_REJECTED: {
      nextState = {
        ...nextState,
        toasts: ErrorsToList(action.payload)
      };
      break;
    }

    case skill.CREATE_PARTICIPATION_REJECTED: {
      nextState = {
        ...nextState,
        toasts: ErrorsToList(action.payload)
      };
      break;
    }

    case skill.WORKSHOP_SAVE_REJECTED: {
      nextState = {
        ...nextState,
        toasts: ErrorsToList(action.payload)
      };
      break;
    }

    case skill.WORKSHOP_SESSION_SAVE_REJECTED: {
      nextState = {
        ...nextState,
        toasts: ErrorsToList(action.payload)
      };
      break;
    }

    case skill.WORKSHOP_SESSION_UPDATE_REJECTED: {
      nextState = {
        ...nextState,
        toasts: ErrorsToList(action.payload)
      };
      break;
    }

    case skill.WORKSHOP_UPDATE_REJECTED: {
      nextState = {
        ...nextState,
        toasts: ErrorsToList(action.payload)
      };
      break;
    }

    case session.LOGIN_REJECTED: {
      nextState = {
        ...nextState,
        toasts: ErrorsToList(action.payload)
      };
      break;
    }

    case session.REGISTER_REJECTED: {
      nextState = {
        ...nextState,
        toasts: ErrorsToList(action.payload)
      };
      break;
    }

    case profile.UPLOAD_USER_PIC_FULFILLED: {
      nextState = {
        ...nextState,
        toasts: [createToast(SUCCESS, "success.user_img_uploaded")]
      };
      break;
    }

    case profile.UPDATE_USER_FULFILLED: {
      nextState = {
        ...nextState,
        toasts: [createToast(SUCCESS, "success.user_profile_updated")]
      };
      break;
    }

    case profile.UPLOAD_USER_PIC_REJECTED: {
      nextState = {
        ...nextState,
        toasts: ErrorsToList(action.payload)
      };
      break;
    }

    case profile.PROVIDER_FETCH_REJECTED: {
      nextState = {
        ...nextState,
        toasts: ErrorsToList(action.payload)
      };
      break;
    }

    case profile.UPDATE_USER_REJECTED: {
      nextState = {
        ...nextState,
        toasts: ErrorsToList(action.payload)
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
        toasts: [createToast(ERROR, "error.unauthorized")],
        loginRequired: true
      };
      break;
    }

    case http.STATUS_FORBIDDEN: {
      nextState = {
        ...nextState,
        toasts: [createToast(ERROR, "error.forbidden")]
      };
      break;
    }

    case http.STATUS_NOTFOUND: {
      nextState = {
        ...nextState,
        toasts: [createToast(ERROR, "error.not_found")]
      };
      break;
    }

    case http.STATUS_INTERNALSERVERERROR: {
      nextState = {
        ...nextState,
        toasts: [createToast(WARNING, "warning.internal_server_error")]
      };
      break;
    }

    case http.STATUS_BADGATEWAY: {
      nextState = {
        ...nextState,
        toasts: [createToast(WARNING, "warning.bad_gateway")]
      };
      break;
    }

    case http.STATUS_SERVICEUNAVAILABLE: {
      nextState = {
        ...nextState,
        toasts: [createToast(WARNING, "warning.service_unavailable")]
      };
      break;
    }

    case http.STATUS_IHAVENOCLUE: {
      nextState = {
        ...nextState,
        toasts: [createToast(WARNING, "warning.unknown_problem")]
      };
      break;
    }

    default: {
      break;
    }
  }

  return Object.assign({}, state, nextState);
};
