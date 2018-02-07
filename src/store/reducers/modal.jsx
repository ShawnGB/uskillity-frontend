import * as modalActions from "app:store/actions/modal";

const initialState = {
  modalType: null,
  modaProps: {}
};

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case modalActions.SHOW_MODAL: {
      nextState = {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps
      };
      break;
    }

    case modalActions.HIDE_MODAL: {
      nextState = initialState;
      break;
    }

    default: {
      break;
    }
  }
  return nextState || state;
};
