import React from "react";
import { translate, Trans } from "react-i18next";
import { Modal } from "react-bootstrap";
import RegisterForm from "./RegisterForm";

const RegisterModal = props => {
  return (
    <Modal show={true} onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Trans i18nKey="register.modal.title">uSkillity</Trans>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegisterForm
          handleSubmit={props.handleSubmit}
          jumpToModal={props.jumpToModal}
        />
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default translate("translations")(RegisterModal);
