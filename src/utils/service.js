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
    // TODO: return user back to home page
    return Promise.reject(response.statusText);
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

const jsonHeaders = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const fblogin = data => {
  console.log("fblogin: ", data);
  const { authResponse: { signedRequest } } = data;
  console.log("sR::", signedRequest);

  const requestParams = {
    method: "GET",
    credentials: "include",
    ...jsonHeaders
  };

  const fbEndpoit = "/omniauth/facebook/callback";

  const url = `${getServerEndpoint(
    fbEndpoit
  )}?resource_class=User&signed_request=#{signedRequest}`;
  console.log("url", url);

  //return fetch(uskillityUrl('fblogin') + '?resource_class=User', requestParams)
  return fetch(
    getServerEndpoint(fbEndpoit) +
      "?resource_class=User&signed_request=" +
      signedRequest +
      "&auth_origin_url=http://localhost:3001/",
    requestParams
  )
    .then(response => response.json())
    .then(json => {
      console.log("received:", json);
    })
    .catch(err => {
      console.log(err);
    });
};
