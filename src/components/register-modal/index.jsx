import React from "react";
import { translate } from "react-i18next";
import { Modal } from "react-bootstrap";
import RegisterForm from "./RegisterForm";

const RegisterModal = props => {
  return (
    <Modal show={true} onHide={props.hideModal}>
      <Modal.Body>
        <RegisterForm
          handleSubmit={props.handleSubmit}
          jumpToModal={props.jumpToModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default translate("translations")(RegisterModal);
