import React from 'react';
import {Modal} from 'react-bootstrap'
import RegisterForm from './RegisterForm'

export const RegisterModal = props => (
   <div>
     <Modal show={props.showModal} onHide={props.closeModal}>
       <Modal.Header closeButton>
         <Modal.Title>uSkillity</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <RegisterForm />
       </Modal.Body>
       <Modal.Footer>
       </Modal.Footer>
     </Modal>
   </div>
)
