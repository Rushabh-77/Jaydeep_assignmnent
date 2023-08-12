import React, { useState } from 'react';
import { Toast, Button } from 'react-bootstrap';

const ToastComponent = (props) => {
  const [showToast, setShowToast] = useState(true);

  const handleClose = () => {
    setShowToast(false);
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <Toast
      show={showToast}
      onClose={handleClose}
      className={`bg-${props.variant} top-toast`}
    >
      <Toast.Header>
        <strong className="me-auto">{props.title}</strong>
      </Toast.Header>
      <Toast.Body >
        {props.message} {props.link && <small><a href={props.link}>{props.goto}</a></small>}
      </Toast.Body>
    </Toast>
  );
}

export default ToastComponent;
