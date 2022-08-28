import { ServerError as Error } from "../../../types/errors";
import { getError } from "../../../utils/getError";

type FormFieldProps = {
  error: Error | null;
};

export const FormError = ({ error }: FormFieldProps) => (error ? <p className="">{getError(error)}</p> : <></>);
