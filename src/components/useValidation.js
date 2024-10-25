// useValidation.js (Custom Hook)
import { useState } from 'react';

export const useValidation = (schema) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const fieldSchema = schema.extract(name);
    const { error } = fieldSchema.validate(value);
    return error ? error.message : null;
  };

  const validateForm = (data) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      return validationErrors;
    }
    return null;
  };

  return { errors, setErrors, validateField, validateForm };
};