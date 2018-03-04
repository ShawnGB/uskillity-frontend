import * as localStorageManager from "./localStorageManager";
import * as sessionActions from "app:store/actions/session";
import * as modalActions from "app:store/actions/modal";

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

export const handleResponse = (response, dispatch) => {
  if (response.status > 399) {
    dispatch({ type: "HTTP_" + response.status, payload: {} });
  }

  if (response.status === 401) {
    dispatch(
      modalActions.showModal("MODAL_LOGIN", {
        handleSubmit: (email, password) => dispatch(sessionActions.login(email, password)),
        handleFbLogin: data => dispatch(sessionActions.fbLogin(data)),
        hideModal: () => dispatch(modalActions.hideModal("MODAL_LOGIN"))
      })
    );
  }

  if (!response.ok) {
    return Promise.reject(response);
  }

  if (response.status === 204) {
    return {};
  }

  return response.json();
};

export const handleAuthResponse = (response, dispatch) => {
  const authParams = {
    // TODO: good to check for null values
    auth_token: response.headers.get(ACCESS_TOKEN_KEY),
    client: response.headers.get(CLIENT),
    uid: response.headers.get(UID),
    expiry: response.headers.get(EXPIRY)
  };

  localStorageManager.setAuthParameters(authParams);

  return handleResponse(response, dispatch);
};

export const fblogin = data => {
  console.log("fblogin: ", data);
  const fbEndpoit = "/authenticate_with_facebook";

  return fetch(getServerEndpoint(fbEndpoit), {
    method: "POST",
    body: JSON.stringify({ facebook_data: data.authResponse }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(response => {
      response.json();
    })
    .then(json => {
      console.log("received:", json);
    })
    .catch(err => {
      console.log(err);
    });
};
