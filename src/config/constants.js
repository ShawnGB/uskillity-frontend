export const API_BASE_URL = "http://localhost:3000"

const apiPaths = {
  "login": "/auth/sign_in",
  "register": "/auth",
  "fblogin":"/omniauth/facebook/callback",
}

export const uskillityUrl = (route) => {
  const path = apiPaths[route];
  if (path) {
    return API_BASE_URL + path;
  } else {
    console.log("could not find path for given route");
    return API_BASE_URL + "/";
  }
}
