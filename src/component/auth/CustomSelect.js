import React from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import Select from "react-select";

const CustomSelect = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  const handleChange = (option) => {
    setFieldValue(field.name, option.value);
    console.log(option.value);
  };
  console.log(field.name);

  return (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <Select
        type="text"
        {...props}
        value={field.value.value}
        onChange={handleChange}
        onBlur={field.onBlur}
        name={field.name}
      />

      {props.show && (
        <ErrorMessage component="div" className="error" name="country" />
      )}
    </div>
  );
};

export default CustomSelect;
