import * as localStorageManager from "./localStorageManager";

const ACCESS_TOKEN_KEY = "Access-Token";
const CLIENT = "Client";
const UID = "Uid";
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

export const getAuthHeaders = () => {
  const params = localStorageManager.getAuthParameters();
  if (!params) {
    return new Headers();
  }
  return new Headers({
    "access-token": params.auth_token,
    client: params.client,
    uid: params.uid
  });
};

export const handleResponse = response => {
  if (!response.ok) {
    return Promise.reject(response);
  }
  if (response.status === 204) {
    return {}
  }
  return response.json();
};

export const handleAuthResponse = response => {
  const authParams = {
    // TODO: good to check for null values
    auth_token: response.headers.get(ACCESS_TOKEN_KEY),
    client: response.headers.get(CLIENT),
    uid: response.headers.get(UID),
    expiry: response.headers.get(EXPIRY)
  };

  localStorageManager.setAuthParameters(authParams);

  return handleResponse(response);
};

export const fblogin = data => {
  console.log('fblogin: ', data);
  const fbEndpoit = '/auth/facebook';

  return fetch(getServerEndpoint(fbEndpoit), {
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  }).then(response => {
      response.json();
    })
    .then(json => {
      console.log('received:', json);
    })
    .catch(err => {
      console.log(err);
    });
};
