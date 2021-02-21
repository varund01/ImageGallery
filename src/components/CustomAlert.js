import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CustomAlert = ({ isShown, setIsShown, ModalTitle, ModalBody }) => {
  const handleClose = () => {
    setIsShown({ isShown: false, ModalTitle, ModalBody });
  };

  return (
    <Modal show={isShown} onHide={handleClose} backdrop="static">
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#386C04",
          color: "white",
          textShadow: "2px 2px black",
        }}
      >
        <Modal.Title>{ModalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontWeight: "bold" }}>{ModalBody}</Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: "#161818",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CustomAlert;