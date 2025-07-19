import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interfaces/error.types";

// Handle cast error
export const handleCastError = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error: mongoose.Error.CastError
): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid MongoDB ObjectID. Please provide a valid ID",
  };
};
