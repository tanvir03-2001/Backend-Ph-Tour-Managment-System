import mongoose from "mongoose";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interfaces/error.types";

// Handle Validation error
export const handleValidationError = (
  error: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [];
  const errors = Object.values(error.errors);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors.forEach((errorObject: any) =>
    errorSources.push({
      path: errorObject.path,
      message: errorObject.message,
    })
  );

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
