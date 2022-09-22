import { Link } from "react-router-dom";
import { FormType } from "../config";
import style from "./SwitchPrompt.module.scss";

const { switchPromptStyle } = style;

type SwitchPromptProps = {
  type: FormType;
};

export const SwitchPrompt = ({ type }: SwitchPromptProps) => {
  if (type === "login") {
    return (
      <p className={switchPromptStyle}>
        Don't have an account? <Link to={() => "/sign-up"}>Sign up</Link>
      </p>
    );
  }

  return (
    <p className={switchPromptStyle}>
      Already have an account? <Link to={() => "/login"}>Login</Link>
    </p>
  );
};
