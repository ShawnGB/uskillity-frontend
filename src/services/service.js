export const service = {
  login
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
  return fetch('https://bluecarbuncle-staging.herokuapp.com/auth/sign_in', requestParams).then(handleResponse);
}


function handleResponse(response) {
  if (!response.ok) {
    //TODO remove the log message later
    console.log('Response', response);
    return Promise.reject(response.statusText);
  }
  console.log('Response', response);
  return response.json();
}