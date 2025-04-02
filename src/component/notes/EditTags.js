import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const EditTagsModal = () => {
  const [show, setShow] = useState(false);
  const notes = useSelector((state) => state.notes);
  let tags = [];
  const dispatch = useDispatch();
  const [editedTags, setEditedTags] = useState([]);

  for (let i = 0; i < notes.length; i++) {
    tags.push(notes[i].tags);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEditedTags([...tags]);
    setShow(true);
  };

  const handleTagChange = (index, newValue) => {
    const newTags = [...editedTags];
    newTags[index] = newValue;
    setEditedTags(newTags);
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_TAGS',
      payload: {
        tags: editedTags
      }
    });
    handleClose();
  };

  const handleDelete = (index) => {
    const newTags = [...editedTags];
    newTags.splice(index, 1);
    setEditedTags(newTags);
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow} style={{width:"100px"}}>
        Edit Tags
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {editedTags.map((tag, index) => ( 
              <div key={index} className="d-flex align-items-center mb-2">
                <Form.Control
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  className="me-2"
                />
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  &times;
                </Button>
              </div>
            ))} 
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTagsModal;
