import React from 'react';
import { Modal } from 'react-bootstrap'
import LoginForm from './LoginForm';

export default class LoginModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>uSkillity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm/>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
