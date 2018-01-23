const ACCESS_TOKEN_KEY = "Access-Token";
const CLIENT = "Client";
const UID = "Uid";
const AUTH_PARAMS = "authParams";
const EXPIRY = "Expiry";

const SERVER = process.env.REACT_APP_SERVER;

export const getServerEndpoint = route => {
  return `${SERVER}${route}`;
};

export const getRequestHeaders = () => {
  let headers = getAuthHeaders();
  headers.append("Content-Type", "application/json");
  return headers;
};

const getAuthHeaders = () => {
  const params = getAuthParametersFromStorage();
  if (!params) {
    return new Headers();
  }
  return new Headers({
    "access-token": params.auth_token,
    client: params.client,
    uid: params.uid
  });
};

const getAuthParametersFromStorage = () => {
  let auth = sessionStorage.getItem(AUTH_PARAMS);
  if (!auth) {
    return null;
  }
  return JSON.parse(auth);
};

export const setAuthParametersInStorage = response => {
  const authParams = {
    // TODO: good to check for null values
    auth_token: response.headers.get(ACCESS_TOKEN_KEY),
    client: response.headers.get(CLIENT),
    uid: response.headers.get(UID),
    expiry: response.headers.get(EXPIRY)
  };
  //Save authentication parameters to sessionStorage
  // TODO: change this to localStorage
  sessionStorage.setItem(AUTH_PARAMS, JSON.stringify(authParams));
};

//If authentication params exist and not expired the return true
export const checkLoggedIn = () => {
  var params = getAuthParametersFromStorage();
  if (!params) {
    return null;
  }
  // TODO: mab be check for token expiry if needed
  return !!params.auth_token;
};

export const clearAuthParameters = () => {
  sessionStorage.removeItem(AUTH_PARAMS);
};

export const handleResponse = response => {
  if (!response.ok) {
    // TODO: return user back to home page
    return Promise.reject(response.statusText);
  }
  setAuthParametersInStorage(response);
  return response.json();
};
