import React from 'react';
import { Modal } from 'react-bootstrap'
import LoginForm from '../login/LoginForm';
import RegisterForm from '../register/RegisterForm';

export default class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }
  render() {
    return (
      <div>
        {
          this.props.modalType === "register" ?
          (
            <div>
              <Modal
                show={this.props.showModal}
                onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>uSkillity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <RegisterForm/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
              </Modal>
            </div>
          )
          :
          (
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
          )
        }
      </div>

    );
  }
}
