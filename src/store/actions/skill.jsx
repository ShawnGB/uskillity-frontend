import * as service from "app:utils/service";

export const LEVELS_PENDING = "skill/LEVELS_PENDING";
export const LEVELS_FETCHED = "skill/LEVELS_FETCHED";
export const LEVELS_REJECTED = "skill/LEVELS_REJECTED";
export const CATEGORIES_FETCHED_PENDING = "skill/CATEGORIES_FETCHED_PENDING";
export const CATEGORIES_FETCHED = "skill/CATEGORIES_FETCHED";
export const CATEGORIES_FETCHED_REJECTED = "skill/CATEGORIES_FETCHED_REJECTED";
export const WORKSHOP_SAVED = "skill/WORKSHOP_SAVED";
export const WORKSHOPS_FETCHED_PENDING = "skill/WORKSHOPS_FETCHED_PENDING";
export const WORKSHOPS_FETCHED = "skill/WORKSHOPS_FETCHED";
export const WORKSHOPS_FETCHED_REJECTED = "skill/WORKSHOPS_FETCHED_REJECTED";



export const fetchLevels = () => {
  return function(dispatch) {
    dispatch({ type: LEVELS_PENDING});
    fetch(service.getServerEndpoint("/levels.json"))
      .then(service.handleResponse)
      .then(data => {
        dispatch({ type: LEVELS_FETCHED, payload: data });
      },
      error => {
        dispatch({ type: LEVELS_REJECTED, payload: error });
      }
    );
  };
};

export const fetchCategories = () => {
  return function(dispatch) {
    dispatch({type: CATEGORIES_FETCHED_PENDING});
    fetch(service.getServerEndpoint("/categories.json"))
      .then(service.handleResponse)
      .then(data => {
        dispatch({ type: CATEGORIES_FETCHED, payload: data });
      },
        error => {
          dispatch({ type: CATEGORIES_FETCHED_REJECTED, payload: error });
        });
  };
};

export const saveWorkshop = workshop => {
  return dispatch => {
    fetch(service.getServerEndpoint("/workshops.json"), {
      method: "POST",
      headers: service.getRequestHeaders(),
      body: JSON.stringify({
        category: workshop.category,
        workshop: workshop
      })
    }).then(dispatch({ type: WORKSHOP_SAVED }));
  };
};

export const fetchWorkshops = () => {
  return function(dispatch) {
    dispatch({ type: WORKSHOPS_FETCHED_PENDING});
    fetch(service.getServerEndpoint("/workshops.json"))
      .then(service.handleResponse)
      .then(data => {
        dispatch({ type: WORKSHOPS_FETCHED, payload: data });
      },
      error => {
        dispatch({ type: WORKSHOPS_FETCHED_REJECTED, payload: error });
      });
  };
};
