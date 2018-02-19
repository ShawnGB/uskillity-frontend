import { uskillityUrl } from '../config/constants'

export const service = {
  login,
  register,
  fblogin
};

const jsonHeaders = {
  headers: {
    'Content-Type': 'application/json'
  }
};

function fblogin(data) {
  console.log("fblogin: ", data);
  const {authResponse: {signedRequest}} = data;
  console.log("sR::", signedRequest);

  const requestParams = {
    method: 'GET',
    credentials: 'include',
    ...jsonHeaders
  }

  const url = `#{uskillityUrl('fblogin')}?resource_class=User&signed_request=#{signedRequest}`

  //return fetch(uskillityUrl('fblogin') + '?resource_class=User', requestParams)
  return fetch(uskillityUrl('fblogin') + '?resource_class=User&signed_request=' + signedRequest + '&auth_origin_url=http://localhost:3001/', requestParams)
  .then((response) => response.json())
  .then((json) => {
    console.log('received:', json);
  }).catch((err) => {
    console.log(err);
  });
}

function login(email, password) {
  const requestParams = {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    ...jsonHeaders
  };
  return fetch(uskillityUrl('login'), requestParams)
    .then(handleResponse);
}

function register(user) {
  const requestParams = {
    method: 'POST',
    body: JSON.stringify({
      user
    }),
    ...jsonHeaders
  };
  return fetch(uskillityUrl('register'), requestParams)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText)
      }
      return response.json();
    });
}

function handleResponse(response) {

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  const authParams = {
    auth_token: response.headers.get("Access-Token"),
    client: response.headers.get("Client"),
    uid: response.headers.get("Uid")
  }

  sessionStorage.setItem('authParams', JSON.stringify(authParams));
  return response.json();
}
