export const service = {
  login,
  logout,
  register
};

function login(username, password) {
  const requestParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  };
  return fetch('https://bluecarbuncle-staging.herokuapp.com/auth -d', requestParams).then(handleResponse);
}


function handleResponse(response) {
  if (!response.ok) {
    //return some message
  }
  return response.json();
}