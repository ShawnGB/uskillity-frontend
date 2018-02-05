import * as service from "app:utils/service";

export const USER_WORKSHOPS_FETCHED = "user/USER_WORKSHOPS_FETCHED";

export const fetchUserWorkshop = id => {
  return dispatch => {
    fetch(service.getServerEndpoint(`/users/${id}/workshops`))
      .then(service.handleResponse)
      .then(data => {
        dispatch({ type: USER_WORKSHOPS_FETCHED, payload: data });
      });
  };
};
