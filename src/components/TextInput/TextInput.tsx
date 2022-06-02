import { SyntheticEvent } from "react";
import { InputField } from "../../features/login/types";
import inputStyles from "./TextInput.module.scss";

const { isValid, isInvalid } = inputStyles;

interface TextInputProps extends InputField {
  handleInputChange: (event: SyntheticEvent) => void;
}

function TextInput({ label, placeholder, type, textType, touched, valid, value, handleInputChange }: TextInputProps) {
  return (
    <>
      <label>{label}</label>
      <input
        className={valid ? isValid : touched ? isInvalid : ""}
        value={value}
        onChange={handleInputChange}
        id={type}
        type={textType}
        placeholder={placeholder}
      />
    </>
  );
}

export default TextInput;
