import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap'
import RegisterForm from './RegisterForm'


export default class RegisterModal extends Component {

constructor(props) {
   super(props);
       this.state = {
           showModal: true,
       };
       this.closeModal = this.closeModal.bind(this);
   }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterForm />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
