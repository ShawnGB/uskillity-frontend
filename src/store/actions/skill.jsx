import * as service from "app:utils/service";
import * as util from "app:utils/utils";

export const LEVELS_PENDING = "skill/LEVELS_PENDING";
export const LEVELS_FETCHED = "skill/LEVELS_FETCHED";
export const LEVELS_REJECTED = "skill/LEVELS_REJECTED";
export const CATEGORIES_FETCHED_PENDING = "skill/CATEGORIES_FETCHED_PENDING";
export const CATEGORIES_FETCHED = "skill/CATEGORIES_FETCHED";
export const CATEGORIES_FETCHED_REJECTED = "skill/CATEGORIES_FETCHED_REJECTED";
export const USER_WORKSHOPS_FETCHED = "skill/USER_WORKSHOPS_FETCHED";
export const USER_WORKSHOPS_FETCH_PENDING =
  "skill/USER_WORKSHOPS_FETCH_PENDING";
export const USER_WORKSHOPS_FETCH_REJECTED = "skill/USER_WORKSHOPS_REJECTED";
export const WORKSHOP_SAVED = "skill/WORKSHOP_SAVED";
export const WORKSHOP_SAVE_REJECTED = "skill/WORKSHOP_SAVE_REJECTED";
export const WORKSHOP_UPDATE_PENDING = "skill/WORKSHOP_UPDATE_PENDING";
export const WORKSHOP_UPDATED = "skill/WORKSHOP_UPDATED";
export const WORKSHOP_UPDATE_REJECTED = "skill/WORKSHOP_UPDATE_REJECTED";
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
export const WORKSHOP_SESSION_DELETE_PENDING =
  "skill/WORKSHOP_SESSION_DELETE_PENDING";
export const WORKSHOP_SESSION_DELETED = "skill/WORKSHOP_SESSION_DELETED";
export const WORKSHOP_SESSION_DELETE_REJECTED =
  "skill/WORKSHOP_SESSION_DELETE_REJECTED";
export const WORKSHOPS_FETCHED = "skill/WORKSHOPS_FETCHED";
export const WORKSHOPS_FETCHED_PENDING = "skill/WORKSHOPS_FETCHED_PENDING";
export const WORKSHOPS_FETCHED_REJECTED = "skill/WORKSHOPS_FETCHED_REJECTED";
export const WORKSHOP_FETCHED = "skill/WORKSHOP_FETCHED";
export const WORKSHOP_FETCHED_PENDING = "skill/WORKSHOP_FETCHED_PENDING";
export const WORKSHOP_FETCHED_REJECTED = "skill/WORKSHOP_FETCHED_REJECTED";
export const WORKSHOP_PUBLISHED = "skill/WORKSHOP_PUBLISHED";
export const WORKSHOP_PUBLISH_PENDING = "skill/WORKSHOP_PUBLISH_PENDING";
export const WORKSHOP_PUBLISH_REJECTED = "skill/WORKSHOP_PUBLISH_REJECTED";
export const WORKSHOP_IMG_UPLOAD_PENDING = "skill/WORKSHOP_IMG_UPLOAD_PENDING";
export const WORKSHOP_IMG_UPLOAD_FULFILLED =
  "skill/WORKSHOP_IMG_UPLOAD_FULFILLED";
export const WORKSHOP_IMG_UPLOAD_REJECTED =
  "skill/WORKSHOP_IMG_UPLOAD_REJECTED";

export const CREATE_PARTICIPATION_PENDING =
  "skill/CREATE_PARTICIPATION_PENDING ";
export const CREATE_PARTICIPATION_SUCCESS =
  "skill/CREATE_PARTICIPATION_SUCCESS ";
export const CREATE_PARTICIPATION_REJECTED =
  "skill/CREATE_PARTICIPATION_REJECTED ";

