import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import RegisterForm from './RegisterForm';
import { Redirect } from 'react-router-dom';


export default class RegisterModal extends Component {

constructor(props) {
   super(props);
       this.state = {
           showModal: true,
           redirect: false,
       };
       this.closeModal = this.closeModal.bind(this);
   }

  closeModal() {
    this.setState({ showModal: false, redirect: true });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  render() {
    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/'/>;
     }
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
