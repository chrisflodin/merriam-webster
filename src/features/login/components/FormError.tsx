import { ServerError as Error } from "../../../types/errors";
import { getError } from "../../../utils/getError";
import style from "./FormError.module.scss";

const { errorStyle } = style;

type FormFieldProps = {
  error: Error | null;
};

export const FormError = ({ error }: FormFieldProps) => {
  if (error)
    return (
      <p id="FormError" className={errorStyle}>
        {getError(error)}
      </p>
    );

  return <></>;
};
