import * as service from "app:utils/service";

export const LEVELS_FETCHED = "session/LEVELS_FETCHED";
export const CATEGORIES_FETCHED = "session/FETCHED_CATEGORIES";

export const fetchLevels = () => {
  return function(dispatch) {
    console.log("fetchLevels called");
    fetch(service.getServerEndpoint("/levels.json"))
    .then(service.handleResponse)
    .then(data => {
      console.log("fetched data",data);
      dispatch({ type: LEVELS_FETCHED, payload: data })
    });
  }
};

export const fetchCategories = () => {
  return function(dispatch) {
    // dispatch({type: FETCH_CATEGORIES_PENDING});
    fetch(service.getServerEndpoint("/categories.json"))
    .then(service.handleResponse)
    .then(data => {
      dispatch({type: CATEGORIES_FETCHED, payload: data});
    });
  }
}
