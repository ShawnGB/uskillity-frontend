export const service = {
  login,
  register
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
  return fetch('https://bluecarbuncle-staging.herokuapp.com/auth/sign_in', requestParams)
    .then(handleResponse);
}

function register(user) {
  const requestParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user
    })
  };
  return fetch('https://bluecarbuncle-staging.herokuapp.com/auth', requestParams)
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
