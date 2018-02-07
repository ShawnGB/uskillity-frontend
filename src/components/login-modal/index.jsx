import React from "react";
import { Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";

const LoginModal = props => {
  return (
    <Modal show={true} onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>uSkillity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginForm
          handleSubmit={props.handleSubmit}
          jumpToModal={props.jumpToModal}
        />
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default LoginModal;
