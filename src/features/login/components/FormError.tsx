import { ServerError as Error } from "../../../types/errors";
import { getError } from "../../../utils/getError";
import style from "./FormError.module.scss";

const { errorStyle } = style;

type FormFieldProps = {
  error: Error | null;
  isError: boolean;
};

export const FormError = ({ error, isError }: FormFieldProps) => {
  if (isError)
    return (
      <p id="FormError" className={errorStyle}>
        {getError(error)}
      </p>
    );

  return <></>;
};