export const fetchLevels = () => {
  return function(dispatch) {
    dispatch({ type: LEVELS_PENDING });
    fetch(service.getServerEndpoint("/levels.json"))
      .then(resp => service.handleResponse(resp, dispatch))
      .then(
        data => {
          dispatch({ type: LEVELS_FETCHED, payload: data });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: LEVELS_REJECTED, payload: e });
          });
        }
      );
  };
};

export const fetchCategories = () => {
  return function(dispatch) {
    dispatch({ type: CATEGORIES_FETCHED_PENDING });
    fetch(service.getServerEndpoint("/categories.json"))
      .then(resp => service.handleResponse(resp, dispatch))
      .then(
        data => {
          dispatch({ type: CATEGORIES_FETCHED, payload: data });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: CATEGORIES_FETCHED_REJECTED, payload: e });
          });
        }
      );
  };
};

export const saveWorkshop = (workshop, router) => {
  return dispatch => {
    fetch(service.getServerEndpoint("/workshops.json"), {
      method: "POST",
      headers: service.getRequestHeaders(),
      body: JSON.stringify({
        category: workshop.category,
        workshop: workshop
      })
    })
      .then(resp => service.handleResponse(resp, dispatch))
      .then(
        data => {
          dispatch({ type: WORKSHOP_SAVED, payload: data });
          router.replace(`/shareyourskill/${data.id}/edit`);
        },
        error => {
          error.json().then(e => {
            // util.showErrorModal(dispatch, e);
            dispatch({ type: WORKSHOP_SAVE_REJECTED, payload: e });
          });
        }
      );
  };
};

export const fetchWorkshops = () => {
  return dispatch => {
    dispatch({ type: WORKSHOPS_FETCHED_PENDING });
    fetch(service.getServerEndpoint("/workshops"), {
      method: "GET",
      headers: service.getRequestHeaders()
    })
      .then(resp => service.handleResponse(resp, dispatch))
      .then(
        data => {
          dispatch({ type: WORKSHOPS_FETCHED, payload: data });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: WORKSHOPS_FETCHED_REJECTED, payload: e });
          });
        }
      );
  };
};

export const fetchWorkshop = id => {
  return dispatch => {
    dispatch({ type: WORKSHOP_FETCHED_PENDING });
    fetch(
      service.getServerEndpoint(`/workshops/${id}`), {
        method: "GET",
        headers: service.getRequestHeaders(),
      }
    )
      .then(resp => service.handleResponse(resp, dispatch))
      .then(
        data => {
          dispatch({ type: WORKSHOP_FETCHED, payload: data });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: WORKSHOP_FETCHED_REJECTED, payload: e });
          });
        }
      );
  };
};

export const fetchUserWorkshops = userId => {
  return dispatch => {
    dispatch({ type: USER_WORKSHOPS_FETCH_PENDING });
    fetch(service.getServerEndpoint(`/users/${userId}/workshops`))
      .then(resp => service.handleResponse(resp, dispatch))
      .then(
        data => {
          dispatch({ type: USER_WORKSHOPS_FETCHED, payload: data });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: USER_WORKSHOPS_FETCH_REJECTED, payload: e });
          });
        }
      );
  };
};

export const uploadWorkshopImg = (file, workshopId) => {
  return function(dispatch) {
    dispatch({ type: WORKSHOP_IMG_UPLOAD_PENDING });
    const data = new FormData();
    data.append("url", file, file.name);
    fetch(service.getServerEndpoint(`/workshops/${workshopId}/images`), {
      method: "POST",
      headers: service.getAuthHeaders(),
      body: data
    })
      .then(resp => service.handleResponse(resp, dispatch))
      .then(
        data => {
          dispatch({ type: WORKSHOP_IMG_UPLOAD_FULFILLED, payload: data });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: WORKSHOP_IMG_UPLOAD_REJECTED, payload: e });
          });
        }
      );
  };
};

