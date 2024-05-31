import { ValidationError } from '@nestjs/common';

export const formatValidationErrorMessage = (
  errors: ValidationError | ValidationError[],
) => {
  return (Array.isArray(errors) ? errors : [errors]).map((error) => ({
    property: error.property,
    constraints: error.constraints,
  }));
};
