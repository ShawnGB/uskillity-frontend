import * as service from "app:utils/service";
import * as sessionActions from "app:store/actions/session";

export const USER_WORKSHOPS_FETCHED = "profle/USER_WORKSHOPS_FETCHED";
export const UPLOAD_USER_PIC_PENDING = "profle/UPLOAD_USER_PIC_PENDING";
export const UPLOAD_USER_PIC_REJECTED = "profle/UPLOAD_USER_PIC_REJECTED";

export const fetchUserWorkshop = id => {
  return dispatch => {
    // TODO: Add pending event here
    fetch(service.getServerEndpoint(`/users/${id}/workshops`))
      .then(service.handleResponse)
      .then(data => {
        dispatch({ type: USER_WORKSHOPS_FETCHED, payload: data });
      });
  };
};

export const saveUserPic = (file, userId) => {
  return function(dispatch) {
    dispatch({ type: UPLOAD_USER_PIC_PENDING });
    const data = new FormData();
    data.append("url", file, file.name);
    fetch(service.getServerEndpoint(`/users/${userId}/images`), {
      method: "POST",
      headers: service.getAuthHeaders(),
      body: data
    })
    .then(service.handleResponse)
    .then(response => {
      dispatch(sessionActions.fetchUser(userId))
    },error =>{
      dispatch({type:UPLOAD_USER_PIC_REJECTED,payload:error})
    })

  };
};
