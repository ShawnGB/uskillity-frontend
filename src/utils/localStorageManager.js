// TODO: split this into staging and production
const AUTH_PARAMS = "authParams";

export const getAuthParameters = () => {
  let auth = localStorage.getItem(AUTH_PARAMS);
  if (!auth) {
    return null;
  }
  return JSON.parse(auth);
};

export const setAuthParameters = authParams => {
  localStorage.setItem(AUTH_PARAMS, JSON.stringify(authParams));
};

export const clearAuthParameters = () => {
  localStorage.removeItem(AUTH_PARAMS);
};
