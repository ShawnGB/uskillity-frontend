import * as service from "app:utils/service";
import * as sessionActions from "app:store/actions/session";
import { replacer } from "app:utils/utils";

export const UPLOAD_USER_PIC_PENDING = "profile/UPLOAD_USER_PIC_PENDING";
export const UPLOAD_USER_PIC_REJECTED = "profile/UPLOAD_USER_PIC_REJECTED";
export const UPLOAD_USER_PIC_FULFILLED = "profile/UPLOAD_USER_PIC_FULFILLED";
export const UPDATE_USER_PENDING = "profile/UPDATE_USER_PENDING";
export const UPDATE_USER_FULFILLED = "profile/UPDATE_USER_FULFILLED";
export const UPDATE_USER_REJECTED = "profile/UPDATE_USER_REJECTED";
export const PROVIDER_FETCH_PENDING = "profile/PROVIDER_FETCH_PENDING";
export const PROVIDER_FETCHED = "profile/PROVIDER_FETCHED";
export const PROVIDER_FETCH_REJECTED = "profile/PROVIDER_FETCH_REJECTED";

export const saveUserPic = (file, userId) => {
  return function(dispatch) {
    dispatch({ type: UPLOAD_USER_PIC_PENDING });
    const data = new FormData();
    data.append("url", file, file.name);
    fetch(service.getServerEndpoint(`/users/${userId}/images`), {
      method: "POST",
      headers: service.getAuthHeaders(),
      body: data
    })
      .then(service.handleResponse)
      .then(
        response => {
          dispatch(sessionActions.fetchUser(userId));
          dispatch({ type: UPLOAD_USER_PIC_FULFILLED });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: UPLOAD_USER_PIC_REJECTED, payload: e });
          });
        }
      );
  };
};

export const updateUser = (profile, userId) => {
  return function(dispatch) {
    dispatch({ type: UPDATE_USER_PENDING });

    fetch(service.getServerEndpoint(`/users/${userId}`), {
      method: "PUT",
      headers: service.getRequestHeaders(),
      body: JSON.stringify(profile, replacer)
    })
      .then(service.handleResponse)
      .then(
        response => {
          dispatch({ type: UPDATE_USER_FULFILLED });
          dispatch(sessionActions.fetchUser(userId));
        },
        error => {
          error.json().then(e => {
            dispatch({ type: UPDATE_USER_REJECTED, payload: e });
          });
        }
      );
  };
};

export const fetchProvider = pId => {
  return function(dispatch) {
    dispatch({ type: PROVIDER_FETCH_PENDING });
    fetch(service.getServerEndpoint(`/users/${pId}`))
      .then(service.handleResponse)
      .then(
        response => {
          dispatch({ type: PROVIDER_FETCHED, payload: response });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: PROVIDER_FETCH_REJECTED, payload: e });
          });
        }
      );
  };
};
