import { Link } from "react-router-dom";
import { FormType } from "../config";
import style from "./SwitchPrompt.module.scss";

const { switchPromptStyle } = style;

type SwitchPromptProps = {
  formType: FormType;
};

export const SwitchPrompt = ({ formType }: SwitchPromptProps) => {
  if (formType === "login") {
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