export const saveWorkshopSession = (workshopId, session) => {
  return function(dispatch) {
    dispatch({ type: WORKSHOP_SESSION_SAVE_PENDING });
    fetch(
      service.getServerEndpoint(`/workshops/${workshopId}/workshop_sessions`),
      {
        method: "POST",
        headers: service.getRequestHeaders(),
        body: JSON.stringify({
          starts_at: util.parseToLocalTime(
            session.dateAndTime,
            session.starts_at
          ),
          ends_at: util.parseToLocalTime(session.dateAndTime, session.ends_at)
        })
      }
    )
      .then(resp => service.handleResponse(resp, dispatch))
      .then(
        response => {
          dispatch({
            type: WORKSHOP_SESSION_SAVED,
            session: response,
            workshopId: workshopId
          });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: WORKSHOP_SESSION_SAVE_REJECTED, payload: e });
          });
        }
      );
  };
};

export const deleteWorkshopSession = (workshopId, sessionId) => {
  return function(dispatch) {
    dispatch({ type: WORKSHOP_SESSION_DELETE_PENDING });
    fetch(
      service.getServerEndpoint(
        `/workshops/${workshopId}/workshop_sessions/${sessionId}.json`
      ),
      {
        method: "DELETE",
        headers: service.getRequestHeaders()
      }
    )
      .then(service.handleResponse)
      .then(
        response => {
          dispatch({
            type: WORKSHOP_SESSION_DELETED,
            sessionId: sessionId,
            workshopId: workshopId
          });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: WORKSHOP_SESSION_DELETE_REJECTED, payload: e });
          });
        }
      );
  };
};

export const updateWorkshopSession = (workshopId, session) => {
  return function(dispatch) {
    dispatch({ type: WORKSHOP_SESSION_UPDATE_PENDING });
    fetch(
      service.getServerEndpoint(
        `/workshops/${workshopId}/workshop_sessions/${session.id}.json`
      ),
      {
        method: "PUT",
        headers: service.getRequestHeaders(),
        body: JSON.stringify({
          starts_at: util.parseToLocalTime(
            session.dateAndTime,
            session.starts_at
          ),
          ends_at: util.parseToLocalTime(session.dateAndTime, session.ends_at)
        })
      }
    )
      .then(resp => service.handleResponse(resp, dispatch))
      .then(
        response => {
          dispatch({ type: WORKSHOP_SESSION_UPDATED });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: WORKSHOP_SESSION_UPDATE_REJECTED, payload: e });
          });
        }
      );
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
    })
      .then(resp => service.handleResponse(resp, dispatch))
      .then(
        response => {
          dispatch({ type: WORKSHOP_UPDATED });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: WORKSHOP_UPDATE_REJECTED, payload: e });
          });
        }
      );
  };
};

export const publishWorkshop = id => {
  return dispatch => {
    dispatch({ type: WORKSHOP_PUBLISH_PENDING });
    fetch(service.getServerEndpoint(`/workshops/${id}.json`), {
      method: "PUT",
      headers: service.getRequestHeaders(),
      body: JSON.stringify({
        terms_accepted: true
      })
    })
      .then(resp => service.handleResponse(resp, dispatch))
      .then(
        response => {
          dispatch({ type: WORKSHOP_PUBLISHED, id: id });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: WORKSHOP_PUBLISH_REJECTED, payload: e });
          });
        }
      );
  };
};

export const reserveTickets = (wid, sid, count) => {
  return dispatch => {
    dispatch({ type: CREATE_PARTICIPATION_PENDING });
    fetch(
      service.getServerEndpoint(
        `/workshops/${wid}/workshop_sessions/${sid}/participations.json`
      ),
      {
        method: "POST",
        headers: service.getRequestHeaders(),
        body: JSON.stringify({ requested_participation_count: count })
      }
    )
      .then(resp => service.handleResponse(resp, dispatch))
      .then(
        response => {
          dispatch({
            type: CREATE_PARTICIPATION_SUCCESS,
            participation: response,
            wid: wid,
            wsid: sid
          });
        },
        error => {
          error.json().then(e => {
            dispatch({ type: CREATE_PARTICIPATION_REJECTED, payload: e });
          });
        }
      );
  };
};
