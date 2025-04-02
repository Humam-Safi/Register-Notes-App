// src/components/PrivacyModal.js
import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PrivacyModal = (ShowError) => {
  const [showich, setShowich] = useState(false);

  return (
    <>
      <div>
        <div>
          <label >
            <Field className="m-1" type="checkbox" name="privacy" />
          I accept the
          </label>{" "}
          <a
            style={{ fontSize: "18px" }}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setShowich(true);
            }}
          >
            privacy policy
          </a>
        </div>
        {ShowError && (
          <ErrorMessage className="error" component="div" name="privacy" />
        )}
      </div>

      <Modal show={showich} onHide={() => setShowich(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {" "}
            Please review our privacy policy to understand how we handle your
            data. By accepting, you agree to our privacy practices as outlined
            below:{" "}
          </p>{" "}
          <ul>
            {" "}
            <li>Your data will be stored securely.</li>{" "}
            <li>We do not share your information without consent.</li>{" "}
            <li>You can request data deletion at any time.</li>{" "}
          </ul>{" "}
          <p>For more details, visit our full privacy policy.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowich(false)} variant="secondary">
            Close
          </Button>
          <Button onClick={() => setShowich(false)} variant="primary">
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PrivacyModal;
