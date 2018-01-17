export const Helper = {
  getServerUrl,
}
const SERVER = process.env.REACT_APP_SERVER;

function getServerUrl(route){
  return `${SERVER}`+route;
}
