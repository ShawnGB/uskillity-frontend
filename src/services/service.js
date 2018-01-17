const SERVER = process.env.REACT_APP_SERVER;
const ACCESS_TOKEN_KEY = "Access-Token";
const CLIENT = "Client";
const UID = "Uid";
const AUTH_PARAMS = "authParams";
const EXPIRY = "Expiry";

export const service = {
  login,
  register,
  alreadyRegistered,
  logout,
  checkLoggedIn,
};

function login(email, password) {
  const requestParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  };
  return fetch(SERVER + '/auth/sign_in', requestParams)
    .then(handleResponse)
    .then(data => {
        //TODO push home path to history for page navigation
        console.log("data", data);
        // TODO: check if needed?


      },
      error => {
        // TODO: return error text to user
        console.log("error", error);
      }
    );

}
function register(user) {
  //TODO may be use a better way to destructure the object?
  var email = user.email;
  var first_name = user.first_name;
  var name = user.name;
  var password = user.password;
  var password_confirmation = user.password_confirmation;

  const requestParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      first_name,
      name,
      password,
      password_confirmation
    })
  };
  return fetch(SERVER + '/auth', requestParams)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText)
      }
      return response.json();
    });
}

function logout() {
  clearAuthParameters();
  // TODO: push the browser back to home page
}

function alreadyRegistered() {}

function handleResponse(response) {

  if (!response.ok) {
    // TODO: return user back to home page
    return Promise.reject(response.statusText);
  }
  setAuthParameters(response);
  return response.json();
}

function setAuthParameters(response) {
  const authParams = {
    // TODO: good to check for null values
    auth_token: response.headers.get(ACCESS_TOKEN_KEY),
    client: response.headers.get(CLIENT),
    uid: response.headers.get(UID),
    expiry: response.headers.get(EXPIRY)
  }
  //Save authentication parameters to sessionStorage
  // TODO: check if this needs to be sessionStorage or localStorage?
  sessionStorage.setItem(AUTH_PARAMS, JSON.stringify(authParams));
}
//Fetches the value of authentication parameters from sessionStorage
function getAuthParameters() {
  return JSON.parse(sessionStorage.getItem(AUTH_PARAMS));
}

//If authentication params exist and not expired the return true
function checkLoggedIn() {
  var params = getAuthParameters();
  if (!params) {
    return null;
  }
  // TODO: mab be check for token expiry if needed
  return !!params.auth_token;
}

function clearAuthParameters() {
  sessionStorage.removeItem(AUTH_PARAMS);
}
