import React from "react";
import { translate } from "react-i18next";
import { Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";

const LoginModal = props => {
  return (
    <Modal show={true} onHide={props.hideModal}>
      <Modal.Body>
        <LoginForm
          handleSubmit={props.handleSubmit}
          jumpToModal={props.jumpToModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default translate("translations")(LoginModal);
