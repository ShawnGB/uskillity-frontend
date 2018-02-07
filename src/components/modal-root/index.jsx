import React from "react";
import { connect } from "react-redux";
import LoginModal from "app:components/login-modal";
import RegisterModal from "app:components/register-modal";

const MODAL_COMPONENTS = {
  MODAL_LOGIN: LoginModal,
  MODAL_REGISTER: RegisterModal
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const Modal = MODAL_COMPONENTS[modalType];
  return <Modal {...modalProps} />;
};

export default connect(state => state.modal)(ModalRoot);
