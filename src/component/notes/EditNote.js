import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateNote } from "../../store/Slices/notesSlice";
import { Card, Button, Container, Form } from "react-bootstrap";

const EditNoteComponent = () => {
  const { id } = useParams();
  const notes = useSelector((state) => state.notes);
  console.log(notes);

  const note = notes.find((note) => note.id === Number(id));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(note ? note.title : "");
  const [body, setBody] = useState(note ? note.body : "");
  const [tags, setTags] = useState(note ? note.tags : "");

  const editedData = {
    id : Number(id),
    title,
    body,
    tags,
  }

  const handleUpdateNote = (e) => {
    e.preventDefault();
    dispatch(
      updateNote(editedData)
    );
    navigate(`/note/${id}`);
  };

  if (!note) {
    return (
      <Container className="mt-5">
        <h2>Note not found</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h3>Edit Note</h3>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleUpdateNote}>
            <Form.Group className="mb-3" controlId="noteTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="noteTags">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
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
                Save Changes
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => navigate(`/note/${id}`)}
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

export default EditNoteComponent;
