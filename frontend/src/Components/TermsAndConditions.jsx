import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const TermsAndConditions = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Footer link to trigger modal */}
      <div className="text-center mt-4">
        <a href="#!" onClick={handleShow} className="text-decoration-underline text-muted">
          Terms & Conditions
        </a>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Welcome to MediHeaven. By using our platform, you agree to comply with the following terms:
          </p>
          <ul>
            <li>Your data is securely stored and will not be shared without consent.</li>
            <li>You must provide accurate and up-to-date medical information.</li>
            <li>We reserve the right to modify or terminate services at any time.</li>
            <li>This service is intended for informational purposes and does not replace medical advice.</li>
            {/* Add more points if needed */}
          </ul>
          <p className="text-muted">For full policy details, contact us at support@mediheaven.lk.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            I Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TermsAndConditions;
