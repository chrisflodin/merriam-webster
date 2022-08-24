import { ServerError as Error } from "../../../types/errors";
import { getError } from "../../../utils/getError";

type FormFieldProps = {
  isError: boolean;
  error: Error | null;
};

export const FormError = ({ isError, error }: FormFieldProps) => {
  return isError ? <p className="">{getError(error)}</p> : <></>;
};
