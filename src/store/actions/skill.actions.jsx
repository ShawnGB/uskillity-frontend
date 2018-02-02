import * as service from "app:utils/service";

export const LEVELS_FETCHED = "session/LEVELS_FETCHED";
export const CATEGORIES_FETCHED = "session/FETCHED_CATEGORIES";
export const WORKSHOP_SAVED = "session/WORKSHOP_SAVED";

export const fetchLevels = () => {
  return function(dispatch) {
    fetch(service.getServerEndpoint("/levels.json"))
    .then(service.handleResponse)
    .then(data => {
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

export const saveWorkshop = workshop => {
  return (dispatch) => {
    fetch(service.getServerEndpoint("/workshops.json"), {
      method: "POST",
      headers: service.getRequestHeaders(),
      body: JSON.stringify({
        category: workshop.category,
        workshop: workshop
      })
    }).then(dispatch({type:WORKSHOP_SAVED}));
  }
}
