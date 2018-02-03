import * as service from "app:utils/service";

export const WORKSHOPS_FETCHED = "session/WORKSHOPS_FETCHED";
export const CATEGORIES_FETCHED = "session/CATEGORIES_FETCHED";
export const WORKSHOP_SAVED = "session/WORKSHOP_SAVED";

export const fetchWorkshops = () => {
  return function(dispatch) {
    //TODO: add pending event
    fetch(service.getServerEndpoint("/workshops.json"))
    .then(service.handleResponse)
    .then(data => {
      dispatch({ type: WORKSHOPS_FETCHED, payload: data })
    });
  }
}
//TODO: this also exists in skill actions, keep it at one place
export const fetchCategories = () => {
  return function(dispatch) {
    //TODO: add pending event
    fetch(service.getServerEndpoint("/categories.json"))
    .then(service.handleResponse)
    .then(data => {
      dispatch({ type: CATEGORIES_FETCHED, payload: data })
    });
  }
}
