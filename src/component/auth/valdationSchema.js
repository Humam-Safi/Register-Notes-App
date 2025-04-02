import * as Yup from "yup";

const validationName = /^[a-zA-z]/;
const validateEmail = /^[a-zA-Z][a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
const validationPhoneNumber = /^\+?[0-9]{10}$/;
const validationPassword = /^(?=.*[A-Za-z])(?=.*[\W]).{2,}$/;

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(validationName, "Name is not valid")
    .min(2, "First name must be more than 2 letters")
    .required("Full name is required"),
  email: Yup.string()
    .matches(validateEmail, "Email is not valid")
    .required("Email is required"),
  password: Yup.string().matches(validationPassword , "Password must contain one char and one special Char at least")
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
  country: Yup.string().required("Country is required"),
  phoneNumber: Yup.string()
    .matches(validationPhoneNumber, "Phone number is not valid")
    .required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  privacy: Yup.boolean().oneOf(
    [true],
    "Accepting the privacy policy is required"
  ),
});
