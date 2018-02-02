import * as service from "app:utils/service";

export const LOGIN_PENDING = "session/LOGIN_PENDING";
export const LOGIN_FULFILLED = "session/LOGIN_FULFILLED";
export const LOGIN_REJECTED = "session/LOGIN_REJECTED";
export const LOGOUT_PENDING = "session/LOGOUT_PENDING";
export const LOGOUT_FULFILLED = "session/LOGOUT_FULFILLED";
export const LOGOUT_REJECTED = "session/LOGOUT_REJECTED";
export const REGISTER_PENDING = "session/REGISTER_PENDING";
export const REGISTER_FULFILLED = "session/REGISTER_FULFILLED";
export const LEVELS_FETCHED = "session/LEVELS_FETCHED";
export const FETCHED_CATEGORIES = "session/FETCHED_CATEGORIES";

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
      .then(service.handleResponse)
      .then(
        data => {
          //TODO: data.data is extremely ugly
          dispatch({ type: LOGIN_FULFILLED, payload: data.data });
        },
        error => {
          dispatch({ type: LOGIN_REJECTED, payload: error });
        }
      );
  };
};

export const register = user => {
  return function(dispatch) {
    //TODO may be use a better way to destructure the object?
    var email = user.email;
    var first_name = user.first_name;
    var name = user.name;
    var password = user.password;
    var password_confirmation = user.password_confirmation;

    dispatch({ type: REGISTER_PENDING });
    return fetch(service.getServerEndpoint("/auth"), {
      method: "POST",
      headers: service.getRequestHeaders(),
      body: JSON.stringify({
        email,
        first_name,
        name,
        password,
        password_confirmation
      })
    })
      .then(service.handleResponse)
      .then(data => {
        dispatch({ type: REGISTER_FULFILLED, payload: data.data });
      });
  };
};

export const logout = () => ({
  type: LOGOUT_PENDING
});
