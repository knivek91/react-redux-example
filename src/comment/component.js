import React from "react";
import { useField } from "formik";

export const Input = props => {
  const [field, { touched, error }] = useField(props);
  return (
    <>
      <input {...field} {...props} />
      {touched && error ? (
        <div className="text-left text-danger small">{error}</div>
      ) : null}
    </>
  );
};

export const TextArea = props => {
  const [field, { touched, error }] = useField(props);
  return (
    <>
      <textarea {...field} {...props} />
      {touched && error ? (
        <div className="text-left text-danger small">{error}</div>
      ) : null}
    </>
  );
};
