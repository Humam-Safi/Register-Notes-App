import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { addUser } from "../../store/Slices/registerSlice";
import { ErrorMessage, Formik, Field, Form } from "formik";
import { validationSchema } from "./valdationSchema";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ImageShow from "./imageShow";
import CustomField from "./CustomField";
import PrivacyModal from "./privacyModal";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import CustomSelect from "./CustomSelect";

const RegisterComponent = () => {
  // states
  const [show, setShow] = useState(false);
  const [openRepeatPasswordEye, setOpenRepeatPasswordEye] = useState(false);
  const [openPasswordEye, setOpenPasswordEye] = useState(false);
  const [countries, setCountries] = useState([]);

  // navigation
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();

  // styled component
  const StyledRadio = styled.div`
    width: "120px";
    gap: 10px;
  `;

  // functio handle submit
  function handleSubmit(values) {
    dispatch(addUser(values));
    navigate("/notes");
  }
  // Fetch the list of countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryOptions = data.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));
        setCountries(countryOptions);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #ccc",
      borderRadius: "8px",
      "&:hover": { borderColer: "#ccc" },
      boxShadow: "none",
    }),
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <div className="d-flex">
          <div className="image">
            <ImageShow />
          </div>

          <div className="register">
            <h2>Registration</h2>
            <div>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  repeatPassword: "",
                  country: "",
                  phoneNumber: "",
                  position: "",
                  gender: "",
                  privacy: false,
                }}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
                validationSchema={validationSchema}
              >
                {(props) => (
                  <Form>
                    <Row className="row">
                      <CustomField
                        name="name"
                        type="text"
                        label="Full Name"
                        placeholder="Enter Your Name"
                        show={show}
                      />
                      <CustomField
                        name="email"
                        type="text"
                        label="Email"
                        placeholder="Enter Your Email"
                        show={show}
                      />
                    </Row>
                    <Row className="row">
                      <div className="col password">
                        <CustomField
                          name="password"
                          type={openPasswordEye ? "text" : "password"}
                          label="Password"
                          placeholder="Enter Your Password"
                          show={show}
                        />
                        <div
                          className="eye"
                          onClick={() => setOpenPasswordEye((prev) => !prev)}
                        >
                          {openPasswordEye ? <FaRegEye /> : <FaRegEyeSlash />}
                        </div>
                      </div>
                      <div className="col password">
                        <CustomField
                          name="repeatPassword"
                          type={openRepeatPasswordEye ? "text" : "password"}
                          label="Confirm Password"
                          placeholder="Enter Your Password Again"
                          show={show}
                        />
                        <div
                          className="eye"
                          onClick={() =>
                            setOpenRepeatPasswordEye((prev) => !prev)
                          }
                        >
                          {openRepeatPasswordEye ? (
                            <FaRegEye />
                          ) : (
                            <FaRegEyeSlash />
                          )}
                        </div>
                      </div>
                    </Row>
                    <Row className="row">
                      <Col>
                        <CustomSelect
                          name="country"
                          label="Country"
                          styles={customStyles}
                          show={show}
                          options={countries}
                          placeholder="Select a country"
                        />
                      </Col>
                      <CustomField
                        name="phoneNumber"
                        type="text"
                        label="Phone Number"
                        placeholder="Enter Your Phonr Number"
                        show={show}
                      />
                    </Row>
                    <Row className="row">
                      <Col className="col">
                        <label className="mb-2" htmlFor="gender">
                          Gender
                        </label>
                        <Field
                          className="d-flex justify-content-between"
                          as="section"
                          id="gender"
                          name="gender"
                        >
                          {["male", "female", "other", "prefer not to say"].map(
                            (gender) => (
                              <StyledRadio key={gender}>
                                <Field
                                  type="radio"
                                  name="gender"
                                  value={gender}
                                  id={gender}
                                />
                                <label className="radio-label" htmlFor={gender}>
                                  {gender.charAt(0).toUpperCase() +
                                    gender.slice(1)}
                                </label>
                              </StyledRadio>
                            )
                          )}
                        </Field>
                        {show && (
                          <ErrorMessage
                            className="error"
                            component="div"
                            name="gender"
                          />
                        )}
                      </Col>
                    </Row>
                    <PrivacyModal showError={show} />
                    <button
                      onClick={() => setShow(true)}
                      type="submit"
                      className="button"
                    >
                      Next Step
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <p>
              Already have an account? <a href="/signin">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterComponent;
