import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../store/Slices/notesSlice";
import { useNavigate } from "react-router-dom";

const NewNoteComponent = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  const notes = useSelector((state) => state.notes);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNote({ id: notes.length + 1, title, tags, body }));
    navigate("/notes");
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header className="bg-primary text-white text-center">
          <h3>Create a New Note</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="noteTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTags">
              <Form.Label>Tags</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  placeholder="Add a tag"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <Button variant="outline-primary" type="submit">
                  Add
                </Button>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="noteBody">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Write your note here"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit" className="me-2">
                Save
              </Button>
              <Button
                onClick={() => navigate("/notes")}
                variant="secondary"
                type="button"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewNoteComponent;
