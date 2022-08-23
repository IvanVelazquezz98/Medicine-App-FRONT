import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';

export default function ModalMesage() {
  const [show, setShow] = useState(true);
 
  const handleClose = () => {
    setShow(false)
  };



  return (
    <>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
            Muchas gracias
            </Modal.Title>
        </Modal.Header>
        Se a enviado el formulario a nuestro equipo de trabajo, muchas gracias
        por usar y puntuar nuestra app 💖
            <Button variant="primary" onClick={handleClose}>
                cerrar
            </Button>
    </Modal>

</>
);
}