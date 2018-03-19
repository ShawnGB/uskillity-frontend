import * as skill from 'app:store/actions/skill'
import * as session from 'app:store/actions/session'
import * as profile from 'app:store/actions/profile'
import * as http from 'app:store/actions/errors'
import * as utils from 'app:utils/utils'

const initialState = {
  success: null,
  errors: null,
  warning: null,
  info: null
}

export default (state = initialState, action) => {
  let blankState = {
    success: null,
    errors: null,
    warning: null,
    info: null,
    loginRequired: false
  }

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
      blankState = { ...blankState, info: 'Welcome to the portal' }
      break
    }
    case skill.WORKSHOP_UPDATED: {
      blankState = { ...blankState, success: 'Workshop updated' }
      break
    }
    case skill.WORKSHOP_PUBLISHED: {
      blankState = { ...blankState, success: 'Workshop is published' }
      break
    }
    case skill.CREATE_PARTICIPATION_SUCCESS: {
      blankState = { ...blankState, success: 'Ticket reservation completed' }
      break
    }
    case skill.WORKSHOP_SESSION_UPDATED: {
      blankState = { ...blankState, success: 'Session updated' }
      break
    }
    case skill.WORKSHOP_IMG_UPLOAD_FULFILLED: {
      blankState = { ...blankState, success: 'Image uploaded successfully' }
      break
    }
    case skill.WORKSHOP_SESSION_SAVED: {
      blankState = { ...blankState, success: 'Created new workshop session' }
      break
    }
    case skill.WORKSHOP_SAVED: {
      blankState = { ...blankState, success: 'Workshop created' }
      break
    }

    /*
       *case skill.CATEGORIES_FETCHED_REJECTED : { break; }
       *case skill.WORKSHOPS_FETCHED_REJECTED : { break; }
       *case skill.USER_WORKSHOPS_FETCH_REJECTED : { break; }
       *case skill.WORKSHOP_FETCHED_REJECTED : { break; }
       *case skill.LEVELS_REJECTED : { break; }
       */

    case skill.WORKSHOP_IMG_UPLOAD_REJECTED: {
      blankState = {
        ...blankState,
        errors: utils.ErrorsToList(action.payload)
      }
      break
    }
    case skill.WORKSHOP_PUBLISH_REJECTED: {
      blankState = {
        ...blankState,
        errors: utils.ErrorsToList(action.payload)
      }
      break
    }
    case skill.CREATE_PARTICIPATION_REJECTED: {
      blankState = {
        ...blankState,
        errors: utils.ErrorsToList(action.payload)
      }
      break
    }
    case skill.WORKSHOP_SAVE_REJECTED: {
      blankState = {
        ...blankState,
        errors: utils.ErrorsToList(action.payload)
      }
      break
    }
    case skill.WORKSHOP_SESSION_SAVE_REJECTED: {
      blankState = {
        ...blankState,
        errors: utils.ErrorsToList(action.payload)
      }
      break
    }
    case skill.WORKSHOP_SESSION_UPDATE_REJECTED: {
      blankState = {
        ...blankState,
        errors: utils.ErrorsToList(action.payload)
      }
      break
    }
    case skill.WORKSHOP_UPDATE_REJECTED: {
      blankState = {
        ...blankState,
        errors: utils.ErrorsToList(action.payload)
      }
      break
    }

    /*
       *case session.USER_FETCH_REJECTED : { break; }
       *case session.LOGOUT_REJECTED : { break; }
       */

    case session.LOGIN_REJECTED: {
      blankState = {
        ...blankState,
        errors: utils.ErrorsToList(action.payload)
      }
      break
    }

    case session.REGISTER_REJECTED: {
      blankState = {
        ...blankState,
        errors: utils.ErrorsToList(action.payload)
      }
      break
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
      blankState = { ...blankState, success: 'Image uploaded successfully' }
      break
    }
    case profile.UPDATE_USER_FULFILLED: {
      blankState = { ...blankState, success: 'Profile updated successfully' }
      break
    }

    case profile.UPLOAD_USER_PIC_REJECTED: {
      blankState = {
        ...blankState,
        errors: utils.ErrorsToList(action.payload)
      }
      break
    }
    case profile.PROVIDER_FETCH_REJECTED: {
      blankState = {
        ...blankState,
        errors: utils.ErrorsToList(action.payload)
      }
      break
    }
    case profile.UPDATE_USER_REJECTED: {
      blankState = {
        ...blankState,
        errors: utils.ErrorsToList(action.payload)
      }
      break
    }

    case "LOGIN_REQUIRED": {
      blankState = {
        ...blankState,
        loginRequired: {onHide: action.onHide}
      }
      break
    }

    /*
       *case profile.UPLOAD_USER_PIC_PENDING : { break; }
       *case profile.PROVIDER_FETCH_PENDING : { break; }
       *case profile.UPDATE_USER_PENDING : { break; }
       */

    case http.STATUS_OK: {
      break
    }
    case http.STATUS_CREATED: {
      break
    }
    case http.STATUS_ACCEPTED: {
      break
    }
    case http.STATUS_NOCONTENT: {
      break
    }
    case http.STATUS_BADREQUEST: {
      break
    }
    case http.STATUS_UNAUTHORIZED: {
      blankState = {
        ...blankState,
        errors: ['You seem to be logged out, Try to login again?'],
        loginRequired: true
      }
      break
    }
    case http.STATUS_FORBIDDEN: {
      blankState = {
        ...blankState,
        errors: ["You don't have the access to do that"]
      }
      break
    }
    case http.STATUS_NOTFOUND: {
      blankState = {
        ...blankState,
        errors: ["What you're looking for is missing"]
      }
      break
    }
    case http.STATUS_INTERNALSERVERERROR: {
      blankState = {
        ...blankState,
        warning: "Oh, you've broken the server"
      }
      break
    }
    case http.STATUS_BADGATEWAY: {
      blankState = {
        ...blankState,
        warning: 'The network is facing some problems. Try later?'
      }
      break
    }
    case http.STATUS_SERVICEUNAVAILABLE: {
      blankState = {
        ...blankState,
        warning: 'The server seems to be momentarily down. Try later?'
      }
      break
    }
    case http.STATUS_IHAVENOCLUE: {
      blankState = {
        ...blankState,
        warning: 'Something is acting weird. Try later?'
      }
      break
    }

    default: {
      break
    }
  }

  const { success, warning, errors, info } = blankState
  utils.NotifyUser(errors, warning, info, success)

  return Object.assign({}, state, blankState)
}
