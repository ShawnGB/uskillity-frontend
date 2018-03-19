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

const createToast = (message, type, stringKey = null, autoClose = null) => ({
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
      return createToast(message, ERROR);
    });
  }

  return Object.keys(errors).map(key => {
    return createToast(
      key.charAt(0).toUpperCase() + key.slice(1) + " " + errors[key],
      ERROR
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
          createToast("Welcome to the portal", INFO),
          createToast(
            "We have send you a verification email. Please verify your email before you proceed. If you don't see the email please check your spam folder.",
            INFO
          )
        ]
      };
      break;
    }

    case skill.WORKSHOP_UPDATED: {
      nextState = {
        ...nextState,
        toasts: [createToast("Workshop updated", SUCCESS)]
      };
      break;
    }

    case skill.WORKSHOP_PUBLISHED: {
      nextState = {
        ...nextState,
        toasts: [createToast("Workshop published", SUCCESS)]
      };
      break;
    }

    case skill.CREATE_PARTICIPATION_SUCCESS: {
      nextState = {
        ...nextState,
        toasts: [createToast("Ticket reservation completed", SUCCESS)]
      };
      break;
    }

    case skill.WORKSHOP_SESSION_UPDATED: {
      nextState = {
        ...nextState,
        toasts: [createToast("Session updated", SUCCESS)]
      };
      break;
    }

    case skill.WORKSHOP_IMG_UPLOAD_FULFILLED: {
      nextState = {
        ...nextState,
        toasts: [createToast("Image uploaded successfully", SUCCESS)]
      };
      break;
    }

    case skill.WORKSHOP_SESSION_SAVED: {
      nextState = {
        ...nextState,
        toasts: [createToast("Created new workshop session", SUCCESS)]
      };
      break;
    }

    case skill.WORKSHOP_SAVED: {
      nextState = {
        ...nextState,
        toasts: [
          createToast("Workshop created", SUCCESS),
          createToast(
            "Your workshop has been submitted for approval. It might take couple of hours for us to process it. We will inform you once it has been published. Thank you.",
            INFO
          ),
          null,
          false
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
        toasts: [createToast("Image uploaded successfully", SUCCESS)]
      };
      break;
    }

    case profile.UPDATE_USER_FULFILLED: {
      nextState = {
        ...nextState,
        toasts: [createToast("Profile updated successfully", SUCCESS)]
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
        toasts: [{ message: "You seem to be logged out, Try to login again?" }],
        loginRequired: true
      };
      break;
    }

    case http.STATUS_FORBIDDEN: {
      nextState = {
        ...nextState,
        toasts: [{ message: "You don't have the access to do that" }]
      };
      break;
    }

    case http.STATUS_NOTFOUND: {
      nextState = {
        ...nextState,
        toasts: [{ message: "What you're looking for is missing" }]
      };
      break;
    }

    case http.STATUS_INTERNALSERVERERROR: {
      nextState = {
        ...nextState,
        toasts: [createToast("Oh, you've broken the server", WARNING)]
      };
      break;
    }

    case http.STATUS_BADGATEWAY: {
      nextState = {
        ...nextState,
        toasts: [
          createToast(
            "The network is facing some problems. Try later?",
            WARNING
          )
        ]
      };
      break;
    }

    case http.STATUS_SERVICEUNAVAILABLE: {
      nextState = {
        ...nextState,
        toasts: [
          createToast(
            "The server seems to be momentarily down. Try later?",
            WARNING
          )
        ]
      };
      break;
    }

    case http.STATUS_IHAVENOCLUE: {
      nextState = {
        ...nextState,
        toasts: [createToast("Something is acting weird. Try later?", WARNING)]
      };
      break;
    }

    default: {
      break;
    }
  }

  return Object.assign({}, state, nextState);
};
