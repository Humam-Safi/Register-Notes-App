import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote } from "../../store/Slices/notesSlice";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const NoteComponent = () => {
  const { id } = useParams();
  const notes = useSelector((state) => state.notes);
  // const notes = JSON.parse(localStorage.getItem("items"));
  const note = notes.find((note) => note.id === Number(id));
  // console.log(noteses)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <Container className="my-4">
      <Row className="mb-4 d-flex align-items-center justify-content-center gap-2">
        <Button
          onClick={() => navigate(`/edit/${id}`)}
          variant="primary"
          style={{ width: "100px" }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            dispatch(deleteNote(Number(id)));
            navigate("/notes");
          }}
          variant="danger"
          style={{ width: "100px" }}
        >
          Delete
        </Button>
        <Button
          onClick={() => navigate("/notes")}
          variant="secondary"
          style={{ width: "100px" }}
        >
          Back
        </Button>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>
                <h2>{note.title}</h2>
              </Card.Title>
              <Card.Text className="mb-2 text-muted">{note.tags}</Card.Text>
              <Card.Text>{note.body}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NoteComponent;
