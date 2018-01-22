import * as service from "app:service";

const LOGIN_PENDING = "session/LOGIN_PENDING";
const LOGIN_FULFILLED = "session/LOGIN_FULFILLED";
const LOGIN_REJECTED = "session/LOGIN_REJECTED";
const REGISTER_PENDING = "session/REGISTER_PENDING";
const REGISTER_FULFILLED = "session/REGISTER_FULFILLED";

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
          //TODO push home path to history for page navigation
          dispatch({ type: LOGIN_FULFILLED });
          console.log("data", data);
          // TODO: check if needed?
        },
        error => {
          // TODO: return error text to user
          dispatch({ type: LOGIN_REJECTED });
          console.log("error", error);
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
      .then(response => {
        dispatch({ type: REGISTER_FULFILLED });
        return response.json();
      });
  };
};

export const logout = () => {
  service.clearAuthParameters();
  // TODO: push the browser back to home page
};
