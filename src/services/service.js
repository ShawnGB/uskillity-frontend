const SERVER = process.env.REACT_APP_SERVER;

export const service = {
  login,
  register,
  alreadyRegistered,
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
  return fetch(SERVER+'/auth/sign_in', requestParams)
    .then(handleResponse);
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
  return fetch(SERVER+'/auth', requestParams)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText)
      }
      return response.json();
    });
}

function alreadyRegistered (){

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
