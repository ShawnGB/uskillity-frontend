import React from 'react';
import { Modal } from 'react-bootstrap'
import LoginForm from '../login/LoginForm';
import RegisterForm from '../register/RegisterForm';

export default class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {modalType: ""}
        this.closeModal = this.closeModal.bind(this)
    }

    jumpToModal(modal) {
        this.showModal(modal)
    }

    onLoginClicked() {
        this.showModal("login")
    }

    onRegisteredClicked() {
        this.showModal("register")
    }


    showModal(modalType){
        this.setState({
            modalType: modalType
        });
    }

    closeModal() {
        this.setState({modalType: ""})
    }

  render() {
    return (
      <div>
         <div>
           <Modal
             show={this.state.modalType === "register"}
             onHide={this.closeModal}>
             <Modal.Header closeButton>
               <Modal.Title>uSkillity</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <RegisterForm jumpToModal={this.jumpToModal.bind(this,"login")} />
             </Modal.Body>
             <Modal.Footer>
             </Modal.Footer>
           </Modal>
         </div>
         <div>
           <Modal
             show={this.state.modalType === "login"}
             onHide={this.closeModal}>
             <Modal.Header closeButton>
               <Modal.Title>uSkillity</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <LoginForm jumpToModal={this.jumpToModal.bind(this, "register")} />
             </Modal.Body>
             <Modal.Footer>
             </Modal.Footer>
           </Modal>
         </div>
      </div>

    );
  }
}
