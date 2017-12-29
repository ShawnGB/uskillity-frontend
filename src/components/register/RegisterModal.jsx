import React from 'react';
import {Button, Modal} from 'react-bootstrap'
import RegisterForm from './RegisterForm'

export const RegisterModal = props => (
   <div>
     <Modal show={props.showModal} onHide={props.closeModal}>
       <Modal.Header closeButton>
         <Modal.Title>Modal heading</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <RegisterForm />
       </Modal.Body>
       <Modal.Footer>
         <Button onClick={props.closeModal}>Close</Button>
       </Modal.Footer>
     </Modal>
   </div>
)
