import { Link } from "react-router-dom";
import { ServerError } from "../../../types/errors";
import { FormLayoutConfig } from "../config";
import { FormError } from "./FormError";
import style from "./FormLayout.module.scss";

const { switchPromptStyle, container } = style;

type FormLayoutProps = {
  children?: React.ReactElement[] | React.ReactElement;
  config: FormLayoutConfig;
  error: ServerError | null;
  isError: boolean;
  submitHandler: (e?: React.BaseSyntheticEvent<any> | undefined) => Promise<void>;
};

export const UserForm = ({ config, isError, error, submitHandler, children }: FormLayoutProps) => {
  const { title, route, textEnd, textStart } = config;

  return (
    <form name={title} onSubmit={submitHandler}>
      <div className={container}>
        <h1>merriam webster</h1>
        <h3>{title}</h3>
        {children}
        <p className={switchPromptStyle}>
          {textStart} <Link to={() => route}>{textEnd}</Link>
        </p>
        {isError && <FormError error={error} />}
      </div>
    </form>
  );
};
