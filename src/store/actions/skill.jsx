import * as service from "app:utils/service";
import * as util from "app:utils/utils";
export const LEVELS_PENDING = "skill/LEVELS_PENDING";
export const LEVELS_FETCHED = "skill/LEVELS_FETCHED";
export const LEVELS_REJECTED = "skill/LEVELS_REJECTED";
export const CATEGORIES_FETCHED_PENDING = "skill/CATEGORIES_FETCHED_PENDING";
export const CATEGORIES_FETCHED = "skill/CATEGORIES_FETCHED";
export const CATEGORIES_FETCHED_REJECTED = "skill/CATEGORIES_FETCHED_REJECTED";
export const WORKSHOP_SAVED = "skill/WORKSHOP_SAVED";
export const WORKSHOP_SAVE_REJECTED = "skill/WORKSHOP_SAVE_REJECTED";
export const WORKSHOP_UPDATE_PENDING = "skill/WORKSHOP_UPDATE_PENDING";
export const WORKSHOP_UPDATED = "skill/WORKSHOP_UPDATED";
export const WORKSHOP_UPDATE_REJECTED = "skill/WORKSHOP_UPDATE_REJECTED";
export const WORKSHOPS_FETCHED_PENDING = "skill/WORKSHOPS_FETCHED_PENDING";
export const WORKSHOP_SESSION_SAVE_PENDING =
  "skill/WORKSHOP_SESSION_SAVE_PENDING";
export const WORKSHOP_SESSION_SAVED = "skill/WORKSHOP_SESSION_SAVED";
export const WORKSHOP_SESSION_SAVE_REJECTED =
  "skill/WORKSHOP_SESSION_SAVE_REJECTED";
export const WORKSHOP_SESSION_UPDATE_PENDING =
  "skill/WORKSHOP_SESSION_UPDATE_PENDING";
export const WORKSHOP_SESSION_UPDATED = "skill/WORKSHOP_SESSION_UPDATED";
export const WORKSHOP_SESSION_UPDATE_REJECTED =
  "skill/WORKSHOP_SESSION_UPDATE_REJECTED";
export const WORKSHOPS_FETCHED = "skill/WORKSHOPS_FETCHED";
export const WORKSHOPS_FETCHED_REJECTED = "skill/WORKSHOPS_FETCHED_REJECTED";
export const UPLOAD_IMG_PENDING = "skill/UPLOAD_IMG_PENDING";
export const UPLOAD_IMG_FULFILLED = "skill/UPLOAD_IMG_FULFILLED";
export const UPLOAD_IMG_REJECTED = "skill/UPLOAD_IMG_REJECTED";

export const fetchLevels = () => {
  return function(dispatch) {
    dispatch({ type: LEVELS_PENDING });
    fetch(service.getServerEndpoint("/levels.json"))
      .then(service.handleResponse)
      .then(
        data => {
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
    dispatch({ type: CATEGORIES_FETCHED_PENDING });
    fetch(service.getServerEndpoint("/categories.json"))
      .then(service.handleResponse)
      .then(
        data => {
          dispatch({ type: CATEGORIES_FETCHED, payload: data });
        },
        error => {
          dispatch({ type: CATEGORIES_FETCHED_REJECTED, payload: error });
        }
      );
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
    })
      .then(service.handleResponse)
      .then(
        data => {
          dispatch({ type: WORKSHOP_SAVED, payload: data });
        },
        error => {
          dispatch({ type: WORKSHOP_SAVE_REJECTED, payload: error });
        }
      );
  };
};

export const fetchWorkshops = () => {
  return function(dispatch) {
    dispatch({ type: WORKSHOPS_FETCHED_PENDING });
    fetch(service.getServerEndpoint("/workshops.json"))
      .then(service.handleResponse)
      .then(
        data => {
          dispatch({ type: WORKSHOPS_FETCHED, payload: data });
        },
        error => {
          dispatch({ type: WORKSHOPS_FETCHED_REJECTED, payload: error });
        }
      );
  };
};
//TODO: need to pass workshop id as well
export const saveWorkshopCover = (file, id) => {
  return function(dispatch) {
    dispatch({ type: UPLOAD_IMG_PENDING });
    const data = new FormData();
    data.append("url", file, file.name);
    fetch(service.getServerEndpoint(`/workshops/${id}/images`), {
      method: "POST",
      headers: service.getAuthHeaders(),
      body: data
    })
      .then(service.handleResponse)
      .then(
        data => {
          dispatch({ type: UPLOAD_IMG_FULFILLED, payload: data });
        },
        error => {
          dispatch({ type: UPLOAD_IMG_REJECTED, payload: error });
        }
      );
  };
};

export const saveWorkshopSession = (wId, s) => {
  return function(dispatch) {
    dispatch({ type: WORKSHOP_SESSION_SAVE_PENDING });
    fetch(service.getServerEndpoint(`/workshops/${wId}/workshop_sessions`), {
      method: "POST",
      headers: service.getRequestHeaders(),
      body: JSON.stringify({
        starts_at: util.parseToLocalTime(s.dateAndTime, s.starts_at),
        ends_at: util.parseToLocalTime(s.dateAndTime, s.ends_at)
      })
    })
      .then(service.handleResponse)
      .then(
        response => {
          dispatch({ type: WORKSHOP_SESSION_SAVED });
        },
        error => {
          dispatch({ type: WORKSHOP_SESSION_SAVE_REJECTED });
        }
      );
  };
};

export const updateWorkshopSession = (wId, sId, s) => {
  return function(dispatch) {
    dispatch({ type: WORKSHOP_SESSION_UPDATE_PENDING });
    fetch(
      service.getServerEndpoint(
        `/workshops/${wId}/workshop_sessions/${sId}.json`
      ),
      {
        method: "PUT",
        headers: service.getRequestHeaders(),
        body: JSON.stringify({
          starts_at: util.parseToLocalTime(s.dateAndTime, s.starts_at),
          ends_at: util.parseToLocalTime(s.dateAndTime, s.ends_at)
        })
      }
    ).then(response => {
      if (response.ok) {
        dispatch({ type: WORKSHOP_SESSION_UPDATED });
      } else {
        dispatch({ type: WORKSHOP_SESSION_UPDATE_REJECTED });
      }
    });
  };
};

export const updateWorkshop = (workshop, id) => {
  return dispatch => {
    dispatch({ type: WORKSHOP_UPDATE_PENDING });
    fetch(service.getServerEndpoint(`/workshops/${id}.json`), {
      method: "PUT",
      headers: service.getRequestHeaders(),
      body: JSON.stringify({
        workshop: workshop
      })
    }).then(promise => {
      dispatch({ type: WORKSHOP_UPDATED });
    });
  };
};
