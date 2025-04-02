import { useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditTagsModal from "./EditTags";

const NoteListComponent = () => {

  const navigate = useNavigate();

  const notes = useSelector((state)=>state.notes);
  const [dataShow , setDataShow] = useState(notes)
  console.log(notes);
  

  const [titleSearch, setTitleSearch] = useState("");
  const [tagsSearch, setTagsSearch] = useState("");

  const handleTitleSearch = (e) => {
    setTitleSearch((e.target.value).toLowerCase());
    setDataShow(notes.filter((note)=>note.title.toLowerCase().includes(e.target.value)))
  };
  const handleTagsleSearch = (e) => {
    setTagsSearch((e.target.value).toLowerCase());
    setDataShow(notes.filter((note)=>note.tags.toLowerCase().includes(e.target.value)))
  };

  const data = dataShow?.map((note) => (
    <Col key={note.id} sm={12} md={6} lg={4} className="mb-4">
      <Card onClick={() => navigate(`/note/${note.id}`)} style={{ cursor: "pointer" }}>
        <Card.Body className="text-center">
          <Card.Text> {note.title.length > 20 ? note.title.slice(0 , 20)+ "...." : note.title} </Card.Text>
          <Button variant="primary" style={{ cursor: "default"}}>{note.tags}</Button>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <Container>
          <h1 className="my-4 d-flex align-items-center justify-content-center">Notes</h1>
      <div className="my-4 d-flex fle-row align-items-center justify-content-center">
          <Button  onClick={() => navigate("/new")} variant="primary" className="me-2" style={{width:"100px"}}>Create</Button>
          <EditTagsModal />
      </div>
      <Row className="my-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleTitleSearch}
                type="text"
                placeholder="Search by title..."
                value={titleSearch}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control onChange={handleTagsleSearch} value={tagsSearch} type="text" placeholder="Filter by tag..." />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        {data}
      </Row>
    </Container>
  );
};

export default NoteListComponent;
