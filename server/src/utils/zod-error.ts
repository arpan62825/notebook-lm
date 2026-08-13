import { flattenError, type $ZodError } from "zod/v4/core";

export const getZodFieldErrors = (error: $ZodError) => {
  return flattenError(error).fieldErrors;
};
