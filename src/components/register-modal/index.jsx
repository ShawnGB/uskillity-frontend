import React from "react";
import { Modal } from "react-bootstrap";
import RegisterForm from "./RegisterForm";

const RegisterModal = props => {
  return (
    <Modal show={true} onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>uSkillity</Modal.Title>
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

export default RegisterModal;
