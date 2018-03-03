import React from "react";
import { translate } from "react-i18next";
import { Modal } from "react-bootstrap";

const ErrorModal = props => {
  const { title, description, hideModal } = props;
  return (
    <Modal show={true} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer />
    </Modal>
  );
};

export default translate("translations")(ErrorModal);
