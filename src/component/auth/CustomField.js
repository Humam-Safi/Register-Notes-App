import { ErrorMessage, Field } from "formik";
import { Col } from "react-bootstrap";

const CustomField = (props) => {
  return (
    <Col className="col">
      <label>{props.label}</label>
      <Field
        className="input"
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
      />
      {props.show && <ErrorMessage name={props.name} component="div" className="error" />}
    </Col>
  );
};

export default CustomField;
