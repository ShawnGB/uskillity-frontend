export const SHOW_MODAL = "modal/SHOW_MODAL";
export const HIDE_MODAL = "modal/HIDE_MODAL";

export const showModal = (type, props) => ({
  type: SHOW_MODAL,
  modalType: type,
  modalProps: props
});

export const hideModal = type => ({
  type: HIDE_MODAL
});
