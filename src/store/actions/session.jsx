import * as service from "app:utils/service";
import * as modalActions from "app:store/actions/modal";
import * as skillActions from "app:store/actions/skill";

export const LOGIN_PENDING = "session/LOGIN_PENDING";
export const LOGIN_FULFILLED = "session/LOGIN_FULFILLED";
export const LOGIN_REJECTED = "session/LOGIN_REJECTED";
export const LOGOUT_PENDING = "session/LOGOUT_PENDING";
export const LOGOUT_FULFILLED = "session/LOGOUT_FULFILLED";
export const LOGOUT_REJECTED = "session/LOGOUT_REJECTED";
export const REGISTER_PENDING = "session/REGISTER_PENDING";
export const REGISTER_FULFILLED = "session/REGISTER_FULFILLED";
export const REGISTER_REJECTED = "session/REGISTER_REJECTED";
export const USER_FETCHED_PENDING = "session/USER_FETCHED_PENDING";
export const USER_FETCHED = "session/USER_FETCHED";
export const USER_FETCH_REJECTED = "session/USER_FETCH_REJECTED";
export const USER_PAYMENT_METHOD_FETCHED_PENDING = "session/USER_PAYMENT_METHOD_FETCHED_PENDING";
export const USER_PAYMENT_METHOD_FETCHED = "session/USER_PAYMENT_METHOD_FETCHED";
export const USER_PAYMENT_METHOD_FETCH_REJECTED = "session/USER_PAYMENT_METHOD_FETCH_REJECTED";
export const USER_PAYMENT_METHOD_DELETED_PENDING = "session/USER_PAYMENT_METHOD_DELETED_PENDING";
export const USER_PAYMENT_METHOD_DELETED = "session/USER_PAYMENT_METHOD_DELETED";
export const USER_PAYMENT_METHOD_DELETED_REJECTED = "session/USER_PAYMENT_METHOD_DELETED_REJECTED";


export const login = (email, password) => {
  return function(dispatch) {
    dispatch({ type: LOGIN_PENDING });

    fetch(service.getServerEndpoint("/auth/sign_in"), {
      method: "POST",
      headers: service.getRequestHeaders(),
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((resp) => service.handleAuthResponse(resp, dispatch))
      .then(
        response => {
          dispatch({ type: LOGIN_FULFILLED, payload: response.data });
          dispatch(skillActions.fetchWorkshops());
          dispatch(skillActions.fetchCategories());
          dispatch(skillActions.fetchLevels());
          dispatch({ type: modalActions.HIDE_MODAL });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: LOGIN_REJECTED, payload: e });
          });
        }
      );
  };
};

export const fbLogin = data => {
  return function(dispatch) {
    dispatch({ type: LOGIN_PENDING });
    fetch(service.getServerEndpoint("/authenticate_with_facebook"), {
      method: "POST",
      body: JSON.stringify({ facebook_data: data.authResponse }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then((resp) => service.handleAuthResponse(resp, dispatch))
      .then(
        response => {
          console.log("authenticate with facebook response", response)
          dispatch({ type: LOGIN_FULFILLED, payload: response });
          dispatch(skillActions.fetchWorkshops());
          dispatch(skillActions.fetchCategories());
          dispatch(skillActions.fetchLevels());
          dispatch({ type: modalActions.HIDE_MODAL });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: LOGIN_REJECTED, payload: e });
          });
        }
      );
  };
};

export const register = user => {
  return function(dispatch) {
    dispatch({ type: REGISTER_PENDING });
    return fetch(service.getServerEndpoint("/auth"), {
      method: "POST",
      headers: service.getRequestHeaders(),
      body: JSON.stringify(user, [
        "email",
        "first_name",
        "name",
        "password",
        "password_confirmation"
      ])
    })
      .then((resp) => service.handleAuthResponse(resp, dispatch))
      .then(
        response => {
          dispatch({ type: REGISTER_FULFILLED, payload: response.data });
          dispatch({ type: modalActions.HIDE_MODAL });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: REGISTER_REJECTED, payload: e });
          });
        }
      );
  };
};

export const fetchUser = userId => {
  return function(dispatch) {
    dispatch({ type: USER_FETCHED_PENDING });
    fetch(service.getServerEndpoint(`/users/${userId}`))
      .then((resp) => service.handleResponse(resp, dispatch))
      .then(
        response => {
          dispatch({ type: USER_FETCHED, payload: response });
          dispatch(fetchUserPaymentMethods(userId));
        },
        error => {
          error.json().then(e => {
            dispatch({ type: USER_FETCH_REJECTED, payload: e });
          });
        }
      );
  };
};

export const fetchUserPaymentMethods = userId => {
  return function(dispatch) {
    dispatch({ type: USER_PAYMENT_METHOD_FETCHED_PENDING });
    fetch(service.getServerEndpoint(`/users/${userId}/payment_methods`), {
      method: "GET",
      headers: service.getRequestHeaders()
    })
      .then((resp) => service.handleResponse(resp, dispatch))
      .then(
        response => {
          dispatch({ type: USER_PAYMENT_METHOD_FETCHED, payload: response });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: USER_PAYMENT_METHOD_FETCH_REJECTED, payload: e });
          });
        }
      );
  };
};

export const deletePaymentMethod = userId => {
  return function(dispatch) {
    dispatch({ type: USER_PAYMENT_METHOD_DELETED_PENDING });
    fetch(service.getServerEndpoint(`/users/${userId}/payment_methods/1`), {
      method: "DELETE",
      headers: service.getRequestHeaders()
    })
      .then((resp) => service.handleResponse(resp, dispatch))
      .then(
        response => {
          dispatch({ type: USER_PAYMENT_METHOD_DELETED, payload: response });
          dispatch(fetchUser(userId));
        },
        error => {
          error.json().then(e => {
            dispatch({ type: USER_PAYMENT_METHOD_DELETED_REJECTED, payload: e });
          });
        }
      );
  };
};

export const logout = () => ({
  type: LOGOUT_PENDING
});
